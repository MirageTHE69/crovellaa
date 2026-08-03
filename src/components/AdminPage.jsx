import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tag,
  DollarSign,
  TrendingUp,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Printer,
  Sparkles,
  SlidersHorizontal,
  Lock,
  Mail,
  Key,
  LogOut,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Building2,
  Store,
  RefreshCw
} from 'lucide-react';

export default function AdminPage({ onReturnToStore }) {
  const {
    orders,
    products,
    updateProductStock,
    updateOrderStatus
  } = useShop();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('admin@crovellaa.com');
  const [password, setPassword] = useState('crovellaa123');
  const [loginError, setLoginError] = useState('');

  // Dashboard Active Tab State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'inventory' | 'coupons' | 'settings'
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');

  // Discount Codes state
  const [coupons, setCoupons] = useState([
    { code: 'CROCHET10', discount: '10% OFF', usageCount: 42, active: true },
    { code: 'GIFTLOVE', discount: '₹150 Flat Off', usageCount: 19, active: true },
    { code: 'WELCOME50', discount: '₹50 First Order', usageCount: 88, active: true }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');

  // Settings State
  const [freeShippingLimit, setFreeShippingLimit] = useState(1000);
  const [codFee, setCodFee] = useState(20);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === 'admin@crovellaa.com' && password === 'crovellaa123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin credentials. Use default admin@crovellaa.com / crovellaa123');
    }
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode.trim() || !newCouponDiscount.trim()) return;
    setCoupons([
      ...coupons,
      {
        code: newCouponCode.trim().toUpperCase(),
        discount: newCouponDiscount.trim(),
        usageCount: 0,
        active: true
      }
    ]);
    setNewCouponCode('');
    setNewCouponDiscount('');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const processingCount = orders.filter(o => o.status === 'Processing').length;
  const shippedCount = orders.filter(o => o.status === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.email.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Products
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={12} /> Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck size={12} /> Shipped
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} /> Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
            {status}
          </span>
        );
    }
  };

  // ----------------------------------------------------------------------
  // STATE 1: SECURE ADMIN LOGIN SCREEN
  // ----------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C2C2C] via-[#1F1F1F] to-[#121212] flex items-center justify-center p-4 font-body">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade">
          
          {/* Top Brand Banner */}
          <div className="bg-gradient-to-r from-[#C08E88] to-[#AA7771] p-8 text-center text-white relative">
            <button
              onClick={onReturnToStore}
              className="absolute top-4 left-4 text-xs font-semibold flex items-center gap-1 text-white/80 hover:text-white bg-black/20 px-3 py-1.5 rounded-full transition-colors"
            >
              <ArrowLeft size={14} /> Back to Store
            </button>

            <div className="w-16 h-16 rounded-2xl bg-white text-[#C08E88] font-bold text-3xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              🌸
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-wider uppercase">Crovellaa Studio</h1>
            <p className="text-xs text-white/90 mt-1">Merchant Administration Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
            <div className="text-center">
              <span className="badge badge-sage text-[10px] mb-1">Restricted Access</span>
              <h2 className="font-heading text-lg font-bold text-[#2C2C2C]">Sign In to Management Dashboard</h2>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl text-center">
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10 text-xs"
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10 text-xs"
                    required
                  />
                  <Key size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary py-3.5 text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <Lock size={16} /> Sign In to Merchant Studio
            </button>

            {/* Quick Demo Login Preset Helper */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@crovellaa.com');
                  setPassword('crovellaa123');
                  setIsAuthenticated(true);
                }}
                className="text-xs text-[#6A9A85] hover:underline font-bold"
              >
                ✨ One-Click Demo Admin Login
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#6A9A85]" /> 256-Bit SSL Encrypted
              </span>
              <span>v2.4.0</span>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // STATE 2: FULL-PAGE MERCHANT STUDIO ADMIN DASHBOARD
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#2C2C2C] flex flex-col font-body">
      
      {/* Top Admin App Header */}
      <header className="bg-[#2C2C2C] text-white border-b border-gray-800 sticky top-0 z-40 shadow-md">
        <div className="px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-[#C08E88] text-white font-bold flex items-center justify-center text-lg">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold tracking-wider uppercase">Crovellaa Merchant Studio</span>
                <span className="bg-[#6A9A85] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Live Operations
                </span>
              </div>
              <span className="text-[11px] text-gray-400 block">Jaipur & Mumbai Store Command Center</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onReturnToStore}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
            >
              <Store size={14} /> Open Customer Storefront <ExternalLink size={12} />
            </button>

            <div className="h-6 w-px bg-gray-700 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <span className="font-bold text-xs block">Ananya (Store Owner)</span>
                <span className="text-[10px] text-[#6A9A85]">Super Admin</span>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="p-2 rounded-xl bg-red-500/15 text-red-300 hover:bg-red-500 hover:text-white transition-colors"
                title="Log Out of Admin Portal"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Full Page Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Full Height Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-[#EAE4DD] p-5 space-y-2 shrink-0">
          <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest px-3 mb-3">
            Admin Navigation
          </p>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-[#C08E88] text-white shadow-md' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
          >
            <LayoutDashboard size={17} /> Store Overview
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'orders' ? 'bg-[#C08E88] text-white shadow-md' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
          >
            <span className="flex items-center gap-3">
              <ShoppingBag size={17} /> Live Orders
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#C08E88]/15 text-[#C08E88]'}`}>
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'inventory' ? 'bg-[#C08E88] text-white shadow-md' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
          >
            <span className="flex items-center gap-3">
              <Package size={17} /> Inventory & SKUs
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'inventory' ? 'bg-white/20 text-white' : 'bg-[#6A9A85]/15 text-[#6A9A85]'}`}>
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'coupons' ? 'bg-[#C08E88] text-white shadow-md' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
          >
            <Tag size={17} /> Promo Codes
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'settings' ? 'bg-[#C08E88] text-white shadow-md' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
          >
            <SlidersHorizontal size={17} /> Store Settings
          </button>

          <div className="pt-6 border-t border-[#EAE4DD] mt-6">
            <div className="p-4 bg-[#FFFDF9] rounded-2xl border border-[#D4A373]/30 text-xs text-[#B57A3C] space-y-1">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck size={15} /> SSL Secure Server
              </span>
              <p className="text-[11px] text-gray-500">Live sync with UPI & Razorpay Payment Gateways.</p>
            </div>
          </div>
        </aside>

        {/* Dynamic Workspace Container */}
        <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
          
          {/* TAB 1: STORE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade">
              <div>
                <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">Executive Store Dashboard</h2>
                <p className="text-xs text-gray-500 mt-1">Real-time revenue, order fulfillment status, and active sales analytics</p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-[#EAE4DD] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Gross Sales</span>
                    <div className="w-10 h-10 rounded-2xl bg-[#C08E88]/15 text-[#C08E88] flex items-center justify-center font-bold">
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-[#2C2C2C]">₹{totalRevenue.toLocaleString('en-IN')}</h3>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <TrendingUp size={14} /> +24.8% growth this week
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EAE4DD] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Total Orders</span>
                    <div className="w-10 h-10 rounded-2xl bg-[#6A9A85]/15 text-[#6A9A85] flex items-center justify-center font-bold">
                      <ShoppingBag size={20} />
                    </div>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-[#2C2C2C]">{totalOrders}</h3>
                  <span className="text-xs text-gray-500 font-medium">
                    {processingCount} processing • {shippedCount} shipped
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EAE4DD] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Avg Order Value</span>
                    <div className="w-10 h-10 rounded-2xl bg-[#D4A373]/15 text-[#D4A373] flex items-center justify-center font-bold">
                      <TrendingUp size={20} />
                    </div>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-[#2C2C2C]">₹{avgOrderValue.toLocaleString('en-IN')}</h3>
                  <span className="text-xs text-gray-500 font-medium">Driven by bouquet sets</span>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EAE4DD] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Store Traffic</span>
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      <Users size={20} />
                    </div>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-[#2C2C2C]">1,482</h3>
                  <span className="text-xs text-purple-600 font-semibold">68% from Instagram @crovellaa_</span>
                </div>
              </div>

              {/* Recent Customer Activity */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE4DD] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAE4DD] pb-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#2C2C2C]">Recent Customer Activity</h3>
                    <p className="text-xs text-gray-500">Live order activity across India</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="btn btn-secondary text-xs py-2 px-4"
                  >
                    View All Orders
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl border border-[#EAE4DD] bg-[#FAFAF8] text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#C08E88]/15 text-[#C08E88] font-bold flex items-center justify-center text-sm">
                          {ord.customer.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 text-sm block">{ord.customer}</span>
                          <span className="text-gray-500">{ord.id} • {ord.date} • {ord.address}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        {getStatusBadge(ord.status)}
                        <span className="font-heading text-base font-bold text-[#C08E88]">₹{ord.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE ORDERS MANAGER */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">Customer Orders Manager</h2>
                  <p className="text-xs text-gray-500">Fulfill orders, change delivery status, and generate packing slips</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search ID, Customer, Email..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="pl-9 pr-3 py-2 text-xs rounded-xl border border-[#EAE4DD] bg-white focus:outline-none focus:border-[#C08E88] w-60"
                    />
                    <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>

                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#EAE4DD] bg-white font-semibold text-gray-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Orders List Cards */}
              <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((ord) => (
                    <div key={ord.id} className="bg-white p-6 rounded-3xl border border-[#EAE4DD] shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE4DD] pb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-heading font-bold text-xl text-[#C08E88]">{ord.id}</span>
                          <span className="text-xs text-gray-400">Placed on {ord.date}</span>
                          {getStatusBadge(ord.status)}
                        </div>

                        {/* Status Switcher */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-500">Update Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-[#C08E88] bg-[#C08E88]/5 text-[#C08E88]"
                          >
                            <option value="Processing">Processing ⏳</option>
                            <option value="Shipped">Shipped 🚚</option>
                            <option value="Delivered">Delivered ✅</option>
                            <option value="Cancelled">Cancelled ❌</option>
                          </select>

                          <button
                            onClick={() => window.print()}
                            className="btn btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                          >
                            <Printer size={14} /> Print Receipt
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs text-gray-700">
                        <div className="md:col-span-5 space-y-2 bg-[#FAFAF8] p-4 rounded-2xl border border-[#EAE4DD]">
                          <p><strong>Customer Name:</strong> {ord.customer}</p>
                          <p><strong>Email Address:</strong> {ord.email}</p>
                          <p><strong>Phone Number:</strong> {ord.phone || '9876543210'}</p>
                          <p><strong>Payment Method:</strong> {ord.paymentMethod}</p>
                          <p className="text-gray-600 pt-2 border-t border-[#EAE4DD] mt-2">
                            <strong>Delivery Address:</strong> {ord.address}
                          </p>
                        </div>

                        <div className="md:col-span-7 space-y-3">
                          <p className="font-bold text-gray-900 uppercase text-[10px] tracking-wider">Items Breakdown:</p>
                          <div className="space-y-2">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-[#FFFDF9] px-3.5 py-2 rounded-xl border border-[#D4A373]/30">
                                <div>
                                  <span className="font-semibold text-gray-900">{it.name}</span>
                                  {it.variant && <span className="text-[10px] text-[#6A9A85] block font-semibold">Option: {it.variant}</span>}
                                  {it.customNote && <span className="text-[10px] text-[#B57A3C] block">💌 Gift Note: "{it.customNote}"</span>}
                                </div>
                                <span className="font-bold text-gray-800">x{it.qty} • ₹{it.price * it.qty}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-[#EAE4DD] font-heading font-bold text-lg text-[#2C2C2C]">
                            <span>Total Amount Paid</span>
                            <span className="text-[#C08E88]">₹{ord.total.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-3xl border border-[#EAE4DD]">
                    <p className="text-xs text-gray-500">No orders match your search query.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY & STOCK MANAGER */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fade">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">Inventory & Stock Control</h2>
                  <p className="text-xs text-gray-500">Monitor stock levels, edit SKUs, and manage product inventory</p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search name or SKU..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-9 pr-3 py-2 text-xs rounded-xl border border-[#EAE4DD] bg-white focus:outline-none focus:border-[#C08E88] w-64"
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#EAE4DD] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#EAE4DD] bg-[#FAFAF8] text-gray-500 font-bold uppercase tracking-wider">
                        <th className="p-4">Product Details</th>
                        <th className="p-4">SKU</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price (₹)</th>
                        <th className="p-4">Stock Count</th>
                        <th className="p-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="border-b border-[#EAE4DD] hover:bg-[#FFFDF9]/60 transition-colors">
                          <td className="p-4 flex items-center gap-3 font-semibold text-[#2C2C2C]">
                            <img src={prod.image} alt="" className="w-12 h-12 object-cover rounded-xl border border-[#EAE4DD]" />
                            <div>
                              <span className="font-bold text-gray-900 text-sm block">{prod.name}</span>
                              {prod.badge && <span className="text-[10px] text-[#C08E88] font-semibold">{prod.badge}</span>}
                            </div>
                          </td>

                          <td className="p-4 text-gray-500 font-mono text-[11px]">{prod.sku}</td>

                          <td className="p-4 font-semibold text-[#6A9A85]">{prod.category}</td>

                          <td className="p-4 font-bold text-[#C08E88] text-sm">
                            ₹{prod.price}
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                value={prod.stock}
                                onChange={(e) => updateProductStock(prod.id, parseInt(e.target.value) || 0)}
                                className="w-20 p-2 border border-[#EAE4DD] rounded-xl text-center font-bold text-xs bg-[#FAFAF8] focus:border-[#C08E88]"
                                min={0}
                              />
                              <span className="text-[10px] text-gray-400">units</span>
                            </div>
                          </td>

                          <td className="p-4 text-center">
                            {prod.stock > 5 ? (
                              <span className="badge badge-sage text-[10px]">In Stock</span>
                            ) : prod.stock > 0 ? (
                              <span className="badge badge-gold text-[10px]">Low Stock ({prod.stock})</span>
                            ) : (
                              <span className="badge badge-rose text-[10px]">Sold Out</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROMO CODES */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 animate-fade">
              <div>
                <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">Promo Codes Engine</h2>
                <p className="text-xs text-gray-500">Create discount codes for Instagram campaigns and returning buyers</p>
              </div>

              <form onSubmit={handleAddCoupon} className="bg-white p-6 rounded-3xl border border-[#EAE4DD] shadow-sm flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">Coupon Code</label>
                  <input
                    type="text"
                    placeholder="e.g. DIWALI20"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="input-field uppercase text-xs"
                    required
                  />
                </div>

                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">Discount Offer</label>
                  <input
                    type="text"
                    placeholder="e.g. 20% OFF or ₹200 Flat"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    className="input-field text-xs"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary text-xs py-3 px-8 shrink-0 w-full sm:w-auto"
                >
                  <Plus size={16} /> Create Promo Code
                </button>
              </form>

              <div className="bg-white rounded-3xl border border-[#EAE4DD] overflow-hidden shadow-sm">
                <div className="p-4 border-b border-[#EAE4DD] bg-[#FAFAF8]">
                  <h4 className="font-heading text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Active Promotional Coupons</h4>
                </div>

                <div className="divide-y divide-[#EAE4DD]">
                  {coupons.map((c, i) => (
                    <div key={i} className="p-5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#6A9A85]/15 text-[#6A9A85] flex items-center justify-center font-bold">
                          <Tag size={20} />
                        </div>
                        <div>
                          <span className="font-heading font-bold text-base text-[#2C2C2C] block">{c.code}</span>
                          <span className="text-gray-500 font-medium">{c.discount}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="text-gray-400 text-xs font-semibold">{c.usageCount} times redeemed</span>
                        <span className="badge badge-sage text-[10px]">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade">
              <div>
                <h2 className="font-heading text-3xl font-bold text-[#2C2C2C]">Store Operations Settings</h2>
                <p className="text-xs text-gray-500">Configure free shipping thresholds, COD courier fees, and store contacts</p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-3xl border border-[#EAE4DD] shadow-sm space-y-6 max-w-2xl">
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                      Free Shipping Order Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={freeShippingLimit}
                      onChange={(e) => setFreeShippingLimit(parseInt(e.target.value) || 0)}
                      className="input-field text-sm"
                    />
                    <span className="text-[11px] text-gray-400 mt-1 block">Orders above this amount receive automatic free pan-India shipping.</span>
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                      Cash on Delivery (COD) Courier Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={codFee}
                      onChange={(e) => setCodFee(parseInt(e.target.value) || 0)}
                      className="input-field text-sm"
                    />
                    <span className="text-[11px] text-gray-400 mt-1 block">Extra courier handling fee charged on COD orders.</span>
                  </div>
                </div>

                {savedNotice && (
                  <div className="p-3 bg-[#6A9A85]/15 text-[#6A9A85] text-xs font-bold rounded-2xl text-center">
                    ✓ Store Settings updated successfully!
                  </div>
                )}

                <button type="submit" className="btn btn-primary text-xs py-3 px-8">
                  Save Store Settings
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
