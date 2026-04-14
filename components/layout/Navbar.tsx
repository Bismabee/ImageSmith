'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Sun, Moon, LogOut, Menu, ChevronDown, Minimize2, RefreshCw, Crop, Stamp, FileX, RotateCw, Sliders, FileText, Circle, Printer } from 'lucide-react';
import { useAppContext } from '@/providers/AppProvider';
import { trackEvent } from '@/lib/utils/ga4';

const TOOLS = [
  { href: '/compress', label: 'Compressor', icon: Minimize2 },
  { href: '/resize/jpeg', label: 'Resizer', icon: RefreshCw },
  { href: '/convert/jpeg', label: 'Converter', icon: RefreshCw },
  { href: '/crop/jpeg', label: 'Cropper', icon: Crop },
  { href: '/rotate/jpeg', label: 'Rotate & Flip', icon: RotateCw },
  { href: '/filters/jpeg', label: 'Image Filters', icon: Sliders },
  { href: '/image-to-pdf/jpeg', label: 'Image to PDF', icon: FileText },
  { href: '/circle-crop/jpeg', label: 'Circle Crop', icon: Circle },
  { href: '/watermark/jpeg', label: 'Watermark', icon: Stamp },
  { href: '/remove-metadata/jpeg', label: 'EXIF Remover', icon: FileX },
  { href: '/a4-print/jpeg', label: 'A4 Print Layout', icon: Printer },
];

export default function Navbar() {
  const { isDarkMode, toggleTheme, user, handleLogout } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50" aria-label="Main navigation">
      <div
        className={`backdrop-blur-xl border shadow-lg rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#1a1a2e]/80 border-white/10 shadow-black/20'
            : 'bg-white/80 border-white/60 shadow-gray-200/50'
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Go to homepage"
        >
          <div className="bg-gradient-to-tr from-pink-500 to-violet-500 p-2 rounded-full shadow-lg">
            <Sparkles className="text-white w-4 h-4" aria-hidden="true" />
          </div>
          <span
            className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode ? 'from-white to-pink-200' : 'from-gray-800 to-pink-600'
            }`}
          >
            ImageSmith
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/blog"
            className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
              isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            Blog
          </Link>

        {/* Desktop Tools dropdown */}
        <div className="relative" ref={toolsRef}>
          <button
            onClick={() => setToolsOpen(!toolsOpen)}
            className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
              isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            Tools <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
          </button>
          {toolsOpen && (
            <div className={`absolute top-10 left-0 w-44 rounded-xl shadow-xl border p-1.5 z-50 ${
              isDarkMode ? 'bg-[#0f1116]/95 border-white/10' : 'bg-white/95 border-gray-200'
            }`}>
              {TOOLS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setToolsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isDarkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-60" />
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
        </div>{/* end desktop nav links */}

        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-lg"
                title={user.email}
                aria-label={`User: ${user.name}`}
              >
                {user.name[0]}
              </div>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4 opacity-50" aria-hidden="true" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/5"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>

            {menuOpen && (
              <div
                className={`absolute top-16 right-6 w-48 rounded-xl shadow-xl border p-1.5 ${
                  isDarkMode ? 'bg-[#0f1116]/95 border-white/10' : 'bg-white/95 border-gray-200'
                }`}
                role="menu"
              >
                {user && (
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-white/5"
                    role="menuitem"
                  >
                    Log out
                  </button>
                )}
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/5 block"
                  role="menuitem"
                >
                  Home
                </Link>
                <div className="border-t my-1 border-white/5" role="separator" />
                <p className="px-3 py-1 text-[10px] uppercase tracking-widest opacity-40">Tools</p>
                {TOOLS.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 text-sm"
                    role="menuitem"
                  >
                    <Icon className="w-3.5 h-3.5 opacity-50" />
                    {label}
                  </Link>
                ))}
                <div className="border-t my-1 border-white/5" role="separator" />
                <p className="px-3 py-1 text-[10px] uppercase tracking-widest opacity-40">More</p>
                <Link
                  href="/blog"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/5 text-sm"
                  role="menuitem"
                >
                  Blog
                </Link>
                <div className="border-t my-1 border-white/5" role="separator" />
                <button
                  onClick={() => { toggleTheme(); setMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-white/5 flex items-center gap-2"
                  role="menuitem"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
                  Toggle Theme
                </button>
              </div>
            )}

            {/* Desktop theme toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
