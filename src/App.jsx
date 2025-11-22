import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MagicParticles from './components/MagicParticles.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import Toaster from './components/Toaster.jsx';
// Login modal kept in repo but hidden for release (no visible triggers)
import PaymentModal from './modals/PaymentModal.jsx';
import PreviewModal from './modals/PreviewModal.jsx';
import LandingPage from './views/LandingPage.jsx';
import Dashboard from './views/Dashboard.jsx';
// IMPORT THE REAL COMPRESSION UTILITY
import { compressFile } from './utils/compression.js';
// IndexedDB removed for this release — original-file persistence disabled
import CelebrationOverlay from './components/CelebrationOverlay.jsx';

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
  // login state removed from UI for this release
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Compression Settings
  const [quality, setQuality] = useState(75);
  const [targetSizeKB, setTargetSizeKB] = useState(500);
  const [mode, setMode] = useState('percentage');

  const fileInputRef = useRef(null);
  const [hydrated, setHydrated] = useState(false);

  // --- Restore state from localStorage on mount ---
  useEffect(() => {
      try {
        const raw = localStorage.getItem('imagesmith_state');
        if (raw) {
          const s = JSON.parse(raw);
          if (s.isDarkMode !== undefined) setIsDarkMode(s.isDarkMode);
          if (s.view) setView(s.view);
          if (s.user) setUser(s.user);
          if (s.isGodMode) setIsGodMode(s.isGodMode);
          if (s.quality) setQuality(s.quality);
          if (s.targetSizeKB) setTargetSizeKB(s.targetSizeKB);
          if (s.mode) setMode(s.mode);
          if (s.selectedIds) setSelectedIds(s.selectedIds || []);
          if (s.files) {
            // Rehydrate files - keep data URLs for previews/compressed results
            const reFiles = s.files.map(f => ({
              id: f.id,
              originalFile: null, // cannot restore File objects reliably
              originalFileName: f.originalFileName || f.name || 'file',
              previewUrl: f.previewDataUrl || f.previewUrl || null,
              previewDataUrl: f.previewDataUrl || f.previewUrl || null,
              compressedUrl: f.compressedUrl || null,
              compressedSize: f.compressedSize || 0,
              originalSize: f.originalSize || 0,
              status: f.status || (f.compressedUrl ? 'done' : 'ready')
            }));
            setFiles(reFiles);

            // No IDB restore: original File objects are not persisted across reloads
          }
        } else {
          // fallback: try to restore just the view from a lightweight key
          const v = localStorage.getItem('imagesmith_view');
          if (v) setView(v);
        }
      } catch (e) {
        console.warn('Failed to restore state', e);
      }

      // mark hydration complete so we don't immediately overwrite restored state
      setHydrated(true);

      const timer = setTimeout(() => setShowSplash(false), 1000);
      return () => clearTimeout(timer);
  }, []);

  // --- Handlers ---
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // --- Persistence ---
  const saveAppState = React.useCallback(() => {
    try {
      const toSave = {
        isDarkMode,
        view,
        user,
        isGodMode,
        quality,
        targetSizeKB,
        mode,
        selectedIds,
        files: files.map(f => ({
          id: f.id,
          originalFileName: f.originalFile ? f.originalFile.name : f.originalFileName || null,
          originalSize: f.originalSize || 0,
          previewDataUrl: f.previewDataUrl || f.previewUrl || null,
          compressedUrl: f.compressedUrl || null,
          compressedSize: f.compressedSize || 0,
          status: f.status || null
        }))
      };
      localStorage.setItem('imagesmith_state', JSON.stringify(toSave));
    } catch (e) {
      console.warn('Failed to save state', e);
    }
  }, [isDarkMode, view, user, isGodMode, quality, targetSizeKB, mode, selectedIds, files]);

  // save on relevant changes, only after we've hydrated from storage
  useEffect(() => {
    if (!hydrated) return;
    saveAppState();
  }, [saveAppState, hydrated]);

  // Persist view separately (lightweight) to ensure we can restore view even if larger state fails
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('imagesmith_view', view); } catch (e) { /* ignore */ }
  }, [view, hydrated]);

  const handleLogin = () => {
    // login flow disabled for this release — placeholder
    setUser({ name: "C", email: "creator@imagesmith.store", photo: null });
  };

  const handleLogout = () => {
      setUser(null);
      setIsGodMode(false);
      setView('landing');
      localStorage.removeItem('imagesmith_state');
      // IDB removed — nothing to clear
  };

  const handlePurchase = () => {
    // keep purchase handler intact for future use, but for now activate God Mode directly
    setIsGlobalProcessing(true);
    setTimeout(() => {
      setIsGlobalProcessing(false);
      setIsGodMode(true);
      setShowPaymentModal(false);
      alert("God Mode Activated! You can now batch process images.");
    }, 1500);
  };

  const activateGodMode = () => {
    setIsGodMode(true);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // IndexedDB removed; no local persistence size limit

  // Replace original for an existing file (triggered by re-upload)
  const replaceOriginal = async (id, file) => {
    if (!id || !file) return;
    const previewDataUrl = await readFileAsDataUrl(file).catch(() => URL.createObjectURL(file));
    setFiles(prev => prev.map(f => f.id === id ? { ...f, originalFile: file, originalFileName: file.name, previewUrl: previewDataUrl, previewDataUrl } : f));
    // No IDB persistence: original files are kept in-memory only for this session
  };

  const removeOriginal = async (id) => {
    if (!id) return;
    // No IDB: just clear the in-memory originalFile reference for this session
    setFiles(prev => prev.map(f => f.id === id ? { ...f, originalFile: null } : f));
    try { window.dispatchEvent(new CustomEvent('imagesmith:toast', { detail: { type: 'info', message: 'Original cleared for this session.' } })); } catch(e){}
  };

  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    // Allow multiple files for all users (God Mode is free for now)

    const filesArr = Array.from(fileList);
    const newFiles = await Promise.all(filesArr.map(async (file) => {
        let previewDataUrl = null;
        try { previewDataUrl = await readFileAsDataUrl(file); } catch (e) { previewDataUrl = URL.createObjectURL(file); }
        return {
          id: Math.random().toString(36).substr(2, 9),
          originalFile: file,
          originalFileName: file.name,
          previewUrl: previewDataUrl,
          previewDataUrl,
          compressedUrl: null,
          compressedSize: 0,
          originalSize: file.size,
          status: 'uploading'
        };
    }));

    setFiles(newFiles);
    // No IndexedDB persistence: originals are kept in-memory only for this session
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
      const create = async () => {
        let previewDataUrl = null;
        try { previewDataUrl = await readFileAsDataUrl(file); } catch (e) { previewDataUrl = URL.createObjectURL(file); }
        const newFile = {
          id: Math.random().toString(36).substr(2, 9),
          originalFile: file,
          originalFileName: file.name,
          previewUrl: previewDataUrl,
          previewDataUrl,
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
      create();
  };

  // --- REAL COMPRESSION ENGINE ---
    const performCompression = async (ids) => {
      if (files.length === 0) return;

      setIsGlobalProcessing(true);
      
      // Set status to compressing so UI shows spinner
      const idsToProcess = Array.isArray(ids) && ids.length > 0 ? ids : selectedIds;
      setFiles(prev => prev.map(f => idsToProcess.includes(f.id) ? {...f, status: 'compressing'} : f));

      // Small delay to allow UI update
      await new Promise(resolve => setTimeout(resolve, 100));

      const filesToProcess = files.filter(f => idsToProcess.includes(f.id));

      // Map files to promises using our utility
      const promises = filesToProcess.map(async (file) => {
        // Determine a usable Blob/File for compression. If the original File object
        // is missing (e.g. after reload), but we have a previewDataUrl (data URL),
        // convert that to a Blob so we can still compress.
        let inputBlob = file.originalFile;
        if (!inputBlob || !inputBlob.type || !inputBlob.type.startsWith?.('image/')) {
          // try to coerce from data URL previews
          if (file.previewDataUrl && typeof file.previewDataUrl === 'string' && file.previewDataUrl.startsWith('data:')) {
            try {
              const parts = file.previewDataUrl.split(',');
              const meta = parts[0];
              const isBase64 = meta.indexOf(';base64') !== -1;
              const mimeMatch = meta.match(/data:([^;]+);/);
              const mime = (mimeMatch && mimeMatch[1]) || 'image/png';
              let raw;
              if (isBase64) {
                const bstr = atob(parts[1]);
                const n = bstr.length;
                const u8 = new Uint8Array(n);
                for (let i = 0; i < n; i++) u8[i] = bstr.charCodeAt(i);
                raw = u8;
              } else {
                // percent-decoded URI component
                raw = new TextEncoder().encode(decodeURIComponent(parts[1] || ''));
              }
              inputBlob = new Blob([raw], { type: mime });
            } catch (e) {
              inputBlob = null;
            }
          }
        }

        if (!inputBlob || !inputBlob.type || !inputBlob.type.startsWith('image/')) {
          const msg = `Cannot compress ${file.originalFileName || file.id}: original file not available or invalid. Re-upload to re-compress.`;
          try { window.dispatchEvent(new CustomEvent('imagesmith:toast', { detail: { type: 'error', message: msg } })); } catch(e){}
          return { ...file, status: 'error' };
        }

        try {
          const result = await compressFile(inputBlob, {
            mode,
            quality,
            targetSizeKB
          });

            // No IDB persistence: derived blobs are kept in-memory only for this session

          return { 
            ...file, 
            // keep originalFile if present, otherwise attach the derived blob so
            // subsequent operations in the same session can reuse it
            originalFile: file.originalFile || inputBlob,
            compressedUrl: result.dataUrl, 
            compressedSize: result.compressedSize, 
            status: 'done' 
          };
        } catch (error) {
          console.error("Compression Failed", error);
          const msg = error && error.message ? `Compression Failed: ${error.message}` : 'Compression Failed';
          try { window.dispatchEvent(new CustomEvent('imagesmith:toast', { detail: { type: 'error', message: msg } })); } catch(e){}
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
    localStorage.removeItem('imagesmith_state');
    // IDB removed — nothing to clear
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
        activateGodMode={activateGodMode}
        handleLogout={handleLogout}
        isGodMode={isGodMode}
        setView={setView}
      />
      
      {view === 'landing' ? (
        <LandingPage 
          setView={setView} 
          activateGodMode={activateGodMode}
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
          replaceOriginal={replaceOriginal}
          removeOriginal={removeOriginal}
          toggleTheme={toggleTheme}
          isGodMode={isGodMode}
          activateGodMode={activateGodMode}
          setView={setView}
        />
      )}
      
      <SplashScreen show={showSplash} />
      <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} isDarkMode={isDarkMode} />
      <Toaster />
      {/* Login modal hidden for release; kept in repo for future use */}
      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} handlePurchase={handlePurchase} isDarkMode={isDarkMode} />
      {/* Celebration overlay shown when God Mode is activated */}
      <CelebrationOverlay isOpen={showCelebration} onClose={() => setShowCelebration(false)} isDarkMode={isDarkMode} />

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}