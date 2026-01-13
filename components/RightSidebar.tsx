import React, { useState } from 'react';
import { Lightbulb, Image as ImageIcon, Search, Sliders, Eye, RefreshCw, Maximize, ZoomIn, ArrowUp, Sparkles, Wand2, ArrowUpRight, Copy } from 'lucide-react';

interface Point {
    x: number;
    y: number;
}
  
interface CameraState {
    start: Point;
    end: Point;
    fov: number; 
    height: number; 
}

interface RenderItem {
    id: string;
    imageUrl: string;
    seed: number;
    resolution: string;
    pinned: boolean;
}

interface RightSidebarProps {
  currentPhase: number;
  selectedItemId: string | null;
  cameraState?: CameraState;
  onCameraChange?: (state: CameraState) => void;
  planOpacity?: number;
  onPlanOpacityChange?: (opacity: number) => void;
  selectedRender: RenderItem | null;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ 
    currentPhase, 
    selectedItemId, 
    cameraState, 
    onCameraChange,
    planOpacity = 0.5,
    onPlanOpacityChange,
    selectedRender
}) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Constraints State (Local for now)
  const [ceilingHeight, setCeilingHeight] = useState(10);
  const [headerHeight, setHeaderHeight] = useState(7);

  // Helper to trigger change state
  const handleChange = () => setHasUnsavedChanges(true);

  const handleGenerate = () => {
    setIsUpdating(true);
    setTimeout(() => {
        setIsUpdating(false);
        setHasUnsavedChanges(false);
    }, 2000);
  };

  const updateCamera = (updates: Partial<CameraState>) => {
      if (onCameraChange && cameraState) {
          onCameraChange({ ...cameraState, ...updates });
          handleChange();
      }
  };

  // Render Logic
  const renderContent = () => {
    // ----------------------------------------------------------------------
    // STATE C: Camera Mode Active (Left Sidebar 'Camera View' Selected)
    // ----------------------------------------------------------------------
    if (selectedItemId === 'Camera View' && cameraState) {
        return (
            <div className="p-4 space-y-8">
                <div className="pb-2 border-b border-zinc-800">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Shot Attributes</h3>
                </div>

                {/* Lens Width (FOV) */}
                <div className="space-y-3">
                     <label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-2">Lens Width</label>
                     <div className="grid grid-cols-3 gap-1 bg-zinc-900 p-1 rounded-sm border border-zinc-800">
                        {[
                            { label: 'Wide', value: 90, icon: Maximize },
                            { label: 'Normal', value: 60, icon: Eye },
                            { label: 'Zoom', value: 35, icon: ZoomIn }
                        ].map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => updateCamera({ fov: opt.value })}
                                className={`flex flex-col items-center justify-center gap-1 py-2 rounded-sm transition-all ${
                                    cameraState.fov === opt.value
                                    ? 'bg-zinc-800 text-accent shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                                }`}
                            >
                                <opt.icon size={16} />
                                <span className="text-[10px] font-medium">{opt.label}</span>
                            </button>
                        ))}
                     </div>
                     <div className="text-center text-[10px] text-zinc-600 font-mono">
                         {cameraState.fov === 90 ? '16mm Equivalent' : cameraState.fov === 60 ? '35mm Equivalent' : '85mm Equivalent'}
                     </div>
                </div>

                {/* Camera Height */}
                <div className="space-y-3">
                     <label className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-2">Camera Height</label>
                     <div className="grid grid-cols-3 gap-1 bg-zinc-900 p-1 rounded-sm border border-zinc-800">
                        {[
                            { label: 'Waist', value: 3 },
                            { label: 'Eye Level', value: 5 },
                            { label: 'Overhead', value: 9 }
                        ].map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => updateCamera({ height: opt.value })}
                                className={`flex flex-col items-center justify-center gap-1 py-2 rounded-sm transition-all ${
                                    cameraState.height === opt.value
                                    ? 'bg-zinc-800 text-accent shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                                }`}
                            >
                                <ArrowUp size={16} className={cameraState.height === opt.value ? 'text-accent' : 'text-zinc-600'} />
                                <span className="text-[10px] font-medium">{opt.label}</span>
                            </button>
                        ))}
                     </div>
                </div>

                {/* Project Constraints & Plan Visibility */}
                <div className="pt-8 border-t border-zinc-800 space-y-4">
                     <div className="pb-2">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Project Constraints</h3>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Ceiling</label>
                            <span className="text-xs font-mono text-accent">{ceilingHeight} ft</span>
                        </div>
                        <input 
                            type="range" min="8" max="20" step="1" 
                            value={ceilingHeight}
                            onChange={(e) => setCeilingHeight(parseInt(e.target.value))}
                            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent"
                        />
                    </div>

                    <div className="space-y-2">
                       <div className="flex justify-between items-center">
                           <label className="text-xs text-zinc-300">Plan Opacity</label>
                           <span className="text-[10px] font-mono text-zinc-500">{Math.round(planOpacity * 100)}%</span>
                       </div>
                       <input 
                           type="range" min="0" max="1" step="0.05"
                           value={planOpacity}
                           onChange={(e) => onPlanOpacityChange && onPlanOpacityChange(parseFloat(e.target.value))}
                           className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                       />
                    </div>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------------------------
    // STATE B: Render Card Selected (Detail View)
    // ----------------------------------------------------------------------
    if (selectedRender) {
        return (
            <div className="flex flex-col h-full">
                <div className="p-4 border-b border-zinc-800">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <ImageIcon size={14} className="text-accent" />
                        Selected Render
                    </h3>
                </div>

                <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                    {/* Thumbnail */}
                    <div className="aspect-square w-full rounded-sm overflow-hidden border border-zinc-800 bg-black">
                        <img src={selectedRender.imageUrl} alt="Selected" className="w-full h-full object-cover" />
                    </div>

                    {/* Metadata */}
                    <div className="space-y-3 bg-zinc-900/50 p-3 rounded-sm border border-zinc-800">
                         <div className="flex justify-between items-center">
                             <span className="text-[10px] font-bold text-zinc-500 uppercase">Seed</span>
                             <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-zinc-300">{selectedRender.seed}</span>
                                <button className="text-zinc-500 hover:text-white"><Copy size={10} /></button>
                             </div>
                         </div>
                         <div className="flex justify-between items-center">
                             <span className="text-[10px] font-bold text-zinc-500 uppercase">Resolution</span>
                             <span className="text-xs font-mono text-zinc-300">{selectedRender.resolution}</span>
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <button className="w-full py-2 bg-zinc-800 border border-zinc-700 text-white text-xs font-bold rounded-sm hover:bg-zinc-700 flex items-center justify-center gap-2 transition-colors">
                            <Sparkles size={14} className="text-accent" />
                            Upscale to 4K
                        </button>
                        <button className="w-full py-2 bg-zinc-800 border border-zinc-700 text-white text-xs font-bold rounded-sm hover:bg-zinc-700 flex items-center justify-center gap-2 transition-colors">
                            <ArrowUpRight size={14} />
                            Use as Reference
                        </button>
                         <button className="w-full py-2 bg-transparent border border-zinc-800 text-zinc-400 text-xs font-medium rounded-sm hover:border-zinc-600 hover:text-white flex items-center justify-center gap-2 transition-colors">
                            <Wand2 size={14} />
                            Inpaint Area
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------------------------
    // STATE A: Default (Creative Context / Global Prompt)
    // ----------------------------------------------------------------------
    return (
        <div className="flex flex-col h-full relative">
            <div className="p-4 border-b border-zinc-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles size={14} className="text-accent" />
                    Creative Context
                </h3>
            </div>

            <div className="p-4 space-y-8 flex-1 overflow-y-auto pb-24">
                 {/* Section 1: Global Prompt */}
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase">Project Context</label>
                    <textarea 
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-sm p-3 text-xs text-zinc-300 focus:border-accent outline-none resize-none placeholder:text-zinc-600 font-mono leading-relaxed"
                        placeholder="Describe changes... e.g., Make the lighting warmer, change style to Industrial..."
                        rows={8}
                        onChange={handleChange}
                    />
                 </div>

                 {/* Section 2: Style Reference */}
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase">Style Reference</label>
                    <div className="border border-dashed border-zinc-800 rounded-sm p-6 text-center hover:bg-zinc-900/50 cursor-pointer transition-colors group">
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800">
                                <ImageIcon size={18} className="text-zinc-500 group-hover:text-zinc-300" />
                            </div>
                            <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400">Drop inspiration image here</span>
                        </div>
                    </div>
                 </div>

                 {/* Iteration Counter */}
                 <div className="bg-zinc-900/50 rounded-sm p-3 border border-zinc-800 flex items-center justify-between">
                     <span className="text-[10px] font-bold text-zinc-500 uppercase">Iteration</span>
                     <span className="text-xs font-mono text-white">#04</span>
                 </div>
            </div>

            {/* Footer: Generate Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-void border-t border-zinc-800 z-10">
                <button 
                    onClick={handleGenerate}
                    disabled={isUpdating}
                    className={`w-full py-3 rounded-sm text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        isUpdating
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                        : 'bg-accent text-black hover:bg-yellow-400 shadow-glow'
                    }`}
                >
                    {isUpdating ? (
                        <>
                            <RefreshCw size={14} className="animate-spin" />
                            Thinking...
                        </>
                    ) : (
                        'Generate Variation'
                    )}
                </button>
            </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-void w-80 relative border-l border-zinc-800">
      {/* Top Bar (now integrated into renderContent for specific headers, or we can have a global one) */}
      {/* We removed the generic top bar to allow specific headers per state */}
      
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default RightSidebar;