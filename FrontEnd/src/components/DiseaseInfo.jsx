import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const diseaseRecommendations = {
  fresh: {
    en: {
      disease: "Fresh Leaf (No Disease)",
      diagnosis: "The leaf is healthy. Continue regular organic care to keep it disease-free.",
      prevention: {
        speak: "/disease-audio/fresh_en_prevention.mp3",
        items: [
          "Apply compost tea every 15 days",
          "Use neem oil spray (2%) weekly",
          "Maintain proper plant spacing"
        ]
      },
      treatment: {
        speak: "/disease-audio/fresh_en_treatment.mp3",
        items: [
          "Spray panchagavya (5%) monthly",
          "Use cow urine solution (1:10 ratio)",
          "Apply vermiwash for soil health"
        ]
      }
    },
    bn: {
      disease: "সুস্থ পাতা (রোগমুক্ত)",
      diagnosis: "পাতাটি সুস্থ। রোগমুক্ত রাখতে নিয়সিত জৈব পদ্ধতিতে যত্ন নিন।",
      prevention: {
        speak: "/disease-audio/fresh_bn_prevention.mp3",
        items: [
          "১৫ দিন পরপর কম্পোস্ট চা দিন",
          "সপ্তাহে একবার নিম তেল স্প্রে করুন (২%)",
          "গাছের মধ্যে পর্যাপ্ত দূরত্ব রাখুন"
        ]
      },
      treatment: {
        speak: "/disease-audio/fresh_bn_treatment.mp3",
        items: [
          "মাসে একবার পঞ্চগব্য স্প্রে করুন (৫%)",
          "গোমূত্র সলিউশন ব্যবহার করুন (১:১০ অনুপাত)",
          "মাটির স্বাস্থ্যের জন্য ভার্মিওয়াশ দিন"
        ]
      }
    }
  },
  powder: {
    en: {
      disease: "Powdery Mildew",
      diagnosis: "Powdery mildew detected. A white powdery coating appears on the leaf surface.",
      prevention: {
        speak: "/disease-audio/powder_en_prevention.mp3",
        items: [
          "Avoid overhead watering",
          "Spray milk solution weekly",
          "Ensure good air circulation"
        ]
      },
      treatment: {
        speak: "/disease-audio/powder_en_treatment.mp3",
        items: [
          "Baking soda spray (1 tsp/L water)",
          "Sulfur dust application",
          "Prune infected leaves"
        ]
      }
    },
    bn: {
      disease: "পাউডারি মিলডিউ",
      diagnosis: "পাতার উপর সাদা গুঁড়ার মতো দাগ দেখা যাচ্ছে, এটি পাউডারি মিলডিউ রোগ।",
      prevention: {
        speak: "/disease-audio/powder_bn_prevention.mp3",
        items: [
          "উপর থেকে পানি দেবেন না",
          "সপ্তাহে একবার দুধের স্প্রে করুন",
          "বাতাস চলাচলের ব্যবস্থা করুন"
        ]
      },
      treatment: {
        speak: "/disease-audio/powder_bn_treatment.mp3",
        items: [
          "বেকিং সোডা স্প্রে (১ চা চামচ/লিটার)",
          "গন্ধক গুঁড়ো প্রয়োগ করুন",
          "আক্রান্ত পাতা ছাঁটাই করুন"
        ]
      }
    }
  },
  insect: {
    en: {
      disease: "Insect Eaten",
      diagnosis: "Insect damage found. Parts of the leaf are eaten or chewed irregularly.",
      prevention: {
        speak: "/disease-audio/insect_en_prevention.mp3",
        items: [
          "Plant marigold as companion crop",
          "Install yellow sticky traps",
          "Apply neem cake to soil"
        ]
      },
      treatment: {
        speak: "/disease-audio/insect_en_treatment.mp3",
        items: [
          "Spray garlic-chili solution",
          "Apply diatomaceous earth",
          "Use 5% soap-nicotine spray"
        ]
      }
    },
    bn: {
      disease: "পতঙ্গ খাওয়া",
      diagnosis: "পতঙ্গ খাওয়া চিহ্ন দেখা যাচ্ছে। পাতার কিছু অংশ কাটা বা খাওয়া হয়েছে।",
      prevention: {
        speak: "/disease-audio/insect_bn_prevention.mp3",
        items: [
          "গাঁদা গাছ লাগান",
          "হলুদ আঠালো ফাঁদ স্থাপন করুন",
          "মাটিতে নিম খোল প্রয়োগ করুন"
        ]
      },
      treatment: {
        speak: "/disease-audio/insect_bn_treatment.mp3",
        items: [
          "রসুন-মরিচ স্প্রে করুন",
          "ডায়াটোমেশিয়াস আর্থ প্রয়োগ করুন",
          "৫% সাবান-নিকোটিন স্প্রে ব্যবহার করুন"
        ]
      }
    }
  },
  algal: {
    en: {
      disease: "Algal Leaf Spot",
      diagnosis: "Algal leaf spot found. Circular green or brown spots appear, especially in humid conditions.",
      prevention: {
        speak: "/disease-audio/algal_en_prevention.mp3",
        items: [
          "Avoid excessive shade",
          "Apply seaweed extract monthly",
          "Maintain proper drainage"
        ]
      },
      treatment: {
        speak: "/disease-audio/algal_en_treatment.mp3",
        items: [
          "Copper-based fungicide spray",
          "Hydrogen peroxide (3%) spray",
          "Remove affected leaves"
        ]
      }
    },
    bn: {
      disease: "আলগাল পাতা দাগ",
      diagnosis: "আলগাল পাতার দাগ দেখা যাচ্ছে। সাধারণত আর্দ্র পরিবেশে গোলাকার সবুজ বা বাদামি দাগ হয়।",
      prevention: {
        speak: "/disease-audio/algal_bn_prevention.mp3",
        items: [
          "অতিরিক্ত ছায়া এড়িয়ে চলুন",
          "মাসে একবার সামুদ্রিকাছার নির্যাস দিন",
          "সঠিক নিষ্কাশন ব্যবস্থা রাখুন"
        ]
      },
      treatment: {
        speak: "/disease-audio/algal_bn_treatment.mp3",
        items: [
          "তামা-ভিত্তিক ছত্রাকনাশক স্প্রে",
          "হাইড্রোজেন পারঅক্সাইড স্প্রে (৩%)",
          "আক্রান্ত পাতা সরিয়ে ফেলুন"
        ]
      }
    }
  }
};

