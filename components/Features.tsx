import React from 'react';
import { motion } from 'framer-motion';
import { Scan, ShoppingBag, TrendingUp, Palette } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Precision Control, <span className="text-zinc-500">Powered by AI.</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">
        
        {/* Card 1: Large - The AI */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group md:col-span-2 relative bg-zinc-900/50 rounded-sm border border-border-dim p-8 overflow-hidden hover:border-white transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="relative z-10 h-full flex flex-col justify-between">
             <div className="p-3 bg-zinc-800 w-fit rounded-sm mb-4 border border-white/5">
                <Scan className="text-accent" />
             </div>
             <div>
                <h3 className="text-xl font-bold mb-2">Geometry Aware</h3>
                <p className="text-zinc-400 text-sm">Our AI understands dimensions. No hallucinations. Accurate heights, depths, and spatial relationships preserved from your blueprints.</p>
             </div>
          </div>
          {/* Visual: Wireframe overlay */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 group-hover:opacity-40 transition-opacity bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-transparent"></div>
        </motion.div>

        {/* Card 2: Tall - The Catalog */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="group md:row-span-2 relative bg-zinc-900/50 rounded-sm border border-border-dim p-8 overflow-hidden hover:border-white transition-all duration-300 hover:scale-[1.01]"
        >
            <div className="relative z-10 h-full flex flex-col">
                <div className="p-3 bg-zinc-800 w-fit rounded-sm mb-6 border border-white/5">
                    <ShoppingBag className="text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sourcing Engine</h3>
                <p className="text-zinc-400 text-sm mb-8">Drag & drop real products from Asian Paints, IKEA, and more directly into your scene.</p>
                
                {/* Visual List */}
                <div className="flex-1 space-y-3 relative">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-sm transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500 delay-[0ms]" style={{ transitionDelay: `${i * 100}ms` }}>
                            <div className="w-10 h-10 bg-zinc-800 rounded-sm shrink-0"></div>
                            <div>
                                <div className="h-2 w-20 bg-zinc-700 rounded-full mb-2"></div>
                                <div className="h-2 w-12 bg-zinc-800 rounded-full"></div>
                            </div>
                            <div className="ml-auto font-mono text-xs text-accent">₹{i * 4}50</div>
                        </div>
                    ))}
                     <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                </div>
            </div>
        </motion.div>

        {/* Card 3: Small - Cashback */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="group relative bg-zinc-900/50 rounded-sm border border-border-dim p-8 overflow-hidden hover:border-white transition-all duration-300 hover:scale-[1.01]"
        >
            <div className="relative z-10">
                <div className="p-3 bg-zinc-800 w-fit rounded-sm mb-4 border border-white/5">
                    <TrendingUp className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cashback Ready</h3>
                <p className="text-zinc-400 text-sm">Earn 5% commission on every product you specify.</p>
            </div>
            {/* Visual Graph */}
            <div className="absolute bottom-0 right-0 w-32 h-20 flex items-end justify-end gap-1 px-4 pb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                 {[40, 60, 45, 80, 100].map((h, i) => (
                     <div key={i} className="w-4 bg-green-500/20 border-t border-green-500 transition-all duration-500 group-hover:bg-green-500" style={{ height: `${h}%` }}></div>
                 ))}
            </div>
        </motion.div>

        {/* Card 4: Medium - Tri-Input */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="group md:col-span-2 relative bg-zinc-900/50 rounded-sm border border-border-dim p-8 overflow-hidden hover:border-white transition-all duration-300 hover:scale-[1.01]"
        >
             <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                     <div className="p-3 bg-zinc-800 w-fit rounded-sm mb-4 border border-white/5">
                        <Palette className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Tri-Input System</h3>
                    <p className="text-zinc-400 text-sm max-w-sm">Control every texture via HEX Color Code, Catalog ID, or Natural Language AI Prompt.</p>
                </div>
                
                {/* Inputs Visual */}
                <div className="flex gap-4 mt-6 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="px-3 py-1.5 border border-white/20 rounded-sm text-xs font-mono text-zinc-300">#F4D03F</div>
                    <div className="px-3 py-1.5 border border-white/20 rounded-sm text-xs font-mono text-zinc-300">IKEA-805.22</div>
                    <div className="px-3 py-1.5 border border-accent/50 text-accent rounded-sm text-xs font-mono">"Italian Marble"</div>
                </div>
             </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;