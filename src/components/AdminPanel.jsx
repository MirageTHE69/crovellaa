import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tag,
  DollarSign,
  TrendingUp,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Trash2,
  Printer,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Percent,
  RefreshCw
} from 'lucide-react';

export default function AdminPanel() {
  const {
    isAdminOpen,
    setIsAdminOpen,
    orders,
    products,
    updateProductStock,
    updateOrderStatus
  } = useShop();

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

  // Editing Product Prices state
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  if (!isAdminOpen) return null;

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={12} /> Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck size={12} /> Shipped
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} /> Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAdminOpen(false)}>
      <div
        className="bg-[#FAFAF8] w-full max-w-6xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl border border-[#EAE4DD] flex flex-col animate-fade relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#2C2C2C] text-white p-5 px-6 sm:px-8 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C08E88] text-white flex items-center justify-center font-bold text-lg shadow-md">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-xl font-bold tracking-wider uppercase">Crovellaa Studio</h2>
                <span className="bg-[#6A9A85] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Merchant v2.0
                </span>
              </div>
              <p className="text-xs text-gray-400">Live E-Commerce Operations & Inventory Management</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar + Main Content Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Navigation Sidebar */}
          <aside className="w-full md:w-64 bg-white border-r border-[#EAE4DD] p-4 space-y-1.5 shrink-0">
            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest px-3 mb-2">
              Dashboard Navigation
            </p>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-[#C08E88] text-white shadow-sm' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
            >
              <LayoutDashboard size={16} /> Overview
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'orders' ? 'bg-[#C08E88] text-white shadow-sm' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
            >
              <span className="flex items-center gap-3">
                <ShoppingBag size={16} /> Orders
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#C08E88]/15 text-[#C08E88]'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'inventory' ? 'bg-[#C08E88] text-white shadow-sm' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
            >
              <span className="flex items-center gap-3">
                <Package size={16} /> Stock & SKUs
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'inventory' ? 'bg-white/20 text-white' : 'bg-[#6A9A85]/15 text-[#6A9A85]'}`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'coupons' ? 'bg-[#C08E88] text-white shadow-sm' : 'text-gray-700 hover:bg-[#FAFAF8]'}`}
            >
              <Tag size={16} /> Promo Codes
            </button>

            <div className="pt-4 border-t border-[#EAE4DD] mt-4">
              <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-[#D4A373]/30 text-xs text-[#B57A3C]">
                <span className="font-bold block flex items-center gap-1 mb-1">
                  <ShieldCheck size={14} /> Store Health: Excellent
                </span>
                <span className="text-[11px]">Free shipping & COD engine operational.</span>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* TAB 1: OVERVIEW DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-[#2C2C2C]">Performance Overview</h3>
                  <p className="text-xs text-gray-500">Real-time metrics and order statistics for Crovellaa</p>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-3xl bg-white border border-[#EAE4DD] shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Gross Sales</span>
                      <div className="w-9 h-9 rounded-xl bg-[#C08E88]/15 text-[#C08E88] flex items-center justify-center">
                        <DollarSign size={18} />
                      </div>
                    </div>
                    <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">₹{totalRevenue.toLocaleString('en-IN')}</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <TrendingUp size={12} /> +18.4% from last week
                    </span>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#EAE4DD] shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Total Orders</span>
                      <div className="w-9 h-9 rounded-xl bg-[#6A9A85]/15 text-[#6A9A85] flex items-center justify-center">
                        <ShoppingBag size={18} />
                      </div>
                    </div>
                    <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">{totalOrders}</h4>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {processingCount} processing • {shippedCount} shipped
                    </span>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#EAE4DD] shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Avg Order Value</span>
                      <div className="w-9 h-9 rounded-xl bg-[#D4A373]/15 text-[#D4A373] flex items-center justify-center">
                        <TrendingUp size={18} />
                      </div>
                    </div>
                    <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">₹{avgOrderValue.toLocaleString('en-IN')}</h4>
                    <span className="text-[11px] text-gray-500 font-medium">Based on custom gift sets</span>
                  </div>

                  <div className="p-5 rounded-3xl bg-white border border-[#EAE4DD] shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Active Customers</span>
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Users size={18} />
                      </div>
                    </div>
                    <h4 className="font-heading text-2xl font-bold text-[#2C2C2C]">{orders.length + 14}</h4>
                    <span className="text-[11px] text-purple-600 font-semibold">94% Retention rate</span>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="bg-white p-6 rounded-3xl border border-[#EAE4DD] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-[#2C2C2C]">Recent Customer Activity</h4>
                      <p className="text-xs text-gray-500">Latest orders placed in store</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#C08E88] hover:underline flex items-center gap-1"
                    >
                      View All ({orders.length}) <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="flex items-center justify-between p-3.5 rounded-2xl border border-[#EAE4DD] bg-[#FAFAF8] text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#C08E88]/15 text-[#C08E88] font-bold flex items-center justify-center">
                            {ord.customer.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">{ord.customer}</span>
                            <span className="text-gray-500 text-[11px]">{ord.id} • {ord.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {getStatusBadge(ord.status)}
                          <span className="font-heading text-sm font-bold text-[#C08E88]">₹{ord.total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGER */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[#2C2C2C]">Orders Manager</h3>
                    <p className="text-xs text-gray-500">Manage order fulfillment, change statuses, and view receipts</p>
                  </div>

                  {/* Filter & Search controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search ID or Customer..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#EAE4DD] bg-white focus:outline-none focus:border-[#C08E88]"
                      />
                      <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
                    </div>

                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="px-3 py-1.5 text-xs rounded-xl border border-[#EAE4DD] bg-white font-semibold text-gray-700"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((ord) => (
                      <div key={ord.id} className="bg-white p-5 rounded-3xl border border-[#EAE4DD] shadow-xs space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE4DD] pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-heading font-bold text-lg text-[#C08E88]">{ord.id}</span>
                            <span className="text-xs text-gray-400">({ord.date})</span>
                            {getStatusBadge(ord.status)}
                          </div>

                          {/* Quick Status Update dropdown */}
                          <div className="flex items-center gap-2">
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
                              className="p-1.5 rounded-xl border border-[#EAE4DD] text-gray-600 hover:text-black hover:bg-gray-100"
                              title="Print Receipt"
                            >
                              <Printer size={15} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs text-gray-700">
                          <div className="md:col-span-5 space-y-1 bg-[#FAFAF8] p-3.5 rounded-2xl border border-[#EAE4DD]">
                            <p><strong>Customer:</strong> {ord.customer}</p>
                            <p><strong>Contact:</strong> {ord.email} | {ord.phone}</p>
                            <p><strong>Payment Method:</strong> {ord.paymentMethod}</p>
                            <p className="text-gray-500 pt-1 border-t border-[#EAE4DD] mt-1"><strong>Shipping Address:</strong> {ord.address}</p>
                          </div>

                          <div className="md:col-span-7 space-y-2">
                            <p className="font-bold text-gray-900 uppercase text-[10px] tracking-wider">Ordered Stems & Items:</p>
                            <div className="space-y-1.5">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-[#FFFDF9] px-3 py-1.5 rounded-xl border border-[#D4A373]/30">
                                  <div>
                                    <span className="font-semibold text-gray-900">{it.name}</span>
                                    {it.variant && <span className="text-[10px] text-[#6A9A85] block font-semibold">Option: {it.variant}</span>}
                                    {it.customNote && <span className="text-[10px] text-[#B57A3C] block">💌 Note: "{it.customNote}"</span>}
                                  </div>
                                  <span className="font-bold text-gray-800">x{it.qty} • ₹{it.price * it.qty}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-between items-center pt-2 font-heading font-bold text-base text-[#2C2C2C]">
                              <span>Grand Total Amount</span>
                              <span className="text-[#C08E88]">₹{ord.total.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-3xl border border-[#EAE4DD]">
                      <p className="text-xs text-gray-500">No orders match your search filter.</p>
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
                    <h3 className="font-heading text-2xl font-bold text-[#2C2C2C]">Stock & Inventory Control</h3>
                    <p className="text-xs text-gray-500">Update stock quantities, edit pricing, and monitor inventory levels</p>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search product or SKU..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#EAE4DD] bg-white focus:outline-none focus:border-[#C08E88]"
                    />
                    <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-[#EAE4DD] overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#EAE4DD] bg-[#FAFAF8] text-gray-500 font-bold uppercase tracking-wider">
                          <th className="p-4">Product Details</th>
                          <th className="p-4">SKU</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Price (₹)</th>
                          <th className="p-4">In Stock Count</th>
                          <th className="p-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((prod) => (
                          <tr key={prod.id} className="border-b border-[#EAE4DD] hover:bg-[#FFFDF9]/60 transition-colors">
                            <td className="p-4 flex items-center gap-3 font-semibold text-[#2C2C2C]">
                              <img src={prod.image} alt="" className="w-10 h-10 object-cover rounded-xl border border-[#EAE4DD]" />
                              <div>
                                <span className="font-bold text-gray-900 block">{prod.name}</span>
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
                                  className="w-20 p-1.5 border border-[#EAE4DD] rounded-xl text-center font-bold text-xs bg-[#FAFAF8] focus:border-[#C08E88]"
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
                  <h3 className="font-heading text-2xl font-bold text-[#2C2C2C]">Promo Codes & Discount Engine</h3>
                  <p className="text-xs text-gray-500">Create and manage coupon codes for marketing campaigns</p>
                </div>

                {/* Create Coupon Form */}
                <form onSubmit={handleAddCoupon} className="bg-white p-5 rounded-3xl border border-[#EAE4DD] shadow-xs flex flex-col sm:flex-row items-end gap-3">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1">Coupon Code</label>
                    <input
                      type="text"
                      placeholder="e.g. DIWALI20"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      className="input-field text-xs uppercase"
                      required
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold uppercase text-gray-700 tracking-wider mb-1">Discount Offer</label>
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
                    className="btn btn-primary text-xs py-2.5 px-6 shrink-0 w-full sm:w-auto"
                  >
                    <Plus size={14} /> Create Coupon
                  </button>
                </form>

                {/* Active Coupons List */}
                <div className="bg-white rounded-3xl border border-[#EAE4DD] overflow-hidden shadow-xs">
                  <div className="p-4 border-b border-[#EAE4DD] bg-[#FAFAF8]">
                    <h4 className="font-heading text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Active Promotional Coupons</h4>
                  </div>

                  <div className="divide-y divide-[#EAE4DD]">
                    {coupons.map((c, i) => (
                      <div key={i} className="p-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#6A9A85]/15 text-[#6A9A85] flex items-center justify-center font-bold">
                            <Tag size={18} />
                          </div>
                          <div>
                            <span className="font-heading font-bold text-sm text-[#2C2C2C] block">{c.code}</span>
                            <span className="text-gray-500">{c.discount}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-gray-400 text-[11px] font-semibold">{c.usageCount} times redeemed</span>
                          <span className="badge badge-sage text-[10px]">Active</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
