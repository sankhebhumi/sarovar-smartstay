import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, BedDouble, CalendarCheck, Users, Briefcase,
  UtensilsCrossed, Package, BrainCircuit, ShieldAlert, FileText,
  Sparkles, CheckCircle2, ShoppingBag, LogOut, Hotel
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  if (!user) return null;

  const role = user.roles && user.roles[0] ? user.roles[0] : 'ROLE_CUSTOMER';

  const getNavLinks = () => {
    switch (role) {
      case 'ROLE_ADMIN':
        return [
          { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/admin/rooms', label: 'Rooms Management', icon: BedDouble },
          { to: '/admin/bookings', label: 'Bookings & Check-in', icon: CalendarCheck },
          { to: '/admin/customers', label: 'Customers', icon: Users },
          { to: '/admin/employees', label: 'Staff & Employees', icon: Briefcase },
          { to: '/admin/restaurant', label: 'Restaurant & Menu', icon: UtensilsCrossed },
          { to: '/admin/inventory', label: 'Inventory & Stock', icon: Package },
          { to: '/admin/ai-center', label: 'AI Intelligence Center', icon: BrainCircuit, badge: 'AI' },
          { to: '/admin/security-center', label: 'Security Center', icon: ShieldAlert, badge: 'SEC' },
          { to: '/admin/reports', label: 'Reports & Analytics', icon: FileText },
        ];

      case 'ROLE_RECEPTIONIST':
        return [
          { to: '/reception', label: 'Reception Dashboard', icon: LayoutDashboard },
          { to: '/reception/rooms', label: 'Room Grid', icon: BedDouble },
          { to: '/reception/bookings', label: 'Check-In / Out', icon: CalendarCheck },
          { to: '/reception/customers', label: 'Customer Directory', icon: Users },
        ];

      case 'ROLE_HOUSEKEEPING':
        return [
          { to: '/housekeeping', label: 'Housekeeping Desk', icon: CheckCircle2 },
          { to: '/housekeeping/rooms', label: 'Assigned Rooms', icon: BedDouble },
        ];

      case 'ROLE_RESTAURANT_STAFF':
        return [
          { to: '/restaurant-staff', label: 'Kitchen & Orders', icon: UtensilsCrossed },
          { to: '/restaurant-staff/menu', label: 'Menu Catalog', icon: ShoppingBag },
          { to: '/restaurant-staff/inventory', label: 'Kitchen Stock', icon: Package },
        ];

      case 'ROLE_CUSTOMER':
      default:
        return [
          { to: '/customer', label: 'My Portal', icon: LayoutDashboard },
          { to: '/customer/bookings', label: 'My Bookings', icon: CalendarCheck },
          { to: '/customer/restaurant', label: 'Order Food', icon: UtensilsCrossed },
          { to: '/customer/recommendations', label: 'AI Recommendations', icon: Sparkles, badge: 'AI' },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Hotel size={18} />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-white leading-tight">Sarovar Portal</h2>
              <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">
                {role.replace('ROLE_', '')}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/admin' || link.to === '/reception' || link.to === '/customer' || link.to === '/housekeeping'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="text-xs font-semibold text-white truncate">{user.fullName}</p>
              <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
