import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import { restaurantAPI } from '../../services/api';
import { UtensilsCrossed, Clock, CheckCircle } from 'lucide-react';

const RestaurantAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await restaurantAPI.getOrders();
      setOrders(res.data);
    } catch (err) {
      console.log('Error fetching orders:', err);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await restaurantAPI.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      alert('Error updating order status.');
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
              <h1 className="text-2xl font-serif font-bold text-slate-900">Restaurant Kitchen &amp; Orders Desk</h1>
              <p className="text-xs text-slate-500">Live order queue for Sarovar Pure Veg Restaurant kitchen staff.</p>
            </div>
          </div>

          <div className="card p-5">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Subtotal</th>
                    <th>GST (5%)</th>
                    <th>Total</th>
                    <th>Order Status</th>
                    <th>Update Kitchen Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="font-mono font-bold text-slate-900">{o.orderNumber}</td>
                      <td>{o.customer ? o.customer.name : 'Guest Customer'}</td>
                      <td className="text-xs font-semibold uppercase">{o.orderType}</td>
                      <td>₹{o.subtotal}</td>
                      <td>₹{o.tax}</td>
                      <td className="font-bold text-amber-600">₹{o.totalAmount}</td>
                      <td><StatusBadge status={o.orderStatus} /></td>
                      <td>
                        <select
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                          className="form-select text-xs py-1 px-2 w-auto"
                        >
                          <option value="PLACED">PLACED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PREPARING">PREPARING</option>
                          <option value="READY">READY</option>
                          <option value="SERVED">SERVED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
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

export default RestaurantAdmin;
