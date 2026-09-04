import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';
import { roomAPI, bookingAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BedDouble, Users, Wifi, Tv, Wind, Coffee, Calendar, CheckCircle2, ShieldCheck, Plus, Sparkles } from 'lucide-react';

const RoomsPublic = () => {
  const [rooms, setRooms] = useState([]);
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Booking Form State
  const [checkIn, setCheckIn] = useState('2026-08-27');
  const [checkOut, setCheckOut] = useState('2026-08-29');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

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

  const filteredRooms = rooms.filter((room) => {
    const matchesType = filterType === 'ALL' || (room.roomType && room.roomType.name === filterType);
    const matchesStatus = filterStatus === 'ALL' || room.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const handleOpenBooking = (room) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const calculateNights = () => {
    const nights = Math.max(1, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return isNaN(nights) ? 1 : nights;
  };

  const nightsCount = calculateNights();
  const estimatedTotal = selectedRoom ? selectedRoom.pricePerNight * nightsCount : 0;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    try {
      await bookingAPI.create({
        customerId: 1,
        roomId: selectedRoom.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests: parseInt(guests),
        specialRequests: specialRequests,
      });

      setToastMsg(`Booking Confirmed! Room ${selectedRoom.roomNumber} status updated to RESERVED.`);
      setIsModalOpen(false);
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating booking. Room may be already booked.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      {/* Header */}
      <div className="bg-navy text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
            Hotel Sarovar Boisar • 35 Guest Rooms
          </span>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">Accommodation Directory &amp; Suites</h1>
          <p className="text-sm text-slate-300 mt-1">Interactive status grid showing room availability, AC amenities, and instant reservation wizard.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Interactive Filter Pills */}
        <div className="card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['ALL', 'Standard Room', 'Deluxe Room', 'Premium Room', 'Family Room', 'Executive Suite'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  filterType === cat ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold uppercase">Status Filter:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-select text-xs py-1 px-3 w-auto"
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="OCCUPIED">OCCUPIED</option>
              <option value="RESERVED">RESERVED</option>
              <option value="CLEANING">CLEANING</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
            </select>
          </div>
        </div>

        {/* Room Grid Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.id} className="card p-5 flex flex-col justify-between hover:border-amber-300 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 group-hover:border-amber-400 transition-colors">
                      Room {room.roomNumber}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">Floor {room.floor}</span>
                  </div>
                  <StatusBadge status={room.status} />
                </div>

                <h3 className="font-bold text-slate-800 text-sm">{room.roomType ? room.roomType.name : 'Standard'}</h3>
                
                <p className="text-2xl font-bold text-amber-600 mt-1 font-sans">
                  ₹{room.pricePerNight?.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-slate-500">/ night</span>
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-semibold"><Users size={14} className="text-amber-500" /> {room.capacity} Guests</span>
                  <span className="flex items-center gap-1 font-semibold"><BedDouble size={14} className="text-amber-500" /> {room.bedType}</span>
                </div>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{room.amenities}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                {room.status === 'AVAILABLE' ? (
                  <button
                    onClick={() => handleOpenBooking(room)}
                    className="w-full btn btn-primary py-2 text-xs shadow-sm"
                  >
                    Reserve Room {room.roomNumber}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full btn btn-outline bg-slate-50 text-slate-400 border-slate-200 text-xs cursor-not-allowed"
                  >
                    {room.status}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Interactive Booking Modal with Price Calculator */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Book Room ${selectedRoom?.roomNumber}`}>
        <form onSubmit={handleConfirmBooking} className="space-y-4">
          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs">
            <p className="font-bold text-amber-900 text-sm">Room {selectedRoom?.roomNumber} • {selectedRoom?.roomType?.name}</p>
            <p className="text-amber-800 mt-0.5">Base Rate: ₹{selectedRoom?.pricePerNight?.toLocaleString('en-IN')} / night</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label text-xs">Check-In Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="form-input text-xs"
              />
            </div>
            <div>
              <label className="form-label text-xs">Check-Out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="form-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label text-xs">Number of Guests</label>
              <input
                type="number"
                min="1"
                max={selectedRoom?.capacity || 4}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="form-label text-xs">Estimated Stay Cost</label>
              <div className="p-2.5 bg-slate-900 text-amber-400 rounded-xl font-bold text-sm text-center">
                ₹{estimatedTotal.toLocaleString('en-IN')} ({nightsCount} Night{nightsCount > 1 ? 's' : ''})
              </div>
            </div>
          </div>

          <div>
            <label className="form-label text-xs">Special Requests (Optional)</label>
            <textarea
              rows="2"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="High floor room, quiet side, late check-in..."
              className="form-textarea text-xs"
            />
          </div>

          <div className="pt-3 border-t flex items-center justify-between">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline text-xs">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary text-xs shadow">
              Confirm &amp; Reserve Room
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoomsPublic;
