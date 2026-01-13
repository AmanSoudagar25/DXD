import React, { useState } from 'react';
import { Layers, Box, Camera, Crop, Home, Grid, ChevronDown, ChevronRight, Edit2, type LucideIcon } from 'lucide-react';

interface LeftSidebarProps {
  currentPhase: number;
  selectedItemId: string | null;
  onSelect: (id: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentPhase, selectedItemId, onSelect }) => {
  const [walls, setWalls] = useState(['Wall - North', 'Wall - South', 'Wall - East', 'Wall - West']);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleDoubleClick = (id: string) => {
    if (currentPhase === 0 && id.startsWith('Wall')) {
      setEditingId(id);
      setEditValue(id);
    }
  };

  const handleRename = () => {
    if (editingId && editValue.trim() !== '') {
      setWalls(walls.map(w => w === editingId ? editValue : w));
      onSelect(editValue);
      setEditingId(null);
    } else {
        setEditingId(null);
    }
  };

  const SidebarItem = ({ id, label, icon: Icon, indent = 0 }: { id: string, label: string, icon: LucideIcon, indent?: number }) => {
    const isSelected = selectedItemId === id;
    const isEditing = editingId === id;

    return (
      <div 
        onClick={() => !isEditing && onSelect(id)}
        onDoubleClick={() => handleDoubleClick(id)}
        className={`
          group flex items-center gap-3 px-3 py-2 cursor-pointer text-xs transition-all duration-200 border-l-2
          ${isSelected ? 'bg-zinc-800 border-accent text-white' : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800'}
        `}
        style={{ paddingLeft: `${indent * 12 + 12}px` }}
      >
        <Icon size={14} className={isSelected ? 'text-accent' : 'text-zinc-600 group-hover:text-zinc-500'} />
        
        {isEditing ? (
          <input 
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            className="bg-black border border-accent text-white px-1 py-0.5 rounded-sm outline-none w-full"
          />
        ) : (
          <span className="font-medium truncate">{label}</span>
        )}
      </div>
    );
  };

  const SectionHeader = ({ label }: { label: string }) => (
    <div className="px-4 py-2 mt-2 text-[10px] font-bold text-zinc-600 uppercase tracking-wider flex items-center justify-between">
      {label}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-void w-full">
      {/* Header */}
      <div className="h-10 border-b border-zinc-800 flex items-center px-4 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          {currentPhase === 0 && 'Scene Hierarchy'}
          {currentPhase === 1 && 'Room Essentials'}
          {currentPhase === 2 && 'Furnishing Sets'}
          {currentPhase === 3 && 'Bill of Quantities'}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
        
        {/* Phase 0: Geometry */}
        {currentPhase === 0 && (
          <div className="space-y-0.5">
            <SectionHeader label="Viewport" />
            <SidebarItem id="Camera View" label="Camera View" icon={Camera} />
            <SidebarItem id="Crop Region" label="Crop Region" icon={Crop} />
            
            <SectionHeader label="Structure" />
            {walls.map(wall => (
              <SidebarItem key={wall} id={wall} label={wall} icon={Layers} />
            ))}
            <SidebarItem id="Floor Slab" label="Floor Slab" icon={Grid} />
          </div>
        )}

        {/* Phase 1: Materials */}
        {currentPhase === 1 && (
          <div className="space-y-0.5">
            <SectionHeader label="Surfaces" />
            <div className="px-3 py-1 text-zinc-500 flex items-center gap-2 cursor-pointer hover:text-zinc-300">
                <ChevronDown size={12} />
                <span className="text-xs font-bold">Structure</span>
            </div>
            <SidebarItem id="Walls" label="Walls" icon={Layers} indent={1} />
            <SidebarItem id="Floor" label="Floor" icon={Grid} indent={1} />
            <SidebarItem id="Ceiling" label="Ceiling" icon={Home} indent={1} />

            <div className="px-3 py-1 text-zinc-500 flex items-center gap-2 cursor-pointer hover:text-zinc-300 mt-2">
                <ChevronDown size={12} />
                <span className="text-xs font-bold">Openings</span>
            </div>
            <SidebarItem id="Windows" label="Windows" icon={Box} indent={1} />
            <SidebarItem id="Doors" label="Doors" icon={Box} indent={1} />
          </div>
        )}

        {/* Phase 2: Furnish */}
        {currentPhase === 2 && (
          <div className="space-y-0.5">
             <SectionHeader label="Living Room Set" />
             <SidebarItem id="Main Sofa" label="Main Sofa" icon={Box} />
             <SidebarItem id="Coffee Table" label="Coffee Table" icon={Box} />
             <SidebarItem id="TV Unit" label="TV Unit" icon={Box} />
             <SidebarItem id="Area Rug" label="Area Rug" icon={Layers} />
             
             <SectionHeader label="Lighting" />
             <SidebarItem id="Floor Lamp" label="Floor Lamp" icon={Box} />
             <SidebarItem id="Chandelier" label="Chandelier" icon={Box} />
          </div>
        )}

        {/* Phase 3: BOQ */}
        {currentPhase === 3 && (
          <div className="space-y-0.5">
            <SectionHeader label="Specified Items" />
            <SidebarItem id="Asian Paints Royal" label="Asian Paints Royal" icon={Layers} />
            <SidebarItem id="IKEA Landskrona" label="IKEA Landskrona" icon={Box} />
            <SidebarItem id="Urban Ladder Coffee Table" label="Urban Ladder Coffee Table" icon={Box} />
            <SidebarItem id="Jaquar Faucet" label="Jaquar Faucet" icon={Box} />
          </div>
        )}

      </div>
    </div>
  );
};

export default LeftSidebar;