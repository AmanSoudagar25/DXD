import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-[#050505]">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1A1A1A 1px, transparent 1px),
            linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 90%)',
        }}
      />
    </div>
  );
};

export default Background;