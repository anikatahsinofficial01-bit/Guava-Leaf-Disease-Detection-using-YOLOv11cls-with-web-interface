import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function About() {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Capstone Project",
      studentInfo: "Student Information",
      name: "Name",
      studentId: "Student ID",
      department: "Department"
    },
    bn: {
      title: "ক্যাপস্টোন প্রজেক্ট",
      studentInfo: "শিক্ষার্থীর তথ্য",
      name: "নাম",
      studentId: "শিক্ষার্থী আইডি",
      department: "বিভাগ"
    }
  };

  const text = translations[language];

  // Student data
  const students = [
    {
      id: 1,
      name: { en: "Anika Tahsin", bn: "আনিকা তাহসিন" },
      studentId: "2021-1-60-021",
      department: { en: "Computer Science & Engineering", bn: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং" },
      image: "/student4.jpg" // Replace with actual image path
    },
    {
      id: 2,
      name: { en: "Md. Tariqul Islam", bn: "মোঃ তারিকুল ইসলাম" },
      studentId: "2021-1-60-054",
      department: { en: "Computer Science & Engineering", bn: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং" },
      image: "/student1.jpg" // Replace with actual image path
    },
    {
      id: 3,
      name: { en: "Sayel Ahmed", bn: "সায়েল আহমেদ" },
      studentId: "2021-1-60-025",
      department: { en: "Computer Science & Engineering", bn: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং" },
      image: "/student2.jpg" // Replace with actual image path
    },
    {
      id: 4,
      name: { en: "Md. Shahbaj Taher", bn: "মোঃ শাহবাজ তাহের" },
      studentId: "2021-1-60-076",
      department: { en: "Computer Science & Engineering", bn: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং" },
      image: "/student3.jpg" // Replace with actual image path
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-600">{text.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="h-48 bg-gray-200">
              {student.image ? (
                <></>
                // <img 
                //   src={student.image} 
                //   alt={student.name[language]} 
                //   className="w-full h-full object-cover"
                //   onError={(e) => {
                //     e.target.onerror = null;
                //     e.target.src = "https://via.placeholder.com/300x200?text=Student";
                //   }}
                // />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{student.name[language]}</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">{text.studentId}:</span> {student.studentId}</p>
                <p><span className="font-medium">{text.department}:</span> {student.department[language]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;