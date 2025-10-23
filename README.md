# Guava-Leaf-Disease-Detection-using-YOLOv11cls-with-web-interface

This project presents an **AI-powered system** for the detection and classification of **guava leaf diseases** using **deep learning** and **explainable AI**.  
Our goal is to empower farmers and agricultural professionals with a **smart, accessible, and interpretable** disease diagnosis tool capable of real-time analysis under real-world field conditions.

## 🎥 Project Demo
[Watch The Project Demo Video](https://github.com/anikatahsinofficial01-bit/Guava-Leaf-Disease-Detection-using-YOLOv11cls-with-web-interface/blob/main/Disease%20Detection%20Video.mp4)

## 📊 Model Performance Summary

| Model | Test Accuracy | Precision | Recall | F1-Score | MCC |
|:------|:--------------:|:----------:|:--------:|:----------:|:----:|
| **YOLOv11** | **97.78%** | 95% | 94% | 95% | 0.937 |
| **DenseNet201** | 92.74% | 93% | 92% | 93% | 0.903 |
| **ShuffleNetV2** | 91.4% | 95% | 97% | 96% | 0.914 |
| **EfficientNetB3** | 92.4% | 90% | 99% | 94% | 0.963 |
| **ResNeSt26d** | 96.3% | 95% | 98% | 96% | 0.963 |
| **VGG19** | 85.06% | 87% | 83% | 85% | 0.799 |

> **YOLOv11** achieved the best real-time detection accuracy, while **ResNeSt-26d** and **DenseNet201** delivered the highest balanced classification performance.

## 🧠 Key Features

- **Automated Disease Detection:** Classifies leaves into *Healthy*, *Algal Leaf Spot*, *Powdery Mildew*, and *Insect Damage*.
- **Multi-Model Architecture:** Comparative benchmarking across modern CNN architectures including  
  `DenseNet201`, `EfficientNetB3`, `ShuffleNetV2`, `LCNet050`, `VGG19`, `InceptionV3`, `ResNeSt26d`, and `YOLOv11`.
- **Explainable AI (XAI):** Uses **Grad-CAM** to highlight disease regions and enhance transparency.
- **Web Application Deployment:** Lightweight, responsive interface for real-time diagnosis via image upload.
- **Offline Capability:** Optimized for mobile and low-connectivity environments.
- **Actionable Insights:** Provides confidence scores and disease-specific management recommendations.

  ## 🌐 Web Application Development

To ensure **accessibility**, **scalability**, and **ease of use** for both technical and non-technical users, a lightweight yet powerful web-based application was developed for **real-time guava leaf disease diagnosis**. The application serves as the front-end interface for the trained deep learning models, allowing users to upload or capture leaf images and receive instant feedback, complete with confidence scores and Grad-CAM visual explanations.


### 🧰 Tools & Frameworks Used

| Category | Tool / Framework | Purpose |
|-----------|------------------|----------|
| **Backend Framework** | **Flask (Python)** | Serves as the core backend framework for integrating trained deep learning models, handling user requests, and managing inference pipelines. Flask was chosen for its simplicity, speed, and easy deployment. |
| **Frontend Framework** | **HTML5, CSS3, Bootstrap** | Used to design a responsive, mobile-friendly interface. Bootstrap ensured consistent design across devices, while custom CSS provided a clean, modern aesthetic for usability. |
| **Model Integration** | **PyTorch / TensorFlow** | Enabled smooth loading and inference of pre-trained models such as YOLOv11, DenseNet201, and EfficientNetB3 for image classification and localization. |
| **Visualization** | **Grad-CAM & Matplotlib** | Used to generate explainable AI visualizations, showing heatmaps that highlight the image regions influencing model predictions. |
| **Data Handling** | **Pandas & NumPy** | Managed backend data operations, result aggregation, and performance tracking. |
| **Web Deployment** | **Streamlit / Flask Hosting / Render / Localhost** | Depending on deployment environment, Streamlit was used for rapid prototyping, while Flask-based deployment was prepared for scalable hosting (e.g., on Render or Heroku). |
| **Image Processing** | **OpenCV & Pillow (PIL)** | Used for preprocessing user-uploaded images—resizing, normalization, and format conversion—to ensure consistency with model input requirements. |



### ⚙️ Application Workflow

1. **User Uploads Image** – The application accepts images captured via smartphone or webcam.  
2. **Model Inference** – The backend loads the optimized CNN or YOLOv11 model to predict disease class and confidence score.  
3. **Explainability Layer** – Grad-CAM visualizations are generated to highlight disease-affected areas.  
4. **Results Display** – Users receive diagnosis results, confidence levels, and corresponding heatmap visualizations in real time.  
5. **Recommendations (Optional)** – The app provides disease-specific prevention and management suggestions.
