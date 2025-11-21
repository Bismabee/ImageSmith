import React from 'react';
import { Upload, Layers, ImageIcon, X, CheckCircle2, Download, Sparkles, CheckSquare, Eye } from 'lucide-react';
import GlowingStarsLoader from '../components/GlowingStarsLoader';
import { formatBytes } from '../utils/formatting';

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
    compressSingleImage 
}) => {

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
                    {files.length > 1 ? `Batch Queue (${selectedIds.length}/${files.length})` : files[0].originalFile.name}
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
                                      <a href={files[0].compressedUrl} download={`min_${files[0].originalFile.name}`} className={`py-2 px-4 rounded-lg font-bold border transition-all ${isDarkMode ? 'bg-white/10 hover:bg-white/20 border-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'}`}>
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
                                        {/* Bulk comparison strip for selected images */}
                                        {files.some(f => selectedIds.includes(f.id) && f.status === 'done' && f.compressedUrl) && (
                                            <div className="w-full mb-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Comparisons ({selectedIds.length})</h3>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => performCompression()} className="py-1.5 px-3 rounded-lg bg-pink-500 text-white text-sm font-bold shadow hover:scale-105 transition-transform">Re-compress Selected</button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    {files.filter(f => selectedIds.includes(f.id) && f.status === 'done' && f.compressedUrl).map(file => (
                                                        <div key={file.id} className={`w-full rounded-2xl border p-4 flex flex-col md:flex-row gap-4 ${isDarkMode ? 'bg-[#0f1116] border-white/10' : 'bg-white border-gray-200'}`}>
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
                                                                    <img src={file.compressedUrl || file.previewUrl} alt="comp" className="max-w-full max-h-full object-contain" />
                                                                </div>
                                                                <div className="absolute bottom-3 right-3 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-right"><span className="text-[10px] opacity-70 uppercase">New Size</span><span className="text-sm font-bold font-mono">{file.compressedUrl ? formatBytes(file.compressedSize) : '-'}</span></div>
                                                                {file.status === 'done' && file.compressedUrl && (
                                                                    <div className="absolute bottom-3 left-3 z-10 text-sm font-bold text-green-400 bg-black/40 px-2 py-1 rounded">-{Math.round(((file.originalSize - file.compressedSize) / file.originalSize) * 100)}%</div>
                                                                )}
                                                            </div>

                                                            <div className="w-full md:w-auto md:self-center flex gap-2 md:flex-col mt-2 md:mt-0">
                                                                {file.compressedUrl && (
                                                                    <a href={file.compressedUrl} download={`min_${file.originalFile.name}`} className={`py-2 px-3 rounded-md text-sm font-bold border ${isDarkMode ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'}`}>Download</a>
                                                                )}
                                                                <button onClick={(e) => { e.stopPropagation(); toggleSelection(file.id); }} className="py-2 px-3 rounded-md text-sm border bg-transparent">{selectedIds.includes(file.id) ? 'Deselect' : 'Select'}</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {files.map((file) => (
                          <div key={file.id} className={`relative p-3 rounded-2xl border flex flex-col transition-all cursor-pointer ${isDarkMode ? 'bg-[#1a1a2e] border-white/10' : 'bg-white border-gray-200 shadow-sm'} ${selectedIds.includes(file.id) ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-black' : 'opacity-80 hover:opacity-100'}`} onClick={() => toggleSelection(file.id)}>
                              <div className="absolute top-3 left-3 z-20" onClick={(e) => e.stopPropagation()}><button onClick={() => toggleSelection(file.id)} className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${selectedIds.includes(file.id) ? 'bg-pink-500 border-pink-500 text-white' : 'bg-black/30 border-white/50'}`}>{selectedIds.includes(file.id) && <CheckSquare className="w-3 h-3" />}</button></div>
                              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/5 mb-3 relative group">
                                  <img src={file.compressedUrl || file.previewUrl} className="w-full h-full object-cover" alt="thumb" />
                                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white"><p className="text-xs font-bold truncate">{file.originalFile.name}</p><p className="text-[10px] opacity-80">{formatBytes(file.originalSize)}</p></div>
                                  {file.status === 'done' && (<div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">-{Math.round(((file.originalSize - file.compressedSize) / file.originalSize) * 100)}%</div>)}
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[1px]"><button onClick={(e) => { e.stopPropagation(); setPreviewFile(file); }} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors border border-white/30"><Eye className="w-5 h-5 text-white" /></button></div>
                                  {(file.status === 'compressing' || isGlobalProcessing) && (<div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center opacity-100"><Sparkles className="w-6 h-6 text-white animate-spin" /></div>)}
                              </div>
                              <div className="mt-auto" onClick={(e) => e.stopPropagation()}>{file.status === 'done' ? (<div className="flex gap-2"><div className="flex-1 text-center py-2 bg-green-500/10 rounded-lg border border-green-500/20 text-green-500 font-mono text-xs font-bold">{formatBytes(file.compressedSize)}</div><a href={file.compressedUrl} download={`min_${file.originalFile.name}`} className={`flex-1 py-2 text-center rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 border-white/10' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'}`}><Download className="w-3 h-3" /> Save</a></div>) : (<div className="h-8 w-full bg-gray-500/10 rounded-lg animate-pulse flex items-center justify-center text-[10px] opacity-50 font-medium">Waiting...</div>)}</div>
                          </div>
                                            ))}
                                        </div>
                                        </>
                            )}

              {/* 3. FLOATING BOTTOM BAR CONTROLS */}
              <div className="fixed bottom-6 left-4 right-4 z-40 mx-auto max-w-xl animate-in slide-in-from-bottom-20 duration-500">
                 <div className={`backdrop-blur-xl border rounded-3xl p-4 shadow-2xl ${isDarkMode ? 'bg-[#1a1a2e]/90 border-white/20 shadow-black/50' : 'bg-white/90 border-white/60 shadow-gray-200/50'}`}>
                    <div className="flex justify-center mb-4">
                        <div className={`flex p-1 rounded-xl w-full max-w-xs ${isDarkMode ? 'bg-black/40' : 'bg-gray-100'}`}>
                            <button onClick={() => setMode('size')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'size' ? (isDarkMode ? 'bg-gray-700 text-white shadow' : 'bg-white text-gray-900 shadow') : 'text-gray-500'}`}>Target Size</button>
                            <button onClick={() => setMode('percentage')} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'percentage' ? (isDarkMode ? 'bg-gray-700 text-white shadow' : 'bg-white text-gray-900 shadow') : 'text-gray-500'}`}>Percentage</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 px-2">
                            <div className="flex justify-between items-end text-xs mb-2 font-medium opacity-70">
                                <span>{mode === 'percentage' ? 'Quality Level' : 'Max Size (KB)'}</span>
                                <span className="font-bold text-pink-500">{mode === 'percentage' ? `${quality}%` : `${targetSizeKB} KB`}</span>
                            </div>
                            <input 
                                type="range" 
                                min={mode === 'percentage' ? "1" : "1"} 
                                max={mode === 'percentage' ? "100" : getSliderMax()} 
                                step="1" 
                                value={mode === 'percentage' ? quality : targetSizeKB} 
                                onChange={(e) => mode === 'percentage' ? setQuality(Number(e.target.value)) : setTargetSizeKB(Number(e.target.value))}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-pink-500 bg-gray-300"
                            />
                        </div>
                        {files.some(f => selectedIds.includes(f.id) && f.status === 'done') ? (
                            <button 
                                onClick={() => performCompression()}
                                disabled={isGlobalProcessing || files.some(f => f.status === 'uploading')}
                                className="shrink-0 h-12 px-6 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg flex items-center justify-center font-bold gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGlobalProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                <span className="hidden sm:inline">Re-compress</span>
                            </button>
                        ) : (
                            <button 
                                onClick={files.length > 1 ? performCompression : () => compressSingleImage(files[0])}
                                disabled={isGlobalProcessing || files.some(f => f.status === 'uploading')}
                                className="shrink-0 h-12 px-6 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg flex items-center justify-center font-bold gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGlobalProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                <span className="hidden sm:inline">Compress</span>
                            </button>
                        )}
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
  );
};

export default Dashboard;