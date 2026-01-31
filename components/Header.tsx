import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Package, MessageCircle, Home, Search as SearchIcon, ChevronDown, User } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

interface HeaderProps {
  cartCount: number;
  onTrackOrderClick: () => void;
  onHomeClick: () => void;
  onCartClick: () => void;
  onAccountClick: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onTrackOrderClick, onHomeClick, onCartClick, onAccountClick, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between border-b">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Menu">
              <Menu size={24} className="text-gray-900" strokeWidth={2} />
            </button>
            <button onClick={onAccountClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block" aria-label="Account">
              <User size={24} className="text-gray-900" strokeWidth={2} />
            </button>
          </div>

          {/* Main Logo - Linked for Home */}
          <button 
            className="flex flex-col items-center select-none group focus:outline-none" 
            onClick={onHomeClick}
            aria-label="Go to Home"
          >
            <div className="w-8 h-4 md:w-10 md:h-6 flex justify-center transition-transform group-hover:scale-110">
              <svg width="30" height="20" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5L20 20L40 5" stroke="black" strokeWidth="6" />
                <path d="M0 25L20 10L40 25" stroke="black" strokeWidth="6" />
              </svg>
            </div>
            <div className="text-[12px] md:text-[18px] font-black tracking-[0.2em] text-gray-900 uppercase leading-none mt-2">BISMILLAH</div>
            <div className="text-[8px] md:text-[10px] font-bold tracking-[0.6em] text-gray-400 uppercase mt-1">nashwa</div>
          </button>

          <div className="flex items-center space-x-1 md:space-x-3">
             <button onClick={onAccountClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden" aria-label="Account">
               <User size={24} className="text-gray-900" strokeWidth={2} />
             </button>
             <div className="relative cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={onCartClick}>
               <ShoppingCart size={24} className="text-gray-900" strokeWidth={2} />
               {cartCount > 0 && (
                 <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white">
                   {cartCount}
                 </span>
               )}
             </div>
          </div>
        </div>

        {/* Search Bar section right below header */}
        <div className="bg-white px-4 py-3 md:py-4 max-w-7xl mx-auto border-b">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100/80 rounded-xl h-12 md:h-14 px-4 space-x-3 overflow-hidden">
             <div className="flex items-center space-x-2 border-r border-gray-300 pr-3 h-1/2 cursor-pointer">
                <span className="text-sm font-bold text-gray-900 uppercase">All</span>
                <ChevronDown size={14} strokeWidth={3} />
             </div>
             <input 
               type="text" 
               placeholder="Search for products..." 
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
               className="flex-grow bg-transparent outline-none font-medium text-gray-700 placeholder:text-gray-400"
             />
             <button type="submit" className="text-gray-500 hover:text-black transition-colors" aria-label="Search">
               <SearchIcon size={20} strokeWidth={2.5} />
             </button>
          </form>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[110] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          {/* Menu Header with Clickable Logo */}
          <div className="p-8 pb-4 flex justify-between items-start">
            <button className="flex flex-col group text-left focus:outline-none" onClick={() => { onHomeClick(); setIsMenuOpen(false); }}>
              <div className="w-16 h-10 mb-2 transition-transform group-hover:scale-105">
                <svg width="50" height="40" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 5L20 20L40 5" stroke="black" strokeWidth="6" />
                  <path d="M0 25L20 10L40 25" stroke="black" strokeWidth="6" />
                </svg>
              </div>
              <div className="text-2xl font-black tracking-tight text-black leading-none uppercase">BISMILLAH</div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-black/40 uppercase mt-1 flex items-center">
                <span className="h-px w-4 bg-black/20 mr-2"></span>
                nashwa
                <span className="h-px w-4 bg-black/20 ml-2"></span>
              </div>
            </button>
            <button onClick={() => setIsMenuOpen(false)} className="p-1 -mt-2" aria-label="Close Menu">
              <X size={24} className="text-black" />
            </button>
          </div>
          
          {/* Main Links */}
          <nav className="flex-grow px-8 pt-8 overflow-y-auto">
            <ul className="space-y-0">
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => { onHomeClick(); setIsMenuOpen(false); }}
                  className="w-full text-left py-5 text-[15px] font-bold text-gray-900 hover:text-red-600 transition-colors uppercase flex items-center justify-between"
                >
                  <span>Home</span>
                  <Home size={16} className="text-gray-300" />
                </button>
              </li>
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => { onAccountClick(); setIsMenuOpen(false); }}
                  className="w-full text-left py-5 text-[15px] font-bold text-gray-900 hover:text-red-600 transition-colors uppercase flex items-center justify-between"
                >
                  <span>My Account</span>
                  <User size={16} className="text-gray-300" />
                </button>
              </li>
            </ul>

            {/* Track Order section at bottom of links */}
            <div className="mt-12 pb-8">
               <button 
                onClick={() => { onTrackOrderClick(); setIsMenuOpen(false); }}
                className="flex items-center space-x-3 text-gray-500 hover:text-black transition-colors"
               >
                 <div className="flex flex-col items-center">
                   <Package size={20} className="mb-0.5" />
                   <div className="flex space-x-0.5">
                     <div className="w-1 h-0.5 bg-gray-300"></div>
                     <div className="w-1 h-0.5 bg-gray-300"></div>
                     <div className="w-1 h-0.5 bg-gray-300"></div>
                   </div>
                 </div>
                 <span className="text-sm font-bold uppercase tracking-tight">Track Order</span>
               </button>
            </div>
          </nav>

          {/* Sticky Bottom Bar */}
          <div className="mt-auto border-t border-gray-100 p-4 pb-6 bg-white flex items-center justify-between shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
            <button className="flex items-center space-x-3 group text-left focus:outline-none" onClick={() => { onHomeClick(); setIsMenuOpen(false); }}>
               <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
                  <svg width="16" height="12" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5L20 20L40 5" stroke="currentColor" strokeWidth="6" />
                    <path d="M0 25L20 10L40 25" stroke="currentColor" strokeWidth="6" />
                  </svg>
               </div>
               <div className="flex flex-col">
                 <span className="text-[11px] font-black text-black leading-none uppercase">Bismillah nashwa</span>
                 <span className="text-[10px] font-bold text-gray-500 leading-none mt-1">{PHONE_NUMBER}</span>
               </div>
            </button>
            
            <a 
              href={`https://wa.me/${PHONE_NUMBER.replace(/-/g, '')}`} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#00a884] text-white px-3 py-1.5 rounded-md flex items-center space-x-2 text-[11px] font-bold uppercase tracking-tight hover:bg-[#008f70] transition-all"
            >
              <MessageCircle size={14} fill="currentColor" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;