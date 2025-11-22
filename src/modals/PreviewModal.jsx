import React from 'react';
import { X, Download, Sparkles } from 'lucide-react';
import { formatBytes } from '../utils/formatting.js';

const PreviewModal = ({ file, onClose, isDarkMode }) => {
    if (!file) return null;
    
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
            <div className={`w-full max-w-5xl h-[80vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-[#1a1a2e] border border-white/10' : 'bg-white'}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-500/10">
                    <div>
                        <h3 className="text-xl font-bold">{(file.originalFile && file.originalFile.name) || file.originalFileName || 'file'}</h3>
                        <div className="flex gap-4 text-xs opacity-60 mt-1">
                            <span>Original: {formatBytes(file.originalSize)}</span>
                            {file.compressedSize > 0 && (
                                <span className="text-green-500 font-bold">Compressed: {formatBytes(file.compressedSize)} (-{Math.round(((file.originalSize - file.compressedSize) / file.originalSize) * 100)}%)</span>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-500/20"><X className="w-6 h-6" /></button>
                </div>

                {/* Comparison View */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative bg-black/5">
                    <div className="absolute inset-0 z-0 opacity-30" style={{backgroundImage: `radial-gradient(${isDarkMode ? '#444' : '#cbd5e1'} 1px, transparent 1px)`, backgroundSize: '20px 20px'}}></div>
                    
                    <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-500/20 flex items-center justify-center p-4">
                        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">ORIGINAL</div>
                        <img src={file.previewUrl} className="max-w-full max-h-full object-contain shadow-xl" alt="Original" />
                    </div>
                    
                    <div className="flex-1 relative flex items-center justify-center p-4">
                        <div className="absolute top-4 right-4 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">COMPRESSED</div>
                        {file.compressedUrl ? (
                            <img src={file.compressedUrl} className="max-w-full max-h-full object-contain shadow-xl" alt="Compressed" />
                        ) : (
                            <div className="flex flex-col items-center opacity-50">
                                <Sparkles className="w-10 h-10 mb-2" />
                                <span>Waiting to compress...</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-500/10 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-xl font-bold border opacity-70 hover:opacity-100">Close</button>
                    {file.compressedUrl && (
                        (() => {
                            const originalName = (file.originalFile && file.originalFile.name) || file.originalFileName || 'file';
                            const idx = originalName.lastIndexOf('.');
                            const base = idx > 0 ? originalName.slice(0, idx) : originalName;
                            const ext = idx > 0 ? originalName.slice(idx) : '';
                            const processed = `min_${base}_www.ImageSmit.store${ext}`;
                            return (
                                <a href={file.compressedUrl} download={processed} className="px-6 py-2 rounded-xl font-bold bg-white text-black shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                                    <Download className="w-4 h-4" /> Download
                                </a>
                            );
                        })()
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewModal;