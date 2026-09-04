import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import Toast from '../../components/common/Toast';
import { FileText, Download, TrendingUp, DollarSign, BedDouble, Utensils } from 'lucide-react';

const ReportsAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleDownloadCsv = (endpoint, reportTitle) => {
    setToastMsg(`Generating & Downloading ${reportTitle}...`);
    window.open(`http://localhost:8080/api/reports/${endpoint}`, '_blank');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Hotel Analytics &amp; Reports Center</h1>
              <p className="text-xs text-slate-500">Generate and export official CSV reports for hotel management &amp; college viva evaluation.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-5 space-y-3 border-t-4 border-t-amber-500 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <BedDouble className="text-amber-600" size={18} /> Occupancy &amp; Room Performance
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete status export for all 35 rooms, including current floor allocation, room type category, rate/night, and housekeeping states.
              </p>
              <button
                onClick={() => handleDownloadCsv('occupancy/csv', 'Room Occupancy Report')}
                className="btn btn-primary text-xs w-full flex items-center justify-center gap-1.5 shadow"
              >
                <Download size={14} /> Download Occupancy CSV
              </button>
            </div>

            <div className="card p-5 space-y-3 border-t-4 border-t-emerald-500 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <DollarSign className="text-emerald-600" size={18} /> Financial &amp; Booking Audit
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Financial summary of all room reservations, guest details, total amount, check-in/out dates, and payment verification status.
              </p>
              <button
                onClick={() => handleDownloadCsv('financial/csv', 'Financial Audit Report')}
                className="btn btn-primary text-xs w-full flex items-center justify-center gap-1.5 shadow"
              >
                <Download size={14} /> Download Financial CSV
              </button>
            </div>

            <div className="card p-5 space-y-3 border-t-4 border-t-blue-500 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Utensils className="text-blue-600" size={18} /> Restaurant Sales &amp; Kitchen Orders
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sales breakdown of Hotel Sarovar Pure Veg kitchen orders, order types (Dine-in, Room Service), subtotal, 5% GST, and total revenue.
              </p>
              <button
                onClick={() => handleDownloadCsv('restaurant/csv', 'Restaurant Sales Report')}
                className="btn btn-primary text-xs w-full flex items-center justify-center gap-1.5 shadow"
              >
                <Download size={14} /> Download Restaurant CSV
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ReportsAdmin;
