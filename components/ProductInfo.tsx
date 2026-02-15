
import React, { useState } from 'react';
import { ShoppingBag, PhoneCall, ShieldCheck, Truck, Heart } from 'lucide-react';
import { Product } from '../types';
import { PHONE_NUMBER } from '../constants';

interface Props {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onAddToCart: (quantity: number) => void;
  onOrderNow: (quantity: number) => void;
}

const ProductInfo: React.FC<Props> = ({ product, isWishlisted, onWishlistToggle, onAddToCart, onOrderNow }) => {
  const [quantity, setQuantity] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCartClick = () => {
    onAddToCart(quantity);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const handleOrderNowClick = () => {
    onOrderNow(quantity);
  };

  return (
    <div className="flex flex-col space-y-8 lg:pl-4">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
           <span className="bg-gray-900 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Premium Selection</span>
           <span className="bg-red-50 text-red-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-red-100">Handcrafted</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 heading-tight tracking-tighter">
          {product.name}
        </h1>
      </div>

      <div className="flex items-center space-x-6 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
        <div className="flex flex-col">
          <span className="label-xs text-gray-400 mb-1">Price</span>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-red-600 leading-none">৳{product.price}</span>
            <span className="text-sm text-gray-300 line-through font-bold">৳{product.originalPrice}</span>
          </div>
        </div>
        <div className="h-10 w-px bg-gray-200"></div>
        <div className="flex flex-col">
           <span className="label-xs text-gray-400 mb-1">Stock ID</span>
           <span className="text-xs font-black text-gray-800 tracking-widest">{product.sku}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-200 rounded-2xl h-14 bg-white overflow-hidden shadow-sm">
          <button onClick={decrement} className="w-14 h-full flex items-center justify-center hover:bg-gray-50 transition-colors font-bold text-xl text-gray-400 hover:text-black">-</button>
          <span className="w-10 text-center font-black text-sm">{quantity}</span>
          <button onClick={increment} className="w-14 h-full flex items-center justify-center hover:bg-gray-50 transition-colors font-bold text-xl text-gray-400 hover:text-black">+</button>
        </div>
        <button 
          onClick={onWishlistToggle}
          className={`h-14 w-14 border rounded-2xl flex items-center justify-center transition-all ${isWishlisted ? 'bg-red-600 border-red-600 text-white' : 'border-gray-200 text-gray-300 hover:text-red-600 bg-white'}`}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <button 
            onClick={handleAddToCartClick}
            className="w-full h-16 border-2 border-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all active:scale-95 flex items-center justify-center shadow-lg hover:shadow-black/10"
          >
            Add to Bag
          </button>
          {showFeedback && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 shadow-xl z-20">
              Added!
            </div>
          )}
        </div>
        <button 
          onClick={handleOrderNowClick}
          className="w-full h-16 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 shadow-xl shadow-red-50 active:scale-95 transition-all hover:bg-red-700"
        >
          <ShoppingBag size={18} />
          <span>ORDER NOW</span>
        </button>
      </div>

      <a 
        href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
        className="w-full h-16 border border-gray-100 bg-white rounded-2xl font-black flex items-center justify-center space-x-3 hover:border-black transition-all group"
      >
        <PhoneCall size={18} className="text-gray-400 group-hover:text-red-600" />
        <span className="text-xs uppercase tracking-widest text-gray-700">Phone Order: {PHONE_NUMBER}</span>
      </a>

      <div className="pt-8 border-t border-gray-100 space-y-6">
        <h2 className="label-xs text-gray-400">Description</h2>
        <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
          <p className="leading-relaxed text-gray-600 font-medium text-sm">
            {product.description[0]}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
             <div className="flex items-center space-x-2 label-xs text-gray-400">
                <Truck size={14} className="text-green-500" />
                <span>Fast Delivery</span>
             </div>
             <div className="flex items-center space-x-2 label-xs text-gray-400">
                <ShieldCheck size={14} className="text-green-500" />
                <span>Quality Assured</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
