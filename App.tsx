
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ChatWidget from './components/ChatWidget';
import AdminPanel from './components/AdminPanel';
import { 
  ArrowLeft, CheckCircle2, ShoppingBag, Eye, User as UserIcon, 
  Lock, Mail, Phone, Package, Search, Bell, LogOut, History, MapPin, Settings, Shield, Heart, Trash2, Plus, Minus, Info
} from 'lucide-react';
import { ALL_PRODUCTS } from './constants';
import { Product, Order, User, Notification } from './types';

type ViewType = 'home' | 'product' | 'checkout' | 'success' | 'admin' | 'account' | 'track' | 'auth' | 'wishlist' | 'notification-details';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bn_products');
    return saved ? JSON.parse(saved) : ALL_PRODUCTS;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('bn_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('bn_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('bn_notifications');
    return saved ? JSON.parse(saved) : [
      { id: 'promo-1', userId: 'all', title: 'Grand Opening Sale!', message: 'Enjoy up to 20% off on all metal craft items this week only!', date: new Date().toLocaleString(), read: false }
    ];
  });
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('bn_categories');
    return saved ? JSON.parse(saved) : Array.from(new Set(ALL_PRODUCTS.map(p => p.category)));
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bn_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bn_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [deliveryType, setDeliveryType] = useState<'inside' | 'outside'>('inside');
  const [orderInfo, setOrderInfo] = useState({ name: '', phone: '', address: '', email: '', note: '' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [trackId, setTrackId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [addressError, setAddressError] = useState(false);

  // Sync data to localStorage
  useEffect(() => { localStorage.setItem('bn_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('bn_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('bn_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('bn_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('bn_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('bn_current_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('bn_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProduct, selectedNotification]);

  const deliveryCharge = deliveryType === 'inside' ? 150 : 200;
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const total = cartSubtotal + deliveryCharge;

  const userNotifications = notifications.filter(n => n.userId === 'all' || (currentUser && n.userId === currentUser.id));
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International format
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAuth = (type: 'login' | 'signup', data: any) => {
    if (type === 'signup') {
      if (data.name.length < 3) { alert('Full name must be at least 3 characters.'); return; }
      if (!validateEmail(data.email)) { alert('Please enter a valid email address.'); return; }
      if (!validatePhone(data.phone)) { alert('Please enter a valid phone number with country code (e.g. +880).'); return; }

      const newUser: User = {
        id: `U-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setView('home');
    } else {
      const user = users.find(u => u.email === data.email && u.password === data.password);
      if (user) {
        setCurrentUser(user);
        setView('home');
      } else if (data.email === 'admin@bn.com' && data.password === 'admin123') {
        const admin: User = { id: 'admin', name: 'System Admin', email: 'admin@bn.com', phone: '', role: 'admin', createdAt: '' };
        setCurrentUser(admin);
        setView('admin');
      } else {
        alert('Invalid credentials. Hint: admin@bn.com / admin123');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  const openNotification = (notif: Notification) => {
    setSelectedNotification(notif);
    setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setView('notification-details');
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const isExist = prev.find(p => p.id === product.id);
      if (isExist) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleOrderNow = (product: Product, quantity: number = 1) => {
    setCart([{ product, quantity }]);
    setView('checkout');
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    const name = orderInfo.name || currentUser?.name || '';
    const phone = orderInfo.phone || currentUser?.phone || '';
    const email = orderInfo.email || currentUser?.email || '';
    const address = orderInfo.address;

    if (name.length < 3) { alert('Full name must be at least 3 characters.'); return; }
    if (!validateEmail(email)) { alert('Please enter a valid email address.'); return; }
    if (!validatePhone(phone)) { alert('Please enter a valid phone number with country code (e.g. +880).'); return; }
    
    // Address check with shake animation trigger
    if (address.trim().length < 10) { 
      setAddressError(true);
      setTimeout(() => setAddressError(false), 500); // Reset after animation
      return; 
    }
    
    if (cart.length === 0) { alert("Your bag is empty."); return; }

    // Unique Order ID based on Phone Number suffix + Timestamp suffix
    const cleanPhone = phone.replace(/\D/g, '');
    const orderId = `BN-${cleanPhone.slice(-4)}-${Date.now().toString().slice(-4)}`;

    const newOrder: Order = {
      id: orderId,
      userId: currentUser?.id,
      customerName: name,
      phone: phone,
      email: email,
      address: address,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      subtotal: cartSubtotal,
      deliveryCharge,
      total,
      status: 'pending',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    // Create Order Placement Notification
    const orderNotif: Notification = {
      id: `ON-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      title: 'Order Confirmation',
      message: `Your order #${orderId} has been successfully placed. We will start processing it shortly. Thank you for shopping with Bismillah nashwa!`,
      date: new Date().toLocaleString(),
      read: false
    };

    setOrders([newOrder, ...orders]);
    setNotifications([orderNotif, ...notifications]);
    
    // UI Behavior updates: Clear cart, reset info, and go Home
    setCart([]);
    setOrderInfo({ name: '', phone: '', address: '', email: '', note: '' });
    setAddressError(false);
    setView('home');
    alert(`Success! Order #${orderId} received. Check your notifications for details.`);
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => o.id === trackId || o.phone === trackId);
    setTrackedOrder(found || null);
    if (!found) alert('Order not found. Please check ID or Phone Number.');
  };

  const handleAdminAccess = () => {
    if (currentUser?.role === 'admin') {
      setView('admin');
    } else {
      setView('auth');
    }
  };

  const mainViewContent = () => {
    switch(view) {
      case 'home': return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 animate-in fade-in duration-700">
          <div className="flex flex-col items-center mb-16 space-y-4">
            <span className="label-xs text-red-600 bg-red-50 px-4 py-1.5 rounded-full">Factory Direct</span>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-center">Premium Metal Craft</h1>
            <p className="text-gray-400 font-medium text-sm md:text-base max-w-xl text-center">Exclusive designs for modern homes. Durable, stylish, and built to last.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const inWishlist = wishlist.some(p => p.id === product.id);
              return (
                <div key={product.id} className="group relative flex flex-col bg-white rounded-3xl p-4 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-500 cursor-pointer" onClick={() => openProduct(product)}>
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-50 relative">
                    <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button onClick={(e) => { e.stopPropagation(); openProduct(product); }} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-md hover:scale-110 transition-transform">
                        <Eye size={18} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleOrderNow(product); }} className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform">
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                      className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${inWishlist ? 'bg-red-600 text-white' : 'bg-white text-gray-300 hover:text-red-600'}`}
                    >
                      <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="px-1 space-y-1">
                    <span className="label-xs text-gray-400">{product.category}</span>
                    <h3 className="font-bold text-base tracking-tight group-hover:text-red-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center space-x-3 pt-1">
                      <span className="text-lg font-bold text-gray-900">৳{product.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
      case 'notification-details': return selectedNotification ? (
        <div className="max-w-3xl mx-auto px-4 py-24 animate-in fade-in slide-in-from-bottom-6 duration-500">
          <button onClick={() => setView('home')} className="mb-12 flex items-center space-x-2 label-xs text-gray-400 hover:text-black transition-colors">
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 right-0 h-2 bg-red-600"></div>
             <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-8">
               <Info size={32} />
             </div>
             <div className="space-y-6">
                <div>
                  <span className="label-xs text-red-600 mb-2 block">System Alert</span>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">{selectedNotification.title}</h1>
                  <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{selectedNotification.date}</p>
                </div>
                <div className="h-px bg-gray-100 w-full"></div>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                   {selectedNotification.message}
                </p>
                <div className="pt-8">
                  <button onClick={() => setView('home')} className="h-14 bg-black text-white px-10 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all shadow-xl">
                    Acknowledge Message
                  </button>
                </div>
             </div>
          </div>
        </div>
      ) : null;
      case 'wishlist': return (
        <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold uppercase tracking-tight">My Wishlist</h1>
            <button onClick={() => setView('home')} className="label-xs text-gray-400 hover:text-black">Return Home</button>
          </div>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlist.map(product => (
                <div key={product.id} className="group flex flex-col bg-white rounded-3xl p-4 border border-gray-100 shadow-sm relative">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-50" onClick={() => openProduct(product)}>
                    <img src={product.images[0]} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-600">৳{product.price}</span>
                    <button onClick={() => toggleWishlist(product)} className="text-gray-300 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                  <button onClick={() => handleAddToCart(product)} className="mt-4 w-full h-10 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all">Add to Cart</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <Heart size={48} className="text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Your wishlist is empty.</p>
            </div>
          )}
        </div>
      );
      case 'account': 
        if (!currentUser) { setView('auth'); return null; }
        const myOrders = orders.filter(o => o.userId === currentUser.id || o.phone === currentUser.phone);
        const myNotifs = notifications.filter(n => n.userId === currentUser.id || n.userId === 'all');
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="label-xs text-red-600 mb-2 block">Customer Dashboard</span>
                <h1 className="text-3xl font-bold uppercase tracking-tight flex items-center gap-3">
                  {currentUser.role === 'admin' && <Shield className="text-red-600" size={24} />}
                  Welcome, {currentUser.name}
                </h1>
              </div>
              <div className="flex gap-4">
                {currentUser.role === 'admin' && (
                   <button onClick={() => setView('admin')} className="flex items-center space-x-2 bg-black text-white font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-red-600 transition-all shadow-lg">
                    <Settings size={14} />
                    <span>Admin Panel</span>
                  </button>
                )}
                <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-400 hover:text-black font-bold text-[10px] uppercase tracking-widest border px-6 py-3 rounded-xl transition-all">
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="label-xs text-gray-400 mb-6 flex items-center"><History size={14} className="mr-2" /> Recent Orders</h2>
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50/50">
                        <tr>
                          <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                          <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</th>
                          <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                          <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {myOrders.map(o => (
                          <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-6 font-bold text-sm">{o.id}</td>
                            <td className="p-6 text-xs font-semibold text-gray-500">{o.date}</td>
                            <td className="p-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                o.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                                o.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                              }`}>{o.status}</span>
                            </td>
                            <td className="p-6 text-right font-bold">৳{o.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {myOrders.length === 0 && <div className="p-20 text-center font-bold text-gray-300">No orders yet.</div>}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="label-xs text-gray-400 mb-6 flex items-center"><Bell size={14} className="mr-2" /> Notifications</h2>
                  <div className="space-y-4">
                    {myNotifs.length > 0 ? myNotifs.map(n => (
                      <div key={n.id} onClick={() => openNotification(n)} className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group cursor-pointer transition-all hover:border-red-600 ${!n.read ? 'ring-2 ring-red-50' : ''}`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${!n.read ? 'bg-red-600' : 'bg-gray-200'}`}></div>
                        <h4 className="font-bold text-sm uppercase mb-1">{n.title}</h4>
                        <p className="text-[11px] font-medium text-gray-500 mb-2 line-clamp-1">{n.message}</p>
                        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{n.date}</span>
                        {!n.read && <div className="absolute top-6 right-6 w-2 h-2 bg-red-600 rounded-full"></div>}
                      </div>
                    )) : (
                      <div className="bg-gray-50 p-10 rounded-2xl text-center font-bold text-gray-300">Clean inbox</div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );
      case 'track': return (
        <div className="max-w-3xl mx-auto px-4 py-24 animate-in zoom-in duration-500">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Track Your Shipment</h1>
            <p className="text-gray-400 font-medium">Enter your Order ID or Registered Phone Number to see real-time status.</p>
          </div>
          
          <form onSubmit={handleTrackOrder} className="flex flex-col md:flex-row gap-4 mb-12">
            <input 
              type="text" 
              placeholder="Ex: BN-12345 or 017..." 
              className="flex-grow h-14 bg-white border border-gray-100 rounded-xl px-6 font-semibold focus:border-black outline-none transition-all shadow-sm"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              required
            />
            <button type="submit" className="h-14 px-10 bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg">Track Now</button>
          </form>

          {trackedOrder && (
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl animate-in fade-in slide-in-from-top-4">
              <div className="flex justify-between items-start border-b pb-8 mb-8">
                <div>
                  <span className="label-xs text-gray-400">Shipment Status</span>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-red-600 mt-1">{trackedOrder.status}</h2>
                </div>
                <div className="text-right">
                  <span className="label-xs text-gray-400">Order Ref</span>
                  <div className="font-bold text-sm">{trackedOrder.id}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-12 relative px-4">
                <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-gray-100"></div>
                {['pending', 'processing', 'shipped', 'delivered'].map((s, idx) => {
                  const isActive = ['pending', 'processing', 'shipped', 'delivered'].indexOf(trackedOrder.status) >= idx;
                  return (
                    <div key={s} className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all ${isActive ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        {isActive ? <CheckCircle2 size={12} /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                      </div>
                      <span className={`text-[8px] font-bold uppercase tracking-widest mt-2 ${isActive ? 'text-black' : 'text-gray-300'}`}>{s}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-4">
                  <MapPin size={16} className="text-gray-300 mt-0.5" />
                  <div>
                    <span className="label-xs text-gray-400">Shipping To</span>
                    <p className="text-xs font-semibold text-gray-900 mt-1 leading-relaxed">{trackedOrder.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
      case 'auth': return (
        <AuthView onAuth={handleAuth} onSwitchToHome={() => setView('home')} />
      );
      case 'product': return selectedProduct ? (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={() => setView('home')} className="mb-8 flex items-center space-x-2 label-xs text-gray-400 hover:text-black transition-colors">
            <ArrowLeft size={14} />
            <span>Back to Collection</span>
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <ProductGallery images={selectedProduct.images} />
            <ProductInfo 
              product={selectedProduct} 
              isWishlisted={wishlist.some(p => p.id === selectedProduct.id)}
              onWishlistToggle={() => toggleWishlist(selectedProduct)}
              onAddToCart={(qty) => handleAddToCart(selectedProduct, qty)} 
              onOrderNow={(qty) => handleOrderNow(selectedProduct, qty)} 
            />
          </div>
        </div>
      ) : null;
      case 'admin': return (
        <AdminPanel 
          products={products} 
          orders={orders} 
          users={users}
          notifications={notifications}
          categories={categories}
          onUpdateProducts={setProducts} 
          onUpdateOrders={setOrders}
          onUpdateNotifications={setNotifications}
          onUpdateCategories={setCategories}
          onClose={() => setView('home')} 
        />
      );
      case 'checkout': return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-tight border-b pb-4">Bag Summary</h2>
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative group">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                          <img src={item.product.images[0]} className="w-full h-full object-cover" alt={item.product.name} />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-bold text-sm text-gray-900">{item.product.name}</h4>
                          <p className="text-red-600 font-bold text-xs mt-0.5">৳{item.product.price}</p>
                          <div className="flex items-center space-x-3 mt-2 bg-gray-50 w-fit rounded-lg px-2 py-1 border border-gray-100">
                            <button onClick={() => updateCartQuantity(item.product.id, -1)} className="text-gray-400 hover:text-black transition-colors"><Minus size={14} /></button>
                            <span className="text-xs font-black min-w-[20px] text-center">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.product.id, 1)} className="text-gray-400 hover:text-black transition-colors"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <ShoppingBag size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Bag is Empty</p>
                  <button onClick={() => setView('home')} className="mt-4 text-[10px] font-black text-red-600 underline uppercase tracking-[0.2em]">Start Shopping</button>
                </div>
              )}
              
              <div className="bg-gray-900 text-white p-6 rounded-3xl space-y-3">
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Delivery</span>
                  <span>৳{deliveryCharge}</span>
                </div>
                <div className="h-px bg-white/10 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest">Total</span>
                  <span className="text-2xl font-bold text-red-500">৳{total}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 md:p-10 rounded-3xl border border-gray-100">
              <h2 className="text-lg font-bold uppercase tracking-tight mb-6">Delivery Details</h2>
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                 <div>
                   <label className="label-xs block text-gray-400 mb-1.5">Full Name (Min. 3 chars)</label>
                   <input type="text" className="w-full h-12 bg-white rounded-xl px-5 font-semibold outline-none border border-gray-100 focus:border-black transition-all" value={orderInfo.name || currentUser?.name || ''} onChange={(e) => setOrderInfo({...orderInfo, name: e.target.value})} required />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label-xs block text-gray-400 mb-1.5">Phone (with Country Code)</label>
                      <input type="tel" placeholder="+8801..." className="w-full h-12 bg-white rounded-xl px-5 font-semibold outline-none border border-gray-100 focus:border-black transition-all" value={orderInfo.phone || currentUser?.phone || ''} onChange={(e) => setOrderInfo({...orderInfo, phone: e.target.value})} required />
                    </div>
                    <div>
                      <label className="label-xs block text-gray-400 mb-1.5">Email Address</label>
                      <input type="email" placeholder="name@email.com" className="w-full h-12 bg-white rounded-xl px-5 font-semibold outline-none border border-gray-100 focus:border-black transition-all" value={orderInfo.email || currentUser?.email || ''} onChange={(e) => setOrderInfo({...orderInfo, email: e.target.value})} required />
                    </div>
                 </div>
                 <div className={addressError ? 'animate-shake' : ''}>
                   <label className={`label-xs block mb-1.5 transition-colors ${addressError ? 'text-red-600 font-black' : 'text-gray-400'}`}>Full Delivery Address {addressError && '(REQUIRED - MIN 10 CHARS)'}</label>
                   <textarea 
                    className={`w-full h-24 rounded-xl p-5 font-semibold outline-none border transition-all resize-none ${addressError ? 'bg-red-50 border-red-600 text-red-900 ring-2 ring-red-100' : 'bg-white border-gray-100 focus:border-black text-gray-900'}`} 
                    placeholder="House, Road, Area, City..." 
                    value={orderInfo.address} 
                    onChange={(e) => { setOrderInfo({...orderInfo, address: e.target.value}); if(addressError) setAddressError(false); }} 
                    required 
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                   <button type="button" onClick={() => setDeliveryType('inside')} className={`h-12 rounded-xl font-bold text-[10px] uppercase tracking-widest border transition-all ${deliveryType === 'inside' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-400'}`}>Inside Dhaka</button>
                   <button type="button" onClick={() => setDeliveryType('outside')} className={`h-12 rounded-xl font-bold text-[10px] uppercase tracking-widest border transition-all ${deliveryType === 'outside' ? 'bg-black text-white border-black shadow-md' : 'bg-white text-gray-400'}`}>Outside Dhaka</button>
                 </div>
                 <button type="submit" disabled={cart.length === 0} className="w-full h-14 bg-red-600 text-white rounded-xl font-bold text-base hover:bg-red-700 transition-all shadow-lg mt-4 uppercase disabled:opacity-50 disabled:cursor-not-allowed">Confirm Order</button>
              </form>
            </div>
          </div>
        </div>
      );
      case 'success': return (
        <div className="max-w-xl mx-auto px-4 py-24 text-center animate-in zoom-in duration-500">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold uppercase mb-4">Order Received!</h1>
          <p className="text-gray-500 font-medium mb-10">We've sent a confirmation notice to your notification center. You can track your order status in real-time.</p>
          <div className="flex flex-col space-y-4">
            <button onClick={() => setView('track')} className="h-14 bg-red-600 text-white px-10 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all">Track Order Status</button>
            <button onClick={() => setView('home')} className="h-14 bg-black text-white px-10 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">Continue Shopping</button>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-red-600 selection:text-white">
      {view !== 'admin' && (
        <Header 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
          wishlistCount={wishlist.length}
          notifications={userNotifications}
          unreadCount={unreadCount}
          onHomeClick={() => setView('home')}
          onTrackOrderClick={() => setView('track')}
          onCartClick={() => setView('checkout')}
          onAccountClick={() => currentUser ? setView('account') : setView('auth')}
          onWishlistClick={() => setView('wishlist')}
          onNotificationClick={openNotification}
          onSearch={() => {}}
        />
      )}
      <main>{mainViewContent()}</main>
      {view !== 'admin' && (
        <Footer 
          isAdmin={currentUser?.role === 'admin'}
          onAdminClick={handleAdminAccess}
          onHomeClick={() => setView('home')}
          onTrackOrderClick={() => setView('track')}
          onAccountClick={() => currentUser ? setView('account') : setView('auth')}
          onAboutClick={() => {}}
          onPrivacyClick={() => {}}
          onTermsClick={() => {}}
          onContactClick={() => {}}
          onRefundClick={() => {}}
          onSitemapClick={() => {}}
        />
      )}
      <ChatWidget />
      
      {currentUser?.role === 'admin' && view !== 'admin' && (
        <button 
          onClick={() => setView('admin')}
          className="fixed left-6 bottom-6 z-[100] w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-white animate-bounce"
        >
          <Settings size={28} />
        </button>
      )}
    </div>
  );
};

const AuthView: React.FC<{ onAuth: (type: 'login' | 'signup', data: any) => void; onSwitchToHome: () => void }> = ({ onAuth, onSwitchToHome }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 bg-gray-50/50">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden flex flex-col animate-in zoom-in duration-500">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600"></div>
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <button onClick={onSwitchToHome} className="mb-6 flex items-center justify-center space-x-2 text-[9px] font-bold text-gray-300 hover:text-black mx-auto uppercase tracking-widest transition-colors">
               <ArrowLeft size={12} />
               <span>Return to Home</span>
            </button>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 text-gray-900">
              {mode === 'login' ? 'User Login' : 'New Account'}
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              {mode === 'login' ? 'Access your digital dashboard' : 'Join our premium community'}
            </p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onAuth(mode, formData); }} className="space-y-4">
            {mode === 'signup' && (
              <div className="group">
                <label className="label-xs text-gray-400 block mb-2 ml-1 transition-colors group-focus-within:text-red-600">Account Holder Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black">
                    <UserIcon size={16} />
                  </div>
                  <input type="text" placeholder="Enter full name" className="w-full h-12 bg-gray-50 rounded-xl pl-12 pr-5 font-semibold text-sm outline-none border border-gray-100 focus:border-black focus:bg-white transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
              </div>
            )}
            <div className="group">
              <label className="label-xs text-gray-400 block mb-2 ml-1 transition-colors group-focus-within:text-red-600">Email Reference</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black">
                  <Mail size={16} />
                </div>
                <input type="email" placeholder="name@example.com" className="w-full h-12 bg-gray-50 rounded-xl pl-12 pr-5 font-semibold text-sm outline-none border border-gray-100 focus:border-black focus:bg-white transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              </div>
            </div>
            {mode === 'signup' && (
              <div className="group">
                <label className="label-xs text-gray-400 block mb-2 ml-1 transition-colors group-focus-within:text-red-600">Contact Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black">
                    <Phone size={16} />
                  </div>
                  <input type="tel" placeholder="+8801..." className="w-full h-12 bg-gray-50 rounded-xl pl-12 pr-5 font-semibold text-sm outline-none border border-gray-100 focus:border-black focus:bg-white transition-all" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                </div>
              </div>
            )}
            <div className="group">
              <label className="label-xs text-gray-400 block mb-2 ml-1 transition-colors group-focus-within:text-red-600">Secure Pin</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black">
                  <Lock size={16} />
                </div>
                <input type="password" placeholder="••••••••" className="w-full h-12 bg-gray-50 rounded-xl pl-12 pr-5 font-semibold text-sm outline-none border border-gray-100 focus:border-black focus:bg-white transition-all" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
              </div>
            </div>
            <button type="submit" className="w-full h-14 bg-black text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-red-600 transition-all shadow-xl shadow-black/10 mt-6 active:scale-[0.98]">
              {mode === 'login' ? 'Authorize Session' : 'Register Profile'}
            </button>
          </form>
          <div className="mt-8 text-center flex flex-col space-y-4">
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
              {mode === 'login' ? "Access Request Needed? Register" : "Existing Member? Authenticate"}
            </button>
            <div className="h-px bg-gray-100 w-1/2 mx-auto"></div>
            {mode === 'login' && (
              <button onClick={() => alert('Staff Credentials:\nEmail: admin@bn.com\nPassword: admin123')} className="text-[8px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-600 transition-all flex items-center justify-center gap-1.5">
                <Shield size={10} />
                <span>Staff Access Help</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
