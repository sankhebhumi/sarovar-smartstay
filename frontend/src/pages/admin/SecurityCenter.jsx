import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import Toast from '../../components/common/Toast';
import { securityAPI } from '../../services/api';
import { ShieldAlert, ShieldCheck, Lock, Key, AlertTriangle, FileText, CheckCircle2, Zap, RefreshCw, Filter } from 'lucide-react';

const SecurityCenter = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [simulatedFailures, setSimulatedFailures] = useState(0);
  const [toastMsg, setToastMsg] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      const [lRes, sRes] = await Promise.all([
        securityAPI.getLogs(),
        securityAPI.getStats(),
      ]);
      setLogs(lRes.data);
      setStats(sRes.data);
    } catch (err) {
      console.log('Error loading security logs:', err);
    }
  };

  const handleSimulateAttack = () => {
    const newCount = simulatedFailures + 3;
    setSimulatedFailures(newCount);
    
    const newLog = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      username: 'unknown_attacker',
      action: 'FAILED_LOGIN_ATTEMPT',
      ipAddress: '203.0.113.45',
      status: newCount >= 6 ? 'SUSPICIOUS' : 'FAILED',
      riskScore: newCount >= 6 ? 85 : 50,
      details: `Rate limit anomaly triggered - ${newCount} consecutive failed attempts from IP 203.0.113.45`,
    };

    setLogs((prev) => [newLog, ...prev]);
    setToastMsg(`⚠ Security Alert Simulated! ${newCount} failed attempts detected.`);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const threatLevel = simulatedFailures >= 6 ? 'ELEVATED (WARNING)' : simulatedFailures >= 3 ? 'MODERATE' : 'LOW (NORMAL)';

  const filteredLogs = logs.filter(l => filterAction === 'ALL' || l.action === filterAction || l.status === filterAction);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />
      <Toast message={toastMsg} type={simulatedFailures > 0 ? 'warning' : 'success'} onClose={() => setToastMsg('')} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header Banner */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                Capstone Cybersecurity Module
              </span>
              <h1 className="text-2xl font-serif font-bold text-white mt-1">Cybersecurity Operations &amp; Audit Center</h1>
              <p className="text-xs text-slate-300 mt-0.5">Real-time threat monitoring, JWT token validation, BCrypt audit logs, and access control policies.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSimulateAttack}
                className="btn btn-primary text-xs py-2 px-3 flex items-center gap-1.5 shadow"
              >
                <Zap size={14} /> Simulate Brute-Force Attack
              </button>

              <div className="flex items-center gap-3 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                <ShieldAlert className={simulatedFailures >= 6 ? 'text-red-500 animate-pulse-slow' : 'text-amber-500'} size={24} />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Threat Level</span>
                  <span className={`text-xs font-bold uppercase ${simulatedFailures >= 6 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {threatLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Security KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Successful Logins</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats?.totalSuccessfulLogins || 42}</h3>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">JWT Authenticated</p>
              </div>
              <ShieldCheck className="text-emerald-500" size={32} />
            </div>

            <div className="card p-4 flex items-center justify-between border-l-4 border-l-amber-500">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Failed Login Attempts</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{(stats?.totalFailedAttempts || 5) + simulatedFailures}</h3>
                <p className="text-[11px] text-amber-600 font-semibold mt-1">Password mismatches</p>
              </div>
              <Key className="text-amber-500" size={32} />
            </div>

            <div className="card p-4 flex items-center justify-between border-l-4 border-l-blue-500">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Active Sessions</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats?.activeSessions || 4}</h3>
                <p className="text-[11px] text-blue-600 font-semibold mt-1">Stateless Bearer Tokens</p>
              </div>
              <Lock className="text-blue-500" size={32} />
            </div>

            <div className="card p-4 flex items-center justify-between border-l-4 border-l-rose-500">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Suspicious Alerts</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{(stats?.suspiciousActivitiesCount || 1) + (simulatedFailures >= 6 ? 1 : 0)}</h3>
                <p className="text-[11px] text-rose-600 font-semibold mt-1">Rate limit warnings</p>
              </div>
              <AlertTriangle className="text-rose-500" size={32} />
            </div>
          </div>

          {/* Viva Presentation Panel */}
          <div className="card p-6 border-slate-300">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Lock className="text-emerald-600" size={20} /> Cybersecurity Technical Viva Presentation Guide
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-1">1. BCrypt Password Salting</h4>
                <p className="text-slate-600">Passwords stored as `$2a$10$...` hashes. Protects against rainbow table &amp; hash lookup attacks.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-1">2. JWT Bearer Tokens</h4>
                <p className="text-slate-600">Stateless HS256 JWT tokens containing claims (id, username, roles) with 24-hour expiration validation.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-1">3. Role-Based Access Control</h4>
                <p className="text-slate-600">Strict endpoint security via Spring Security method authority matchers preventing horizontal privilege escalation.</p>
              </div>
            </div>
          </div>

          {/* Filterable Security Audit Log Table */}
          <div className="card p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Security Audit Logs (`security_logs` Table)</h3>
              
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-400" />
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="form-select text-xs py-1 px-2.5 w-auto"
                >
                  <option value="ALL">All Event Types</option>
                  <option value="USER_LOGIN">USER_LOGIN</option>
                  <option value="FAILED_LOGIN_ATTEMPT">FAILED_LOGIN_ATTEMPT</option>
                  <option value="UPDATE_ROOM_STATUS">UPDATE_ROOM_STATUS</option>
                  <option value="CREATE_BOOKING">CREATE_BOOKING</option>
                  <option value="SUSPICIOUS">SUSPICIOUS</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action Executed</th>
                    <th>IP Address</th>
                    <th>Status</th>
                    <th>Risk Score</th>
                    <th>Audit Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="text-xs text-slate-500 font-mono">{log.createdAt ? String(log.createdAt).replace('T', ' ').substring(0, 19) : '2026-08-26 09:30'}</td>
                      <td className="font-bold text-slate-800">{log.username || 'System'}</td>
                      <td className="font-mono text-xs font-semibold text-slate-700">{log.action}</td>
                      <td className="text-xs text-slate-500 font-mono">{log.ipAddress}</td>
                      <td><StatusBadge status={log.status} /></td>
                      <td className="font-bold text-center">
                        <span className={`px-2 py-0.5 rounded text-xs ${log.riskScore > 50 ? 'bg-red-100 text-red-800 font-bold' : 'bg-slate-100 text-slate-700'}`}>
                          {log.riskScore}
                        </span>
                      </td>
                      <td className="text-xs text-slate-600">{log.details}</td>
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

export default SecurityCenter;
