import React, { useState } from 'react';
import { Sparkles, Sun, Moon, LogOut, Crown, Menu } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme, user, activateGodMode, handleLogout, isGodMode, setView }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
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
          {/* Theme toggle moved into the mobile hamburger menu per request */}
          {!user ? null : (
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-lg cursor-pointer hover:scale-105 transition-transform" title={user.email}>
                    {user.name[0]}
                 </div>
                 <button onClick={handleLogout} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} title="Log Out">
                    <LogOut className="w-4 h-4 opacity-50" />
                 </button>
             </div>
          )}

          {/* Always show a compact God Mode indicator/button on mobile; desktop keeps full button */}
          <div className="flex items-center gap-2">
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-full hover:bg-white/5">
              <Menu className="w-5 h-5" />
            </button>
            {menuOpen && (
              <div className={`absolute top-16 right-6 w-44 rounded-lg shadow-lg p-2 ${isDarkMode ? 'bg-[#0f1116]/95' : 'bg-white/95'}`}>
                {user && (
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/5">Log out</button>
                )}

                {/* Pricing hidden for release - payment disabled */}
                <button onClick={() => { setView('landing'); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/5">About</button>

                <div className="border-t my-1 border-white/5" />
                <button onClick={() => { toggleTheme(); setMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-white/5 flex items-center gap-2">
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Toggle Theme
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => { activateGodMode && activateGodMode(); setMenuOpen(false); }}
                className={`flex md:hidden items-center gap-1 px-3 py-1 rounded-full transition-all ${isDarkMode ? 'bg-yellow-400/20 text-yellow-300' : 'bg-yellow-500 text-white'}`}
                title={isGodMode ? 'God Mode Active' : 'Get God Mode'}
              >
                <Crown className="w-4 h-4" />
              </button>

              {!isGodMode && (
                <button 
                  onClick={() => activateGodMode && activateGodMode()}
                  className="hidden md:flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-105"
                >
                  <Crown className="w-3 h-3" /> Get God Mode
                </button>
              )}
              {isGodMode && <span className="hidden md:block text-[10px] font-bold bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-2 py-0.5 rounded-full">GOD MODE</span>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;