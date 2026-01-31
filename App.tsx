import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ChatWidget from './components/ChatWidget';
import { ArrowLeft, X, Plus, Minus, MapPin, Phone, User, FileText, CheckCircle2, Search, Mail, Clock, ShieldCheck, Globe, Info } from 'lucide-react';
import { ALL_PRODUCTS, PHONE_NUMBER, EMAIL, ADDRESS, PRODUCT_DATA } from './constants';
import { Product } from './types';

type ViewType = 'product' | 'checkout' | 'success' | 'track' | 'about' | 'privacy' | 'terms' | 'contact' | 'sitemap' | 'refund';

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
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [deliveryType, setDeliveryType] = useState<'inside' | 'outside'>('inside');
  const [orderInfo, setOrderInfo] = useState({ name: '', phone: '', address: '', note: '' });
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackPhone, setTrackPhone] = useState('');
  const [isTracking, setIsTracking] = useState(false);

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
       <div className="prose prose-lg prose-gray max-w-none font-medium text-gray-600 leading-relaxed">
         {children}
       </div>
    </div>
  );

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

  const renderAbout = () => (
    <PageLayout title="About Us">
      <div className="space-y-8">
        <p className="text-2xl font-bold text-black italic">Bismillah nashwa - Decor your house perfectly.</p>
        <p>Welcome to Bismillah nashwa, your premier destination for high-quality metal furniture and modern storage solutions. Founded with a passion for durability and aesthetics, we specialize in crafting products that combine the strength of industrial-grade metal with the elegance of contemporary design.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
           <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <Info className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-black uppercase mb-2">Our Vision</h3>
              <p>To be the leading metal furniture manufacturer in Bangladesh, known for innovation and uncompromising quality.</p>
           </div>
           <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <ShieldCheck className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-black uppercase mb-2">Quality First</h3>
              <p>Every piece is manufactured in our own factory using premium MS Belgium rods and seasoned melamine boards.</p>
           </div>
        </div>
        <p>From our signature helmet racks to custom kitchen cabinets, every product is a testament to our commitment to excellence. We take pride in serving thousands of happy customers across Bangladesh with our nationwide cash-on-delivery service.</p>
      </div>
    </PageLayout>
  );

  const renderPrivacy = () => (
    <PageLayout title="Privacy Policy">
      <div className="space-y-6">
        <h3 className="text-xl font-black text-black uppercase">1. Information We Collect</h3>
        <p>When you place an order, we collect your name, phone number, and delivery address to fulfill your purchase and provide customer support.</p>
        <h3 className="text-xl font-black text-black uppercase">2. Use of Information</h3>
        <p>Your information is exclusively used for order processing, shipping, and communication regarding your order status. We do not sell or share your data with third-party marketers.</p>
        <h3 className="text-xl font-black text-black uppercase">3. Security</h3>
        <p>We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
        <h3 className="text-xl font-black text-black uppercase">4. Cookies</h3>
        <p>Our website uses minimal cookies to enhance your browsing experience and remember your cart contents.</p>
      </div>
    </PageLayout>
  );

  const renderTerms = () => (
    <PageLayout title="Terms & Conditions">
      <div className="space-y-6">
        <h3 className="text-xl font-black text-black uppercase">1. Ordering and Payment</h3>
        <p>We primarily offer Cash on Delivery (COD). By placing an order, you agree to pay the displayed amount upon delivery.</p>
        <h3 className="text-xl font-black text-black uppercase">2. Delivery Charges</h3>
        <p>Standard delivery charges are 150 TK inside Dhaka and 200 TK outside Dhaka. However, charges may vary based on product weight and size. Our representative will confirm final costs during the confirmation call.</p>
        <h3 className="text-xl font-black text-black uppercase">3. Product Accuracy</h3>
        <p>While we strive for color accuracy, slight variations may occur due to lighting conditions and screen settings.</p>
        <h3 className="text-xl font-black text-black uppercase">4. Delivery Timeline</h3>
        <p>Standard delivery takes 2-5 working days depending on your location.</p>
      </div>
    </PageLayout>
  );

  const renderRefund = () => (
    <PageLayout title="Refund Policy">
      <div className="space-y-6">
        <p>At Bismillah nashwa, we want you to be completely satisfied with your purchase.</p>
        <h3 className="text-xl font-black text-black uppercase">Returns</h3>
        <p>You may request a return within 7 days of delivery if the product is damaged or does not match the description.</p>
        <h3 className="text-xl font-black text-black uppercase">Manufacturing Defects</h3>
        <p>If there is a manufacturing defect, we will replace the item at no extra cost to you.</p>
        <h3 className="text-xl font-black text-black uppercase">Process</h3>
        <p>To initiate a return or exchange, please call us at {PHONE_NUMBER} or message us on WhatsApp with photos of the issue.</p>
      </div>
    </PageLayout>
  );

  const renderContact = () => (
    <PageLayout title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 flex-shrink-0">
                 <Phone size={24} />
              </div>
              <div>
                 <h4 className="font-black uppercase text-sm text-gray-400 mb-1">Call Us</h4>
                 <p className="text-xl font-black text-black">{PHONE_NUMBER}</p>
                 <p className="text-sm text-gray-500">Available 24/7</p>
              </div>
           </div>
           <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                 <Mail size={24} />
              </div>
              <div>
                 <h4 className="font-black uppercase text-sm text-gray-400 mb-1">Email Us</h4>
                 <p className="text-xl font-black text-black underline">{EMAIL}</p>
              </div>
           </div>
           <div className="flex items-start space-x-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                 <MapPin size={24} />
              </div>
              <div>
                 <h4 className="font-black uppercase text-sm text-gray-400 mb-1">Our Location</h4>
                 <p className="text-lg font-bold text-black leading-snug">{ADDRESS}</p>
              </div>
           </div>
        </div>
        <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100">
           <h3 className="text-2xl font-black uppercase mb-6">Send a Message</h3>
           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Name" className="w-full h-14 bg-white border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all" />
              <input type="email" placeholder="Email" className="w-full h-14 bg-white border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all" />
              <textarea placeholder="Message" className="w-full h-32 bg-white border-2 border-transparent rounded-2xl p-6 font-bold focus:border-black outline-none transition-all resize-none"></textarea>
              <button className="w-full h-14 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all">Send Now</button>
           </form>
        </div>
      </div>
    </PageLayout>
  );

  const renderSitemap = () => (
    <PageLayout title="Sitemap">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
         <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase border-b-2 border-gray-100 pb-2">Main Pages</h3>
            <ul className="space-y-2 font-bold">
               <li><button onClick={() => setView('product')} className="hover:text-red-600 transition-colors">Home</button></li>
               <li><button onClick={() => setView('track')} className="hover:text-red-600 transition-colors">Order Tracking</button></li>
               <li><button onClick={() => setView('checkout')} className="hover:text-red-600 transition-colors">Checkout</button></li>
            </ul>
         </div>
         <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase border-b-2 border-gray-100 pb-2">Policies</h3>
            <ul className="space-y-2 font-bold">
               <li><button onClick={() => setView('privacy')} className="hover:text-red-600 transition-colors">Privacy Policy</button></li>
               <li><button onClick={() => setView('terms')} className="hover:text-red-600 transition-colors">Terms & Conditions</button></li>
               <li><button onClick={() => setView('refund')} className="hover:text-red-600 transition-colors">Refund Policy</button></li>
            </ul>
         </div>
         <div className="space-y-4">
            <h3 className="text-xl font-black text-black uppercase border-b-2 border-gray-100 pb-2">Information</h3>
            <ul className="space-y-2 font-bold">
               <li><button onClick={() => setView('about')} className="hover:text-red-600 transition-colors">About Us</button></li>
               <li><button onClick={() => setView('contact')} className="hover:text-red-600 transition-colors">Contact Us</button></li>
            </ul>
         </div>
      </div>
    </PageLayout>
  );

  const renderCheckout = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-in fade-in duration-500">
      <div className="bg-white border-b px-4 py-6 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
        <h2 className="text-2xl font-black uppercase tracking-tight">Checkout</h2>
        <button onClick={() => setView('product')} className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all"><X size={24} /></button>
      </div>
      <div className="max-w-xl mx-auto w-full bg-white p-6 md:p-12 shadow-2xl flex-grow md:my-12 md:rounded-[3rem]">
        <div className="space-y-6 mb-12">
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-6 py-6 border-b border-gray-100">
              <img src={item.product.images[0]} className="w-24 h-24 rounded-2xl object-cover border shadow-sm" />
              <div className="flex-grow">
                <h4 className="text-lg font-black text-gray-900 leading-tight">{item.product.name}</h4>
                <p className="text-red-600 font-black text-xl mt-1">৳{item.product.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-center border-2 border-gray-100 rounded-2xl overflow-hidden bg-gray-50">
                <button onClick={() => updateQuantity(item.product.id, 1)} className="p-2 hover:bg-gray-200 transition-colors"><Plus size={16} /></button>
                <span className="py-1 font-black text-lg">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, -1)} className="p-2 hover:bg-gray-200 transition-colors"><Minus size={16} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 text-white rounded-[2rem] p-8 space-y-4 mb-12 shadow-xl">
          <div className="flex justify-between font-bold text-gray-400"><span>Subtotal</span><span>৳{cartSubtotal.toLocaleString()}</span></div>
          <div className="flex justify-between font-bold text-gray-400"><span>Delivery Charge</span><span>৳{deliveryCharge}</span></div>
          <div className="flex justify-between text-2xl font-black pt-4 border-t border-white/10 text-white"><span>Total Amount</span><span>৳{total.toLocaleString()}</span></div>
        </div>
        <div className="space-y-8">
          <div className="space-y-5">
            <div><label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Full Name</label><input type="text" placeholder="Your Name" className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all" value={orderInfo.name} onChange={e => setOrderInfo({...orderInfo, name: e.target.value})} /></div>
            <div><label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Phone Number</label><input type="tel" placeholder="01XXX-XXXXXX" className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl px-6 font-bold focus:border-black outline-none transition-all" value={orderInfo.phone} onChange={e => setOrderInfo({...orderInfo, phone: e.target.value})} /></div>
            <div><label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Shipping Address</label><textarea placeholder="Complete house address, Area, City" className="w-full h-32 bg-gray-50 border-2 border-transparent rounded-2xl p-6 font-bold focus:border-black outline-none transition-all resize-none" value={orderInfo.address} onChange={e => setOrderInfo({...orderInfo, address: e.target.value})} /></div>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest">Delivery Method</h4>
            <div className="grid grid-cols-1 gap-3">
              <label className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${deliveryType === 'inside' ? 'border-black bg-gray-50 scale-[1.02]' : 'border-gray-100 opacity-60'}`} onClick={() => setDeliveryType('inside')}>
                <div className="flex items-center space-x-4"><div className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center`}>{deliveryType === 'inside' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}</div><span className="font-black uppercase text-sm tracking-tight">Inside Dhaka</span></div>
                <span className="font-black text-lg">৳150</span>
              </label>
              <label className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${deliveryType === 'outside' ? 'border-black bg-gray-50 scale-[1.02]' : 'border-gray-100 opacity-60'}`} onClick={() => setDeliveryType('outside')}>
                <div className="flex items-center space-x-4"><div className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center`}>{deliveryType === 'outside' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}</div><span className="font-black uppercase text-sm tracking-tight">Outside Dhaka</span></div>
                <span className="font-black text-lg">৳200</span>
              </label>
            </div>
          </div>
          <p className="text-red-600 font-bold text-xs leading-relaxed text-center bg-red-50 p-4 rounded-xl border border-red-100 italic">অর্ডারের ওজন অনুযায়ী ডেলিভারি চার্জ বাড়তে পারে। আমাদের প্রতিনিধি বিষয়টি আপনাকে জানিয়ে দেবেন।</p>
          <button onClick={() => setView('success')} className="w-full h-20 bg-black text-white rounded-[2rem] font-black text-xl hover:bg-red-600 transition-all flex items-center justify-center space-x-3 shadow-2xl active:scale-95 group"><CheckCircle2 className="group-hover:scale-110 transition-transform" /><span>Place Order - ৳{total.toLocaleString()}</span></button>
        </div>
      </div>
    </div>
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
          onSearch={(q) => setView('product')}
        />
      )}
      <main className="relative">{mainViewContent()}</main>
      {view !== 'checkout' && (
        <Footer 
          onHomeClick={() => setView('product')}
          onTrackOrderClick={() => setView('track')}
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
