import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationPanel from './NotificationPanel';
import { Hotel, User, LogOut, Shield, ChevronRight, Menu } from 'lucide-react';

const Navbar = ({ onToggleSidebar, isDashboard }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-navy border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Brand Logo & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {isDashboard && (
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle Sidebar"
            >
              <Menu size={22} />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
              <Hotel size={22} />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white tracking-wide block leading-none">
                Sarovar <span className="text-amber-500 font-sans text-xs font-semibold uppercase tracking-widest ml-1">SmartStay</span>
              </span>
              <span className="text-[10px] text-slate-400 font-sans block tracking-wider uppercase mt-0.5">
                Boisar • Maharashtra
              </span>
            </div>
          </Link>
        </div>

        {/* Center/Right Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <Link to="/rooms" className="hover:text-amber-400 transition-colors">Rooms</Link>
          <Link to="/restaurant" className="hover:text-amber-400 transition-colors">Pure Veg Restaurant</Link>
          <Link to="/about" className="hover:text-amber-400 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
        </nav>

        {/* User Account Controls & Real-Time Notification Bell */}
        <div className="flex items-center gap-3">
          <NotificationPanel />

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={
                  user.roles.includes('ROLE_ADMIN') ? '/admin' :
                  user.roles.includes('ROLE_RECEPTIONIST') ? '/reception' :
                  user.roles.includes('ROLE_HOUSEKEEPING') ? '/housekeeping' : '/customer'
                }
                className="hidden sm:flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              >
                <Shield size={14} />
                <span>Dashboard</span>
                <ChevronRight size={14} />
              </Link>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/40">
                  {user.fullName ? user.fullName.charAt(0) : 'U'}
                </div>
                <div className="hidden lg:block text-left text-xs">
                  <p className="text-white font-semibold leading-tight">{user.fullName}</p>
                  <p className="text-slate-400 text-[10px] uppercase font-bold text-amber-400">
                    {user.roles && user.roles[0] ? user.roles[0].replace('ROLE_', '') : 'USER'}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors ml-1"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-outline text-white border-slate-700 hover:bg-slate-800 btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Book Now
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
