import React, { useState, useRef } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

interface Props {
  images: string[];
}

const ProductGallery: React.FC<Props> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use up to 5 images: 1 for active + 4 for sub-images
  // We'll show the next 4 images (wrapping around if needed)
  const subImages = images.slice(1, 5).length >= 4 
    ? images.slice(1, 5) 
    : [...images.slice(1), ...images.slice(0, 5 - images.length)].slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Main Image Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        className="relative aspect-square bg-white border border-gray-100 rounded-[2rem] overflow-hidden cursor-zoom-in group shadow-sm"
      >
        <img
          src={activeImage}
          alt="Product Main"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZooming ? 'scale(2)' : 'scale(1)'
          }}
          className="w-full h-full object-cover transition-transform duration-200 ease-out"
        />
        
        {/* Static Overlays */}
        {!isZooming && (
          <>
            <div className="absolute top-8 right-8 text-right pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-black/5 text-xs font-black shadow-lg inline-block uppercase tracking-wider">
                Wall hanging helmet rack
              </div>
              <div className="text-[10px] font-black mt-2 text-gray-400 uppercase tracking-[0.2em]">Code: BM161</div>
            </div>

            {/* Social Icons */}
            <div className="absolute bottom-8 right-8 flex flex-col items-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
               <div className="flex space-x-3">
                  <Facebook size={16} className="text-gray-400 hover:text-black transition-colors" />
                  <Instagram size={16} className="text-gray-400 hover:text-black transition-colors" />
                  <Twitter size={16} className="text-gray-400 hover:text-black transition-colors" />
               </div>
            </div>
          </>
        )}
      </div>

      {/* 4 Sub-images Grid */}
      <div className="grid grid-cols-4 gap-4">
        {subImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
              activeImage === img ? 'border-red-600 shadow-md scale-95' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Sub ${idx}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;