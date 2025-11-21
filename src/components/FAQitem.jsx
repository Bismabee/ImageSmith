import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none"
      >
        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-4' : 'max-h-0'}`}>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;