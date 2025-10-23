import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

function PlantDiseaseInfo() {
  const { language } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [1, 2, 3, 4];

  // Image rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const translations = {
    en: {
      heading: "An app that identifies Guava Leaf diseases and diagnoses plant problems",
      paragraph1: "Visual inspection plays an important role in plant disease identification and diagnosing plant problems, as a lab test is not a practical tool for day-to-day diagnosis. Due to costs and turnover time, growers make decisions based on the symptoms seen in plants. Plant inspection is time-consuming, and it often leaves growers with doubts. Crop advisors support the growers with plant disease identification and treatment decisions and ensure that errors are minimized. But what if such assistance is not available? Luckily, technology can come to the rescue by offering a plant care app to growers.",
      paragraph2: "An artificial intelligence-based app that identifies plant diseases became possible thanks to the big leap in performance engineered by the artificial intelligence research community.",
      paragraph3: "In recent years, software products can complete vision-based tasks with expert accuracy. Why not apply this technology to plant disease identification and agronomy advisory? The widespread use of mobile devices makes this question even more relevant as such devices made it possible to distribute a plant care app on a large scale and help growers diagnose plant problems.",
   //   paragraph4: "The plant care app holds immense value for a broad and varied range of users. Beyond its significance to farmers and crop advisors, a substantial portion of its user base comprises home growers actively seeking expert insights. These individuals harness the app's disease identification feature to cater to their specific requirements.",
      learnMore: "Learn More"
    },
    bn: {
      heading: "একটি অ্যাপ যা উদ্ভিদের রোগ চিহ্নিত করে এবং উদ্ভিদের সমস্যাগুলি নির্ণয় করে",
      paragraph1: "উদ্ভিদের রোগ সনাক্তকরণ এবং উদ্ভিদের সমস্যাগুলি নির্ণয়ে দৃশ্যমান পরীক্ষা একটি গুরুত্বপূর্ণ ভূমিকা পালন করে, কারণ দৈনন্দিন রোগ নির্ণয়ের জন্যার নেটওয়ার্কের ধারণার উপর ভিত্তি করে। কৃষিবিদ্যার ছাত্ররা যেভাবে শেখে তার অনুরূপ, নিউরাল নেটওয়ার্কটি বিশেষজ্ঞরা ট্যাগ করা রোগাক্রান্ত উদ্ভিদের উদাহরণ দিয়ে উপস্থাপন করা হয়।",
      paragraph2: "কৃত্রিম বুদ্ধিমত্তা গবেষণা সম্প্রদায় দ্বারা প্রকৌশলী কর্মক্ষমতায় বড় লাফের কারণে একটি কৃত্রিম বুদ্ধিমত্তা-ভিত্তিক অ্যাপ যা উদ্ভিদের রোগ সনাক্ত করে তা সম্ভব হয়েছে।",
      paragraph3: "সাম্প্রতিক বছরগুলিতে, সফ্টওয়্যার পণ্যগুলি বিশেষজ্ঞ নির্ভুলতার সাথে দৃষ্টি-ভিত্তিক কাজগুলি সম্পূর্ণ করতে পারে। উদ্ভিদের রোগ সনাক্তকরণ এবং কৃষিবিদ্যা পরামর্শের জন্যে এই প্রযুক্তি প্রয়োগ করা যাবে না? মোবাইল ডিভাইসের ব্যাপক ব্যবহার এই প্রশ্ধনটিকে আরও প্রাসঙ্গিক করে তোলে কারণ এই ধরনের ডিভাইসগুলি বড় আকারে একটি উদ্ভিদ যত্ন অ্যাপ বিতরণ করা এবং চাষীদের উদ্ভিদের সমস্যাগুলি নির্ণয় করতে সাহায্য করেছে।",
   //   paragraph4: "উদ্ভিদ যত্ন অ্যাপটি ব্যবহারকারীদের একটি বিস্তৃত এবর বিভিন্ন পরিসরের জন্যয়তাগুলি মূল্য ধারণ করে। কৃষক এবং ফসল উপদেষ্টাদের কাছে এর তাৎপর্য ছাড়াও, এর ব্যবহারকারী ভিত্তির একটি উল্লেখযোগ্য অংশ সক্রিয়ভাবে বিশেষজ্ঞ অন্তর্দৃষ্টি খোঁজার গৃহ চাষীদের নিয়ে গঠিত। এই ব্যক্তিরা তাদের নির্দিষ্যয়তাগুলি পূরণ করতে অ্যাপের রোগ সনাক্তকরণ বৈশিষ্ট্যটি ব্যবহার করে।",
      learnMore: "আরও জানুন"
    }
  };

  const text = translations[language];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {text.heading}
          </h2>
        </div>
        <div className="prose prose-lg mx-auto text-gray-500">
          <p className="mb-6">
            {text.paragraph1}
          </p>
          <p className="mb-6">
            {text.paragraph2}
          </p>
          <p className="mb-6">
            {text.paragraph3}
          </p>
          <p className="mb-6">
            {text.paragraph4}
          </p>

          <div className="flex justify-center mb-8">
            <img 
              src="h1.jpg" 
              alt="Plant disease detection" 
              className="rounded-lg shadow-lg max-w-full h-auto"
              style={{ maxHeight: '400px' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=Plant+Disease+Detection";
              }}
            />
          </div>

          <div className="p-6 rounded-lg  mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'How does artificial intelligence identify plant diseases?' : 'কৃত্রিম বুদ্ধিমত্তা কীভাবে উদ্ভিদের রোগ সনাক্ত করে?'}
            </h3>
            <p className="mb-4">
              {language === 'en' 
                ? 'State-of-the-art image recognition is based on the concept of artificial neural networks. Similar to how agronomy students learn, the neural network is presented with examples of diseased plants that experts tagged. In the learning process, the network of neurons adapts until it maximizes the performance score.' 
                : 'অত্যাধুনিক ছবি সনাক্তকরণ কৃত্রিম নিউরাল নেটওয়ার্কের ধারণার উপর ভিত্তি করে। কৃষিবিদ্যার ছাত্ররা যেভাবে শেখে তার অনুরূপ, নিউরাল নেটওয়ার্কটি বিশেষজ্ঞরা ট্যাগ করা রোগাক্রান্ত উদ্ভিদের উদাহরণ দিয়ে উপস্থাপন করা হয়।'}
            </p>
            <p className="mb-4">
              {language === 'en'
                ? 'The result is an app that identifies plant diseases and constantly improves as more examples are presented. Agrio learns which treatment protocols are more effective based on the growers\' feedback and observations done in the fields. A treatment that was not effective signals a possible problem with the identification and provides more input for the network to improve.'
                : 'ফলাফল হল একটি অ্যাপ যা উদ্ভিদের রোগ সনাক্ত করে এবর আরও উদাহরণ উপস্থাপন করা হলে ক্রমাগত উন্নত হয়। চাষীদের প্রতিক্রিয়া এবর এবর ক্ষেত্রে করা পর্যবেক্ষণের উপর ভিত্তি করে অ্যাপ্লিকেশন শিখে কোথায় মডেল ফোকাস করছে তা দেখায়—পেয়ারা পাতায় রোগ-প্রভাবিত এলাকাগুলি সনাক্ত করতে সাহায্য করে।'}
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <img 
              src="h2.png" 
              alt="Plant disease detection" 
              className="rounded-lg shadow-lg max-w-full h-auto"
              style={{ maxHeight: '600px' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=Plant+Disease+Detection";
              }}
            />
          </div>

          <div className="p-6 rounded-lg mb-8 ">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Precise Disease Identification with Grad-CAM' : 'গ্র্যাড-ক্যাম দিয়ে সঠিক রোগ সনাক্তকরণ'}
            </h3>
            <p className="mb-4">
              {language === 'en' 
                ? 'Grad-CAM (Gradient-weighted Class Activation Mapping) highlights the most important regions in an image that influence the model\'s prediction. By analyzing gradients flowing into the last convolutional layer, it creates a heatmap over the input image, showing exactly where the model is focusing—helping identify disease-affected areas on guava leaves.' 
                : 'গ্র্যাড-ক্যাম (গ্রেডিয়েন্ট-ওয়েটেড ক্লাস অ্যাক্টিভেশন ম্যাপিং) একটি ছবিতে সবচেয়ে গুরুত্বপূর্ণ অঞ্চলগুলি হাইলাইট করে যা মডেলের পূর্বাভাসকে প্রভাবিত করে। শেষ কনভলিউশনাল লেয়ারে প্রবাহিত গ্রেডিয়েন্টগুলি বিশ্লেষণ করে, এটি ইনপুট ছবির উপর একটি হিটম্যাপ তৈরি করে, ঠিক কোথায় মডেল ফোকাস করছে তা দেখায়—পেয়ারা পাতায় রোগ-প্রভাবিত এলাকাগুলি সনাক্ত করতে সাহায্য করে।'}
            </p>

          </div>



          <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              
                </h3>
                <div className="relative overflow-hidden rounded-lg w-full" style={{ height: '400px' }}>
                  <div className="slideshow-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {[1, 2, 3, 4].map((num) => (
                      <img 
                        key={num}
                        src={`/${num}.png`}
                        alt={`Disease sample ${num}`}
                        className="slideshow-image"
                        style={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          opacity: 0,
                          transition: 'opacity 1s ease-in-out',
                          zIndex: 1
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/800x400?text=Disease+Sample+${num}`;
                        }}
                      />
                    ))}
                  </div>
                </div>
                <style jsx>{`
                  @keyframes fadeInOut {
                    0%, 100% { opacity: 0; }
                    25%, 75% { opacity: 1; }
                  }
                  
                  .slideshow-container .slideshow-image:nth-child(1) {
                    animation: fadeInOut 6s 0s infinite;
                  }
                  
                  .slideshow-container .slideshow-image:nth-child(2) {
                    animation: fadeInOut 6s 3s infinite;
                  }
                  
                  .slideshow-container .slideshow-image:nth-child(3) {
                    animation: fadeInOut 6s 6s infinite;
                  }
                  
                  .slideshow-container .slideshow-image:nth-child(4) {
                    animation: fadeInOut 6s 9s infinite;
                  }
                `}</style>
              </div>

          {/* <div className="mt-8 text-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {text.learnMore}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default PlantDiseaseInfo;