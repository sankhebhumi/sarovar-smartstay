import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import { bookingAPI, restaurantAPI, aiAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { CalendarCheck, UtensilsCrossed, Sparkles, Clock, BedDouble, ChevronRight } from 'lucide-react';

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [recommendations, setRecommendations] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchCustomerPortalData();
  }, []);

  const fetchCustomerPortalData = async () => {
    try {
      const [bRes, oRes, aiRes] = await Promise.all([
        bookingAPI.getByCustomer(1),
        restaurantAPI.getOrders(),
        aiAPI.getFoodRecommendations(1),
      ]);
      setMyBookings(bRes.data);
      setMyOrders(oRes.data);
      setRecommendations(aiRes.data);
    } catch (err) {
      console.log('Error loading customer portal data:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-navy to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Sarovar SmartStay Guest Portal
            </span>
            <h1 className="text-2xl font-serif font-bold text-white mt-1">Welcome, {user?.fullName || 'Valued Guest'}</h1>
            <p className="text-xs text-slate-300 mt-0.5">Manage your room reservations, explore Pure Veg menu specials, and view AI recommendations.</p>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Link to="/rooms" className="btn btn-primary text-xs py-2 px-4">
                Book a Room <ChevronRight size={14} />
              </Link>
              <Link to="/restaurant" className="btn btn-outline border-slate-700 text-white hover:bg-slate-800 text-xs py-2 px-4">
                Order Food Online
              </Link>
            </div>
          </div>

          {/* AI Recommendation Highlight */}
          {recommendations && (
            <div className="card p-5 bg-gradient-to-r from-amber-50 to-amber-100/40 border-amber-200">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-1">
                <Sparkles className="text-amber-600" size={18} /> Recommended for Your Stay
              </h3>
              <p className="text-xs text-slate-600 mb-3">{recommendations.explanation}</p>

              <div className="grid sm:grid-cols-3 gap-3">
                {recommendations.recommendedItems?.map((rec) => (
                  <div key={rec.id} className="bg-white p-3 rounded-lg border border-amber-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900 block">{rec.name}</span>
                      <span className="text-amber-600 font-bold">₹{rec.price}</span>
                    </div>
                    <Link to="/restaurant" className="btn btn-primary btn-sm px-2 py-1 text-[11px]">
                      Order Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Reservations & Orders */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* My Bookings */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-3 mb-4 flex items-center gap-2">
                <BedDouble className="text-amber-600" size={18} /> My Room Bookings
              </h3>

              <div className="space-y-3">
                {myBookings.map((b) => (
                  <div key={b.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-slate-900 block">{b.bookingReference}</span>
                      <p className="text-slate-600">Room {b.room?.roomNumber} • {b.checkInDate} to {b.checkOutDate}</p>
                      <p className="font-bold text-amber-600 mt-0.5">₹{b.totalAmount}</p>
                    </div>
                    <StatusBadge status={b.bookingStatus} />
                  </div>
                ))}
              </div>
            </div>

            {/* My Food Orders */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-3 mb-4 flex items-center gap-2">
                <UtensilsCrossed className="text-amber-600" size={18} /> My Restaurant Orders
              </h3>

              <div className="space-y-3">
                {myOrders.slice(0, 4).map((o) => (
                  <div key={o.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold text-slate-900 block">{o.orderNumber}</span>
                      <p className="text-slate-600">Type: {o.orderType}</p>
                      <p className="font-bold text-amber-600 mt-0.5">₹{o.totalAmount}</p>
                    </div>
                    <StatusBadge status={o.orderStatus} />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
