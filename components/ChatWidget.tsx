import React, { useState } from 'react';
import { MessageCircle, Phone, Facebook, X } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-[100] flex flex-col items-end space-y-4">
      {/* Contact Options Stack - only visible when isOpen is true */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Messenger */}
          <div className="flex items-center space-x-3 group">
            <div className="bg-white px-4 py-1.5 rounded-lg shadow-lg border border-gray-100/50">
              <span className="text-sm font-bold text-gray-700 tracking-tight">Messenger</span>
            </div>
            <a
              href="https://m.me/bismillahmetal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#0084ff] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
            >
              <Facebook size={28} fill="currentColor" />
            </a>
          </div>

          {/* Call */}
          <div className="flex items-center space-x-3 group">
            <div className="bg-white px-4 py-1.5 rounded-lg shadow-lg border border-gray-100/50">
              <span className="text-sm font-bold text-gray-700 tracking-tight">Call</span>
            </div>
            <a
              href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
              className="w-14 h-14 bg-[#4285f4] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
            >
              <Phone size={24} fill="currentColor" />
            </a>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center space-x-3 group">
            <div className="bg-white px-4 py-1.5 rounded-lg shadow-lg border border-gray-100/50">
              <span className="text-sm font-bold text-gray-700 tracking-tight">WhatsApp</span>
            </div>
            <a
              href={`https://wa.me/${PHONE_NUMBER.replace(/-/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
            >
              <MessageCircle size={28} fill="currentColor" />
            </a>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all animate-blink-btn border-4 border-white"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
};

export default ChatWidget;
