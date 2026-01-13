import React from 'react';
import { motion } from 'framer-motion';

const Partners: React.FC = () => {
  const partners = [
    { name: "Asian Paints" },
    { name: "IKEA" },
    { name: "Jaquar" },
    { name: "Kohler" },
    { name: "Pepperfry" },
    { name: "Somany" }, 
    { name: "Havells" }
  ];

  // Duplicate the array to ensure smooth looping
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="relative w-full h-24 flex items-center overflow-hidden border-y border-white/5 bg-void/50 backdrop-blur-sm">
      {/* Gradient Fade Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

      <motion.div 
        className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24"
        animate={{ x: "-50%" }}
        transition={{ 
          duration: 30, 
          ease: "linear", 
          repeat: Infinity 
        }}
        style={{ width: "max-content" }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div 
            key={index} 
            className="group flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          >
             {/* Placeholder SVG Text for Logos */}
             <span className="text-xl md:text-2xl font-bold text-zinc-700 group-hover:text-white transition-colors duration-300 font-sans tracking-tight whitespace-nowrap">
                {partner.name}
             </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Partners;