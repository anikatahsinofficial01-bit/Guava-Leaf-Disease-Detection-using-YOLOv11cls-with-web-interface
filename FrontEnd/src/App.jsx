import React from 'react';
import { Routes, Route } from "react-router-dom";
import ImageUpload from './ImageUpload';
import Home from "./Home";
import Login from './Login';
import Subscribe from './Subscribe';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Footer from "./Footer";
import Headers from './Header';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import About from './components/About';

const App = () => {
    return (
        <AuthProvider>
            <LanguageProvider>
                <div className="flex flex-col min-h-screen">
                    <Headers/>
                    
                    <main className="flex-grow flex flex-col">
                        <Routes>
                          <Route path="/" element={<Home/>} />
                          <Route path="login" element={<Login />} />
                          <Route path="subscribe" element={<Subscribe />} />
                          <Route path="contactUS" element={<ContactUs />} />
                          <Route path="about" element={<About />} />
                          <Route path="predict" element={
                            <ProtectedRoute>
                              <ImageUpload/>
                            </ProtectedRoute>
                          } />
                        </Routes>
                    </main>

                    <Footer/>
                </div>
            </LanguageProvider>
        </AuthProvider>
    );
};

export default App;
