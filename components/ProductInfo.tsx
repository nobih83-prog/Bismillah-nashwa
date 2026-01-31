import React, { useState } from 'react';
import { ShoppingBag, PhoneCall, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../types';
import { PHONE_NUMBER } from '../constants';

interface Props {
  product: Product;
  onAddToCart: () => void;
  onOrderNow: () => void;
}

const ProductInfo: React.FC<Props> = ({ product, onAddToCart, onOrderNow }) => {
  const [quantity, setQuantity] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCartClick = () => {
    onAddToCart();
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <div className="flex flex-col space-y-8 lg:pl-4">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
           <span className="bg-gray-900 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Premium Selection</span>
           <span className="bg-red-50 text-red-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-red-100">In Stock</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tighter">
          {product.name}
        </h1>
      </div>

      <div className="flex items-center space-x-6 bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Price</span>
          <div className="flex items-baseline space-x-3">
            <span className="text-4xl font-black text-red-600 leading-none">৳{product.price}</span>
            <span className="text-lg text-gray-300 line-through font-bold">৳{product.originalPrice}</span>
          </div>
        </div>
        <div className="h-12 w-px bg-gray-200"></div>
        <div className="flex flex-col">
           <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Save</span>
           <span className="text-xl font-black text-green-600">৳{product.originalPrice! - product.price}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center border-2 border-gray-100 rounded-3xl h-16 bg-white overflow-hidden shadow-sm">
          <button onClick={decrement} className="w-16 h-full flex items-center justify-center hover:bg-gray-50 transition-colors font-black text-2xl text-gray-400 hover:text-black">-</button>
          <span className="w-12 text-center font-black text-xl">{quantity}</span>
          <button onClick={increment} className="w-16 h-full flex items-center justify-center hover:bg-gray-50 transition-colors font-black text-2xl text-gray-400 hover:text-black">+</button>
        </div>
        
        <div className="flex flex-col text-[10px] font-black uppercase text-gray-400 tracking-tighter">
          <span>Min Quantity: 1</span>
          <span className="text-green-600 mt-1 flex items-center"><Truck size={10} className="mr-1" /> Fast Shipping</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative">
          <button 
            onClick={handleAddToCartClick}
            className="w-full h-20 border-2 border-black rounded-[2rem] font-black text-lg uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95 flex items-center justify-center shadow-lg hover:shadow-black/20"
          >
            Add to Cart
          </button>
          {showFeedback && (
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-bottom-3 shadow-2xl z-20">
              Added to Cart!
            </div>
          )}
        </div>
        <button 
          onClick={onOrderNow}
          className="w-full h-20 bg-red-600 text-white rounded-[2rem] font-black text-lg uppercase tracking-[0.2em] flex items-center justify-center space-x-3 shadow-2xl shadow-red-200 active:scale-95 transition-all hover:bg-red-700"
        >
          <ShoppingBag size={24} />
          <span>ORDER NOW</span>
        </button>
      </div>

      <a 
        href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
        className="w-full h-20 border-2 border-gray-100 bg-white rounded-[2rem] font-black flex items-center justify-center space-x-4 hover:border-black transition-all group"
      >
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-red-50 transition-colors">
          <PhoneCall size={24} className="text-gray-400 group-hover:text-red-600" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">One Click Order</span>
          <span className="text-xl text-black">{PHONE_NUMBER}</span>
        </div>
      </a>

      {/* Product Details Section */}
      <div className="pt-8 border-t border-gray-100 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-[0.3em] text-gray-400">Description</h2>
          <ShieldCheck size={20} className="text-gray-300" />
        </div>
        <div className="bg-gray-50/50 p-8 rounded-[3rem] border border-gray-100 space-y-4">
          <div className="flex items-center space-x-3">
             <div className="w-2 h-2 bg-red-600 rounded-full"></div>
             <p className="font-black text-gray-900 text-lg uppercase tracking-tight">Standard Luxury Fit Collection</p>
          </div>
          <p className="leading-relaxed text-gray-600 font-medium text-lg">
            প্রিমিয়াম কোয়ালিটির লেদার ব্যাগ। টেকসই এবং স্টাইলিশ ডিজাইন যা আপনার প্রতিদিনের ব্যবহারের জন্য উপযুক্ত। উন্নতমানের জিপার এবং মজবুত ফিনিশিং। আমাদের নিজস্ব ফ্যাক্টরিতে দক্ষ কারিগর দ্বারা প্রস্তুতকৃত।
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
             <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>Water Resistant</span>
             </div>
             <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>Genuine Leather</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;