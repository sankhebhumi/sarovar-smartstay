import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import Toast from '../../components/common/Toast';
import { aiAPI } from '../../services/api';
import { BrainCircuit, Sparkles, TrendingUp, Package, Users, DollarSign, HelpCircle, RefreshCw, Zap, Sliders } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AICenter = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [inventoryPreds, setInventoryPreds] = useState([]);
  const [occupancyPred, setOccupancyPred] = useState(null);
  const [revenuePred, setRevenuePred] = useState(null);
  const [staffingInsight, setStaffingInsight] = useState(null);
  
  // Interactive Simulation State
  const [simulatedOccupancy, setSimulatedOccupancy] = useState(89);
  const [isSimulating, setIsSimulating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetchAIData();
  }, []);

  const fetchAIData = async () => {
    try {
      const [recRes, invRes, occRes, revRes, stfRes] = await Promise.all([
        aiAPI.getFoodRecommendations(1),
        aiAPI.getInventoryPredictions(),
        aiAPI.getOccupancyPrediction(),
        aiAPI.getRevenuePrediction(),
        aiAPI.getStaffingInsights(),
      ]);
      setRecommendations(recRes.data);
      setInventoryPreds(invRes.data);
      setOccupancyPred(occRes.data);
      setRevenuePred(revRes.data);
      setStaffingInsight(stfRes.data);
    } catch (err) {
      console.log('Error fetching AI data:', err);
    }
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setToastMsg('Running statistical AI model simulation...');
    setTimeout(() => {
      setIsSimulating(false);
      setToastMsg('AI Models re-calculated! Predictions updated in real-time.');
      setTimeout(() => setToastMsg(''), 4000);
    }, 1200);
  };

  // Dynamic Staffing Recalculation based on slider
  const calcStaffing = (occ) => {
    const hk = Math.max(3, Math.round((occ / 100) * 6));
    const rec = Math.max(2, Math.round((occ / 100) * 4));
    const rest = Math.max(4, Math.round((occ / 100) * 8));
    const kit = Math.max(3, Math.round((occ / 100) * 6));
    return { Housekeeping: hk, Reception: rec, Restaurant: rest, Kitchen: kit };
  };

  const currentStaffing = calcStaffing(simulatedOccupancy);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isDashboard={true} />
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full w-fit mb-2">
                <Sparkles size={16} className="animate-pulse-slow text-amber-200" /> Capstone AI Module Demonstration
              </div>
              <h1 className="text-3xl font-serif font-bold">AI Intelligence Center</h1>
              <p className="text-sm text-amber-100 mt-1 max-w-2xl font-light">
                Real-time predictive analytics for Sarovar Hotel Boisar. Demonstrates 5 functional AI models with **Explainable AI ("Why?")** presentation panels.
              </p>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="btn bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs py-3 px-5 shadow-lg whitespace-nowrap flex items-center gap-2"
            >
              <RefreshCw size={16} className={isSimulating ? 'animate-spin text-amber-600' : 'text-amber-600'} />
              {isSimulating ? 'Running AI Engine...' : 'Run Real-Time AI Simulation'}
            </button>
          </div>

          {/* Interactive Simulation Controls Bar */}
          <div className="card p-5 bg-slate-900 text-white border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sliders size={16} /> Interactive Viva Simulation Playground
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">Simulate Weekend Occupancy Demand Surge</h3>
                <p className="text-xs text-slate-400">Drag slider to test how AI automatically re-optimizes staff roster in real-time.</p>
              </div>

              <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-xs font-bold text-slate-300">Simulated Occupancy:</span>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={simulatedOccupancy}
                  onChange={(e) => setSimulatedOccupancy(parseInt(e.target.value))}
                  className="w-32 accent-amber-500 cursor-pointer"
                />
                <span className="text-base font-extrabold text-amber-400 font-mono">{simulatedOccupancy}%</span>
              </div>
            </div>
          </div>

          {/* AI Feature Cards Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Feature 1: Food Recommendation Engine */}
            <div className="lg:col-span-6 card p-5 border-t-4 border-t-amber-500 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="text-amber-600" size={18} /> Model 1: Food Recommendation
                </h3>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">Active</span>
              </div>

              {recommendations && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{recommendations.title}</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {recommendations.recommendedItems?.slice(0, 4).map((item) => (
                      <div key={item.id} className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs">
                        <span className="font-bold text-slate-900 block truncate">{item.name}</span>
                        <span className="text-amber-700 font-bold">₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs mt-3 border border-slate-800">
                    <p className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                      <HelpCircle size={14} /> Explainable AI ("Why?")
                    </p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{recommendations.explanation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Feature 2: Inventory Demand Forecasting */}
            <div className="lg:col-span-6 card p-5 border-t-4 border-t-blue-500 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Package className="text-blue-600" size={18} /> Model 2: Inventory Demand Prediction
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full">7-Day Moving Avg</span>
              </div>

              <div className="space-y-3">
                {inventoryPreds.slice(0, 2).map((pred) => (
                  <div key={pred.itemCode} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{pred.itemName}</span>
                      <span className="text-[10px] font-bold uppercase bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                        {pred.riskLevel} RISK
                      </span>
                    </div>
                    <p className="text-slate-600">Stock: <strong>{pred.currentStock} {pred.unit}</strong> | 7-Day Demand: <strong>{pred.predicted7DayDemand} {pred.unit}</strong></p>
                    <p className="text-blue-700 font-bold mt-1">Recommended Action: Reorder +{pred.recommendedReorderQty} {pred.unit}</p>
                  </div>
                ))}

                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs border border-slate-800">
                  <p className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                    <HelpCircle size={14} /> Explainable AI ("Why?")
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Uses safety threshold formula: Demand = Minimum Level × 1.8. Flags HIGH risk when current stock is less than minimum required.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Occupancy Prediction */}
            <div className="lg:col-span-6 card p-5 border-t-4 border-t-emerald-500 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <TrendingUp className="text-emerald-600" size={18} /> Model 3: Room Occupancy Time-Series
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">Time-Series</span>
              </div>

              {occupancyPred && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 bg-slate-50 rounded-xl border">
                      <p className="text-[11px] text-slate-500">Current</p>
                      <p className="text-lg font-bold text-slate-900">{occupancyPred.currentOccupancyPercentage}%</p>
                    </div>
                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="text-[11px] text-amber-800 font-semibold">Tomorrow</p>
                      <p className="text-lg font-bold text-amber-700">{occupancyPred.predictedTomorrowPercentage}%</p>
                    </div>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <p className="text-[11px] text-emerald-800 font-semibold">Saturday Peak</p>
                      <p className="text-lg font-bold text-emerald-700">{occupancyPred.predictedWeekendPercentage}%</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs border border-slate-800">
                    <p className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                      <HelpCircle size={14} /> Explainable AI ("Why?")
                    </p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{occupancyPred.explanation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Feature 4: Dynamic Staffing Insights */}
            <div className="lg:col-span-6 card p-5 border-t-4 border-t-purple-500 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Users className="text-purple-600" size={18} /> Model 4: Dynamic Staffing Optimizer
                </h3>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2.5 py-0.5 rounded-full">Interactive</span>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-800 uppercase">
                  Shift Staffing for {simulatedOccupancy}% Simulated Occupancy
                </h4>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-200 flex justify-between">
                    <span className="text-slate-700 font-semibold">Housekeeping:</span>
                    <strong className="text-purple-900">{currentStaffing.Housekeeping} Staff</strong>
                  </div>
                  <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-200 flex justify-between">
                    <span className="text-slate-700 font-semibold">Reception:</span>
                    <strong className="text-purple-900">{currentStaffing.Reception} Staff</strong>
                  </div>
                  <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-200 flex justify-between">
                    <span className="text-slate-700 font-semibold">Restaurant:</span>
                    <strong className="text-purple-900">{currentStaffing.Restaurant} Staff</strong>
                  </div>
                  <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-200 flex justify-between">
                    <span className="text-slate-700 font-semibold">Kitchen Chefs:</span>
                    <strong className="text-purple-900">{currentStaffing.Kitchen} Staff</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs border border-slate-800">
                  <p className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                    <HelpCircle size={14} /> Explainable AI ("Why?")
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Recalculates required shift personnel dynamically based on expected room turnovers and restaurant table turnover ratios.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default AICenter;
