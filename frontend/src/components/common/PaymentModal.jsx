import React, { useState } from 'react';
import Modal from './Modal';
import { CreditCard, QrCode, CheckCircle2, ShieldCheck, Download, Hotel } from 'lucide-react';
import { paymentAPI } from '../../services/api';

const PaymentModal = ({ isOpen, onClose, booking, onPaymentSuccess }) => {
  const [activeTab, setActiveTab] = useState('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  if (!isOpen || !booking) return null;

  const handlePay = async (method) => {
    setProcessing(true);
    try {
      const res = await paymentAPI.process({
        bookingId: booking.id,
        paymentMethod: method,
        amount: booking.totalAmount,
      });

      setReceipt(res.data);
      if (onPaymentSuccess) onPaymentSuccess(res.data);
    } catch (err) {
      alert('Error processing payment.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={receipt ? "Sarovar Payment Receipt" : "Interactive Payment Checkout"}>
      {receipt ? (
        <div className="space-y-4 font-sans text-xs">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <CheckCircle2 className="mx-auto text-emerald-600 mb-1" size={40} />
            <h4 className="font-bold text-emerald-950 text-base">Payment Verified Successfully</h4>
            <p className="text-emerald-800">Transaction Ref: <strong>{receipt.transactionReference}</strong></p>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-serif font-bold text-sm flex items-center gap-1.5 text-amber-400">
                <Hotel size={16} /> Hotel Sarovar Boisar
              </span>
              <span className="text-[10px] text-slate-400">GST: 27AACFH8311B1ZV</span>
            </div>

            <div className="flex justify-between">
              <span>Booking Reference:</span>
              <strong className="text-amber-400 font-mono">{booking.bookingReference}</strong>
            </div>
            <div className="flex justify-between">
              <span>Customer Name:</span>
              <strong>{booking.customer?.name || 'Guest'}</strong>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <strong>{receipt.paymentMethod}</strong>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-sm">
              <span>Total Amount Paid:</span>
              <span className="text-amber-400">₹{receipt.amount}</span>
            </div>
          </div>

          <button
            onClick={() => {
              window.print();
            }}
            className="w-full btn btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow"
          >
            <Download size={14} /> Print / Save Tax Receipt
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs flex justify-between items-center">
            <div>
              <span className="font-bold text-amber-900 text-sm block">Reservation Ref: {booking.bookingReference}</span>
              <span className="text-amber-800">Room {booking.room?.roomNumber} • {booking.checkInDate} to {booking.checkOutDate}</span>
            </div>
            <span className="font-bold text-amber-700 text-base">₹{booking.totalAmount}</span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('upi')}
              className={`flex-1 py-2.5 text-center border-b-2 flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'upi' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <QrCode size={16} /> Fast UPI QR Code
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-2.5 text-center border-b-2 flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'card' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <CreditCard size={16} /> Credit / Debit Card
            </button>
          </div>

          {activeTab === 'upi' ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-40 h-40 mx-auto bg-slate-900 text-white p-3 rounded-2xl border-4 border-amber-400/40 shadow-inner flex flex-col items-center justify-center">
                <QrCode size={110} className="text-amber-400" />
                <span className="text-[10px] font-mono font-bold mt-1 text-slate-300">sarovar.boisar@upi</span>
              </div>
              <p className="text-xs text-slate-600">Scan QR Code with Google Pay, PhonePe, or Paytm.</p>
              
              <button
                type="button"
                disabled={processing}
                onClick={() => handlePay('UPI')}
                className="w-full btn btn-primary py-2.5 text-xs font-bold shadow"
              >
                {processing ? 'Verifying Transaction...' : 'Simulate UPI Payment Authorization'}
              </button>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div>
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8892"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="form-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    placeholder="08/28"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="form-label">CVV</label>
                  <input
                    type="password"
                    maxLength="4"
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={processing}
                onClick={() => handlePay('Card')}
                className="w-full btn btn-primary py-2.5 text-xs font-bold shadow mt-2"
              >
                {processing ? 'Processing Card Charge...' : `Authorize & Pay ₹${booking.totalAmount}`}
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default PaymentModal;
