import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import { roomAPI } from '../../services/api';
import { CheckCircle2, RefreshCw, Sparkles, BedDouble } from 'lucide-react';

const HousekeepingDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await roomAPI.getAll();
      setRooms(res.data);
    } catch (err) {
      console.log('Error fetching housekeeping rooms:', err);
    }
  };

  const handleMarkCleaned = async (roomId) => {
    try {
      await roomAPI.updateStatus(roomId, {
        status: 'AVAILABLE',
        housekeepingStatus: 'CLEAN',
      });
      alert('Room marked as CLEAN & AVAILABLE!');
      fetchRooms();
    } catch (err) {
      alert('Error updating room housekeeping status.');
    }
  };

  const dirtyRooms = rooms.filter(r => r.status === 'CLEANING' || r.housekeepingStatus === 'DIRTY');
  const cleanRooms = rooms.filter(r => r.housekeepingStatus === 'CLEAN');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Housekeeping &amp; Cleaning Portal</h1>
              <p className="text-xs text-slate-500">Track rooms requiring cleaning and update room availability status.</p>
            </div>
            <button onClick={fetchRooms} className="btn btn-outline text-xs">
              <RefreshCw size={14} /> Refresh Tasks
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-4 bg-sky-50 border-sky-200">
              <p className="text-xs font-bold text-sky-900 uppercase">Rooms Needing Cleaning</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{dirtyRooms.length} Rooms</h3>
            </div>
            <div className="card p-4 bg-emerald-50 border-emerald-200">
              <p className="text-xs font-bold text-emerald-900 uppercase">Clean &amp; Ready Rooms</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{cleanRooms.length} Rooms</h3>
            </div>
          </div>

          {/* Rooms Needing Cleaning Grid */}
          <div className="card p-5">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-3 mb-4">Assigned Cleaning Tasks</h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dirtyRooms.map((room) => (
                <div key={room.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-slate-900">Room {room.roomNumber}</span>
                      <StatusBadge status={room.status} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">{room.roomType?.name}</p>
                    <p className="text-xs text-slate-500">Floor {room.floor} • Housekeeping: <strong className="text-red-700">{room.housekeepingStatus || 'DIRTY'}</strong></p>
                  </div>

                  <button
                    onClick={() => handleMarkCleaned(room.id)}
                    className="mt-4 btn btn-primary btn-sm text-xs py-2 w-full flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 size={16} /> Mark Cleaned &amp; Available
                  </button>
                </div>
              ))}
              {dirtyRooms.length === 0 && (
                <div className="col-span-full py-8 text-center text-slate-500 text-xs font-semibold">
                  ✓ All rooms are clean and ready for guest check-in!
                </div>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default HousekeepingDashboard;
