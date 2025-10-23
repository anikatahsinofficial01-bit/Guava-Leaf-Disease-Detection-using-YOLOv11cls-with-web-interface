
from flask import Flask, request, send_file, jsonify, make_response
from ultralytics import YOLO
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image
import torch
import torch.nn.functional as F
import numpy as np
import cv2
from PIL import Image
import io
import logging
from flask_cors import CORS
from rembg import remove

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

model_path = 'best.pt'  
model = YOLO(model_path)
model.model.eval()
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.model.to(device)
class_names = model.model.names
logger.info(f"Model loaded from {model_path} onto {device}")

def transform_image(image_pil):
    image = image_pil.resize((640, 640))
    image = np.array(image).astype(np.float32) / 255.0
    tensor = torch.from_numpy(image).permute(2, 0, 1).unsqueeze(0)
    return tensor.to(device), image

def remove_background(image_pil):
    """
    Takes a PIL image, removes background, and returns a new PIL image.
    """
    buffered = io.BytesIO()
    image_pil.save(buffered, format="PNG")
    output_image = remove(buffered.getvalue())
    return Image.open(io.BytesIO(output_image)).convert("RGB")

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': '✅ Welcome to the YOLOv8 Classification API with GradCAM'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        logger.error('No image file found in request')
        return jsonify({'error': 'No image file found in request'}), 400

    file = request.files['image']
    logger.info(f"Received file: {file.filename}")

    # ✅ FIXED: convert file to PIL image before background removal
    image_pil = Image.open(file).convert('RGB')
    bg_removed_image = remove_background(image_pil)

    input_tensor, rgb_img = transform_image(bg_removed_image)
    input_tensor.requires_grad = True

    logits = model.model(input_tensor)[0].detach()
    probs = F.softmax(logits, dim=1).cpu().numpy()[0]
    pred_idx = int(np.argmax(probs))
    pred_label = class_names[pred_idx]
    confidence = float(probs[pred_idx])
    logger.info(f"Predicted: {pred_label} with confidence {confidence:.2f}")

    target_layers = [model.model.model[-2]]
    cam = GradCAM(model=model.model, target_layers=target_layers)
    targets = [ClassifierOutputTarget(pred_idx)]
    grayscale_cam = cam(input_tensor=input_tensor, targets=targets)[0]
    cam_image = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)

    heatmap = (grayscale_cam * 255).astype(np.uint8)
    _, binary_map = cv2.threshold(heatmap, 150, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(binary_map, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        cv2.rectangle(cam_image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(cam_image, f"{pred_label}", (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

    _, buffer = cv2.imencode('.png', cv2.cvtColor(cam_image, cv2.COLOR_RGB2BGR))
    image_bytes = buffer.tobytes()

    response = make_response(image_bytes)
    response.headers.set('Content-Type', 'image/png')
    response.headers.set('Content-Disposition', 'attachment; filename=prediction.png')
    response.headers.set('X-Label', pred_label)
    response.headers.set('X-Confidence', f'{confidence:.2f}')
    response.headers.set('Access-Control-Expose-Headers', 'X-Label, X-Confidence')

    return response

if __name__ == '__main__':
    port = 5000
    logger.info(f"🚀 Flask app starting on http://127.0.0.1:{port}")
    app.run(debug=True, host='0.0.0.0', port=port)
