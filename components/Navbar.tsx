import React from 'react';
import { Menu } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-void/70 border-b border-border-dim">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '#'}>
          <span className="font-bold text-xl tracking-tight text-white">DimensionXD</span>
        </div>

        {/* Center Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#profitability" className="hover:text-white transition-colors">Workflow</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onLoginClick}
            className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Login
          </button>
          <button className="bg-accent text-black text-sm font-semibold px-4 py-2 rounded-sm hover:bg-yellow-400 transition-colors shadow-glow">
            Start Rendering
          </button>
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;