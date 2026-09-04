import React from 'react';
import Navbar from '../../components/common/Navbar';
import { MapPin, Phone, Mail, Clock, Hotel } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <div className="bg-navy text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold text-white">Contact &amp; Location</h1>
          <p className="text-sm text-slate-300 mt-1">Get in touch with Hotel Sarovar, Boisar front desk or reserve corporate stays.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-6 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Hotel Front Desk</h2>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Address</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  P-25, MIDC Road, Boisar - 401 506,<br />
                  District Palghar, Maharashtra, India.
                </p>
                <span className="text-[11px] text-slate-400 block mt-1">GST NO: 27AACFH8311B1ZV</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Direct Phone Lines</h4>
                <p className="text-xs text-slate-600 mt-0.5">Mobile: +91 7378834756</p>
                <p className="text-xs text-slate-600">Telephone: 270026 / 271253</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Desk Hours</h4>
                <p className="text-xs text-slate-600 mt-0.5">Front Desk: 24 / 7 Operating</p>
                <p className="text-xs text-slate-600">Pure Veg Restaurant: 7:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-3 mb-4">Send a Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent to Sarovar Front Desk!'); }} className="space-y-4">
              <div>
                <label className="form-label">Your Name</label>
                <input type="text" required placeholder="Amit Kumar" className="form-input text-xs" />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input type="text" required placeholder="+91 9823000000" className="form-input text-xs" />
              </div>
              <div>
                <label className="form-label">Subject</label>
                <select className="form-select text-xs">
                  <option>Room Reservation Inquiry</option>
                  <option>Corporate MIDC Booking</option>
                  <option>Restaurant Banquet Order</option>
                </select>
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea rows="3" required placeholder="Specify your requirements..." className="form-textarea text-xs" />
              </div>
              <button type="submit" className="w-full btn btn-primary py-2.5 text-xs font-semibold">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
