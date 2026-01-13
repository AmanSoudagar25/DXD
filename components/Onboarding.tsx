import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Home, ArrowRight, Loader2 } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!selectedRole) return;
    setLoading(true);
    // Simulate configuration delay
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const roles = [
    { id: 'pro', label: 'Professional', icon: Briefcase, desc: 'Architects & Designers' },
    { id: 'student', label: 'Student', icon: GraduationCap, desc: 'Academic & Learning' },
    { id: 'personal', label: 'Personal', icon: Home, desc: 'Homeowners & DIY' },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative font-sans text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-sm p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="mb-8">
            <div className="text-xs font-mono text-zinc-500 mb-2 tracking-wider">INITIALIZING WORKSPACE</div>
            <h1 className="text-3xl font-bold mb-2">Welcome, Alex.</h1>
            <p className="text-zinc-400 text-sm">Tell us how you plan to use DimensionXD to optimize your experience.</p>
        </div>

        {/* Selection Grid */}
        <div className="space-y-3 mb-8">
            {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                const Icon = role.icon;
                return (
                    <motion.div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`cursor-pointer flex items-center gap-4 p-4 rounded-sm border transition-all duration-200 ${
                            isSelected 
                            ? 'border-accent bg-accent/10' 
                            : 'border-zinc-800 bg-black/20 hover:border-zinc-700'
                        }`}
                    >
                        <div className={`p-2 rounded-sm transition-colors ${isSelected ? 'bg-accent text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                            <Icon size={20} />
                        </div>
                        <div>
                            <div className={`font-medium transition-colors ${isSelected ? 'text-white' : 'text-zinc-300'}`}>{role.label}</div>
                            <div className={`text-xs transition-colors ${isSelected ? 'text-accent/80' : 'text-zinc-500'}`}>{role.desc}</div>
                        </div>
                    </motion.div>
                )
            })}
        </div>

        {/* Footer Action */}
        <button
            onClick={handleContinue}
            disabled={!selectedRole || loading}
            className={`w-full h-12 rounded-sm font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                !selectedRole || loading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-accent text-black hover:bg-yellow-400 shadow-glow'
            }`}
        >
            {loading ? (
                <>
                    <Loader2 size={16} className="animate-spin" />
                    Configuring GPU...
                </>
            ) : (
                <>
                    Enter Dashboard
                    <ArrowRight size={16} />
                </>
            )}
        </button>

      </motion.div>
    </div>
  );
};

export default Onboarding;