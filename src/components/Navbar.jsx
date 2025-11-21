import React from 'react';
import { Sparkles, Sun, Moon, LogOut, Crown } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme, user, setShowLoginModal, setShowPaymentModal, handleLogout, isGodMode, setView }) => (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className={`
        backdrop-blur-xl border shadow-lg rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300
        ${isDarkMode 
          ? 'bg-[#1a1a2e]/80 border-white/10 shadow-black/20' 
          : 'bg-white/80 border-white/60 shadow-gray-200/50'}
      `}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
          <div className="bg-gradient-to-tr from-pink-500 to-violet-500 p-2 rounded-full shadow-lg">
            <Sparkles className="text-white w-4 h-4" />
          </div>
          <span className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-white to-pink-200' : 'from-gray-800 to-pink-600'}`}>
            ImageSmith
          </span>
          {isGodMode && <span className="hidden sm:block text-[10px] font-bold bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-2 py-0.5 rounded-full">GOD MODE</span>}
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className={`p-2 rounded-full transition-all ${isDarkMode ? 'hover:bg-white/10 text-yellow-300' : 'hover:bg-gray-100 text-slate-600'}`}>
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {!user ? (
            <button 
              onClick={() => setShowLoginModal(true)}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all ${isDarkMode ? 'hover:text-white text-gray-300' : 'hover:text-black text-gray-600'}`}
            >
              Sign In
            </button>
          ) : (
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:scale-105 transition-transform" title={user.email}>
                    {user.name[0]}
                 </div>
                 <button onClick={handleLogout} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} title="Log Out">
                    <LogOut className="w-4 h-4 opacity-50" />
                 </button>
             </div>
          )}

          {!isGodMode && (
              <>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="flex md:hidden items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-105"
                  title="Get God Mode"
                >
                  <Crown className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="hidden md:flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-105"
                >
                  <Crown className="w-3 h-3" /> Get God Mode
                </button>
              </>
          )}
        </div>
      </div>
    </nav>
);

export default Navbar;