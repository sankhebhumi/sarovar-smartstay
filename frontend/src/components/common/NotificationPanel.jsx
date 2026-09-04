import React, { useState, useEffect } from 'react';
import { Bell, X, Info, CheckCircle2, AlertCircle } from 'lucide-react';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to Sarovar SmartStay', message: 'Real-time event stream connected.', type: 'INFO', time: 'Just now' },
    { id: 2, title: 'AI Demand Alert', message: 'Fresh Paneer stock level low. Reorder recommended.', type: 'WARNING', time: '10m ago' },
    { id: 3, title: 'Room Cleaned', message: 'Room 205 marked CLEAN by Housekeeping.', type: 'SUCCESS', time: '25m ago' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // SSE Stream Connection
    try {
      const eventSource = new EventSource('http://localhost:8080/api/notifications/stream');
      
      eventSource.addEventListener('NOTIFICATION', (e) => {
        const data = JSON.parse(e.data);
        setNotifications((prev) => [
          {
            id: Date.now(),
            title: data.title,
            message: data.message,
            type: data.type || 'INFO',
            time: 'Just now',
          },
          ...prev,
        ]);
      });

      return () => eventSource.close();
    } catch (err) {
      console.log('SSE connection error:', err);
    }
  }, []);

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        title="Real-Time Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-slate-950 rounded-full text-[10px] font-extrabold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 text-white overflow-hidden animate-fade-in">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <span className="font-bold text-xs flex items-center gap-1.5 text-amber-400">
              <Bell size={14} /> Live Event Stream
            </span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={14} />
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto p-2 space-y-2">
            {notifications.map((n) => (
              <div key={n.id} className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-white text-xs">{n.title}</strong>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-slate-300 text-[11px]">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
