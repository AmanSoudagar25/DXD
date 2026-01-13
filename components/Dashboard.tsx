import React from 'react';
import { LayoutGrid, Box, Settings, LogOut } from 'lucide-react';

interface DashboardProps {
    onOpenWorkspace: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onOpenWorkspace }) => {
  return (
    <div className="flex min-h-screen text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-dim bg-surface/50 backdrop-blur-md flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-border-dim">
           <span className="w-3 h-3 rounded-full bg-accent"></span>
           <span className="font-bold tracking-tight">DimensionXD</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800/50 text-white rounded-sm border border-zinc-700">
              <LayoutGrid size={18} />
              <span className="text-sm font-medium">Projects</span>
           </div>
           <div className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors cursor-pointer">
              <Box size={18} />
              <span className="text-sm font-medium">Assets</span>
           </div>
           <div className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-sm transition-colors cursor-pointer">
              <Settings size={18} />
              <span className="text-sm font-medium">Settings</span>
           </div>
        </nav>

        <div className="p-4 border-t border-border-dim">
           <button 
             onClick={() => window.location.reload()}
             className="flex items-center gap-3 px-4 py-2 text-zinc-500 hover:text-white w-full transition-colors"
           >
             <LogOut size={16} />
             <span className="text-xs font-mono">LOGOUT</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col">
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-2xl font-bold">Dashboard</h1>
           <button 
                onClick={onOpenWorkspace}
                className="bg-accent text-black text-sm font-bold px-4 py-2 rounded-sm hover:bg-yellow-400 transition-colors shadow-glow"
            >
             + New Project
           </button>
        </header>

        {/* Empty State */}
        <div className="flex-1 rounded-lg border border-dashed border-zinc-800 bg-zinc-900/20 flex flex-col items-center justify-center text-zinc-500 gap-4">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center">
               <Box size={24} className="opacity-50" />
            </div>
            <p>No projects yet. Start rendering.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;