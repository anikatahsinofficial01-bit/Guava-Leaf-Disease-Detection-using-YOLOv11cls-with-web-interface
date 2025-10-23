import React from 'react'
import { useLanguage } from './context/LanguageContext'

function Footer() {
  const { language } = useLanguage();

  const translations = {
    en: {
      copyright: "Copyright © 2025 All Rights Reserved."
    },
    bn: {
      copyright: "কপিরাইট © ২০২৩ সর্বস্বত্ব সংরক্ষিত।"
    }
  };

  const text = translations[language];

  return (
    <footer className="font-sans tracking-wide bg-black px-8 py-8 mt-auto w-full">
      <div className="flex flex-col items-center justify-center">
        {/* Logo centered at the top */}
        <div className="mb-6">
          <img src='ulta.png' alt="logo" className='w-44' />
        </div>
        
        {/* Simple copyright text */}
        <p className='text-gray-300 text-sm text-center'>
          {text.copyright}
        </p>
      </div>
    </footer>
  )
}

export default Footer