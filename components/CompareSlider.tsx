import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GripVertical } from 'lucide-react';

interface CompareSliderProps {
  beforeImage: string;
  afterImage: string;
}

const CompareSlider: React.FC<CompareSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  const handleMouseUp = () => setIsDragging(false);
  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="relative w-full aspect-video bg-surface overflow-hidden rounded-sm select-none group">
       {/* Before Image (Bottom Layer) */}
       <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${beforeImage})`, filter: 'grayscale(100%) contrast(120%)' }}
      >
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-sm text-xs font-mono uppercase tracking-wider text-white/70">
          Blueprint
        </div>
      </div>

      {/* After Image (Top Layer) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
        }}
      >
        <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-mono uppercase tracking-wider text-black font-bold">
          Render
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:scale-110 transition-transform">
          <GripVertical size={16} className="text-black" />
        </div>
      </div>
    </div>
  );
};

export default CompareSlider;