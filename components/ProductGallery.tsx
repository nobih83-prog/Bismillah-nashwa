import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, ZoomIn } from 'lucide-react';

interface Props {
  images: string[];
}

const ProductGallery: React.FC<Props> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const validImages = images.filter(img => !!img);
  const subImages = validImages.slice(0, 5);

  const ZOOM_LEVEL = 3.5; // Increased slightly to make details clearer in a smaller lens
  const LENS_SIZE = 120; // Significantly smaller lens size as requested

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to image
    let x = e.clientX - left;
    let y = e.clientY - top;

    // Boundary checks
    x = Math.max(0, Math.min(x, width));
    y = Math.max(0, Math.min(y, height));

    setMousePos({ x, y });
  };

  // Calculate background position for the zoomed image based on mouse position
  const getLensStyle = (): React.CSSProperties => {
    if (!containerRef.current) return { display: 'none' };
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const bgX = (mousePos.x / width) * 100;
    const bgY = (mousePos.y / height) * 100;

    return {
      display: 'block',
      left: `${mousePos.x}px`,
      top: `${mousePos.y}px`,
      backgroundImage: `url(${activeImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${width * ZOOM_LEVEL}px ${height * ZOOM_LEVEL}px`,
      backgroundPosition: `${bgX}% ${bgY}%`,
      width: `${LENS_SIZE}px`,
      height: `${LENS_SIZE}px`,
    };
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Main Image Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        className="relative aspect-square bg-white border-4 border-white rounded-[4rem] overflow-hidden cursor-crosshair group shadow-2xl transition-all duration-500 hover:shadow-red-100"
      >
        <img
          src={activeImage}
          alt="Product Main"
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* The Round Magnifying Glass (Lens) - Now Smaller */}
        {isZooming && (
          <div 
            className="absolute pointer-events-none rounded-full border-4 border-white shadow-[0_15px_50px_-10px_rgba(0,0,0,0.5)] z-50 transform -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-75 duration-200"
            style={getLensStyle()}
          >
            {/* Realistic Glass Shine & Reflection */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_15px_rgba(255,255,255,0.6),inset_0_-2px_15px_rgba(0,0,0,0.3)] bg-gradient-to-tr from-white/10 to-transparent opacity-40" />
            <div className="absolute top-[15%] left-[15%] w-[20%] h-[20%] bg-white/30 rounded-full blur-[2px]" />
          </div>
        )}
        
        {/* Floating Information Labels */}
        <div className={`absolute top-8 right-8 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl flex items-center space-x-2 transition-all duration-300 transform ${isZooming ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">Auto Zoom Active</span>
        </div>

        {/* Expand Icon */}
        {!isZooming && (
          <div className="absolute bottom-10 right-10 bg-black text-white p-5 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 scale-75 group-hover:scale-100">
            <Maximize2 size={24} strokeWidth={3} />
          </div>
        )}
      </div>

      {/* 4 Sub-images Grid with enhanced interactivity */}
      <div className="grid grid-cols-4 gap-4 px-2">
        {subImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img)}
            onMouseEnter={() => setActiveImage(img)}
            className={`relative aspect-square rounded-[2rem] overflow-hidden border-4 transition-all duration-300 transform ${
              activeImage === img 
                ? 'border-red-600 shadow-2xl -translate-y-2 scale-105' 
                : 'border-white hover:border-gray-200 shadow-md hover:-translate-y-1'
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx + 1}`} />
            {activeImage === img && (
               <div className="absolute inset-0 bg-red-600/5 flex items-center justify-center">
                 <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
               </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;