
import React, { useState } from 'react';
import { ShoppingBag, PhoneCall } from 'lucide-react';
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
    <div className="flex flex-col space-y-6">
      <h1 className="text-3xl font-black text-gray-900 leading-tight tracking-tighter">
        {product.name}
      </h1>

      <div className="flex items-center space-x-4">
        <span className="text-xl text-gray-400 line-through">৳1150</span>
        <span className="text-4xl font-black text-red-600">৳950</span>
        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">17% OFF</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border-2 border-gray-100 rounded-xl h-14 bg-gray-50 overflow-hidden">
          <button onClick={decrement} className="w-14 h-full flex items-center justify-center hover:bg-gray-200 transition-colors font-black text-xl">-</button>
          <span className="w-14 text-center font-black text-lg">{quantity}</span>
          <button onClick={increment} className="w-14 h-full flex items-center justify-center hover:bg-gray-200 transition-colors font-black text-xl">+</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <button 
            onClick={handleAddToCartClick}
            className="w-full h-16 border-2 border-black rounded-2xl font-black hover:bg-black hover:text-white transition-all active:scale-95 flex items-center justify-center"
          >
            Add to Cart
          </button>
          {showFeedback && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
              Added to Cart!
            </div>
          )}
        </div>
        <button 
          onClick={onOrderNow}
          className="w-full h-16 bg-red-600 text-white rounded-2xl font-black flex items-center justify-center space-x-3 shadow-xl shadow-red-100 active:scale-95 transition-all"
        >
          <ShoppingBag size={24} />
          <span className="tracking-widest">ORDER NOW</span>
        </button>
      </div>

      <a 
        href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
        className="w-full h-16 border-2 border-gray-100 bg-gray-50 rounded-2xl font-black flex items-center justify-center space-x-3 hover:bg-white hover:border-black transition-all"
      >
        <PhoneCall size={22} className="text-gray-400" />
        <span className="text-gray-700">Call to Order: <span className="text-black">{PHONE_NUMBER}</span></span>
      </a>

      <div className="space-y-6 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-black uppercase tracking-widest text-gray-900">{product.name}</h2>
        <div className="space-y-4 text-gray-600 font-medium">
          <p className="bg-gray-50 p-4 rounded-xl border border-gray-100">Measurement - <span className="text-black font-black underline decoration-red-500">H13" L 7" W 5"</span></p>
          <p className="leading-relaxed">
            (MS) 9m.m. থিকনেস বেলজিয়াম রড পাউডার কোটিং কালার মেলামাইন বোর্ড ১৬ মিলি থিকনেস
          </p>
        </div>
        
        <div className="pt-4">
          <h3 className="text-3xl font-black text-gray-900 mb-4 leading-none">আমাদের সব পণ্য আমাদের নিজস্ব ফ্যাক্টরিতে তৈরি</h3>
          <p className="text-gray-500 font-bold">আপনার হেলমেটের জন্য নিয়ে আসলাম স্টাইলিশ ও মজবুত হেলমেট রেক</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
