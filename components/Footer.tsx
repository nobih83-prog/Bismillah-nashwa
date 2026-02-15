import React from 'react';
import { Facebook, Instagram, MessageCircle, Phone, MapPin, Mail, ChevronRight, ShieldCheck, Lock } from 'lucide-react';
import { PHONE_NUMBER, EMAIL, ADDRESS } from '../constants';

interface FooterProps {
  isAdmin: boolean;
  onAdminClick: () => void;
  onTrackOrderClick: () => void;
  onHomeClick: () => void;
  onAboutClick: () => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
  onContactClick: () => void;
  onRefundClick: () => void;
  onSitemapClick: () => void;
  onAccountClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  isAdmin,
  onAdminClick,
  onTrackOrderClick, 
  onHomeClick, 
  onAboutClick, 
  onPrivacyClick, 
  onTermsClick, 
  onContactClick, 
  onRefundClick, 
  onSitemapClick,
  onAccountClick
}) => {
  return (
    <footer className="bg-black text-gray-400 pt-20 pb-12 px-6 mt-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16">
          <div className="flex flex-col cursor-pointer group" onClick={onHomeClick}>
            <div className="w-16 h-8 flex transition-transform group-hover:scale-105 origin-left">
              <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5L20 20L40 5" stroke="white" strokeWidth="6" />
                <path d="M0 25L20 10L40 25" stroke="white" strokeWidth="6" />
              </svg>
            </div>
            <div className="text-white text-4xl font-bold tracking-tight mt-4 uppercase leading-none">BISMILLAH</div>
            <div className="flex items-center space-x-3 mt-1.5">
               <div className="h-px w-6 bg-gray-800"></div>
               <div className="text-white/40 text-[9px] font-bold tracking-[0.4em] uppercase">nashwa</div>
               <div className="h-px w-6 bg-gray-800"></div>
            </div>
          </div>
          
          <div className="mt-10 space-y-4">
            <h3 className="text-white text-2xl font-bold leading-tight max-w-lg tracking-tight">Decorate your home perfectly with premium metal.</h3>
            <p className="text-gray-600 font-medium max-w-2xl text-base">Providing durable, stylish, and high-quality metal furniture directly from factory to your doorstep.</p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                 <Phone size={20} />
              </div>
              <div>
                <div className="label-xs text-gray-600 mb-1">Hotline</div>
                <a href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`} className="text-white text-2xl font-bold tracking-tight hover:text-red-600 transition-colors leading-none">{PHONE_NUMBER}</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 flex-shrink-0">
                 <MapPin size={20} />
              </div>
              <div className="flex-grow">
                <div className="label-xs text-gray-600 mb-1">Location</div>
                <span className="text-gray-400 font-semibold text-xs leading-relaxed">{ADDRESS}</span>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 flex-shrink-0">
                 <Mail size={20} />
              </div>
              <div>
                <div className="label-xs text-gray-600 mb-1">Support</div>
                <a href={`mailto:${EMAIL}`} className="text-white font-bold text-lg hover:text-red-600 transition-colors">{EMAIL}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 border-t border-white/5 pt-16">
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-[9px] border-b border-white/10 pb-3">Explore</h4>
            <ul className="space-y-3">
              <li><button onClick={onAccountClick} className="font-semibold text-xs text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={12} className="mr-2 text-red-600" /> My Account</button></li>
              <li><button onClick={onAboutClick} className="font-semibold text-xs text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={12} className="mr-2 text-red-600" /> About Us</button></li>
              <li><button onClick={onPrivacyClick} className="font-semibold text-xs text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={12} className="mr-2 text-red-600" /> Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="font-semibold text-xs text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={12} className="mr-2 text-red-600" /> Terms</button></li>
              <li>
                <button onClick={onAdminClick} className={`font-bold text-xs flex items-center group mt-4 transition-all ${isAdmin ? 'text-red-500 hover:text-red-400' : 'text-gray-700 hover:text-white'}`}>
                  {isAdmin ? <ShieldCheck size={14} className="mr-2" /> : <Lock size={14} className="mr-2" />}
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-[9px] border-b border-white/10 pb-3">Support</h4>
            <ul className="space-y-3">
              <li><button onClick={onTrackOrderClick} className="font-semibold text-xs text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={12} className="mr-2 text-red-600" /> Tracking</button></li>
              <li><button onClick={onRefundClick} className="font-semibold text-xs text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={12} className="mr-2 text-red-600" /> Refunds</button></li>
              <li><button onClick={onContactClick} className="font-semibold text-xs text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={12} className="mr-2 text-red-600" /> Contact</button></li>
            </ul>
          </div>
          <div className="col-span-2 hidden md:block">
             <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                <h4 className="text-white font-bold uppercase tracking-widest text-[9px] mb-4">News Feed</h4>
                <p className="text-[11px] font-medium text-gray-500 mb-5">Subscribe to get latest product drops and sales information.</p>
                <div className="flex space-x-2">
                   <input type="email" placeholder="Email Address" className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-semibold text-white focus:border-red-600 outline-none transition-all" />
                   <button className="bg-red-600 text-white px-6 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-red-700 transition-all">Join</button>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-10">
          <div className="flex space-x-4 mb-8 md:mb-0">
            <a href="https://facebook.com" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#3b5998] hover:border-[#3b5998] transition-all"><Facebook size={20} /></a>
            <a href="https://instagram.com" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#e1306c] hover:border-[#e1306c] transition-all"><Instagram size={20} /></a>
            <a href={`https://wa.me/${PHONE_NUMBER.replace(/-/g, '')}`} className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"><MessageCircle size={20} /></a>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-[10px] font-bold text-gray-600 mb-1 tracking-widest uppercase">© 2026 Bismillah nashwa.</p>
            <div className="flex items-center space-x-2">
               <span className="text-[8px] font-bold uppercase tracking-widest text-gray-800">Powered by</span>
               <div className="w-6 h-px bg-gray-800"></div>
               <span className="text-[8px] font-bold text-red-600 uppercase tracking-widest">Premium Designs</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;