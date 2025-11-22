import React, { useRef, useState, useEffect } from 'react';
import { Upload, Layers, ImageIcon, X, CheckCircle2, Download, Sparkles, CheckSquare, Eye, MoreVertical } from 'lucide-react';
import GlowingStarsLoader from '../components/GlowingStarsLoader.jsx';
import { formatBytes } from '../utils/formatting.js';

const Dashboard = ({ 
    files, 
    isDarkMode, 
    handleFiles, 
    fileInputRef, 
    selectedIds, 
    toggleSelectAll, 
    reset, 
    toggleSelection, 
    setPreviewFile, 
    isGlobalProcessing, 
    mode, 
    setMode, 
    quality, 
    setQuality, 
    targetSizeKB, 
    setTargetSizeKB, 
    getSliderMax, 
    performCompression, 
    compressSingleImage,
    replaceOriginal,
    removeOriginal,
    isGodMode
}) => {
    const replaceInputRef = useRef(null);
    const zipBaseRef = useRef(null);
    useEffect(() => { zipBaseRef.current = Date.now(); }, []);
    const [pendingReplaceId, setPendingReplaceId] = useState(null);
    const [menuOpenId, setMenuOpenId] = useState(null);
  
    const getFileName = (f) => {
        if (!f) return 'file';
        return (f.originalFile && f.originalFile.name) || f.originalFileName || (f.previewUrl ? String(f.previewUrl).split('/').pop() : 'file');
    };
    const getProcessedFileName = (f) => {
        const name = getFileName(f) || 'file';
        const idx = name.lastIndexOf('.');
        const base = idx > 0 ? name.slice(0, idx) : name;
        const ext = idx > 0 ? name.slice(idx) : '';
        return `min_${base}_www.ImageSmit.store${ext}`;
    };

    const triggerReplace = (id) => {
        setPendingReplaceId(id);
        if (replaceInputRef.current) replaceInputRef.current.click();
    };

    const onReplaceInput = async (e) => {
        const f = e.target.files && e.target.files[0];
        if (f && pendingReplaceId) {
            await replaceOriginal(pendingReplaceId, f);
        }
        e.target.value = '';
        setPendingReplaceId(null);
    };

    const downloadFiles = async (ids) => {
        const toDownload = files.filter(f => ids.includes(f.id) && f.compressedUrl);
        if (toDownload.length === 0) return;
        if (toDownload.length === 1) {
            const f = toDownload[0];
            try {
                const a = document.createElement('a');
                a.href = f.compressedUrl;
                a.download = getProcessedFileName(f);
                document.body.appendChild(a);
                a.click();
                a.remove();
            } catch (e) { console.warn('Download failed', e); }
            return;
        }

        // Multiple files -> try to create ZIP by loading JSZip from CDN at runtime; if not available, fall back to individual downloads
        const loadJSZipFromCDN = () => new Promise((resolve, reject) => {
            if (window && window.JSZip) return resolve(window.JSZip);
            const src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                existing.addEventListener('load', () => resolve(window.JSZip));
                existing.addEventListener('error', () => reject(new Error('Failed to load JSZip from CDN')));
                return;
            }
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = () => { if (window && window.JSZip) resolve(window.JSZip); else reject(new Error('JSZip not available after load')); };
            s.onerror = () => reject(new Error('Failed to load JSZip from CDN'));
            document.head.appendChild(s);
        });

        try {
            const JSZip = await loadJSZipFromCDN().catch(() => null);
            if (JSZip) {
                const zip = new JSZip();
                await Promise.all(toDownload.map(async (f) => {
                    try {
                        const resp = await fetch(f.compressedUrl);
                        const blob = await resp.blob();
                        zip.file(getProcessedFileName(f), blob);
                    } catch (e) {
                        console.warn('Failed to fetch file for zip', f.id, e);
                    }
                }));
                const content = await zip.generateAsync({ type: 'blob' });
                const url = URL.createObjectURL(content);
                const a = document.createElement('a');
                a.href = url;
                a.download = `imagesmith_batch_${zipBaseRef.current}.zip`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
                return;
            }
        } catch (e) {
            console.warn('CDN JSZip load or ZIP generation failed', e);
        }

        // Fallback: download each file individually
        toDownload.forEach((f) => {
            try {
                const a = document.createElement('a');
                a.href = f.compressedUrl;
                a.download = getProcessedFileName(f);
                document.body.appendChild(a);
                a.click();
                a.remove();
            } catch (err) { console.warn('Download failed', err); }
        });
    };
  return (
    <div className="pt-32 pb-32 px-4 min-h-screen flex flex-col items-center">
      {/* 1. UPLOAD AREA */}
      {files.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
              <div className="text-center mb-12"><h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Batch Compress.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">Save Hours.</span></h1></div>
              <div onClick={() => fileInputRef.current.click()} className={`group relative w-full max-w-xl h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isDarkMode ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-gray-300 bg-white/60 hover:bg-white/80 shadow-sm hover:shadow-md'} hover:scale-[1.02]`}>
                  <input type="file" multiple ref={fileInputRef} onChange={(e) => handleFiles(e.target.files)} accept="image/*" className="hidden" />
                  <div className="bg-gradient-to-tr from-pink-500 to-violet-600 p-4 rounded-full shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300"><Upload className="w-8 h-8 text-white" /></div>
                  <p className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Drop images here</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Single (Free) or Batch (God Mode)</p>
              </div>
          </div>
      )}

      {/* 2. EDITOR AREA */}
      {files.length > 0 && (
        <div className="w-full max-w-6xl flex flex-col gap-8">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center">
             <div>
                 <h2 className="text-xl font-bold flex items-center gap-2">
                    {files.length > 1 ? <Layers className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                    {files.length > 1 ? `Batch Queue (${selectedIds.length}/${files.length})` : getFileName(files[0])}
                 </h2>
                 {files.length === 1 && <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{files[0].status !== 'uploading' ? `Original: ${formatBytes(files[0].originalSize)}` : ''}</p>}
             </div>
             <div className="flex items-center gap-2">
                 {files.length > 1 && (<button onClick={toggleSelectAll} className={`text-xs font-bold px-3 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}>{selectedIds.length === files.length ? 'Deselect All' : 'Select All'}</button>)}
                 <button onClick={reset} className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}`}><X className="w-5 h-5" /></button>
             </div>
          </div>

          {/* SINGLE FILE VIEW */}
          {files.length === 1 && (
              <div className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border min-h-[400px] ${isDarkMode ? 'bg-black/30 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                    {(files[0].status === 'uploading' || files[0].status === 'compressing') && (<GlowingStarsLoader text={files[0].status === 'uploading' ? "UPLOADING" : "COMPRESSING"} />)}
                          {files[0].status === 'done' && files[0].compressedUrl ? (
                              <>
                                 <div className="flex flex-col md:flex-row md:h-[500px] h-auto">
                                     <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-500/20 min-h-[180px] md:min-h-0">
                                          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">ORIGINAL</div>
                                          <img src={files[0].previewUrl} className="w-full h-[40vh] md:h-full object-contain p-4" alt="Original" />
                                          <div className="absolute bottom-4 left-4 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white"><span className="text-[10px] opacity-70 uppercase tracking-wider">Size</span><span className="text-sm font-bold font-mono">{formatBytes(files[0].originalSize)}</span></div>
                                     </div>
                                     <div className="flex-1 relative">
                                          <div className="absolute top-4 right-4 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">COMPRESSED</div>
                                          <img src={files[0].compressedUrl} className="w-full h-[40vh] md:h-full object-contain p-4" alt="Compressed" />
                                          <div className="absolute bottom-4 right-4 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-right"><span className="text-[10px] opacity-70 uppercase tracking-wider">New Size</span><span className="text-sm font-bold font-mono">{formatBytes(files[0].compressedSize)}</span></div>
                                     </div>
                                 </div>

                                 <div className="flex items-center justify-center md:justify-end gap-3 p-4">
                                    <button onClick={() => compressSingleImage()} className="py-2 px-4 rounded-lg bg-pink-500 text-white font-bold shadow hover:scale-105 transition-transform">Re-compress</button>
                                                                        {files[0].compressedUrl && (
                                                                                                    <a href={files[0].compressedUrl} download={getProcessedFileName(files[0])} className={`py-2 px-4 rounded-lg font-bold border transition-all ${isDarkMode ? 'bg-white/10 hover:bg-white/20 border-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'}`}>
                                                                                    Download
                                                                            </a>
                                                                        )}
                                 </div>
                              </>
                          ) : (
                       <div className="h-[500px] flex items-center justify-center relative">
                          <div className="absolute inset-0 z-0 opacity-30" style={{backgroundImage: `radial-gradient(${isDarkMode ? '#444' : '#cbd5e1'} 1px, transparent 1px)`, backgroundSize: '20px 20px'}}></div>
                          <img src={files[0].previewUrl} className={`max-w-full max-h-full object-contain relative z-10 p-4`} alt="Preview" />
                          {files[0].status === 'ready' && (<div className="absolute bottom-8 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full text-white font-bold animate-pulse border border-white/10">Ready to Compress</div>)}
                       </div>
                    )}
                   </div>
              )}

                            {/* BULK FILE VIEW */}
                            {files.length > 1 && (
                                <>
                                    <div className="w-full mb-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Comparisons ({files.length})</h3>
                                                                                <div className="flex items-center gap-2">
                                                                                        {/* Show Download All when all items selected and have compressed results, otherwise show Download Selected when any selected has compressedUrl */}
                                                                                        {selectedIds.length > 0 && (() => {
                                                                                                const selectedFiles = files.filter(f => selectedIds.includes(f.id));
                                                                                                const allSelected = selectedIds.length === files.length;
                                                                                                const anyHaveCompressed = selectedFiles.some(f => f.compressedUrl);
                                                                                                const allHaveCompressed = selectedFiles.every(f => f.compressedUrl);
                                                                                                return (
                                                                                                        <>
                                                                                                            {allSelected && allHaveCompressed ? (
                                                                                                                <button onClick={() => downloadFiles(selectedIds)} className="py-1.5 px-3 rounded-lg bg-blue-600 text-white text-sm font-bold shadow hover:scale-105 transition-transform">Download All</button>
                                                                                                            ) : anyHaveCompressed ? (
                                                                                                                <button onClick={() => downloadFiles(selectedIds)} className="py-1.5 px-3 rounded-lg bg-blue-600 text-white text-sm font-bold shadow hover:scale-105 transition-transform">Download Selected</button>
                                                                                                            ) : null}
                                                                                                        </>
                                                                                                );
                                                                                        })()}
                                                                                </div>
                                        </div>

                                        {/* Paired list: each row is a pair (original left, compressed right) — no duplicate thumbnail grid */}
                                        <div className="grid grid-cols-1 gap-4">
                                            {files.map((file) => (
                                                <div key={file.id} className={`w-full rounded-2xl border p-4 flex flex-col md:flex-row gap-4 relative ${isDarkMode ? 'bg-[#0f1116] border-white/10' : 'bg-white border-gray-200'}`}>
                                                    {/* Selection (left top): simple check / cross toggle */}
                                                    <div className="absolute top-3 left-3 z-20" onClick={(e) => e.stopPropagation()}>
                                                        <button onClick={() => toggleSelection(file.id)} className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${selectedIds.includes(file.id) ? 'bg-green-500 border-green-500 text-white' : (isDarkMode ? 'bg-black/40 border-white/20 text-white' : 'bg-white border-gray-200 text-gray-800')}`}>
                                                            {selectedIds.includes(file.id) ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                        </button>
                                                    </div>

                                                    {/* Per-item options (right top) */}
                                                    <div className="absolute top-3 right-3 z-20" onClick={(e) => e.stopPropagation()}>
                                                        <div className="relative">
                                                            <button onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === file.id ? null : file.id); }} className={`w-7 h-7 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-black/40 text-white' : 'bg-white/80 text-gray-800'} border` }>
                                                                <MoreVertical className="w-4 h-4" />
                                                            </button>
                                                            {menuOpenId === file.id && (
                                                                <div className={`absolute right-0 mt-2 w-44 z-30 rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0f1116] border border-white/10 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                                                                    <button onClick={(e) => { e.stopPropagation(); triggerReplace(file.id); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 hover:bg-gray-100/50">Re-upload</button>
                                                                    <button onClick={(e) => { e.stopPropagation(); performCompression([file.id]); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 hover:bg-gray-100/50">Re-compress</button>
                                                                    {file.compressedUrl && <a onClick={() => setMenuOpenId(null)} href={file.compressedUrl} download={getProcessedFileName(file)} className="block px-3 py-2 hover:bg-gray-100/50">Download</a>}
                                                                    <button onClick={(e) => { e.stopPropagation(); setPreviewFile(file); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 hover:bg-gray-100/50">Preview</button>
                                                                    <button onClick={(e) => { e.stopPropagation(); toggleSelection(file.id); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 hover:bg-gray-100/50">{selectedIds.includes(file.id) ? 'Deselect' : 'Select'}</button>
                                                                    {!file.originalFile && (
                                                                        <button onClick={(e) => { e.stopPropagation(); removeOriginal(file.id); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 hover:bg-gray-100/50">Clear Original</button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 relative">
                                                        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">ORIGINAL</div>
                                                        <div className="flex items-center justify-center h-48 bg-transparent p-2">
                                                            <img src={file.previewUrl} alt="orig" className="max-w-full max-h-full object-contain" />
                                                        </div>
                                                        <div className="absolute bottom-3 left-3 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white"><span className="text-[10px] opacity-70 uppercase">Size</span><span className="text-sm font-bold font-mono">{formatBytes(file.originalSize)}</span></div>
                                                    </div>

                                                    <div className="flex-1 relative">
                                                        <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">COMPRESSED</div>
                                                        <div className="flex items-center justify-center h-48 bg-transparent p-2">
                                                            {file.compressedUrl ? (
                                                                <img src={file.compressedUrl} alt="comp" className="max-w-full max-h-full object-contain" />
                                                            ) : (
                                                                <div className="flex flex-col items-center opacity-60">
                                                                    <span className="text-sm font-medium">Waiting to compress</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="absolute bottom-3 right-3 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-right"><span className="text-[10px] opacity-70 uppercase">New Size</span><span className="text-sm font-bold font-mono">{file.compressedUrl ? formatBytes(file.compressedSize) : '-'}</span></div>
                                                        {file.status === 'done' && file.compressedUrl && (
                                                            <div className="absolute bottom-3 left-3 z-10 text-sm font-bold text-green-400 bg-black/40 px-2 py-1 rounded">-{Math.round(((file.originalSize - file.compressedSize) / file.originalSize) * 100)}%</div>
                                                        )}

                                                          <div className="mt-3 flex items-center gap-2">
                                                            {file.compressedUrl && (
                                                                <a href={file.compressedUrl} download={getProcessedFileName(file)} className={`py-2 px-3 rounded-md text-sm font-bold border ${isDarkMode ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'}`}>Download</a>
                                                            )}
                                                            <button onClick={(e) => { e.stopPropagation(); toggleSelection(file.id); }} className="py-2 px-3 rounded-md text-sm border bg-transparent">{selectedIds.includes(file.id) ? 'Deselect' : 'Select'}</button>
                                                            {!file.originalFile && (
                                                                <div className="flex gap-2">
                                                                    <input ref={replaceInputRef} type="file" accept="image/*" onChange={onReplaceInput} className="hidden" />
                                                                    <button onClick={(e) => { e.stopPropagation(); triggerReplace(file.id); }} className="py-2 px-3 rounded-md text-sm bg-yellow-50 border">Re-upload</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

              {/* 3. FLOATING BOTTOM NAV pnBAR CONTROLS */}
              <div className="fixed bottom-4 left-0 right-0 z-40 px-4 animate-in slide-in-from-bottom-20 duration-500">
                 <div className={`mx-auto max-w-full backdrop-blur-sm border-2 rounded-t-2xl px-4 py-3 shadow-lg ring-1 ${isDarkMode ? 'bg-black/60 border-white/20 ring-white/10 shadow-black/40' : 'bg-white/80 border-gray-200/30 ring-black/5 shadow-md'}`}>
                    {/* Compact mode toggles always visible (Size / Percentage) */}
                    <div className="flex items-center justify-center mb-2">
                        <div className={`flex px-1 rounded-full w-full max-w-2xl mx-auto ${isDarkMode ? 'bg-black/50' : 'bg-white/70'}`}>
                            <button onClick={() => setMode('size')} className={`flex-1 py-1 text-sm font-semibold rounded-full transition-all ${mode === 'size' ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900') : 'text-gray-400'}`}>Size</button>
                            <button onClick={() => setMode('percentage')} className={`flex-1 py-1 text-sm font-semibold rounded-full transition-all ${mode === 'percentage' ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900') : 'text-gray-400'}`}>Percentage</button>
                        </div>
                    </div>

                    {/* God Mode small badge at top-right of bottom nav (non-blocking) */}
                    <div className="absolute right-6 -top-3">
                        <div className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isGodMode ? 'bg-yellow-400 text-black' : 'bg-yellow-200 text-yellow-800/80'}`}>{isGodMode ? 'GOD MODE' : 'GOD'}</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 px-2">
                            <div className="flex justify-between items-end text-xs mb-1 font-medium opacity-70">
                                <span>{mode === 'percentage' ? 'Quality' : 'Max KB'}</span>
                                <span className="font-bold text-pink-500 text-sm">{mode === 'percentage' ? `${quality}%` : `${targetSizeKB} KB`}</span>
                            </div>
                            <input 
                                type="range" 
                                min={mode === 'percentage' ? "1" : "1"} 
                                max={mode === 'percentage' ? "100" : getSliderMax()} 
                                step="1" 
                                value={mode === 'percentage' ? quality : targetSizeKB} 
                                onChange={(e) => mode === 'percentage' ? setQuality(Number(e.target.value)) : setTargetSizeKB(Number(e.target.value))}
                                className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-pink-500 bg-gray-300"
                            />
                        </div>
                        <div className="shrink-0">
                        <button 
                            onClick={() => performCompression()}
                            disabled={isGlobalProcessing || files.some(f => f.status === 'uploading')}
                            className="shrink-0 h-9 px-4 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow flex items-center justify-center font-bold gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGlobalProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            <span className="text-sm">Compress</span>
                        </button>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
  );
};

export default Dashboard;