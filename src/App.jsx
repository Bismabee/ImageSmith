import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MagicParticles from './components/MagicParticles';
import SplashScreen from './components/SplashScreen';
import LoginModal from './modals/LoginModal';
import PaymentModal from './modals/PaymentModal';
import PreviewModal from './modals/PreviewModal';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
// IMPORT THE REAL COMPRESSION UTILITY
import { compressFile } from './utils/compression.js';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null); 
  const [isGodMode, setIsGodMode] = useState(false); 
  const [showSplash, setShowSplash] = useState(true);
  
  // File State
  const [files, setFiles] = useState([]); 
  const [selectedIds, setSelectedIds] = useState([]); 
  const [previewFile, setPreviewFile] = useState(null); 
  const [isGlobalProcessing, setIsGlobalProcessing] = useState(false);
  
  // Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Compression Settings
  const [quality, setQuality] = useState(75);
  const [targetSizeKB, setTargetSizeKB] = useState(500);
  const [mode, setMode] = useState('percentage');

  const fileInputRef = useRef(null);

  // --- Effects ---
  useEffect(() => {
      const timer = setTimeout(() => setShowSplash(false), 2500);
      return () => clearTimeout(timer);
  }, []);

  // --- Handlers ---
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = () => {
    setUser({ name: "C", email: "creator@imagesmith.store", photo: null });
    setShowLoginModal(false);
  };

  const handleLogout = () => {
      setUser(null);
      setIsGodMode(false);
      setView('landing');
  };

  const handlePurchase = () => {
    setIsGlobalProcessing(true); 
    setTimeout(() => {
      setIsGlobalProcessing(false);
      setIsGodMode(true);
      setShowPaymentModal(false);
      alert("God Mode Activated! You can now batch process images.");
    }, 1500);
  };

  const handleFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;

    if (fileList.length > 1 && !isGodMode) {
        setShowPaymentModal(true);
        processSingleFile(fileList[0]); 
        return;
    }

    const newFiles = Array.from(fileList).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        originalFile: file,
        previewUrl: URL.createObjectURL(file),
        compressedUrl: null,
        compressedSize: 0,
        originalSize: file.size,
        status: 'uploading'
    }));

    setFiles(newFiles);
    setSelectedIds(newFiles.map(f => f.id));
    
    // Smart Defaults
    if (newFiles.length > 0) {
        const sizeKB = newFiles[0].originalSize / 1024;
        setTargetSizeKB(Math.round(sizeKB * 0.6));
        setView('app');
    }

    // Simulate Upload
    setTimeout(() => {
        setFiles(prev => prev.map(f => ({ ...f, status: 'ready' })));
    }, 2000); 
  };

  const processSingleFile = (file) => {
      const newFile = {
        id: Math.random().toString(36).substr(2, 9),
        originalFile: file,
        previewUrl: URL.createObjectURL(file),
        compressedUrl: null,
        compressedSize: 0,
        originalSize: file.size,
        status: 'uploading'
      };
      setFiles([newFile]);
      setSelectedIds([newFile.id]);
      
      const sizeKB = file.size / 1024;
      setTargetSizeKB(Math.round(sizeKB * 0.6));

      setTimeout(() => {
          setFiles([{...newFile, status: 'ready'}]);
          setView('app');
      }, 2000);
  };

  // --- REAL COMPRESSION ENGINE ---
  const performCompression = async () => {
      if (files.length === 0) return;

      setIsGlobalProcessing(true);
      
      // Set status to compressing so UI shows spinner
      setFiles(prev => prev.map(f => selectedIds.includes(f.id) ? {...f, status: 'compressing'} : f));

      // Small delay to allow UI update
      await new Promise(resolve => setTimeout(resolve, 100));

      const filesToProcess = files.filter(f => selectedIds.includes(f.id));

      // Map files to promises using our utility
      const promises = filesToProcess.map(async (file) => {
          try {
              const result = await compressFile(file.originalFile, {
                  mode,
                  quality,
                  targetSizeKB
              });

              return { 
                  ...file, 
                  compressedUrl: result.dataUrl, 
                  compressedSize: result.compressedSize, 
                  status: 'done' 
              };
          } catch (error) {
              console.error("Compression Failed", error);
              return { ...file, status: 'error' };
          }
      });

      const results = await Promise.all(promises);
      
      // Merge results back
      setFiles(prev => prev.map(f => {
          const processed = results.find(r => r.id === f.id);
          return processed || f;
      }));

      setIsGlobalProcessing(false);
  };

  const compressSingleImage = () => {
      performCompression();
  };

  const reset = () => {
    setFiles([]);
    setTargetSizeKB(500);
    setSelectedIds([]);
  };

  const getSliderMax = () => {
     if (files.length === 0) return 5000;
     const maxBatchSizeKB = files.reduce((max, f) => Math.max(max, f.originalSize), 0) / 1024;
     return Math.round(maxBatchSizeKB * 1.25);
  };

  const toggleSelectAll = () => {
      if (selectedIds.length === files.length) {
          setSelectedIds([]);
      } else {
          setSelectedIds(files.map(f => f.id));
      }
  };

  const toggleSelection = (id) => {
      if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter(sid => sid !== id));
      } else {
          setSelectedIds([...selectedIds, id]);
      }
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden selection:bg-pink-500/30 transition-colors duration-500 
      ${isDarkMode 
        ? 'bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white' 
        : 'bg-blue-50 bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800'}
    `}>
      
      {isGodMode && <MagicParticles />}

      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        user={user} 
        setShowLoginModal={setShowLoginModal} 
        setShowPaymentModal={setShowPaymentModal}
        handleLogout={handleLogout}
        isGodMode={isGodMode}
        setView={setView}
      />
      
      {view === 'landing' ? (
        <LandingPage 
            setView={setView} 
            setShowPaymentModal={setShowPaymentModal} 
            isDarkMode={isDarkMode} 
        />
      ) : (
        <Dashboard 
            files={files}
            isDarkMode={isDarkMode}
            handleFiles={handleFiles}
            fileInputRef={fileInputRef}
            selectedIds={selectedIds}
            toggleSelectAll={toggleSelectAll}
            reset={reset}
            toggleSelection={toggleSelection}
            setPreviewFile={setPreviewFile}
            isGlobalProcessing={isGlobalProcessing}
            mode={mode}
            setMode={setMode}
            quality={quality}
            setQuality={setQuality}
            targetSizeKB={targetSizeKB}
            setTargetSizeKB={setTargetSizeKB}
            getSliderMax={getSliderMax}
            performCompression={performCompression}
            compressSingleImage={compressSingleImage}
        />
      )}
      
      <SplashScreen show={showSplash} />
      <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} isDarkMode={isDarkMode} />
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} handleLogin={handleLogin} isDarkMode={isDarkMode} />
      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} handlePurchase={handlePurchase} isDarkMode={isDarkMode} />

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}