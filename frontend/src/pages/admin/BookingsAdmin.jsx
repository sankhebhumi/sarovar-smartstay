import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import { bookingAPI } from '../../services/api';
import { CalendarCheck, LogIn, LogOut, CheckCircle } from 'lucide-react';

const BookingsAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await bookingAPI.getAll();
      setBookings(res.data);
    } catch (err) {
      console.log('Error loading bookings:', err);
    }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      await bookingAPI.checkIn(bookingId);
      alert('Check-in completed successfully! Room status updated to OCCUPIED.');
      fetchBookings();
    } catch (err) {
      alert('Error during check-in.');
    }
  };

  const handleCheckOut = async (bookingId) => {
    try {
      await bookingAPI.checkOut(bookingId);
      alert('Check-out completed successfully! Room status updated to CLEANING.');
      fetchBookings();
    } catch (err) {
      alert('Error during check-out.');
    }
  };

  const filteredBookings = bookings.filter(b => filterStatus === 'ALL' || b.bookingStatus === filterStatus);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Reservations &amp; Reception Desk</h1>
              <p className="text-xs text-slate-500">Manage guest bookings, check-in arrivals, and check-out room releases.</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select text-xs py-1.5 px-3"
              >
                <option value="ALL">All Booking Statuses</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="CHECKED_IN">CHECKED_IN</option>
                <option value="CHECKED_OUT">CHECKED_OUT</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>

          <div className="card p-5">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ref Code</th>
                    <th>Customer Name</th>
                    <th>Room</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Total Amount</th>
                    <th>Booking Status</th>
                    <th>Action Workflow</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td className="font-mono font-bold text-slate-900">{b.bookingReference}</td>
                      <td className="font-semibold">{b.customer ? b.customer.name : 'Guest'}</td>
                      <td>
                        <span className="font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 text-xs">
                          Room {b.room ? b.room.roomNumber : '101'}
                        </span>
                      </td>
                      <td className="text-xs text-slate-600">{b.checkInDate}</td>
                      <td className="text-xs text-slate-600">{b.checkOutDate}</td>
                      <td className="font-bold text-amber-600">₹{b.totalAmount}</td>
                      <td><StatusBadge status={b.bookingStatus} /></td>
                      <td>
                        {b.bookingStatus === 'CONFIRMED' && (
                          <button
                            onClick={() => handleCheckIn(b.id)}
                            className="btn btn-primary btn-sm text-[11px] py-1 px-2 flex items-center gap-1"
                          >
                            <LogIn size={14} /> Perform Check-In
                          </button>
                        )}
                        {b.bookingStatus === 'CHECKED_IN' && (
                          <button
                            onClick={() => handleCheckOut(b.id)}
                            className="btn btn-outline border-red-300 text-red-700 hover:bg-red-50 btn-sm text-[11px] py-1 px-2 flex items-center gap-1"
                          >
                            <LogOut size={14} /> Perform Check-Out
                          </button>
                        )}
                        {b.bookingStatus === 'CHECKED_OUT' && (
                          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                            <CheckCircle size={14} className="text-emerald-500" /> Checked Out
                          </span>
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

export default BookingsAdmin;