const translations = {
  en: {
    diseaseTitle: "Disease",
    diagnosisTitle: "Diagnosis",
    preventionTitle: "Prevention",
    treatmentTitle: "Treatment",
    speakText: "Listen",
    notFound: "Disease information not found"
  },
  bn: {
    diseaseTitle: "রোগ",
    diagnosisTitle: "নির্ণয়",
    preventionTitle: "প্রতিরোধ",
    treatmentTitle: "চিকিৎসা",
    speakText: "শুনুন",
    notFound: "রোগের তথ্য পাওয়া যায়নি"
  }
};

const DiseaseInfo = ({ diseaseType }) => {
  const { language } = useLanguage();
  const text = translations[language];
  const [isPlaying, setIsPlaying] = useState({
    prevention: false,
    treatment: false
  });

  // Play audio function with hardcoded paths
  const playAudio = (section) => {
    // If audio is already playing for this section, stop it
    if (isPlaying[section]) {
      if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio = null;
      }
      setIsPlaying(prev => ({...prev, [section]: false}));
      return;
    }

    // Stop any currently playing audio from other sections
    if (window.currentAudio) {
      window.currentAudio.pause();
      window.currentAudio = null;
      setIsPlaying(prev => ({
        prevention: false,
        treatment: false
      }));
    }
    
    // Determine the correct audio file path based on disease type and language
    let audioPath = '';
    
    if (diseaseType === 'fresh') {
      if (section === 'prevention') {
        audioPath = language === 'en' 
          ? '/disease_audio/fresh_en_prevention.mp3' 
          : '/disease_audio/fresh_bn_prevention.mp3';
      } else if (section === 'treatment') {
        audioPath = language === 'en' 
          ? '/disease_audio/fresh_en_treatment.mp3' 
          : '/disease_audio/fresh_bn_treatment.mp3';
      }
    } else if (diseaseType === 'powder') {
      if (section === 'prevention') {
        audioPath = language === 'en' 
          ? '/disease_audio/powder_en_prevention.mp3' 
          : '/disease_audio/powder_bn_prevention.mp3';
      } else if (section === 'treatment') {
        audioPath = language === 'en' 
          ? '/disease_audio/powder_en_treatment.mp3' 
          : '/disease_audio/powder_en_treatment.mp3';
      }
    } else if (diseaseType === 'insect') {
      if (section === 'prevention') {
        audioPath = language === 'en' 
          ? '/disease_audio/insect_en_prevention.mp3' 
          : '/disease_audio/insect_bn_prevention.mp3';
      } else if (section === 'treatment') {
        audioPath = language === 'en' 
          ? '/disease_audio/insect_en_treatment.mp3' 
          : '/disease_audio/insect_bn_treatment.mp3';
      }
    } else if (diseaseType === 'algal') {
      if (section === 'prevention') {
        audioPath = language === 'en' 
          ? '/disease_audio/algal_en_prevention.mp3' 
          : '/disease_audio/algal_bn_prevention.mp3';
      } else if (section === 'treatment') {
        audioPath = language === 'en' 
          ? '/disease_audio/algal_en_treatment.mp3' 
          : '/disease_audio/algal_bn_treatment.mp3';
      }
    }
    
    console.log("Attempting to play audio from path:", audioPath);
    
    // Create and play audio element
    try {
      const audioElement = new Audio(audioPath);
      
      // Add event listeners before playing
      audioElement.addEventListener('canplaythrough', () => {
        console.log("Audio can play through");
      });
      
      audioElement.addEventListener('loadeddata', () => {
        console.log("Audio data loaded");
      });
      
      audioElement.addEventListener('error', (e) => {
        console.error("Audio error:", e);
        console.error("Audio error code:", audioElement.error?.code);
        console.error("Audio error message:", audioElement.error?.message);
        setIsPlaying(prev => ({...prev, [section]: false}));
      });
      
      audioElement.addEventListener('ended', () => {
        console.log("Audio playback ended");
        setIsPlaying(prev => ({...prev, [section]: false}));
        window.currentAudio = null;
      });
      
      // Set properties
      audioElement.volume = 1.0;
      
      // Update state before playing
      setIsPlaying(prev => ({...prev, [section]: true}));
      
      // Play the audio
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started successfully");
            window.currentAudio = audioElement;
          })
          .catch(error => {
            console.error("Error playing audio:", error);
            setIsPlaying(prev => ({...prev, [section]: false}));
            window.currentAudio = null;
          });
      }
    } catch (error) {
      console.error("Exception in audio playback:", error);
      setIsPlaying(prev => ({...prev, [section]: false}));
      window.currentAudio = null;
    }
  };

  // If disease type is not found, show a message
  if (!diseaseType || !diseaseRecommendations[diseaseType]) {
    return (
      <div className="bg-red-50 p-4 rounded-lg shadow-md text-center">
        <p className="text-red-600 font-medium">{text.notFound}</p>
      </div>
    );
  }

  const diseaseInfo = diseaseRecommendations[diseaseType][language];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto my-8 transform-gpu">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-green-700 mb-2">{text.diseaseTitle}: {diseaseInfo.disease}</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <p className="text-gray-700">{diseaseInfo.diagnosis}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prevention Section */}
        <div className="bg-blue-50 rounded-lg p-4 transform-gpu">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-blue-700">{text.preventionTitle}</h3>
            <button 
              onClick={() => playAudio('prevention')}
              className={`${isPlaying.prevention ? 'bg-red-100 hover:bg-red-200 text-red-700' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'} px-3 py-1 rounded-full flex items-center text-sm transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${isPlaying.prevention ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isPlaying.prevention ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12v12H6z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a5 5 0 001.414 1.414m0 0l-2.828 2.828m0 0a9 9 0 010-12.728m0 0l2.828 2.828" />
                )}
              </svg>
              {isPlaying.prevention ? 'Stop' : text.speakText}
            </button>
          </div>
          <ul className="space-y-2">
            {diseaseInfo.prevention.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Treatment Section */}
        <div className="bg-green-50 rounded-lg p-4 transform-gpu">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-green-700">{text.treatmentTitle}</h3>
            <button 
              onClick={() => playAudio('treatment')}
              className={`${isPlaying.treatment ? 'bg-red-100 hover:bg-red-200 text-red-700' : 'bg-green-100 hover:bg-green-200 text-green-700'} px-3 py-1 rounded-full flex items-center text-sm transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${isPlaying.treatment ? 'animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isPlaying.treatment ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12v12H6z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a5 5 0 001.414 1.414m0 0l-2.828 2.828m0 0a9 9 0 010-12.728m0 0l2.828 2.828" />
                )}
              </svg>
              {isPlaying.treatment ? 'Stop' : text.speakText}
            </button>
          </div>
          <ul className="space-y-2">
            {diseaseInfo.treatment.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfo;