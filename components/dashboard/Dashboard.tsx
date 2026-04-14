'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Upload, Layers, ImageIcon, X, CheckCircle2, Download, Sparkles, MoreVertical,
} from 'lucide-react';
import GlowingStarsLoader from '@/components/ui/GlowingStarsLoader';
import { formatBytes } from '@/lib/utils/formatting';
import { useAppContext } from '@/providers/AppProvider';
import type { FileEntry } from '@/hooks/useCompressionState';

interface DashboardProps {
  files: FileEntry[];
  selectedIds: string[];
  isGlobalProcessing: boolean;
  mode: 'size' | 'percentage';
  setMode: (m: 'size' | 'percentage') => void;
  quality: number;
  setQuality: (q: number) => void;
  targetSizeKB: number;
  setTargetSizeKB: (s: number) => void;
  getSliderMax: () => number;
  performCompression: (ids?: string[]) => void;
  reset: () => void;
  toggleSelectAll: () => void;
  toggleSelection: (id: string) => void;
  setPreviewFile: (f: FileEntry | null) => void;
  replaceOriginal: (id: string, file: File) => Promise<void>;
  removeOriginal: (id: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFiles: (files: FileList | File[]) => void;
}

export default function Dashboard({
  files, selectedIds, isGlobalProcessing, mode, setMode, quality, setQuality,
  targetSizeKB, setTargetSizeKB, getSliderMax, performCompression, reset,
  toggleSelectAll, toggleSelection, setPreviewFile, replaceOriginal, removeOriginal,
  fileInputRef, handleFiles,
}: DashboardProps) {
  const { isDarkMode } = useAppContext();
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const zipBaseRef = useRef<number>(Date.now());
  const [pendingReplaceId, setPendingReplaceId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => { zipBaseRef.current = Date.now(); }, []);

  const getFileName = (f: FileEntry) =>
    (f.originalFile && f.originalFile.name) || f.originalFileName || 'file';

  const getProcessedFileName = (f: FileEntry) => {
    const name = getFileName(f);
    const idx = name.lastIndexOf('.');
    const base = idx > 0 ? name.slice(0, idx) : name;
    const ext = idx > 0 ? name.slice(idx) : '';
    return `min_${base}_www.ImageSmit.store${ext}`;
  };

  const triggerReplace = (id: string) => {
    setPendingReplaceId(id);
    replaceInputRef.current?.click();
  };

  const onReplaceInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && pendingReplaceId) await replaceOriginal(pendingReplaceId, f);
    e.target.value = '';
    setPendingReplaceId(null);
  };

  const downloadFiles = async (ids: string[]) => {
    const toDownload = files.filter((f) => ids.includes(f.id) && f.compressedUrl);
    if (toDownload.length === 0) return;

    if (toDownload.length === 1) {
      const f = toDownload[0];
      const a = document.createElement('a');
      a.href = f.compressedUrl!;
      a.download = getProcessedFileName(f);
      document.body.appendChild(a); a.click(); a.remove();
      return;
    }

    const loadJSZip = (): Promise<typeof import('jszip') | null> =>
      new Promise((resolve) => {
        if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).JSZip) {
          resolve((window as unknown as Record<string, unknown>).JSZip as typeof import('jszip'));
          return;
        }
        const src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
        const s = document.createElement('script');
        s.src = src; s.async = true;
        s.onload = () => resolve((window as unknown as Record<string, unknown>).JSZip as typeof import('jszip') ?? null);
        s.onerror = () => resolve(null);
        document.head.appendChild(s);
      });

    try {
      const JSZip = await loadJSZip();
      if (JSZip) {
        const zip = new (JSZip as unknown as new () => { file: (n: string, b: Blob) => void; generateAsync: (o: Record<string, unknown>) => Promise<Blob> })();
        await Promise.all(
          toDownload.map(async (f) => {
            try {
              const resp = await fetch(f.compressedUrl!);
              const blob = await resp.blob();
              zip.file(getProcessedFileName(f), blob);
            } catch { /* skip failed */ }
          })
        );
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url; a.download = `imagesmith_batch_${zipBaseRef.current}.zip`;
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
        return;
      }
    } catch { /* fallback */ }

    toDownload.forEach((f) => {
      const a = document.createElement('a');
      a.href = f.compressedUrl!; a.download = getProcessedFileName(f);
      document.body.appendChild(a); a.click(); a.remove();
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="pt-32 pb-32 px-4 min-h-screen flex flex-col items-center">
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        accept="image/*"
        className="hidden"
        aria-label="Select images to compress"
      />
      <input ref={replaceInputRef} type="file" accept="image/*" onChange={onReplaceInput} className="hidden" />

      {/* Upload Area */}
      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Batch Compress.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">
                Save Hours.
              </span>
            </h2>
          </div>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`group relative w-full max-w-xl h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode
                ? 'border-white/20 bg-white/5 hover:bg-white/10'
                : 'border-gray-300 bg-white/60 hover:bg-white/80 shadow-sm hover:shadow-md'
            }`}
            role="button"
            tabIndex={0}
            aria-label="Upload images for compression"
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          >
            <div className="bg-gradient-to-tr from-pink-500 to-violet-600 p-4 rounded-full shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <p className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Drop images here
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Single (Free) or Batch (God Mode)
            </p>
          </div>
        </div>
      )}

      {/* Editor Area */}
      {files.length > 0 && (
        <div className="w-full max-w-6xl flex flex-col gap-8">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {files.length > 1 ? <Layers className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                {files.length > 1
                  ? `Batch Queue (${selectedIds.length}/${files.length})`
                  : getFileName(files[0])}
              </h2>
              {files.length === 1 && files[0].status !== 'uploading' && (
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Original: {formatBytes(files[0].originalSize)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {files.length > 1 && (
                <button
                  onClick={toggleSelectAll}
                  className={`text-xs font-bold px-3 py-2 rounded-lg transition-colors ${
                    isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {selectedIds.length === files.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
              <button
                onClick={reset}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label="Clear all images"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Single File View */}
          {files.length === 1 && (
            <div className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border min-h-[400px] ${
              isDarkMode ? 'bg-black/30 border-white/10' : 'bg-gray-100 border-gray-200'
            }`}>
              {(files[0].status === 'uploading' || files[0].status === 'compressing') && (
                <GlowingStarsLoader text={files[0].status === 'uploading' ? 'UPLOADING' : 'COMPRESSING'} />
              )}
              {files[0].status === 'done' && files[0].compressedUrl ? (
                <>
                  <div className="flex flex-col md:flex-row md:h-[500px] h-auto">
                    <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-500/20 min-h-[180px]">
                      <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">ORIGINAL</div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={files[0].previewUrl!} className="w-full h-[40vh] md:h-full object-contain p-4" alt={`Original ${getFileName(files[0])}`} loading="lazy" />
                      <div className="absolute bottom-4 left-4 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white">
                        <span className="text-[10px] opacity-70 uppercase tracking-wider">Size</span>
                        <span className="text-sm font-bold font-mono">{formatBytes(files[0].originalSize)}</span>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute top-4 right-4 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">COMPRESSED</div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={files[0].compressedUrl} className="w-full h-[40vh] md:h-full object-contain p-4" alt={`Compressed ${getFileName(files[0])}`} loading="lazy" />
                      <div className="absolute bottom-4 right-4 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-right">
                        <span className="text-[10px] opacity-70 uppercase tracking-wider">New Size</span>
                        <span className="text-sm font-bold font-mono">{formatBytes(files[0].compressedSize)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-end gap-3 p-4">
                    <button onClick={() => performCompression()} className="py-2 px-4 rounded-lg bg-pink-500 text-white font-bold shadow hover:scale-105 transition-transform">
                      Re-compress
                    </button>
                    <a
                      href={files[0].compressedUrl}
                      download={getProcessedFileName(files[0])}
                      className={`py-2 px-4 rounded-lg font-bold border transition-all ${
                        isDarkMode ? 'bg-white/10 hover:bg-white/20 border-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'
                      }`}
                    >
                      Download
                    </a>
                  </div>
                </>
              ) : (
                <div className="h-[500px] flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(${isDarkMode ? '#444' : '#cbd5e1'} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={files[0].previewUrl!} className="max-w-full max-h-full object-contain relative z-10 p-4" alt="Preview" />
                  {files[0].status === 'ready' && (
                    <div className="absolute bottom-8 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full text-white font-bold animate-pulse border border-white/10">
                      Ready to Compress
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Bulk File View */}
          {files.length > 1 && (
            <div className="w-full mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Comparisons ({files.length})
                </h3>
                {selectedIds.length > 0 && (() => {
                  const selFiles = files.filter((f) => selectedIds.includes(f.id));
                  const allSelected = selectedIds.length === files.length;
                  const anyCompressed = selFiles.some((f) => f.compressedUrl);
                  const allCompressed = selFiles.every((f) => f.compressedUrl);
                  return (allSelected && allCompressed) || anyCompressed ? (
                    <button
                      onClick={() => downloadFiles(selectedIds)}
                      className="py-1.5 px-3 rounded-lg bg-blue-600 text-white text-sm font-bold shadow hover:scale-105 transition-transform"
                    >
                      {allSelected && allCompressed ? 'Download All' : 'Download Selected'}
                    </button>
                  ) : null;
                })()}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={`w-full rounded-2xl border p-4 flex flex-col md:flex-row gap-4 relative ${
                      isDarkMode ? 'bg-[#0f1116] border-white/10' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="absolute top-3 left-3 z-20">
                      <button
                        onClick={() => toggleSelection(file.id)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                          selectedIds.includes(file.id)
                            ? 'bg-green-500 border-green-500 text-white'
                            : isDarkMode ? 'bg-black/40 border-white/20 text-white' : 'bg-white border-gray-200 text-gray-800'
                        }`}
                      >
                        {selectedIds.includes(file.id) ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="absolute top-3 right-3 z-20">
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpenId(menuOpenId === file.id ? null : file.id)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                            isDarkMode ? 'bg-black/40 text-white border-white/10' : 'bg-white/80 text-gray-800 border-gray-200'
                          }`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {menuOpenId === file.id && (
                          <div className={`absolute right-0 mt-2 w-44 z-30 rounded-lg shadow-lg ${
                            isDarkMode ? 'bg-[#0f1116] border border-white/10 text-white' : 'bg-white border border-gray-200 text-gray-900'
                          }`}>
                            <button onClick={() => { triggerReplace(file.id); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 hover:bg-gray-100/50 dark:hover:bg-white/5">Re-upload</button>
                            <button onClick={() => { performCompression([file.id]); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 hover:bg-gray-100/50 dark:hover:bg-white/5">Re-compress</button>
                            {file.compressedUrl && (
                              <a href={file.compressedUrl} download={getProcessedFileName(file)} onClick={() => setMenuOpenId(null)} className="block px-3 py-2 hover:bg-gray-100/50 dark:hover:bg-white/5">
                                Download
                              </a>
                            )}
                            <button onClick={() => { setPreviewFile(file); setMenuOpenId(null); }} className="w-full text-left px-3 py-2 hover:bg-gray-100/50 dark:hover:bg-white/5">Preview</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 relative">
                      <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">ORIGINAL</div>
                      <div className="flex items-center justify-center h-48 p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={file.previewUrl!} alt="original" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="absolute bottom-3 left-3 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white">
                        <span className="text-[10px] opacity-70 uppercase">Size</span>
                        <span className="text-sm font-bold font-mono">{formatBytes(file.originalSize)}</span>
                      </div>
                    </div>

                    <div className="flex-1 relative">
                      <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">COMPRESSED</div>
                      <div className="flex items-center justify-center h-48 p-2">
                        {file.compressedUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={file.compressedUrl} alt="compressed" className="max-w-full max-h-full object-contain" />
                        ) : (
                          <span className="text-sm opacity-60">Waiting to compress</span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 z-10 flex flex-col bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-right">
                        <span className="text-[10px] opacity-70 uppercase">New Size</span>
                        <span className="text-sm font-bold font-mono">{file.compressedUrl ? formatBytes(file.compressedSize) : '-'}</span>
                      </div>
                      {file.status === 'done' && file.compressedUrl && (
                        <div className="absolute bottom-3 left-3 z-10 text-sm font-bold text-green-400 bg-black/40 px-2 py-1 rounded">
                          -{Math.round(((file.originalSize - file.compressedSize) / file.originalSize) * 100)}%
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-2">
                        {file.compressedUrl && (
                          <a
                            href={file.compressedUrl}
                            download={getProcessedFileName(file)}
                            className={`py-2 px-3 rounded-md text-sm font-bold border ${
                              isDarkMode ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'
                            }`}
                          >
                            <Download className="w-4 h-4 inline mr-1" />Download
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floating Bottom Controls */}
          <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
            <div className={`mx-auto max-w-full backdrop-blur-sm border-2 rounded-t-2xl px-4 py-3 shadow-lg ${
              isDarkMode ? 'bg-black/60 border-white/20 shadow-black/40' : 'bg-white/80 border-gray-200/30 shadow-md'
            }`}>
              <div className="flex items-center justify-center mb-2">
                <div className={`flex px-1 rounded-full w-full max-w-2xl mx-auto ${isDarkMode ? 'bg-black/50' : 'bg-white/70'}`}>
                  {(['size', 'percentage'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 py-1 text-sm font-semibold rounded-full transition-all border ${
                        mode === m
                          ? isDarkMode ? 'bg-gray-700 text-white border-white/20' : 'bg-white text-gray-900 border-gray-200'
                          : isDarkMode ? 'text-gray-400 border-white/10' : 'text-gray-400 border-gray-200/50'
                      }`}
                    >
                      {m === 'size' ? 'Size' : 'Percentage'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-2">
                  <div className="flex justify-between items-end text-xs mb-1 font-medium opacity-70">
                    <span>{mode === 'percentage' ? 'Quality' : 'Max KB'}</span>
                    <span className="font-bold text-pink-500 text-sm">
                      {mode === 'percentage' ? `${quality}%` : `${targetSizeKB} KB`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={mode === 'percentage' ? '100' : String(getSliderMax())}
                    step="1"
                    value={mode === 'percentage' ? quality : targetSizeKB}
                    onChange={(e) =>
                      mode === 'percentage'
                        ? setQuality(Number(e.target.value))
                        : setTargetSizeKB(Number(e.target.value))
                    }
                    className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-pink-500 bg-gray-300"
                  />
                </div>
                <button
                  onClick={() => performCompression()}
                  disabled={isGlobalProcessing || files.some((f) => f.status === 'uploading')}
                  className="shrink-0 h-9 px-4 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow flex items-center gap-2 font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGlobalProcessing ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span className="text-sm">Compress</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
