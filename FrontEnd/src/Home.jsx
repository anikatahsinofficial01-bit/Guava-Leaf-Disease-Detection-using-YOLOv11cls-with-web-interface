import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './components/Login'
import { useLanguage } from './context/LanguageContext'
import PlantDiseaseInfo from './components/PlantDiseaseInfo'

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Text translations
  const translations = {
    en: {
      title: "Instant Guava Disease Detection with AI",
      subtitle: "Upload a leaf image — get instant, accurate guava disease predictions.",
      getStarted: "Get Started"
    },
    bn: {
      title: "এআই দিয়ে তাৎক্ষণিক পেয়ারা রোগ সনাক্তকরণ",
      subtitle: "একটি পাতার ছবি আপলোড করুন — তাৎক্ষণিক, সঠিক পেয়ারা রোগের পূর্বাভাস পান।",
      getStarted: "শুরু করুন"
    }
  };

  const text = translations[language];

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token validity (simplified)
      try {
        const payload = JSON.parse(atob(token));
        const isExpired = payload.exp < Math.floor(Date.now() / 1000);
        
        if (!isExpired) {
          // If token is valid, redirect to predict page
          navigate('/predict');
        } else {
          // If token is expired, remove it
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
  }, [navigate]);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className='w-full bg-cover bg-center bg-no-repeat'>
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/back.jpg" 
            alt="Background Image" 
            className="object-cover object-center w-full h-full" 
            style={{ willChange: 'transform' }} 
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-4xl">{text.title}</h1>
          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl">{text.subtitle}</p>
          <button 
            onClick={handleLoginClick}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-base sm:text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            {text.getStarted}
          </button>
          
          <div className="absolute bottom-10 hidden sm:block">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Plant Disease Information Section */}
      <div className="overflow-hidden">
        <PlantDiseaseInfo />
      </div>
      
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full w-6 h-6 flex items-center justify-center z-30"
            >
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home