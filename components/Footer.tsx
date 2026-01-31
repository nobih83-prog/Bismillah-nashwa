import React from 'react';
import { Facebook, Instagram, MessageCircle, Phone, MapPin, Mail, ChevronRight } from 'lucide-react';
import { PHONE_NUMBER, EMAIL, ADDRESS } from '../constants';

interface FooterProps {
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
    <footer className="bg-black text-gray-400 pt-24 pb-12 px-6 mt-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16">
          <div className="flex flex-col cursor-pointer group" onClick={onHomeClick}>
            <div className="w-20 h-10 flex transition-transform group-hover:scale-105 origin-left">
              <svg width="60" height="40" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5L20 20L40 5" stroke="white" strokeWidth="6" />
                <path d="M0 25L20 10L40 25" stroke="white" strokeWidth="6" />
              </svg>
            </div>
            <div className="text-white text-5xl font-black tracking-tighter mt-4 uppercase leading-none">BISMILLAH</div>
            <div className="flex items-center space-x-3 mt-2">
               <div className="h-px w-8 bg-gray-800"></div>
               <div className="text-white/40 text-xs font-bold tracking-[0.5em] uppercase">nashwa</div>
               <div className="h-px w-8 bg-gray-800"></div>
            </div>
          </div>
          
          <div className="mt-12 space-y-4">
            <h3 className="text-white text-3xl font-black leading-tight max-w-lg italic tracking-tight">Decor your house perfectly with premium metal.</h3>
            <p className="text-gray-600 font-medium max-w-2xl text-lg">We provide durable, stylish, and high-quality metal furniture directly from our factory to your doorstep.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-start space-x-5">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-red-600 flex-shrink-0">
                 <Phone size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Hotline 24/7</div>
                <a href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`} className="text-white text-3xl font-black tracking-tighter hover:text-red-600 transition-colors leading-none">{PHONE_NUMBER}</a>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 flex-shrink-0">
                 <MapPin size={24} />
              </div>
              <div className="flex-grow">
                <div className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Showroom & Factory</div>
                <span className="text-gray-400 font-bold text-sm leading-relaxed">{ADDRESS}</span>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 flex-shrink-0">
                 <Mail size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em] mb-1">Email Support</div>
                <a href={`mailto:${EMAIL}`} className="text-white font-black text-xl hover:text-red-600 transition-colors">{EMAIL}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 border-t border-white/5 pt-20">
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-4">Useful Links</h4>
            <ul className="space-y-4">
              <li><button onClick={onAccountClick} className="font-bold text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={14} className="mr-2 text-red-600 group-hover:translate-x-1 transition-transform" /> My Account</button></li>
              <li><button onClick={onAboutClick} className="font-bold text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={14} className="mr-2 text-red-600 group-hover:translate-x-1 transition-transform" /> About Us</button></li>
              <li><button onClick={onPrivacyClick} className="font-bold text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={14} className="mr-2 text-red-600 group-hover:translate-x-1 transition-transform" /> Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="font-bold text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={14} className="mr-2 text-red-600 group-hover:translate-x-1 transition-transform" /> Terms & Conditions</button></li>
              <li><button onClick={onSitemapClick} className="font-bold text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={14} className="mr-2 text-red-600 group-hover:translate-x-1 transition-transform" /> Sitemap</button></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-4">Support</h4>
            <ul className="space-y-4">
              <li><button onClick={onTrackOrderClick} className="font-bold text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={14} className="mr-2 text-red-600 group-hover:translate-x-1 transition-transform" /> Order Tracking</button></li>
              <li><button onClick={onRefundClick} className="font-bold text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={14} className="mr-2 text-red-600 group-hover:translate-x-1 transition-transform" /> Refund Policy</button></li>
              <li><button onClick={onContactClick} className="font-bold text-gray-500 hover:text-white transition-all flex items-center group"><ChevronRight size={14} className="mr-2 text-red-600 group-hover:translate-x-1 transition-transform" /> Contact Us</button></li>
            </ul>
          </div>
          <div className="col-span-2 hidden md:block">
             <div className="bg-white/5 rounded-[2rem] p-10 border border-white/5">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Stay Updated</h4>
                <p className="text-sm font-medium text-gray-500 mb-6">Subscribe to our news feed to get the latest product drops and sales info.</p>
                <div className="flex space-x-2">
                   <input type="email" placeholder="Email Address" className="flex-grow bg-white/5 border border-white/10 rounded-xl px-5 py-3 font-bold text-white focus:border-red-600 outline-none transition-all" />
                   <button className="bg-red-600 text-white px-8 rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-all">Join</button>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12">
          <div className="flex space-x-5 mb-10 md:mb-0">
            <a href="https://facebook.com" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-[#3b5998] hover:border-[#3b5998] transition-all hover:-translate-y-2"><Facebook size={26} /></a>
            <a href="https://instagram.com" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-[#e1306c] hover:border-[#e1306c] transition-all hover:-translate-y-2"><Instagram size={26} /></a>
            <a href={`https://wa.me/${PHONE_NUMBER.replace(/-/g, '')}`} className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all hover:-translate-y-2"><MessageCircle size={26} /></a>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-xs font-black text-gray-600 mb-2 tracking-widest uppercase">© 2026 Bismillah nashwa. Built with Passion.</p>
            <div className="flex items-center space-x-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-800">Powered by</span>
               <div className="w-8 h-px bg-gray-800"></div>
               <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Premium Designs</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;