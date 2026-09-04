import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import { Lock, Mail, Hotel, Shield, KeyRound, ArrowRight } from 'lucide-react';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(usernameOrEmail, password);
      
      // Role-based redirection
      if (user.roles.includes('ROLE_ADMIN')) {
        navigate('/admin');
      } else if (user.roles.includes('ROLE_RECEPTIONIST')) {
        navigate('/reception');
      } else if (user.roles.includes('ROLE_HOUSEKEEPING')) {
        navigate('/housekeeping');
      } else if (user.roles.includes('ROLE_RESTAURANT_STAFF')) {
        navigate('/admin/restaurant');
      } else {
        navigate('/customer');
      }
    } catch (err) {
      setError('Invalid email/username or password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (email, pwd) => {
    setUsernameOrEmail(email);
    setPassword(pwd);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
              <Hotel size={26} />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Sign In to Sarovar SmartStay</h1>
            <p className="text-xs text-slate-500 mt-1">Select a demo role or enter your credentials.</p>
          </div>

          {/* Quick Demo Credentials Panel */}
          <div className="card p-4 mb-6 bg-slate-900 text-slate-200 border-slate-800">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Shield size={14} /> Quick Demo Account Selectors
            </span>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemoAccount('admin@sarovar.com', 'Admin@123')}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left border border-slate-700/60 transition-colors"
              >
                <span className="font-bold text-white block">1. Admin</span>
                <span className="text-[10px] text-amber-400">admin@sarovar.com</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('reception@sarovar.com', 'Reception@123')}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left border border-slate-700/60 transition-colors"
              >
                <span className="font-bold text-white block">2. Receptionist</span>
                <span className="text-[10px] text-amber-400">reception@sarovar.com</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('restaurant@sarovar.com', 'Restaurant@123')}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left border border-slate-700/60 transition-colors"
              >
                <span className="font-bold text-white block">3. Restaurant</span>
                <span className="text-[10px] text-amber-400">restaurant@sarovar.com</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('housekeeping@sarovar.com', 'House@123')}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left border border-slate-700/60 transition-colors"
              >
                <span className="font-bold text-white block">4. Housekeeping</span>
                <span className="text-[10px] text-amber-400">housekeeping@sarovar.com</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => fillDemoAccount('customer@sarovar.com', 'Customer@123')}
              className="mt-2 w-full p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/40 text-center transition-colors"
            >
              5. Customer Demo (customer@sarovar.com)
            </button>
          </div>

          {/* Form */}
          <div className="card p-6 shadow-xl">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="form-label">Email or Username</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="admin@sarovar.com"
                    className="form-input pl-9 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 text-slate-400" size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input pl-9 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-2.5 text-xs font-bold shadow"
              >
                {loading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              New customer? <Link to="/register" className="text-amber-600 font-bold hover:underline">Create account</Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Login;
