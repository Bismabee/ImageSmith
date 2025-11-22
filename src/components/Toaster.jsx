import React, { useEffect, useState } from 'react';

const Toast = ({ id, type, message, onClose, duration = 4000, persistent = false, actionLabel, actionUrl }) => {
  const [visible, setVisible] = useState(true);
  const [widthPct, setWidthPct] = useState(100);

  useEffect(() => {
    if (persistent) return; // do not auto-hide or animate progress for persistent toasts
    // start progress animation slightly after mount to allow transition
    const t = setTimeout(() => setWidthPct(0), 50);
    // hide toast (start fade) after duration
    const hide = setTimeout(() => setVisible(false), duration);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, [duration, persistent]);

  // when visibility goes false, wait for fade and then remove
  useEffect(() => {
    if (visible) return;
    const rem = setTimeout(() => onClose(id), 350);
    return () => clearTimeout(rem);
  }, [visible, id, onClose]);

  const outerClasses = `pointer-events-auto transition-all transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`;
  const baseStyle = persistent ? 'max-w-md w-full p-4 rounded-xl shadow-2xl' : 'max-w-sm w-full p-3 rounded-lg shadow-lg';
  const colorStyle = type === 'error' ? 'bg-red-600 text-white border border-red-700' : 'bg-green-600 text-white border border-green-700';

  return (
    <div className={`${baseStyle} ${outerClasses} ${colorStyle}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex-1 text-sm">
          <div className="font-semibold">{type === 'error' ? 'Error' : 'Thanks for using ImageSmith'}</div>
          <div className="mt-1">{message}</div>
          {!persistent && (
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
            <button onClick={() => { setVisible(false); }} className="text-white opacity-90 hover:opacity-100">✕</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random();
      const { type = 'info', message = '', duration = 4000, persistent = false, actionLabel, actionUrl } = e.detail || {};
      setToasts((t) => [...t, { id, type, message, duration, persistent, actionLabel, actionUrl }]);
    };

    window.addEventListener('imagesmith:toast', handler);
    return () => window.removeEventListener('imagesmith:toast', handler);
  }, []);

  const remove = (id) => setToasts((t) => t.filter(x => x.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map(t => (
        <Toast key={t.id} id={t.id} type={t.type} message={t.message} onClose={remove} duration={t.duration} persistent={t.persistent} actionLabel={t.actionLabel} actionUrl={t.actionUrl} />
      ))}
    </div>
  );
};

export default Toaster;
