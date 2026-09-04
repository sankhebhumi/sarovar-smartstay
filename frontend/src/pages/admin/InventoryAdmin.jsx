import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import StatusBadge from '../../components/common/StatusBadge';
import { inventoryAPI, aiAPI } from '../../services/api';
import { Package, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react';

const InventoryAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const [invRes, aiRes] = await Promise.all([
        inventoryAPI.getAll(),
        aiAPI.getInventoryPredictions(),
      ]);
      setInventory(invRes.data);
      setPredictions(aiRes.data);
    } catch (err) {
      console.log('Error loading inventory:', err);
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
              <h1 className="text-2xl font-serif font-bold text-slate-900">Hotel &amp; Kitchen Inventory</h1>
              <p className="text-xs text-slate-500">Track raw ingredients, dairy, provisions, and AI demand predictions.</p>
            </div>
            <button onClick={fetchInventoryData} className="btn btn-outline text-xs">
              <RefreshCw size={14} /> Refresh Stock
            </button>
          </div>

          {/* AI Critical Alerts Banner */}
          <div className="card p-5 bg-amber-50/60 border-amber-200">
            <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2 mb-2">
              <Sparkles className="text-amber-600" size={18} /> AI Predictive Stock Alerts (Next 7 Days)
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {predictions.filter(p => p.riskLevel === 'HIGH' || p.riskLevel === 'MEDIUM').map((pred) => (
                <div key={pred.itemCode} className="bg-white p-3 rounded-lg border border-amber-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{pred.itemName}</span>
                    <span className={`px-1.5 py-0.5 rounded font-extrabold text-[10px] uppercase ${pred.riskLevel === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                      {pred.riskLevel} RISK
                    </span>
                  </div>
                  <p className="text-slate-600">Stock: <strong>{pred.currentStock} {pred.unit}</strong> • Predicted 7D Demand: <strong>{pred.predicted7DayDemand} {pred.unit}</strong></p>
                  <p className="text-amber-800 font-bold mt-1">Recommended Reorder: +{pred.recommendedReorderQty} {pred.unit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Data Table */}
          <div className="card p-5">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Current Quantity</th>
                    <th>Safety Level</th>
                    <th>Supplier</th>
                    <th>Cost/Unit</th>
                    <th>Stock Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono font-bold text-slate-900">{item.itemCode}</td>
                      <td className="font-semibold">{item.itemName}</td>
                      <td className="text-xs text-slate-500">{item.category}</td>
                      <td className="font-bold text-slate-800">{item.currentQuantity} {item.unit}</td>
                      <td className="text-xs text-slate-500">{item.minimumStockLevel} {item.unit}</td>
                      <td className="text-xs text-slate-600">{item.supplier || 'Sarovar Supplier'}</td>
                      <td className="font-semibold text-amber-600">₹{item.costPerUnit}</td>
                      <td><StatusBadge status={item.status} /></td>
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

export default InventoryAdmin;
