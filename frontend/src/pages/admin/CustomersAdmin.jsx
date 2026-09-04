import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import { customerAPI } from '../../services/api';
import { Users, Phone, Mail, MapPin, Award } from 'lucide-react';

const CustomersAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await customerAPI.getAll();
      setCustomers(res.data);
    } catch (err) {
      console.log('Error fetching customers:', err);
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
              <h1 className="text-2xl font-serif font-bold text-slate-900">Customer Records</h1>
              <p className="text-xs text-slate-500">View guest stay history, spending metrics, and ID verification records.</p>
            </div>
          </div>

          <div className="card p-5">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>ID Proof</th>
                    <th>Total Visits</th>
                    <th>Total Spending</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td className="font-bold text-slate-900">{c.name}</td>
                      <td className="text-xs text-slate-600">{c.email}</td>
                      <td className="text-xs text-slate-600">{c.phone}</td>
                      <td className="text-xs text-slate-500">{c.idType || 'Aadhar'}: {c.idNumber || 'XXXX-XXXX'}</td>
                      <td className="font-bold text-slate-800">{c.numberOfVisits || 1} Visits</td>
                      <td className="font-bold text-amber-600">₹{c.totalSpending || 2500}</td>
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

export default CustomersAdmin;
