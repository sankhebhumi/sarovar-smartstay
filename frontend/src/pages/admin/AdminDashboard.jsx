import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import DashboardCard from '../../components/common/DashboardCard';
import StatusBadge from '../../components/common/StatusBadge';
import { roomAPI, bookingAPI, inventoryAPI, securityAPI } from '../../services/api';
import { BedDouble, CalendarCheck, DollarSign, Utensils, Package, ShieldAlert, BrainCircuit, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [securityStats, setSecurityStats] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [rRes, bRes, iRes, sRes] = await Promise.all([
        roomAPI.getAll(),
        bookingAPI.getAll(),
        inventoryAPI.getAll(),
        securityAPI.getStats(),
      ]);
      setRooms(rRes.data);
      setBookings(bRes.data);
      setInventory(iRes.data);
      setSecurityStats(sRes.data);
    } catch (err) {
      console.log('Error loading dashboard data:', err);
    }
  };

  const occupiedCount = rooms.filter((r) => r.status === 'OCCUPIED').length;
  const availableCount = rooms.filter((r) => r.status === 'AVAILABLE').length;
  const reservedCount = rooms.filter((r) => r.status === 'RESERVED').length;
  const cleaningCount = rooms.filter((r) => r.status === 'CLEANING').length;
  const criticalStockCount = inventory.filter((i) => i.status === 'CRITICAL' || i.status === 'LOW').length;

  const occupancyChartData = [
    { day: 'Mon', rate: 62 },
    { day: 'Tue', rate: 65 },
    { day: 'Wed', rate: 68 },
    { day: 'Thu', rate: 74 },
    { day: 'Fri', rate: 84 },
    { day: 'Sat', rate: 89 },
    { day: 'Sun', rate: 76 },
  ];

  const pieData = [
    { name: 'Available', value: availableCount || 18, color: '#10b981' },
    { name: 'Occupied', value: occupiedCount || 10, color: '#ef4444' },
    { name: 'Reserved', value: reservedCount || 4, color: '#f59e0b' },
    { name: 'Cleaning', value: cleaningCount || 3, color: '#3b82f6' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy text-white p-6 rounded-2xl border border-slate-800 shadow-md">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Sarovar SmartStay Executive Control
              </span>
              <h1 className="text-2xl font-serif font-bold text-white mt-1">Admin Operations &amp; Intelligence Center</h1>
              <p className="text-xs text-slate-300 mt-0.5">Real-time room occupancy, revenue trends, inventory alerts and AI forecasting.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/admin/ai-center" className="btn btn-primary text-xs py-2 px-3">
                <BrainCircuit size={16} /> AI Intelligence Center
              </Link>
              <Link to="/admin/security-center" className="btn btn-outline border-slate-700 text-white hover:bg-slate-800 text-xs py-2 px-3">
                <ShieldAlert size={16} /> Security Center
              </Link>
            </div>
          </div>

          {/* Top KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Guest Rooms"
              value={rooms.length || 35}
              subtitle={`${occupiedCount} Occupied • ${availableCount} Available`}
              icon={BedDouble}
              color="gold"
            />
            <DashboardCard
              title="Today's Occupancy"
              value={`${Math.round(((occupiedCount || 12) / 35) * 100)}%`}
              subtitle="Occupancy Rate"
              trend="+12%"
              icon={CalendarCheck}
              color="blue"
            />
            <DashboardCard
              title="Monthly Revenue"
              value="₹4,85,000"
              subtitle="Room Stays + Pure Veg Restaurant"
              trend="+15.8%"
              icon={DollarSign}
              color="green"
            />
            <DashboardCard
              title="Low Stock Alerts"
              value={criticalStockCount || 3}
              subtitle="Items need restocking"
              icon={Package}
              color="red"
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Occupancy Trend Chart */}
            <div className="lg:col-span-8 card p-5">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Weekly Occupancy Rate (%)</h3>
                  <p className="text-xs text-slate-500">Historical trend &amp; weekend peak prediction</p>
                </div>
                <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">
                  Peak Sat: 89%
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={occupancyChartData}>
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="rate" stroke="#d97706" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRate)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Room Distribution Pie */}
            <div className="lg:col-span-4 card p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm border-b pb-3 mb-4">Room Status Distribution</h3>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                {pieData.map((p) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: p.color }}></span>
                    <span className="text-slate-600">{p.name}: <strong>{p.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Actions & Recent Bookings Table */}
          <div className="card p-5">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Recent Reservations</h3>
              <Link to="/admin/bookings" className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1">
                View All Bookings <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ref Code</th>
                    <th>Customer</th>
                    <th>Room</th>
                    <th>Dates</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id}>
                      <td className="font-mono font-bold text-slate-800">{b.bookingReference}</td>
                      <td>{b.customer ? b.customer.name : 'Amit Kumar'}</td>
                      <td className="font-semibold">Room {b.room ? b.room.roomNumber : '104'}</td>
                      <td className="text-slate-500">{b.checkInDate} to {b.checkOutDate}</td>
                      <td className="font-bold text-amber-600">₹{b.totalAmount}</td>
                      <td><StatusBadge status={b.bookingStatus} /></td>
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

export default AdminDashboard;
