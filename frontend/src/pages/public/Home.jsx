import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Toast from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import {
  Hotel, BedDouble, UtensilsCrossed, Shield, Sparkles, Phone, MapPin,
  ChevronRight, Calendar, Users, CheckCircle2, ArrowRight, Star, Clock,
  Cpu, Lock, Search, Heart, ShoppingBag, Eye, Zap
} from 'lucide-react';

const Home = () => {
  const [checkIn, setCheckIn] = useState('2026-08-27');
  const [checkOut, setCheckOut] = useState('2026-08-29');
  const [guests, setGuests] = useState(2);
  const [roomCategory, setRoomCategory] = useState('ALL');
  const [searchResult, setSearchResult] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('ai');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSearchRooms = (e) => {
    e.preventDefault();
    const nights = Math.max(1, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    setSearchResult({
      availableCount: 18,
      category: roomCategory === 'ALL' ? 'Deluxe & Premium Rooms' : roomCategory,
      nights: nights,
      estPrice: roomCategory === 'Executive Suite' ? 7500 * nights : 3500 * nights,
    });
    setToastMessage('Rooms checked! 18 rooms available for selected dates.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleQuickDemoLogin = async (email, password, route) => {
    try {
      await login(email, password);
      setToastMessage(`Authenticated as ${email.split('@')[0]}! Redirecting...`);
      setTimeout(() => navigate(route), 1000);
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Hero Section with Glassmorphism & Interactive Booking Bar */}
      <section className="relative bg-navy text-white py-16 lg:py-24 overflow-hidden">
        {/* Decorative Grid & Glow Background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles size={14} className="animate-pulse-slow text-amber-400" /> Hotel Sarovar • Boisar, Maharashtra
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
                Sarovar SmartStay <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 font-sans text-2xl sm:text-3xl lg:text-4xl font-normal block mt-2">
                  Intelligent Hotel, Analytics &amp; Security Platform
                </span>
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                Experience seamless luxury hospitality integrated with <strong>Internet Programming</strong>, <strong>Artificial Intelligence forecasting</strong>, and enterprise <strong>Cybersecurity audit controls</strong>.
              </p>

              {/* Interactive Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/rooms" className="btn btn-primary px-6 py-3 text-sm shadow-lg shadow-amber-600/30">
                  <BedDouble size={18} /> Explore 35 Rooms
                </Link>
                <Link to="/restaurant" className="btn btn-outline border-slate-700 text-white hover:bg-slate-800 px-6 py-3 text-sm">
                  <UtensilsCrossed size={18} /> Pure Veg Menu (55+ Items)
                </Link>
              </div>

              {/* Live Counter Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-slate-300">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <h4 className="text-2xl font-bold text-white">35 Rooms</h4>
                  <p className="text-[11px] text-slate-400">100% AC &amp; High-Speed WiFi</p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <h4 className="text-2xl font-bold text-white">55+ Dishes</h4>
                  <p className="text-[11px] text-slate-400">Authentic Pure Veg Menu</p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <h4 className="text-2xl font-bold text-amber-400">5 AI Models</h4>
                  <p className="text-[11px] text-slate-400">Predictive Analytics</p>
                </div>
              </div>
            </div>

            {/* Right: Live Demo Portal Selector Card */}
            <div className="lg:col-span-5">
              <div className="glass-dark rounded-2xl p-6 shadow-2xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                    <Zap className="text-amber-500" size={18} /> 1-Click Interactive Role Launcher
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">
                    Live Demo
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-4">
                  Click any role below to launch the interactive portal with pre-loaded demo credentials:
                </p>

                <div className="space-y-2.5">
                  <button
                    onClick={() => handleQuickDemoLogin('admin@sarovar.com', 'Admin@123', '/admin')}
                    className="w-full p-3 bg-slate-800/80 hover:bg-slate-700/90 rounded-xl border border-slate-700/80 flex items-center justify-between transition-all group text-left"
                  >
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                        <Shield size={14} className="text-amber-500" /> Admin Operations &amp; Security Center
                      </span>
                      <span className="text-[10px] text-slate-400">Occupancy, AI Forecasts &amp; Audit Logs</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('reception@sarovar.com', 'Reception@123', '/reception')}
                    className="w-full p-3 bg-slate-800/80 hover:bg-slate-700/90 rounded-xl border border-slate-700/80 flex items-center justify-between transition-all group text-left"
                  >
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-400" /> Reception Desk &amp; Check-In
                      </span>
                      <span className="text-[10px] text-slate-400">Interactive 35-Room Grid &amp; Arrival Releases</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('housekeeping@sarovar.com', 'House@123', '/housekeeping')}
                    className="w-full p-3 bg-slate-800/80 hover:bg-slate-700/90 rounded-xl border border-slate-700/80 flex items-center justify-between transition-all group text-left"
                  >
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-400" /> Housekeeping Cleaning Desk
                      </span>
                      <span className="text-[10px] text-slate-400">Assigned Rooms &amp; Mark Cleaned Workflow</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('customer@sarovar.com', 'Customer@123', '/customer')}
                    className="w-full p-3 bg-slate-800/80 hover:bg-slate-700/90 rounded-xl border border-slate-700/80 flex items-center justify-between transition-all group text-left"
                  >
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                        <Users size={14} className="text-purple-400" /> Customer Reservations &amp; Food Ordering
                      </span>
                      <span className="text-[10px] text-slate-400">Room Booking Wizard &amp; AI Menu Recommendations</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Booking Search Widget */}
      <section className="relative -mt-8 z-30 max-w-6xl mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl p-5 shadow-2xl border border-slate-200/80">
          <form onSubmit={handleSearchRooms} className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="form-label text-xs">Check-In Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="form-label text-xs">Check-Out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="form-label text-xs">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="form-select text-xs"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>

            <div>
              <label className="form-label text-xs">Room Category</label>
              <select
                value={roomCategory}
                onChange={(e) => setRoomCategory(e.target.value)}
                className="form-select text-xs"
              >
                <option value="ALL">All Categories</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Premium Room">Premium Room</option>
                <option value="Family Room">Family Room</option>
                <option value="Executive Suite">Executive Suite</option>
              </select>
            </div>

            <div>
              <button type="submit" className="w-full btn btn-primary py-2.5 text-xs">
                <Search size={16} /> Check Availability
              </button>
            </div>
          </form>

          {/* Search Result Overlay Banner */}
          {searchResult && (
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
              <div>
                <span className="font-bold text-amber-900 text-sm block">
                  ✓ {searchResult.availableCount} Rooms Available for {searchResult.category}
                </span>
                <p className="text-amber-800">
                  Selected Stay: {searchResult.nights} Night(s) • Est. Total: <strong>₹{searchResult.estPrice.toLocaleString('en-IN')}</strong>
                </p>
              </div>

              <Link to="/rooms" className="btn btn-primary btn-sm text-xs py-1.5 px-4 whitespace-nowrap">
                Proceed to Book Room
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Subject Integration Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              College Capstone Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
              Full-Stack Architecture &amp; 3 Subject Integration
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 border-t-4 border-t-amber-500">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 font-bold">
                <Cpu size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Internet Programming</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                React.js Vite single page application with Axios REST API clients, React Router role guarding, Java 17 Spring Boot backend, Spring Data JPA, and MySQL relational entities.
              </p>
              <Link to="/rooms" className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 mt-4 hover:underline">
                Explore Rooms API <ChevronRight size={14} />
              </Link>
            </div>

            <div className="card p-6 border-t-4 border-t-blue-500">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Artificial Intelligence</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Content-based food recommendation pair scoring, 7-day moving consumption demand prediction, weekly room occupancy time-series, and staffing optimization insights.
              </p>
              <Link to="/restaurant" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 mt-4 hover:underline">
                View AI Recommendations <ChevronRight size={14} />
              </Link>
            </div>

            <div className="card p-6 border-t-4 border-t-emerald-500">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 font-bold">
                <Lock size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Cybersecurity</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                BCrypt password hashing algorithm, Spring Security JWT stateless session handling, fine-grained Role-Based Access Control (RBAC), and real-time security audit log tracking.
              </p>
              <Link to="/login" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 mt-4 hover:underline">
                Test Role-Based Login <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pure Veg Restaurant Spotlight (Menu extracted from uploaded photos) */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Hotel Sarovar Pure Veg</span>
              <h2 className="text-3xl font-serif font-bold text-white mt-1">Authentic Pure Vegetarian Delicacies</h2>
              <p className="text-xs text-slate-400 mt-1">Extracted directly from Sarovar Hotel menu photos (Boisar MIDC).</p>
            </div>

            <Link to="/restaurant" className="btn btn-primary text-xs py-2.5 px-5">
              Browse Full 55+ Item Menu <ChevronRight size={16} />
            </Link>
          </div>

          {/* Sample Menu Cards Showcase */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 hover:border-amber-500/50 transition-colors">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Starters</span>
              <h4 className="font-bold text-white text-sm mt-1">Paneer Tikka Fry</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Pan-fried spiced paneer cubes</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700">
                <span className="font-bold text-amber-400 text-sm">₹200</span>
                <Link to="/restaurant" className="text-[11px] text-slate-300 hover:text-amber-400 font-semibold">Order +</Link>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 hover:border-amber-500/50 transition-colors">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Punjabi Special</span>
              <h4 className="font-bold text-white text-sm mt-1">Paneer Tikka Masala</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Rich tomato butter gravy</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700">
                <span className="font-bold text-amber-400 text-sm">₹182</span>
                <Link to="/restaurant" className="text-[11px] text-slate-300 hover:text-amber-400 font-semibold">Order +</Link>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 hover:border-amber-500/50 transition-colors">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Thali &amp; Meals</span>
              <h4 className="font-bold text-white text-sm mt-1">Punjabi Lunch Thali</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Full thali with subzi, dal &amp; sweet</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700">
                <span className="font-bold text-amber-400 text-sm">₹183</span>
                <Link to="/restaurant" className="text-[11px] text-slate-300 hover:text-amber-400 font-semibold">Order +</Link>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 hover:border-amber-500/50 transition-colors">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Beverages</span>
              <h4 className="font-bold text-white text-sm mt-1">Cold Coffee</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Rich chilled espresso shake</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700">
                <span className="font-bold text-amber-400 text-sm">₹100</span>
                <Link to="/restaurant" className="text-[11px] text-slate-300 hover:text-amber-400 font-semibold">Order +</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
              <Hotel className="text-amber-500" size={20} /> Hotel Sarovar Pure Veg
            </div>
            <p className="text-xs leading-relaxed">
              P-25, MIDC Road, Boisar - 401 506, Maharashtra.<br />
              GST NO: 27AACFH8311B1ZV
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Contact Desk</h5>
            <p className="text-xs text-slate-300">Mob: +91 7378834756</p>
            <p className="text-xs text-slate-300">Tel: 270026 / 271253</p>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h5>
            <ul className="space-y-1 text-xs">
              <li><Link to="/rooms" className="hover:text-amber-400">Browse 35 Rooms</Link></li>
              <li><Link to="/restaurant" className="hover:text-amber-400">Pure Veg Menu</Link></li>
              <li><Link to="/login" className="hover:text-amber-400">Demo Sign-In</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Capstone Credits</h5>
            <p className="text-xs leading-relaxed text-slate-400">
              Sarovar SmartStay — Intelligent Hotel Management System.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
