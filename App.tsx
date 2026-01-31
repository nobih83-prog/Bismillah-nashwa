import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ChatWidget from './components/ChatWidget';
import { ArrowLeft, X, Plus, Minus, MapPin, Phone, User, FileText, CheckCircle2, Search, Mail, Clock, ShieldCheck, Globe, Info, LogOut, Settings, Package, ShoppingBag, Bell, CreditCard, Lock } from 'lucide-react';
import { ALL_PRODUCTS, PHONE_NUMBER, EMAIL, ADDRESS, PRODUCT_DATA } from './constants';
import { Product } from './types';

type ViewType = 'product' | 'checkout' | 'success' | 'track' | 'about' | 'privacy' | 'terms' | 'contact' | 'sitemap' | 'refund' | 'account';
type AccountTab = 'orders' | 'profile' | 'settings';

// Custom Track Icon
const CustomTrackIcon = ({ size = 120, className = "" }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15L85 32.5V67.5L50 85L15 67.5V32.5L50 15Z" stroke="black" strokeWidth="6" strokeLinejoin="round"/>
      <path d="M50 15V85" stroke="black" strokeWidth="6" strokeLinejoin="round"/>
      <path d="M15 32.5L50 50L85 32.5" stroke="black" strokeWidth="6" strokeLinejoin="round"/>
    </svg>
    <div className="relative mt-2 w-full max-w-[140px] h-10 flex items-center justify-between">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-black -translate-y-1/2"></div>
      <div className="relative z-10 w-8 h-8 bg-white border-[3px] border-black flex items-center justify-center transform -translate-x-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <div className="relative z-10 w-8 h-8 bg-white border-[3px] border-black flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <div className="relative z-10 w-8 h-8 bg-white border-[3px] border-black transform translate-x-1"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('product');
  const [accountTab, setAccountTab] = useState<AccountTab>('orders');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [deliveryType, setDeliveryType] = useState<'inside' | 'outside'>('inside');
  const [orderInfo, setOrderInfo] = useState({ name: '', phone: '', address: '', note: '' });
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackPhone, setTrackPhone] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState({ name: 'Sabbir Ahmed', email: 'sabbir@example.com', phone: '01712345678', address: 'Dhanmondi, Dhaka' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const deliveryCharge = deliveryType === 'inside' ? 150 : 200;
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const total = cartSubtotal + deliveryCharge;

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [{ product, quantity }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const handleOrderNow = (product: Product) => {
    setCart([{ product, quantity: 1 }]);
    setView('checkout');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setView('account');
    setAccountTab('orders');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('product');
  };

  const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 animate-in fade-in duration-500">
       <div className="mb-12">
          <button onClick={() => setView('product')} className="flex items-center space-x-2 text-gray-400 hover:text-black font-bold uppercase text-xs tracking-widest transition-colors mb-4">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">{title}</h1>
          <div className="h-2 w-24 bg-red-600 mt-6"></div>
       </div>
       <div className="prose prose-lg prose-gray max-none font-medium text-gray-600 leading-relaxed">
         {children}
       </div>
    </div>
  );

  const renderAccountTabs = () => {
    switch(accountTab) {
      case 'orders':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-2xl font-black uppercase mb-8 flex items-center">
              <ShoppingBag className="mr-3 text-red-600" />
              Recent Activity
            </h3>
            <div className="space-y-6">
              {[
                { id: 'BM-16102', name: 'Helmet Rack BM161', status: 'Delivered', date: '24 Oct, 2024', color: 'text-green-600' },
                { id: 'BM-20788', name: 'Dish Rack BM216', status: 'Processing', date: 'Just Now', color: 'text-blue-600' },
                { id: 'BM-17015', name: 'Simple Shoe Rack', status: 'Cancelled', date: '12 Sep, 2024', color: 'text-gray-400' }
              ].map((order, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="font-black text-[10px] uppercase text-gray-400 tracking-widest mb-1">Order #{order.id}</div>
                    <div className="font-black text-lg">{order.name}</div>
                  </div>
                  <div className="text-right">
                    <div className={`${order.color} font-black text-xs uppercase tracking-widest`}>{order.status}</div>
                    <div className="font-bold text-gray-400 text-sm">{order.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-2xl font-black uppercase mb-8 flex items-center">
              <User className="mr-3 text-red-600" />
              Profile Information
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Full Name</label>
                <div className="h-16 bg-gray-50 border border-gray-200 rounded-2xl px-6 flex items-center font-bold text-gray-800">{user.name}</div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
                <div className="h-16 bg-gray-50 border border-gray-200 rounded-2xl px-6 flex items-center font-bold text-gray-800">{user.email}</div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Phone Number</label>
                <div className="h-16 bg-gray-50 border border-gray-200 rounded-2xl px-6 flex items-center font-bold text-gray-800">{user.phone}</div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Saved Address</label>
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-800 leading-relaxed">{user.address}</div>
              </div>
              <button className="h-16 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 transition-colors mt-4">Update Profile</button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-2xl font-black uppercase mb-8 flex items-center">
              <Settings className="mr-3 text-red-600" />
              Account Settings
            </h3>
            <div className="space-y-4">
              {[
                { icon: <Lock size={20} />, label: 'Change Password', desc: 'Secure your account with a strong password' },
                { icon: <Bell size={20} />, label: 'Notifications', desc: 'Manage your SMS and email alerts' },
                { icon: <CreditCard size={20} />, label: 'Saved Cards', desc: 'Manage your payment methods' },
                { icon: <ShieldCheck size={20} />, label: 'Privacy & Data', desc: 'Manage how your data is handled' }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-black transition-all group text-left">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-black uppercase text-sm tracking-tight">{item.label}</div>
                      <div className="text-xs font-bold text-gray-400 mt-1">{item.desc}</div>
                    </div>
                  </div>
                  <div className="p-2 text-gray-300 group-hover:text-black transition-colors">
                    <Plus size={20} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  const renderAccount = () => {
    if (isLoggedIn) {
      return (
        <PageLayout title="My Account">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 space-y-6 md:sticky md:top-32">
              <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 text-center">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-4 border-4 border-white shadow-xl">
                  {user.name.charAt(0) || 'U'}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{user.name}</h3>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-1">Verified User</p>
                <button onClick={handleLogout} className="mt-8 flex items-center justify-center space-x-2 w-full py-4 border-2 border-gray-200 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all hover:border-black">
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
              <div className="bg-white border border-gray-100 rounded-[3rem] p-4 space-y-2 shadow-sm">
                <button 
                  onClick={() => setAccountTab('orders')}
                  className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all text-left group ${accountTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                >
                  <Package className={accountTab === 'orders' ? 'text-red-500' : 'text-gray-400 group-hover:scale-110 transition-transform'} size={20} />
                  <span className="font-black uppercase text-xs tracking-widest">My Orders</span>
                </button>
                <button 
                  onClick={() => setAccountTab('profile')}
                  className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all text-left group ${accountTab === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                >
                  <User className={accountTab === 'profile' ? 'text-red-500' : 'text-gray-400 group-hover:scale-110 transition-transform'} size={20} />
                  <span className="font-black uppercase text-xs tracking-widest">Profile Info</span>
                </button>
                <button 
                  onClick={() => setAccountTab('settings')}
                  className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all text-left group ${accountTab === 'settings' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                >
                  <Settings className={accountTab === 'settings' ? 'text-red-500' : 'text-gray-400 group-hover:scale-110 transition-transform'} size={20} />
                  <span className="font-black uppercase text-xs tracking-widest">Settings</span>
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-sm min-h-[500px]">
                {renderAccountTabs()}
              </div>
            </div>
          </div>
        </PageLayout>
      );
    }

    return (
      <PageLayout title={authMode === 'login' ? 'Welcome Back' : 'Create Account'}>
        <div className="max-w-md mx-auto">
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-12">
            <button 
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${authMode === 'login' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${authMode === 'register' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-6">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all"
                required
              />
            </div>
            <button type="submit" className="w-full h-20 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-red-600 transition-all flex items-center justify-center space-x-3 shadow-2xl active:scale-95 group mt-8">
              <span>{authMode === 'login' ? 'LOGIN NOW' : 'CREATE ACCOUNT'}</span>
            </button>
          </form>

          <p className="mt-12 text-center text-gray-400 font-bold text-sm">
            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-black font-black hover:underline"
            >
              {authMode === 'login' ? 'Sign up here' : 'Login here'}
            </button>
          </p>
        </div>
      </PageLayout>
    );
  };

  const renderTrackOrder = () => (
    <div className="min-h-screen bg-white animate-in fade-in duration-500 flex flex-col items-center justify-start pt-24 px-4">
      <div className="w-full max-w-lg flex flex-col items-center">
        <CustomTrackIcon className="mb-8" />
        <h1 className="text-6xl font-black text-gray-800 tracking-tight mb-16 text-center">Track Order</h1>
        {!isTracking ? (
          <form onSubmit={(e) => { e.preventDefault(); setIsTracking(true); }} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Order ID" value={trackOrderId} onChange={(e) => setTrackOrderId(e.target.value)} className="h-20 bg-gray-50 border-2 border-gray-100 rounded-2xl px-8 font-bold text-xl outline-none focus:border-black transition-all" required />
              <input type="tel" placeholder="Phone Number" value={trackPhone} onChange={(e) => setTrackPhone(e.target.value)} className="h-20 bg-gray-50 border-2 border-gray-100 rounded-2xl px-8 font-bold text-xl outline-none focus:border-black transition-all" required />
            </div>
            <button type="submit" className="w-full h-20 bg-black text-white rounded-2xl font-black text-2xl tracking-widest hover:bg-gray-900 transition-all active:scale-[0.98]">TRACK NOW</button>
          </form>
        ) : (
          <div className="w-full bg-gray-50 border-2 border-gray-100 rounded-[3rem] p-10 text-center animate-in slide-in-from-bottom-8">
            <div className="text-green-600 font-black text-xl mb-4 uppercase tracking-widest">In Transit</div>
            <p className="text-gray-500 font-bold mb-8">Estimated Delivery: Tomorrow</p>
            <button onClick={() => setIsTracking(false)} className="text-gray-400 font-black uppercase text-sm hover:text-black tracking-widest">Check another order</button>
          </div>
        )}
      </div>
    </div>
  );

  // Fix: Implement missing renderCheckout function
  const renderCheckout = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b pb-6">
            <h2 className="text-3xl font-black uppercase tracking-tight">Order Summary</h2>
            <button onClick={() => setView('product')} className="text-gray-400 hover:text-black font-bold uppercase text-xs flex items-center space-x-1">
              <X size={14} /> <span>Close</span>
            </button>
          </div>
          <div className="space-y-6">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 bg-white">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{item.product.name}</h4>
                    <p className="text-red-600 font-black">৳{item.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => updateQuantity(item.product.id, -1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-black hover:bg-gray-100">-</button>
                  <span className="font-black w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-black hover:bg-gray-100">+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-[3rem] space-y-4">
            <div className="flex justify-between font-bold">
              <span className="text-gray-400 uppercase text-xs tracking-widest">Subtotal</span>
              <span>৳{cartSubtotal}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-gray-400 uppercase text-xs tracking-widest">Delivery Charge</span>
              <span>৳{deliveryCharge}</span>
            </div>
            <div className="h-px bg-white/10 my-4"></div>
            <div className="flex justify-between items-end">
              <span className="text-xl font-black uppercase tracking-tighter">Total Amount</span>
              <span className="text-4xl font-black text-red-500">৳{total}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Shipping Info</h2>
          <form onSubmit={(e) => { e.preventDefault(); setView('success'); setCart([]); }} className="space-y-6">
             <div>
               <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Full Name</label>
               <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full h-16 bg-white border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all"
                value={orderInfo.name}
                onChange={(e) => setOrderInfo({...orderInfo, name: e.target.value})}
                required
               />
             </div>
             <div>
               <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Phone Number</label>
               <input 
                type="tel" 
                placeholder="017xxxxxxxx" 
                className="w-full h-16 bg-white border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all"
                value={orderInfo.phone}
                onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})}
                required
               />
             </div>
             <div>
               <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Full Address</label>
               <textarea 
                placeholder="House, Road, Area, City" 
                className="w-full h-32 bg-white border-2 border-transparent rounded-2xl p-6 font-bold focus:border-black outline-none transition-all resize-none"
                value={orderInfo.address}
                onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
                required
               />
             </div>
             <div>
               <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Delivery Zone</label>
               <div className="flex space-x-4">
                 <button 
                  type="button"
                  onClick={() => setDeliveryType('inside')}
                  className={`flex-1 h-16 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${deliveryType === 'inside' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-400'}`}
                 >Inside Dhaka</button>
                 <button 
                  type="button"
                  onClick={() => setDeliveryType('outside')}
                  className={`flex-1 h-16 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${deliveryType === 'outside' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-400'}`}
                 >Outside Dhaka</button>
               </div>
             </div>
             <button type="submit" className="w-full h-20 bg-red-600 text-white rounded-2xl font-black text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-100 active:scale-95 mt-8">
               CONFIRM ORDER
             </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Fix: Implement missing renderAbout function
  const renderAbout = () => (
    <PageLayout title="About Us">
      <div className="space-y-8">
        <p>Bismillah Nashwa is a premium manufacturer of high-quality metal furniture and home decor solutions in Bangladesh. Our journey started with a vision to transform living spaces using durable materials and elegant designs.</p>
        <p>Operating from our own dedicated factory in Dhaka, we ensure that every piece of furniture meets our rigorous standards for quality and craftsmanship. From kitchen storage solutions to home organization accessories, our products are built to last a lifetime.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="text-red-600 mb-4"><ShieldCheck size={40} /></div>
            <h4 className="font-black text-xl uppercase mb-2">Our Quality</h4>
            <p className="text-sm">We use premium MS (Mild Steel) and Belgium rods with powder coating for a rust-free, long-lasting finish.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="text-red-600 mb-4"><Globe size={40} /></div>
            <h4 className="font-black text-xl uppercase mb-2">Our Vision</h4>
            <p className="text-sm">To be the leading provider of innovative metal furniture that combines functionality with modern aesthetics.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );

  // Fix: Implement missing renderPrivacy function
  const renderPrivacy = () => (
    <PageLayout title="Privacy Policy">
      <div className="space-y-6">
        <p>Your privacy is important to us. This policy outlines how Bismillah Nashwa collects, uses, and protects your information.</p>
        <h3 className="font-black text-xl text-black">Information Collection</h3>
        <p>We collect information when you place an order, subscribe to our newsletter, or fill out a form. This includes your name, email, phone number, and shipping address.</p>
        <h3 className="font-black text-xl text-black">Data Protection</h3>
        <p>We implement various security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
      </div>
    </PageLayout>
  );

  // Fix: Implement missing renderTerms function
  const renderTerms = () => (
    <PageLayout title="Terms & Conditions">
      <div className="space-y-6">
        <p>By accessing this website, you agree to the following terms and conditions.</p>
        <h3 className="font-black text-xl text-black">Order Confirmation</h3>
        <p>All orders are subject to confirmation. A representative will contact you via phone to verify order details before processing.</p>
        <h3 className="font-black text-xl text-black">Product Accuracy</h3>
        <p>We strive for accuracy in product descriptions and pricing. However, errors may occur. In such cases, we reserve the right to correct any errors and cancel orders if necessary.</p>
      </div>
    </PageLayout>
  );

  // Fix: Implement missing renderContact function
  const renderContact = () => (
    <PageLayout title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p>We're here to help! Whether you have a question about our products, an order, or just want to say hello, feel free to reach out.</p>
          <div className="space-y-6">
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center"><Phone size={24} /></div>
                <div>
                   <div className="text-xs font-black uppercase text-gray-400">Call Us</div>
                   <div className="font-black text-lg">{PHONE_NUMBER}</div>
                </div>
             </div>
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><Mail size={24} /></div>
                <div>
                   <div className="text-xs font-black uppercase text-gray-400">Email Us</div>
                   <div className="font-black text-lg">{EMAIL}</div>
                </div>
             </div>
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center"><MapPin size={24} /></div>
                <div>
                   <div className="text-xs font-black uppercase text-gray-400">Visit Us</div>
                   <div className="font-black text-sm">{ADDRESS}</div>
                </div>
             </div>
          </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
           <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full h-14 bg-white rounded-xl px-5 font-bold outline-none focus:border-black border border-transparent transition-all" />
              <input type="email" placeholder="Email" className="w-full h-14 bg-white rounded-xl px-5 font-bold outline-none focus:border-black border border-transparent transition-all" />
              <textarea placeholder="Your Message" className="w-full h-32 bg-white rounded-xl p-5 font-bold outline-none focus:border-black border border-transparent transition-all resize-none"></textarea>
              <button className="w-full h-14 bg-black text-white rounded-xl font-black uppercase tracking-widest hover:bg-red-600 transition-all">Send Message</button>
           </form>
        </div>
      </div>
    </PageLayout>
  );

  // Fix: Implement missing renderRefund function
  const renderRefund = () => (
    <PageLayout title="Refund Policy">
      <div className="space-y-6">
        <p>We want you to be completely satisfied with your purchase. If there's an issue with your order, we're here to help.</p>
        <h3 className="font-black text-xl text-black">Returns</h3>
        <p>You have 7 days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.</p>
        <h3 className="font-black text-xl text-black">Refunds</h3>
        <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. If your return is approved, we will initiate a refund to your original method of payment.</p>
      </div>
    </PageLayout>
  );

  // Fix: Implement missing renderSitemap function
  const renderSitemap = () => (
    <PageLayout title="Sitemap">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h4 className="font-black uppercase text-black border-b pb-2">Main Pages</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setView('product')} className="hover:text-red-600">Home</button></li>
            <li><button onClick={() => setView('account')} className="hover:text-red-600">My Account</button></li>
            <li><button onClick={() => setView('checkout')} className="hover:text-red-600">Checkout</button></li>
            <li><button onClick={() => setView('track')} className="hover:text-red-600">Track Order</button></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-black uppercase text-black border-b pb-2">Information</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setView('about')} className="hover:text-red-600">About Us</button></li>
            <li><button onClick={() => setView('contact')} className="hover:text-red-600">Contact Us</button></li>
            <li><button onClick={() => setView('privacy')} className="hover:text-red-600">Privacy Policy</button></li>
            <li><button onClick={() => setView('terms')} className="hover:text-red-600">Terms & Conditions</button></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-black uppercase text-black border-b pb-2">Customer Support</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setView('refund')} className="hover:text-red-600">Refund Policy</button></li>
            <li><button onClick={() => setView('sitemap')} className="hover:text-red-600">Sitemap</button></li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );

  const mainViewContent = () => {
    switch(view) {
      case 'product': return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <ProductGallery images={PRODUCT_DATA.images} />
            <ProductInfo product={PRODUCT_DATA} onAddToCart={() => handleAddToCart(PRODUCT_DATA)} onOrderNow={() => handleOrderNow(PRODUCT_DATA)} />
          </div>
        </div>
      );
      case 'track': return renderTrackOrder();
      case 'account': return renderAccount();
      case 'checkout': return renderCheckout();
      case 'about': return renderAbout();
      case 'privacy': return renderPrivacy();
      case 'terms': return renderTerms();
      case 'contact': return renderContact();
      case 'refund': return renderRefund();
      case 'sitemap': return renderSitemap();
      case 'success': return (
        <div className="max-w-xl mx-auto px-4 py-32 text-center animate-in zoom-in duration-500">
          <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-green-50 animate-bounce">
            <CheckCircle2 size={64} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-6">Order Received!</h1>
          <p className="text-gray-500 font-bold text-xl mb-12 leading-relaxed">Your order has been placed successfully. Our agent will call you soon for confirmation.</p>
          <button onClick={() => setView('product')} className="h-20 bg-black text-white px-16 rounded-[2rem] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl active:scale-95">Back to Home</button>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Inter'] selection:bg-red-600 selection:text-white overflow-x-hidden">
      {view !== 'checkout' && (
        <Header 
          cartCount={cart.length} 
          onHomeClick={() => setView('product')}
          onTrackOrderClick={() => setView('track')}
          onCartClick={() => setView('checkout')}
          onAccountClick={() => setView('account')}
          onSearch={(q) => setView('product')}
        />
      )}
      <main className="relative">{mainViewContent()}</main>
      {view !== 'checkout' && (
        <Footer 
          onHomeClick={() => setView('product')}
          onTrackOrderClick={() => setView('track')}
          onAccountClick={() => setView('account')}
          onAboutClick={() => setView('about')}
          onPrivacyClick={() => setView('privacy')}
          onTermsClick={() => setView('terms')}
          onContactClick={() => setView('contact')}
          onRefundClick={() => setView('refund')}
          onSitemapClick={() => setView('sitemap')}
        />
      )}
      <ChatWidget />
    </div>
  );
};

export default App;