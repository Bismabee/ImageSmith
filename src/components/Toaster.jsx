import React, { useEffect, useState } from 'react';

const Toast = ({ id, type, message, onClose, duration = 4000, persistent = false, actionLabel, actionUrl, actionDetails }) => {
  const [visible, setVisible] = useState(true);
  const [widthPct, setWidthPct] = useState(100);

  useEffect(() => {
    // If duration > 0 we animate progress and auto-hide after duration regardless of persistent flag
    if (typeof duration === 'number' && duration > 0) {
      const t = setTimeout(() => setWidthPct(0), 50);
      const hide = setTimeout(() => setVisible(false), duration);
      return () => { clearTimeout(t); clearTimeout(hide); };
    }
    // otherwise persistent without duration -> do nothing (stay until closed)
    return undefined;
  }, [duration]);

  // when visibility goes false, wait for fade and then remove
  useEffect(() => {
    if (visible) return;
    const rem = setTimeout(() => onClose(id), 350);
    return () => clearTimeout(rem);
  }, [visible, id, onClose]);

  const outerClasses = `pointer-events-auto transition-all transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`;
  const baseStyle = persistent ? 'max-w-2xl w-full p-4 rounded-xl shadow-2xl' : 'max-w-sm w-full p-3 rounded-lg shadow-lg';
  let colorStyle = 'bg-green-600 text-white border border-green-700';
  if (type === 'error') colorStyle = 'bg-red-600 text-white border border-red-700';
  // make persistent thanks/toast more decorative
  if (persistent && type === 'info') colorStyle = 'bg-linear-to-br from-pink-500 to-violet-600 text-white border-transparent';

  return (
    <div className={`${baseStyle} ${outerClasses} ${colorStyle}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 text-sm">
          <div className="font-semibold">{type === 'error' ? 'Error' : 'Thanks for using ImageSmith'}</div>
          <div className="mt-1">{message}</div>
          {(typeof duration === 'number' && duration > 0) && (
            <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-1 bg-white/80 rounded-full" style={{ width: `${widthPct}%`, transition: `width ${duration}ms linear` }} />
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {!persistent && <div className="text-xs opacity-90">{Math.ceil(duration / 1000)}s</div>}
          <div className="flex items-center gap-2">
            {actionLabel && actionUrl && (
              <a href={actionUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md bg-white text-black font-semibold hover:opacity-90">{actionLabel}</a>
            )}
            {actionLabel && actionDetails && (
              <button onClick={() => {
                try { window.dispatchEvent(new CustomEvent('imagesmith:error_details', { detail: actionDetails })); } catch {};
              }} className="px-3 py-2 rounded-md bg-white text-black font-semibold hover:opacity-90">{actionLabel}</button>
            )}
            <button onClick={() => { setVisible(false); }} className="text-white opacity-90 hover:opacity-100">✕</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Toaster = () => {
  const [toasts, setToasts] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random();
      const { type = 'info', message = '', duration = 4000, persistent = false, actionLabel, actionUrl, actionDetails } = e.detail || {};
      setToasts((t) => [...t, { id, type, message, duration, persistent, actionLabel, actionUrl, actionDetails }]);
    };

    window.addEventListener('imagesmith:toast', handler);
    const mdHandler = (e) => setModalData(e.detail || null);
    window.addEventListener('imagesmith:error_details', mdHandler);
    return () => {
      window.removeEventListener('imagesmith:toast', handler);
      window.removeEventListener('imagesmith:error_details', mdHandler);
    };
  }, []);

  const remove = (id) => setToasts((t) => t.filter(x => x.id !== id));

  if (toasts.length === 0 && !modalData) return null;

  const centerToasts = toasts.filter(t => t.persistent);
  const rightToasts = toasts.filter(t => !t.persistent);

  return (
    <>
      {/* Centered top container for persistent toasts (e.g., Say Thanks) */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-3 w-full max-w-2xl px-4 pointer-events-none">
        {centerToasts.map(t => (
          <div key={t.id} className="w-full pointer-events-auto">
            <Toast id={t.id} type={t.type} message={t.message} onClose={remove} duration={t.duration} persistent={t.persistent} actionLabel={t.actionLabel} actionUrl={t.actionUrl} actionDetails={t.actionDetails} />
          </div>
        ))}
      </div>

      {/* Top-right stack for regular toasts */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {rightToasts.map(t => (
          <Toast key={t.id} id={t.id} type={t.type} message={t.message} onClose={remove} duration={t.duration} persistent={t.persistent} actionLabel={t.actionLabel} actionUrl={t.actionUrl} actionDetails={t.actionDetails} />
        ))}
      </div>
      {modalData && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
          <div className="max-w-lg w-full bg-white dark:bg-[#0f1116] text-black dark:text-white rounded-lg p-6 shadow-2xl">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold">{modalData.title || 'Details'}</h3>
              <button onClick={() => setModalData(null)} className="text-sm opacity-80">✕</button>
            </div>
            <div className="mt-4 text-sm leading-relaxed">
              <pre className="whitespace-pre-wrap text-xs p-3 bg-gray-100 dark:bg-black/40 rounded">{modalData.details || modalData.error || 'No additional details available.'}</pre>
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setModalData(null)} className="px-4 py-2 rounded-md bg-pink-500 text-white font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toaster;
