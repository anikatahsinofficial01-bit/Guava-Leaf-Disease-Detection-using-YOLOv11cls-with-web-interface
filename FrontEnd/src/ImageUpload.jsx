import React, { useState } from 'react';
import axios from 'axios';
import { useLanguage } from './context/LanguageContext';
import DiseaseInfo from './components/DiseaseInfo';

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [returnedImage, setReturnedImage] = useState(null);
    const [xLabel, setXLabel] = useState(null);
    const [xConfidence, setXConfidence] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    // Text translations
    const translations = {
        en: {
            dragDrop: "Drag and drop files here",
            browseFiles: "Browse Files",
            fileTypes: "PNG, JPG, SVG, WEBP, and GIF are Allowed.",
            predictAnalyze: "Predict and Analyze",
            imagePreview: "Image Preview:",
            noPhotoSelected: "No photo selected",
            responseImage: "Response Image:",
            nothingToPredict: "Nothing to predict",
            xLabel: "X-Label:",
            xConfidence: "X-Confidence:",
            uploadError: "Error uploading file. Please try again.",
            predicting: "Predicting...",
            predictAgain: "Predict Again"
        },
        bn: {
            dragDrop: "এখানে ফাইল টেনে আনুন",
            browseFiles: "ফাইল ব্রাউজ করুন",
            fileTypes: "PNG, JPG, SVG, WEBP, এবং GIF অনুমোদিত।",
            predictAnalyze: "পূর্বাভাস এবং বিশ্লেষণ করুন",
            imagePreview: "ছবির প্রিভিউ:",
            noPhotoSelected: "কোন ছবি নির্বাচিত নেই",
            responseImage: "প্রতিক্রিয়া ছবি:",
            nothingToPredict: "পূর্বাভাস করার কিছু নেই",
            xLabel: "এক্স-লেবেল:",
            xConfidence: "এক্স-কনফিডেন্স:",
            uploadError: "ফাইল আপলোড করতে সমস্যা। অনুগ্রহ করে আবার চেষ্টা করুন।",
            predicting: "পূর্বাভাস করা হচ্ছে...",
            predictAgain: "আবার পূর্বাভাস করুন"
        }
    };

    const text = translations[language];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        
        // Reset the returned image when a new file is selected
        setReturnedImage(null);
        setXLabel(null);
        setXConfidence(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);

        setLoading(true); // Set loading to true when starting the request
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'arraybuffer'
            });

            const base64Image = btoa(
                new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            setReturnedImage(`data:image/png;base64,${base64Image}`);

            const xLabelHeader = response.headers['x-label'];
            const confidenceHeader = response.headers['x-confidence'];

            // Convert xLabel to lowercase
            setXLabel(xLabelHeader ? xLabelHeader.toLowerCase() : 'N/A');
            setXConfidence(confidenceHeader || 'N/A');
            setError(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            setError(text.uploadError);
        } finally {
            setLoading(false); // Set loading to false when request completes
        }
    };

    // Add a reset function to clear everything
    const resetPrediction = () => {
        setFile(null);
        setPreview(null);
        setReturnedImage(null);
        setXLabel(null);
        setXConfidence(null);
        setError(null);
    };

    return (
        <div className='mb-6'>
            <div className="flex flex-col md:flex-row justify-center items-start mt-8 gap-4 px-4">
                <div className="shadow-lg w-full md:w-1/3 max-w-md h-96 flex flex-col justify-center">
                    {returnedImage ? (
                        // Show preview image after successful prediction
                        <div className="bg-gray-50 text-center px-4 border border-gray-400 rounded flex flex-col items-center justify-center h-full">
                            <h4 className="text-base font-semibold text-gray-600 mb-1">{language === 'en' ? 'Original Image' : 'মূল ছবি'}</h4>
                            <div className="flex-1 w-full flex items-center justify-center">
                                <img src={preview} alt="Original" className="max-h-72 max-w-full object-contain" />
                            </div>
                        </div>
                    ) : (
                        // Show file upload form before prediction
                        <form onSubmit={handleSubmit} className="bg-gray-50 text-center px-4 rounded flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed font-[sans-serif] h-full">
                            <div className="py-6">
                                <h4 className="text-base font-semibold text-gray-600">{text.dragDrop}</h4>
                            </div>
                            <hr className="w-full border-gray-400 my-2" />
                            <div className="py-6">
                                <input type="file" id='uploadFile1' className="hidden" onChange={handleFileChange} />
                                <label htmlFor="uploadFile1"
                                    className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none cursor-pointer bg-gray-200 hover:bg-gray-100">{text.browseFiles}</label>
                                <p className="text-xs text-gray-400 mt-4">{text.fileTypes}</p>
                            </div>
                            <button type="submit" className="mt-4 px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold bg-blue-500 hover:bg-blue-400">{text.predictAnalyze}</button>
                        </form>
                    )}
                </div>

                <div className="shadow-lg w-full md:w-1/3 max-w-md p-2 border border-gray-400 rounded h-96 flex flex-col justify-center items-center">
                    {returnedImage ? (
                        <>
                            <h4 className="text-base font-semibold text-gray-600 mb-1">{text.responseImage}</h4>
                            <div className="flex-1 w-full flex items-center justify-center">
                                <img src={returnedImage} alt="Returned" className="max-h-72 max-w-full object-contain" />
                            </div>
                        </>
                    ) : preview ? (
                        <>
                            <h4 className="text-base font-semibold  text-gray-600 mb-1">{text.imagePreview}</h4>
                            <div className="flex-1 w-full flex items-center justify-center">
                                <img src={preview} alt="Selected" className="max-h-72 max-w-full object-contain" />
                            </div>
                        </>
                    ) : (
                        <p className="text-base text-gray-600">{text.noPhotoSelected}</p>
                    )}
                </div>
            </div>

            {/* Add Predict Again button after successful prediction */}
            {returnedImage && (
                <div className="flex justify-center mt-6">
                    <button 
                        onClick={resetPrediction}
                        className="px-6 py-2 rounded-lg text-white text-base tracking-wider font-semibold bg-green-600 hover:bg-green-500 transition-colors shadow-md"
                    >
                        {text.predictAgain}
                    </button>
                </div>
            )}

            {error && <div className="text-red-600 text-center mt-4">{error}</div>}

            {/* Loading indicator */}
            {loading && (
                <div className="mt-8 mb-8 text-center">
                    <div className="relative flex justify-center items-center">
                        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                        <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" alt="Loading" />
                    </div>
                    <p className="mt-4 text-lg font-medium text-purple-600">{text.predicting}</p>
                </div>
            )}

            {/* Display disease information if we have a valid label */}
            {xLabel && xLabel !== 'N/A' && (
                <DiseaseInfo diseaseType={xLabel} />
            )}
        </div>
    );
};

export default ImageUpload;
