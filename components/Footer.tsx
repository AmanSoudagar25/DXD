import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-900 bg-surface/50 backdrop-blur-sm pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid - 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 mb-16">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center">
                 <span className="text-accent font-bold">D</span>
               </div>
               <span className="font-bold text-white tracking-tight">DimensionXD</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Building the future of interior design with AI-powered visualization and sourcing.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-900">
          <p className="text-zinc-600 text-sm">© 2024 DimensionXD. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-zinc-600 hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;