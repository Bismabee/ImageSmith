import React, { useEffect, useState } from 'react';

const Toast = ({ id, type, message, onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(true);
  const [widthPct, setWidthPct] = useState(100);

  useEffect(() => {
    // start progress animation slightly after mount to allow transition
    const t = setTimeout(() => setWidthPct(0), 50);
    // hide toast (start fade) after duration
    const hide = setTimeout(() => setVisible(false), duration);
    return () => { clearTimeout(t); clearTimeout(hide); };
  }, [duration]);

  // when visibility goes false, wait for fade and then remove
  useEffect(() => {
    if (visible) return;
    const rem = setTimeout(() => onClose(id), 350);
    return () => clearTimeout(rem);
  }, [visible, id, onClose]);

  return (
    <div className={`max-w-sm w-full pointer-events-auto flex items-start gap-3 p-3 rounded-lg shadow-lg border transition-all transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'} ${type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
      <div className="flex-1 text-sm">
        <div className="font-semibold">{type === 'error' ? 'Error' : 'Notice'}</div>
        <div className="mt-1">{message}</div>
        <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-1 bg-white/80 rounded-full" style={{ width: `${widthPct}%`, transition: `width ${duration}ms linear` }} />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="text-xs opacity-90">{Math.ceil(duration / 1000)}s</div>
        <button onClick={() => { setVisible(false); }} className="text-white opacity-80 hover:opacity-100">✕</button>
      </div>
    </div>
  );
};

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now() + Math.random();
      const { type = 'info', message = '', duration = 4000 } = e.detail || {};
      setToasts((t) => [...t, { id, type, message, duration }]);
    };

    window.addEventListener('imagesmith:toast', handler);
    return () => window.removeEventListener('imagesmith:toast', handler);
  }, []);

  const remove = (id) => setToasts((t) => t.filter(x => x.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map(t => (
        <Toast key={t.id} id={t.id} type={t.type} message={t.message} onClose={remove} duration={t.duration} />
      ))}
    </div>
  );
};

export default Toaster;
