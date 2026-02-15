
import React, { useState, useRef } from 'react';
import { Product, Order, User, Notification } from '../types';
import { LayoutDashboard, Database, Plus, Trash2, Edit2, X, ChevronRight, ListOrdered, Upload, Users, Bell, Tag, Check, Save, Send } from 'lucide-react';

interface Props {
  products: Product[];
  orders: Order[];
  users: User[];
  notifications: Notification[];
  categories: string[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onUpdateNotifications: (notifs: Notification[]) => void;
  onUpdateCategories: (cats: string[]) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<Props> = ({ products, orders, users, notifications, categories, onUpdateProducts, onUpdateOrders, onUpdateNotifications, onUpdateCategories, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users' | 'categories'>('dashboard');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [newCatName, setNewCatName] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastData, setBroadcastData] = useState({ title: '', message: '' });
  
  // State for editing categories
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCatValue, setEditCatValue] = useState('');

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const existingImages = editingProduct?.images || [];
    
    const newProduct: Product = {
      id: editingProduct?.id || `P-${Date.now()}`,
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      price: Number(formData.get('price')),
      originalPrice: Number(formData.get('originalPrice')),
      category: formData.get('category') as string,
      stock: true,
      images: uploadedImages.length > 0 ? uploadedImages : existingImages,
      description: [(formData.get('desc') as string)],
      features: ['Premium Quality', 'Handcrafted']
    };

    if (editingProduct) {
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      onUpdateProducts([newProduct, ...products]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
    setUploadedImages([]);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotif: Notification = {
      id: `P-${Date.now()}`,
      userId: 'all',
      title: broadcastData.title,
      message: broadcastData.message,
      date: new Date().toLocaleString(),
      read: false
    };
    onUpdateNotifications([newNotif, ...notifications]);
    setBroadcastData({ title: '', message: '' });
    setIsBroadcasting(false);
    alert("Promotion broadcasted to all users!");
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(o => {
      if (o.id === orderId) {
        // Send notification for order update
        const newNotif: Notification = {
          id: `N-${Date.now()}`,
          userId: o.userId || 'guest',
          title: `📦 Order ${newStatus.toUpperCase()}`,
          message: `Your order #${o.id} is now ${newStatus}. ${newStatus === 'shipped' ? 'Track it in your dashboard!' : ''}`,
          date: new Date().toLocaleString(),
          read: false
        };
        onUpdateNotifications([newNotif, ...notifications]);
        return { ...o, status: newStatus };
      }
      return o;
    });
    onUpdateOrders(updatedOrders);
  };

  const addCategory = () => {
    if (newCatName.trim() && !categories.includes(newCatName.trim())) {
      onUpdateCategories([...categories, newCatName.trim()]);
      setNewCatName('');
    }
  };

  const startEditCategory = (cat: string) => {
    setEditingCategory(cat);
    setEditCatValue(cat);
  };

  const saveEditedCategory = () => {
    if (!editingCategory || !editCatValue.trim() || editCatValue === editingCategory) {
      setEditingCategory(null);
      return;
    }

    const newName = editCatValue.trim();
    onUpdateCategories(categories.map(c => c === editingCategory ? newName : c));
    const updatedProducts = products.map(p => 
      p.category === editingCategory ? { ...p, category: newName } : p
    );
    onUpdateProducts(updatedProducts);
    setEditingCategory(null);
  };

  const deleteCategory = (cat: string) => {
    if (confirm(`Remove classification "${cat}"? Products under this will remain but won't have a linked classification.`)) {
      onUpdateCategories(categories.filter(c => c !== cat));
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gray-50 flex overflow-hidden font-['Poppins']">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col p-6 space-y-8 h-full border-r border-white/5">
        <div className="flex flex-col items-center border-b border-white/10 pb-8">
            <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-white/80">System Master</span>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
            { id: 'orders', icon: ListOrdered, label: 'Orders' },
            { id: 'products', icon: Database, label: 'Vault' },
            { id: 'categories', icon: Tag, label: 'Classification' },
            { id: 'users', icon: Users, label: 'Clients' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl font-semibold text-[9px] uppercase tracking-widest transition-all duration-300 ${activeTab === item.id ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-white/5 text-gray-500'}`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onClose} className="w-full flex items-center justify-center space-x-2 p-4 border border-white/10 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          <X size={14} />
          <span>Exit</span>
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-grow overflow-y-auto p-10 bg-gray-50/50">
        <header className="flex justify-between items-end mb-10">
          <h1 className="text-2xl font-bold uppercase tracking-tight leading-none">
            {activeTab === 'dashboard' && 'Business Intelligence'}
            {activeTab === 'orders' && 'Order Control'}
            {activeTab === 'products' && 'Inventory Control'}
            {activeTab === 'categories' && 'Classification Manager'}
            {activeTab === 'users' && 'Client Management'}
          </h1>
          <div className="flex space-x-3">
             {activeTab === 'users' && (
                <button onClick={() => setIsBroadcasting(true)} className="bg-red-600 text-white h-12 px-6 rounded-xl font-bold text-[9px] uppercase tracking-widest flex items-center space-x-2 hover:bg-red-700 transition-all shadow-md">
                   <Bell size={14} />
                   <span>Broadcast Promotion</span>
                </button>
             )}
             {activeTab === 'products' && (
               <button onClick={() => setIsAddingProduct(true)} className="bg-black text-white h-12 px-6 rounded-xl font-bold text-[9px] uppercase tracking-widest flex items-center space-x-2 hover:bg-red-600 transition-all shadow-md">
                 <Plus size={14} />
                 <span>Register Product</span>
               </button>
             )}
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <span className="label-xs text-gray-400 mb-2 block">Revenue</span>
              <div className="text-2xl font-bold tracking-tight">৳{totalRevenue.toLocaleString()}</div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <span className="label-xs text-gray-400 mb-2 block">Orders</span>
              <div className="text-2xl font-bold tracking-tight text-red-600">{orders.length}</div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <span className="label-xs text-gray-400 mb-2 block">Clients</span>
              <div className="text-2xl font-bold tracking-tight">{users.length}</div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <span className="label-xs text-gray-400 mb-2 block">Pending</span>
              <div className="text-2xl font-bold tracking-tight text-yellow-600">{pendingOrders}</div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="max-w-2xl bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex gap-3">
              <input 
                type="text" 
                value={newCatName} 
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="New Classification Name..."
                className="flex-grow h-12 bg-gray-50 rounded-xl px-4 font-semibold text-sm border-none ring-1 ring-gray-100 focus:ring-black outline-none transition-all"
              />
              <button 
                onClick={addCategory}
                className="bg-black text-white h-12 px-6 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <div key={cat} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  {editingCategory === cat ? (
                    <div className="flex-grow flex items-center gap-2">
                      <input 
                        autoFocus
                        type="text" 
                        value={editCatValue} 
                        onChange={(e) => setEditCatValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEditedCategory()}
                        className="flex-grow h-10 bg-white border border-black rounded-lg px-3 font-semibold text-sm outline-none"
                      />
                      <button onClick={saveEditedCategory} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Check size={18} />
                      </button>
                      <button onClick={() => setEditingCategory(null)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-bold text-sm text-gray-700">{cat}</span>
                      <div className="flex items-center space-x-1">
                        <button onClick={() => startEditCategory(cat)} className="p-2 text-gray-300 hover:text-black transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteCategory(cat)} className="p-2 text-gray-300 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="p-6 label-xs text-gray-400">Order Ref</th>
                  <th className="p-6 label-xs text-gray-400">Client Detail</th>
                  <th className="p-6 label-xs text-gray-400">Status Control</th>
                  <th className="p-6 label-xs text-gray-400 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-6 font-bold text-xs">{order.id}</td>
                    <td className="p-6">
                      <div className="font-bold text-xs text-gray-900">{order.customerName}</div>
                      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{order.phone}</div>
                    </td>
                    <td className="p-6">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border-none outline-none cursor-pointer bg-gray-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-6 text-right font-bold text-base">৳{order.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="p-6 label-xs text-gray-400">User ID</th>
                  <th className="p-6 label-xs text-gray-400">Name</th>
                  <th className="p-6 label-xs text-gray-400">Contact</th>
                  <th className="p-6 label-xs text-gray-400">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(u => (
                  <tr key={u.id}>
                    <td className="p-6 font-bold text-[10px] text-gray-300">{u.id}</td>
                    <td className="p-6 font-bold text-xs">{u.name}</td>
                    <td className="p-6">
                      <div className="font-semibold text-[11px]">{u.email}</div>
                      <div className="text-[9px] text-gray-400">{u.phone}</div>
                    </td>
                    <td className="p-6 text-[10px] font-bold text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-500 group relative">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-50 relative">
                   <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
                   <div className="absolute top-3 right-3 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingProduct(product)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-black shadow-md transition-all"><Edit2 size={14} /></button>
                      <button onClick={() => { if(confirm('Delete product?')) onUpdateProducts(products.filter(p => p.id !== product.id)) }} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 shadow-md transition-all"><Trash2 size={14} /></button>
                   </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="label-xs text-gray-300 block mb-1">{product.category}</span>
                    <h3 className="font-bold text-base leading-tight tracking-tight">{product.name}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="font-bold text-red-600 text-lg">৳{product.price.toLocaleString()}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-900">{product.sku}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Broadcast Modal */}
        {isBroadcasting && (
          <div className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in zoom-in duration-300">
             <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600"></div>
                <button onClick={() => setIsBroadcasting(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"><X size={20}/></button>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Mass Broadcast</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Send promotion to all active clients</p>
                <form onSubmit={handleBroadcast} className="space-y-4">
                   <div>
                     <label className="label-xs text-gray-400 block mb-2 ml-1">Message Title</label>
                     <input type="text" value={broadcastData.title} onChange={(e) => setBroadcastData({...broadcastData, title: e.target.value})} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-bold text-xs border-none ring-1 ring-gray-100 focus:ring-black outline-none" placeholder="Ex: Flash Sale: 50% Off!" required />
                   </div>
                   <div>
                     <label className="label-xs text-gray-400 block mb-2 ml-1">Message Content</label>
                     <textarea value={broadcastData.message} onChange={(e) => setBroadcastData({...broadcastData, message: e.target.value})} className="w-full h-32 bg-gray-50 rounded-xl p-4 font-bold text-xs border-none ring-1 ring-gray-100 focus:ring-black outline-none resize-none" placeholder="Details about the promotion..." required />
                   </div>
                   <button type="submit" className="w-full h-14 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-xl shadow-black/10">
                     <Send size={14}/>
                     <span>Launch Broadcast</span>
                   </button>
                </form>
             </div>
          </div>
        )}

        {/* Product Modal */}
        {(isAddingProduct || editingProduct) && (
          <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2rem] p-10 shadow-xl relative overflow-hidden">
              <button onClick={closeModal} className="absolute top-8 right-8 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all">
                <X size={16} />
              </button>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">Asset Registration</h2>
              <form onSubmit={handleSaveProduct} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-xs text-gray-400 block mb-1.5">Display Name</label>
                    <input name="name" defaultValue={editingProduct?.name} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-semibold text-sm border-none ring-1 ring-gray-100 focus:ring-black outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="label-xs text-gray-400 block mb-1.5">Base Value (BDT)</label>
                    <input name="price" type="number" defaultValue={editingProduct?.price} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-semibold text-sm border-none ring-1 ring-gray-100 focus:ring-black outline-none transition-all" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-xs text-gray-400 block mb-1.5">Classification</label>
                    <select name="category" defaultValue={editingProduct?.category} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-semibold text-sm border-none ring-1 ring-gray-100 focus:ring-black outline-none transition-all appearance-none cursor-pointer">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label-xs text-gray-400 block mb-1.5">Stock Code</label>
                    <input name="sku" defaultValue={editingProduct?.sku} className="w-full h-12 bg-gray-50 rounded-xl px-4 font-semibold text-sm border-none ring-1 ring-gray-100 focus:ring-black outline-none transition-all" required />
                  </div>
                </div>
                <div>
                   <label className="label-xs text-gray-400 block mb-1.5">Specification Summary</label>
                   <textarea name="desc" defaultValue={editingProduct?.description[0]} className="w-full h-24 bg-gray-50 rounded-xl p-4 font-semibold text-sm border-none ring-1 ring-gray-100 focus:ring-black outline-none transition-all resize-none" />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="flex-1 h-14 bg-black text-white rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-red-600 transition-all">Submit Entry</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
