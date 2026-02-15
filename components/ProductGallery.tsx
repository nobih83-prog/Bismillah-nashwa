import React, { useState, useRef } from 'react';
import { Maximize2, ZoomIn } from 'lucide-react';

interface Props {
  images: string[];
}

const ProductGallery: React.FC<Props> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const subImages = images.filter(img => !!img).slice(0, 5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Main Image Container with Inner Zoom */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        className="relative aspect-square bg-white border-4 border-white rounded-[4rem] overflow-hidden cursor-crosshair group shadow-2xl transition-all duration-500 hover:shadow-red-50"
      >
        <img
          src={activeImage}
          alt="Product Main"
          className={`w-full h-full object-cover transition-transform duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Professional Inner Zoom Layer */}
        {isZooming && (
          <div 
            className="absolute inset-0 bg-no-repeat transition-transform duration-150 ease-out"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '250%',
            }}
          />
        )}
        
        {/* Refined Labels */}
        <div className={`absolute top-8 right-8 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl flex items-center space-x-2 transition-all duration-300 ${isZooming ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-900">Premium Detail</span>
        </div>

        {!isZooming && (
          <div className="absolute bottom-10 right-10 bg-black text-white p-5 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 scale-75 group-hover:scale-100">
            <Maximize2 size={24} strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-3 px-2">
        {subImages.map((img, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setActiveImage(img)}
            className={`relative aspect-square rounded-[1.8rem] overflow-hidden border-2 transition-all duration-300 ${
              activeImage === img 
                ? 'border-red-600 shadow-xl scale-105' 
                : 'border-white hover:border-gray-200 shadow-sm'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;