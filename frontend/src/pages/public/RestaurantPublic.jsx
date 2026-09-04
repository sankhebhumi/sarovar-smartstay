import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Toast from '../../components/common/Toast';
import { restaurantAPI, aiAPI } from '../../services/api';
import { UtensilsCrossed, Search, ShoppingBag, Sparkles, Plus, Minus, Check, Clock, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RestaurantPublic = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, menuRes, aiRes] = await Promise.all([
        restaurantAPI.getCategories(),
        restaurantAPI.getMenu(),
        aiAPI.getPublicRecommendations(),
      ]);
      setCategories(catRes.data);
      setMenuItems(menuRes.data);
      setAiRecommendation(aiRes.data);
    } catch (err) {
      console.log('Error loading restaurant data:', err);
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 0 || item.category?.id === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setToastMsg(`Added "${item.name}" to order cart!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const addAIBundleToCart = () => {
    if (aiRecommendation && aiRecommendation.recommendedItems) {
      aiRecommendation.recommendedItems.forEach((item) => addToCart(item));
      setToastMsg('Added AI Recommendation Combo to your order!');
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.05 * 100) / 100;
  const cartTotal = Math.round((cartSubtotal + cartTax) * 100) / 100;

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const orderItems = cart.map((i) => ({ menuItemId: i.id, quantity: i.quantity }));
      await restaurantAPI.placeOrder({
        customerId: 1,
        orderType: 'DINE_IN',
        items: orderItems,
      });

      setToastMsg(`Order Placed Successfully! Total ₹${cartTotal}. Order sent to kitchen.`);
      setCart([]);
    } catch (err) {
      alert('Error placing restaurant order.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      {/* Header Banner */}
      <div className="bg-navy text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
            <ShieldCheck size={16} /> 100% Pure Vegetarian Kitchen
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Hotel Sarovar Pure Veg Menu Catalog</h1>
          <p className="text-sm text-slate-300 mt-1">Authentic Punjabi, South Indian, Tandoori &amp; Indo-Chinese delicacies in Boisar, MIDC.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Interactive AI Meal Recommendation Box */}
        {aiRecommendation && (
          <div className="card p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border-amber-200 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-1">
                  <Sparkles className="text-amber-600 animate-pulse-slow" size={16} /> AI-Powered Meal Pairing Recommendation
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{aiRecommendation.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{aiRecommendation.explanation}</p>
              </div>

              <button
                onClick={addAIBundleToCart}
                className="btn btn-primary text-xs py-2 px-4 whitespace-nowrap shadow flex items-center gap-1.5"
              >
                <Zap size={16} /> Add 1-Click AI Combo to Cart
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-amber-200/60">
              {aiRecommendation.recommendedItems?.map((rec) => (
                <div key={rec.id} className="bg-white p-3 rounded-xl border border-amber-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block truncate">{rec.name}</span>
                    <span className="text-xs text-amber-600 font-bold">₹{rec.price}</span>
                  </div>
                  <button
                    onClick={() => addToCart(rec)}
                    className="btn btn-primary btn-sm px-2.5 py-1 text-[11px]"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search Paneer, Hakka Noodles, Dal Tadka, Lassi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory(0)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 0 ? 'bg-amber-500 text-white shadow-sm' : 'bg-white border text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Categories ({menuItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id ? 'bg-amber-500 text-white shadow-sm' : 'bg-white border text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid & Cart Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Menu Items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const cartEntry = cart.find((i) => i.id === item.id);
                return (
                  <div key={item.id} className="card p-4 flex flex-col justify-between hover:border-amber-300 transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shrink-0"></span>
                          {item.name}
                        </h4>
                        <span className="font-sans font-bold text-amber-600 text-sm shrink-0">₹{item.price}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">{item.category?.name}</span>

                      {cartEntry ? (
                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-white text-slate-800 font-bold flex items-center justify-center hover:bg-amber-100 text-xs"
                          >
                            -
                          </button>
                          <span className="font-bold text-slate-900 text-xs px-1">{cartEntry.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-amber-500 text-white font-bold flex items-center justify-center hover:bg-amber-600 text-xs"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="btn btn-outline border-amber-400 text-amber-700 hover:bg-amber-50 btn-sm text-xs"
                        >
                          <Plus size={14} /> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Floating Cart */}
          <div className="lg:col-span-4">
            <div className="card p-5 sticky top-24 border-amber-200 shadow-lg">
              <h3 className="font-bold text-slate-900 text-sm border-b pb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="text-amber-600" size={18} /> Restaurant Cart
                </span>
                <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} Items
                </span>
              </h3>

              {cart.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs font-medium">
                  Your cart is empty.<br />Click "+ Add to Cart" to start your order.
                </div>
              ) : (
                <div className="py-4 space-y-3">
                  {cart.map((cartItem) => (
                    <div key={cartItem.id} className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                      <div className="pr-2">
                        <span className="font-bold text-slate-800 block">{cartItem.name}</span>
                        <span className="text-slate-500">₹{cartItem.price} each</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-slate-100 rounded border px-1">
                          <button onClick={() => updateQuantity(cartItem.id, -1)} className="font-bold px-1 text-slate-600">-</button>
                          <span className="font-bold px-1 text-slate-900">{cartItem.quantity}</span>
                          <button onClick={() => updateQuantity(cartItem.id, 1)} className="font-bold px-1 text-slate-600">+</button>
                        </div>
                        <span className="font-bold text-slate-900 w-12 text-right">₹{cartItem.price * cartItem.quantity}</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-3 border-t space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (5%):</span>
                      <span>₹{cartTax}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t">
                      <span>Total Amount:</span>
                      <span className="text-amber-600">₹{cartTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full btn btn-primary mt-4 py-2.5 text-xs font-bold shadow"
                  >
                    Place Kitchen Order
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default RestaurantPublic;
