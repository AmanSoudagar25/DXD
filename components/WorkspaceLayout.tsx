import React, { useState, useRef, useEffect } from 'react';
import { Box, ArrowLeft, Download, PanelLeft, PanelRight, PanelLeftClose, PanelRightClose, ZoomIn, Move, Scan, Trash2, Pin, Maximize2 } from 'lucide-react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

interface WorkspaceProps {
  onExit: () => void;
}

const PHASES = ['Geometry', 'Materials', 'Furnish', 'BOQ'];

export interface Point {
  x: number;
  y: number;
}

export interface CameraState {
  start: Point;
  end: Point;
  fov: number; // 35, 60, 90
  height: number; // 3, 5, 9
}

export interface RenderItem {
    id: string;
    imageUrl: string;
    seed: number;
    resolution: string;
    pinned: boolean;
}

const MOCK_RENDERS: RenderItem[] = [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop', seed: 481204, resolution: '1024x1024', pinned: true },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop', seed: 193842, resolution: '1024x1024', pinned: false },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop', seed: 958123, resolution: '1024x1024', pinned: false },
    { id: '4', imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=600&auto=format&fit=crop', seed: 238941, resolution: '1024x1024', pinned: false },
];

const WorkspaceLayout: React.FC<WorkspaceProps> = ({ onExit }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  // Gallery State
  const [renders, setRenders] = useState<RenderItem[]>(MOCK_RENDERS);
  const [selectedRenderId, setSelectedRenderId] = useState<string | null>(null);

  // Sidebar States
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);

  // Workspace Settings
  const [planOpacity, setPlanOpacity] = useState(0.5);

  // Camera State (Vector Based)
  const [camera, setCamera] = useState<CameraState>({ 
    start: { x: 300, y: 300 }, 
    end: { x: 500, y: 300 }, 
    fov: 60, 
    height: 5 
  });
  
  const [dragMode, setDragMode] = useState<'create' | 'moveStart' | 'moveEnd' | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Clear render selection when changing Left Sidebar Item
  useEffect(() => {
    if (selectedItemId === 'Camera View') {
        setSelectedRenderId(null);
    }
  }, [selectedItemId]);

  // Interaction Logic (Camera)
  const getMousePos = (e: React.MouseEvent | MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedItemId !== 'Camera View') return;
    
    // Check if clicking handles (stopPropagation is handled in handle bubbles below)
    // If we reach here, we are clicking empty space -> Start Creating new Arrow
    const pos = getMousePos(e);
    setCamera(prev => ({ ...prev, start: pos, end: pos }));
    setDragMode('create');
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragMode) return;
      const pos = getMousePos(e);

      setCamera(prev => {
        if (dragMode === 'create' || dragMode === 'moveEnd') {
           return { ...prev, end: pos };
        } else if (dragMode === 'moveStart') {
           return { ...prev, start: pos };
        }
        return prev;
      });
    };

    const handleMouseUp = () => {
      setDragMode(null);
    };

    if (dragMode) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragMode]);

  const handleDeleteRender = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenders(prev => prev.filter(r => r.id !== id));
    if (selectedRenderId === id) setSelectedRenderId(null);
  }

  const handlePinRender = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenders(prev => prev.map(r => r.id === id ? { ...r, pinned: !r.pinned } : r));
  }


  return (
    <div className="flex flex-col h-screen w-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="h-12 shrink-0 flex items-center justify-between px-4 bg-black/50 backdrop-blur-md border-b border-zinc-800 z-50">
        <div className="flex items-center gap-4">
            <button 
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors"
                onClick={() => setIsLeftOpen(!isLeftOpen)}
                title="Toggle Sidebar"
            >
                {isLeftOpen ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
            </button>

            <button 
                className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 rounded-sm cursor-pointer transition-colors text-zinc-400 hover:text-white" 
                onClick={onExit}
                title="Back to Dashboard"
            >
                <ArrowLeft size={16} />
            </button>
            <div className="h-4 w-[1px] bg-zinc-800"></div>
            <span className="text-xs font-mono text-zinc-500">Project / Untitled-1</span>
        </div>

        {/* Phase Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-sm border border-zinc-800">
            {PHASES.map((phase, index) => (
                <button
                    key={phase}
                    onClick={() => {
                        setCurrentPhase(index);
                        setSelectedItemId(null);
                    }}
                    className={`px-4 py-1 text-xs font-medium rounded-sm transition-all duration-200 ${
                        currentPhase === index 
                        ? 'bg-zinc-800 text-accent shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                >
                    {phase}
                </button>
            ))}
        </div>

        <div className="flex items-center gap-3">
             <button className="text-xs font-bold bg-accent text-black px-4 py-1.5 rounded-sm hover:bg-yellow-400 transition-colors flex items-center gap-2">
                <Download size={14} />
                Export
             </button>
             <button 
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-sm transition-colors"
                onClick={() => setIsRightOpen(!isRightOpen)}
             >
                {isRightOpen ? <PanelRightClose size={16} /> : <PanelRight size={16} />}
            </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-3rem)]">
        
        {/* Left Sidebar */}
        <div className={`border-r border-zinc-800 bg-void transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${isLeftOpen ? 'w-72 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-10'}`}>
            <LeftSidebar 
                currentPhase={currentPhase} 
                selectedItemId={selectedItemId} 
                onSelect={setSelectedItemId} 
            />
        </div>

        {/* Center Viewport */}
        {selectedItemId === 'Camera View' ? (
            /* CAMERA & FLOORPLAN MODE */
            <main 
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                className="flex-1 bg-[#09090b] relative overflow-hidden flex flex-col select-none cursor-crosshair"
            >
                {/* Viewport Toolbar Overlay */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-zinc-800 rounded-sm px-2 py-1 flex items-center gap-2 z-10 shadow-xl pointer-events-auto">
                    <button className="p-1.5 hover:bg-zinc-700 rounded-sm text-zinc-400 hover:text-white"><Move size={14} /></button>
                    <button className="p-1.5 hover:bg-zinc-700 rounded-sm text-zinc-400 hover:text-white"><ZoomIn size={14} /></button>
                    <div className="w-[1px] h-3 bg-zinc-700"></div>
                    <span className="text-[10px] font-mono text-zinc-500 px-2">PLAN VIEW</span>
                </div>

                {/* Floor Plan Background Layer */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                        opacity: 0.2
                    }}
                />
                
                {/* Mock Floor Plan Image (Only visible in Camera Mode) */}
                <div 
                    className="absolute inset-0 pointer-events-none bg-contain bg-center bg-no-repeat transition-opacity duration-300"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop&grayscale')`,
                        filter: 'invert(1) grayscale(100%) brightness(0.7)',
                        opacity: planOpacity
                    }}
                />
                
                {/* Camera Overlay Layer (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20">
                    <defs>
                        <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                        >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#FACC15" />
                        </marker>
                    </defs>

                    <g className="filter drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
                        <line 
                            x1={camera.start.x} y1={camera.start.y}
                            x2={camera.end.x} y2={camera.end.y}
                            stroke="#FACC15"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                        />
                        
                        {/* Interaction Handles */}
                        <circle 
                            cx={camera.start.x} cy={camera.start.y} r="6" 
                            fill="#FACC15" stroke="black" strokeWidth="2"
                            className="cursor-move pointer-events-auto hover:r-8 transition-all"
                            onMouseDown={(e) => { e.stopPropagation(); setDragMode('moveStart'); }}
                        />
                        <circle 
                            cx={camera.end.x} cy={camera.end.y} r="10" 
                            fill="transparent" 
                            className="cursor-move pointer-events-auto"
                            onMouseDown={(e) => { e.stopPropagation(); setDragMode('moveEnd'); }}
                        />
                    </g>
                </svg>

                {/* Hint */}
                {!dragMode && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 text-zinc-400 text-xs rounded-full border border-zinc-800 pointer-events-none">
                        Drag handles to position camera
                    </div>
                )}
            </main>
        ) : (
            /* GENERATIVE GALLERY MODE (STITCH BOARD) */
            <main className="flex-1 bg-[#09090b] relative flex flex-col overflow-hidden">
                {/* Background Pattern */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                        backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                    }}
                />

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
                        {renders.map((render) => (
                            <div 
                                key={render.id}
                                onClick={() => setSelectedRenderId(render.id)}
                                className={`
                                    group relative aspect-square rounded-sm overflow-hidden cursor-pointer transition-all duration-200
                                    ${selectedRenderId === render.id 
                                        ? 'ring-2 ring-accent shadow-[0_0_20px_rgba(244,208,63,0.15)] z-10' 
                                        : 'hover:ring-1 hover:ring-zinc-600 hover:z-10 hover:scale-[1.02]'
                                    }
                                `}
                            >
                                <img 
                                    src={render.imageUrl} 
                                    alt="Render" 
                                    className="w-full h-full object-cover bg-zinc-900" 
                                />
                                
                                {/* Overlay Actions (On Hover) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                    <div className="flex justify-between items-end">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={(e) => handleDeleteRender(render.id, e)}
                                                className="p-1.5 bg-black/50 hover:bg-red-500/20 hover:text-red-500 rounded-sm text-white backdrop-blur-sm transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <button className="p-1.5 bg-black/50 hover:bg-white/20 rounded-sm text-white backdrop-blur-sm transition-colors">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={(e) => handlePinRender(render.id, e)}
                                            className={`p-1.5 hover:bg-white/20 rounded-sm backdrop-blur-sm transition-colors ${render.pinned ? 'bg-accent text-black' : 'bg-black/50 text-white'}`}
                                            title="Pin"
                                        >
                                            <Pin size={14} className={render.pinned ? 'fill-black' : ''} />
                                        </button>
                                    </div>
                                </div>

                                {/* Selection Indicator */}
                                {selectedRenderId === render.id && (
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full shadow-glow"></div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Empty State Helper */}
                    {renders.length === 0 && (
                         <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4 mt-20 opacity-50">
                            <Box size={48} strokeWidth={1} />
                            <p>No renders yet. Configure prompt in the right panel.</p>
                         </div>
                    )}
                </div>
            </main>
        )}

        {/* Right Sidebar */}
        <div className={`border-l border-zinc-800 bg-void transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${isRightOpen ? 'w-80 opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-10'}`}>
            <RightSidebar 
                currentPhase={currentPhase} 
                selectedItemId={selectedItemId} 
                cameraState={camera}
                onCameraChange={setCamera}
                planOpacity={planOpacity}
                onPlanOpacityChange={setPlanOpacity}
                selectedRender={renders.find(r => r.id === selectedRenderId) || null}
            />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLayout;