import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { roomAPI } from '../../services/api';
import { BedDouble, Edit, RefreshCw } from 'lucide-react';

const RoomsAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('AVAILABLE');
  const [newHousekeeping, setNewHousekeeping] = useState('CLEAN');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await roomAPI.getAll();
      setRooms(res.data);
    } catch (err) {
      console.log('Error fetching rooms:', err);
    }
  };

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setNewStatus(room.status);
    setNewHousekeeping(room.housekeepingStatus || 'CLEAN');
    setIsModalOpen(true);
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      await roomAPI.updateStatus(selectedRoom.id, {
        status: newStatus,
        housekeepingStatus: newHousekeeping,
      });
      setIsModalOpen(false);
      fetchRooms();
    } catch (err) {
      alert('Error updating room status.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Room Management Directory</h1>
              <p className="text-xs text-slate-500">Manage all 35 hotel room statuses, housekeeping states, and room pricing.</p>
            </div>
            <button onClick={fetchRooms} className="btn btn-outline text-xs">
              <RefreshCw size={14} /> Refresh Grid
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rooms.map((room) => (
              <div key={room.id} className="card p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border">
                      Room {room.roomNumber}
                    </span>
                    <StatusBadge status={room.status} />
                  </div>

                  <p className="text-xs font-bold text-slate-700">{room.roomType ? room.roomType.name : 'Standard'}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Floor {room.floor} • Capacity: {room.capacity}</p>
                  <p className="text-sm font-bold text-amber-600 mt-2">₹{room.pricePerNight} / night</p>
                  
                  <div className="mt-2 text-[11px] text-slate-500">
                    Housekeeping: <strong className="text-slate-800">{room.housekeepingStatus || 'CLEAN'}</strong>
                  </div>
                </div>

                <button
                  onClick={() => handleEditClick(room)}
                  className="mt-4 w-full btn btn-outline btn-sm text-xs py-1.5 flex items-center justify-center gap-1"
                >
                  <Edit size={14} /> Change Status
                </button>
              </div>
            ))}
          </div>

        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Update Status - Room ${selectedRoom?.roomNumber}`}>
        <form onSubmit={handleUpdateRoom} className="space-y-4">
          <div>
            <label className="form-label">Main Room Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="form-select text-xs"
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="RESERVED">RESERVED</option>
              <option value="OCCUPIED">OCCUPIED</option>
              <option value="CLEANING">CLEANING</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
            </select>
          </div>

          <div>
            <label className="form-label">Housekeeping Cleaning Status</label>
            <select
              value={newHousekeeping}
              onChange={(e) => setNewHousekeeping(e.target.value)}
              className="form-select text-xs"
            >
              <option value="CLEAN">CLEAN</option>
              <option value="DIRTY">DIRTY</option>
              <option value="CLEANING">CLEANING</option>
              <option value="INSPECTION">INSPECTION</option>
            </select>
          </div>

          <div className="pt-3 border-t flex justify-end gap-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline text-xs">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary text-xs">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoomsAdmin;
