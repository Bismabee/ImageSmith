import React from 'react';
import { Sparkles } from 'lucide-react';

const SplashScreen = ({ show, isDarkMode }) => (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${isDarkMode ? 'bg-[#0f0c29]' : 'bg-white'}`}>
        <div className="flex flex-col items-center">
            <div className="relative">
                <div className={`w-32 h-32 rounded-full blur-2xl animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'bg-pink-500/20' : 'bg-pink-200/20'}`}></div>
                <div className="bg-gradient-to-tr from-pink-500 to-violet-500 p-6 rounded-full shadow-2xl animate-bounce">
                  <Sparkles className={`${isDarkMode ? 'text-white' : 'text-white'} w-16 h-16`} />
                </div>
            </div>
            <h1 className={`text-4xl font-bold mt-8 tracking-wider animate-pulse ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ImageSmith</h1>
        </div>
    </div>
);

export default SplashScreen;