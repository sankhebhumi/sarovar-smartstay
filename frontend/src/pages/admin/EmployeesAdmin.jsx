import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import { employeeAPI } from '../../services/api';
import { Briefcase, UserCheck, Phone, Mail, Clock } from 'lucide-react';

const EmployeesAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [deptFilter, setDeptFilter] = useState('ALL');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await employeeAPI.getAll();
      setEmployees(res.data);
    } catch (err) {
      console.log('Error fetching employees:', err);
    }
  };

  const filteredEmployees = employees.filter(e => deptFilter === 'ALL' || e.department === deptFilter);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Hotel Staff Directory</h1>
              <p className="text-xs text-slate-500">Manage 15+ employees across Management, Reception, Kitchen, Housekeeping &amp; Security.</p>
            </div>

            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="form-select text-xs py-1.5 px-3 w-auto"
            >
              <option value="ALL">All Departments</option>
              <option value="Management">Management</option>
              <option value="Reception">Reception</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Security">Security</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="card p-5 flex flex-col justify-between hover:shadow-md transition-all border-l-4 border-l-amber-500">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {emp.employeeCode}
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {emp.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{emp.name}</h3>
                  <p className="text-xs font-semibold text-amber-600">{emp.designation}</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Department: {emp.department}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" /> <span>{emp.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" /> <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-400" /> <span>Shift: <strong>{emp.shift}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
};

export default EmployeesAdmin;
