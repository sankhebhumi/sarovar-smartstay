import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import { roomAPI, bookingAPI } from '../../services/api';
import { CalendarCheck, LogIn, LogOut, BedDouble, Search } from 'lucide-react';

const ReceptionDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rRes, bRes] = await Promise.all([
        roomAPI.getAll(),
        bookingAPI.getAll(),
      ]);
      setRooms(rRes.data);
      setBookings(bRes.data);
    } catch (err) {
      console.log('Error loading reception data:', err);
    }
  };

  const handleCheckIn = async (id) => {
    await bookingAPI.checkIn(id);
    alert('Check-In Successful! Room status updated to OCCUPIED.');
    fetchData();
  };

  const handleCheckOut = async (id) => {
    await bookingAPI.checkOut(id);
    alert('Check-Out Successful! Room status updated to CLEANING.');
    fetchData();
  };

  const availableRooms = rooms.filter(r => r.status === 'AVAILABLE');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Front Desk Reception Portal</h1>
              <p className="text-xs text-slate-500">Fast check-in, check-out releases, guest registration, and room grid.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="card p-4 bg-amber-500/10 border-amber-200">
              <p className="text-xs font-bold text-amber-800 uppercase">Available Rooms</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{availableRooms.length} Rooms</h3>
            </div>
            <div className="card p-4 bg-emerald-500/10 border-emerald-200">
              <p className="text-xs font-bold text-emerald-800 uppercase">Active Bookings</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{bookings.length} Guests</h3>
            </div>
            <div className="card p-4 bg-blue-500/10 border-blue-200">
              <p className="text-xs font-bold text-blue-800 uppercase">Total Rooms</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">35 Rooms</h3>
            </div>
          </div>

          {/* Booking Arrival Queue */}
          <div className="card p-5">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-3 mb-4">Today's Check-In &amp; Check-Out Desk</h3>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ref Code</th>
                    <th>Customer Name</th>
                    <th>Room</th>
                    <th>Dates</th>
                    <th>Status</th>
                    <th>Reception Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="font-mono font-bold">{b.bookingReference}</td>
                      <td>{b.customer ? b.customer.name : 'Guest'}</td>
                      <td className="font-bold text-amber-600">Room {b.room ? b.room.roomNumber : '101'}</td>
                      <td className="text-xs text-slate-500">{b.checkInDate} to {b.checkOutDate}</td>
                      <td><StatusBadge status={b.bookingStatus} /></td>
                      <td>
                        {b.bookingStatus === 'CONFIRMED' && (
                          <button onClick={() => handleCheckIn(b.id)} className="btn btn-primary btn-sm text-[11px] py-1">
                            <LogIn size={14} /> Check-In Guest
                          </button>
                        )}
                        {b.bookingStatus === 'CHECKED_IN' && (
                          <button onClick={() => handleCheckOut(b.id)} className="btn btn-outline border-red-300 text-red-700 btn-sm text-[11px] py-1">
                            <LogOut size={14} /> Check-Out Guest
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
