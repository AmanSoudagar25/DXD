import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import CompareSlider from './CompareSlider';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 px-6 flex flex-col items-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto flex flex-col items-center gap-6"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-dim bg-white/5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-zinc-400 tracking-wide">v1.0 Public Beta</span>
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          From 2D Blueprint to Photorealism. <span className="text-accent">Instantly.</span>
        </h1>
        
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          The professional workspace for Architects & Designers. Upload a floor plan, specify materials, and generate accurate 3D renders with a click.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <button className="w-full sm:w-auto px-8 py-3.5 bg-accent text-black font-bold rounded-sm hover:bg-yellow-400 transition-all shadow-glow hover:shadow-[0_0_30px_-5px_rgba(244,208,63,0.4)]">
            Start Free Project
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 border border-zinc-700 hover:border-white text-white font-medium rounded-sm flex items-center justify-center gap-2 transition-colors group">
            <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
            Watch Demo
          </button>
        </div>
      </motion.div>

      {/* Visual / Slider */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-5xl mt-20 relative"
      >
        {/* Macbook Frame */}
        <div className="relative rounded-xl bg-[#1a1a1a] p-2 border border-[#333] shadow-2xl">
            {/* Camera Dot */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-black/50 rounded-b-md z-20"></div>
            
            <div className="rounded-lg overflow-hidden border border-black/50 relative bg-black">
                 <CompareSlider 
                    beforeImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop&grayscale"
                    afterImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                 />
            </div>
        </div>
        
        {/* Reflection */}
        <div className="absolute top-full left-0 right-0 h-24 bg-gradient-to-b from-accent/10 to-transparent blur-3xl opacity-30 pointer-events-none transform -scale-y-100 origin-top"></div>
        
        {/* Bottom Base of Laptop */}
        <div className="h-4 w-full bg-[#151515] rounded-b-xl border-t border-[#000] mx-auto mt-[1px] relative shadow-xl">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#222] rounded-b-lg"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;