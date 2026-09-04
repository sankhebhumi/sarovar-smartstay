import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import Navbar from '../../components/common/Navbar';
import { User, Mail, Phone, Lock, Hotel, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'ROLE_CUSTOMER',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.register(formData);
      alert('Registration successful! Please login with your credentials.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Email or username may already exist.');
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-2xl font-serif font-bold text-slate-900">Create Customer Account</h1>
            <p className="text-xs text-slate-500 mt-1">Register for Sarovar SmartStay online booking &amp; food service.</p>
          </div>

          <div className="card p-6 shadow-xl">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Amit Kumar"
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="amit_kumar"
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="amit@gmail.com"
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9823055667"
                  className="form-input text-xs"
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="form-input text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-2.5 text-xs font-bold shadow"
              >
                {loading ? 'Creating Account...' : 'Register Account'} <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              Already registered? <Link to="/login" className="text-amber-600 font-bold hover:underline">Sign in</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
