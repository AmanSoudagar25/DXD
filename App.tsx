import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Features from './components/Features';
import Profitability from './components/Profitability';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Background from './components/Background';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import WorkspaceLayout from './components/WorkspaceLayout';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'onboarding' | 'dashboard' | 'workspace'>('landing');

  if (currentView === 'login') {
    return (
      <Login 
        onBack={() => setCurrentView('landing')} 
        onLoginSuccess={() => setCurrentView('onboarding')} 
      />
    );
  }

  if (currentView === 'onboarding') {
    return (
      <div className="relative min-h-screen text-white font-sans overflow-x-hidden">
        <Background />
        <Onboarding onComplete={() => setCurrentView('dashboard')} />
      </div>
    );
  }

  if (currentView === 'dashboard') {
     return (
       <div className="relative min-h-screen text-white font-sans overflow-x-hidden">
         <Background />
         <Dashboard onOpenWorkspace={() => setCurrentView('workspace')} />
       </div>
     );
  }

  if (currentView === 'workspace') {
      return (
          <WorkspaceLayout onExit={() => setCurrentView('dashboard')} />
      )
  }

  return (
    <div className="relative min-h-screen text-white selection:bg-accent selection:text-black font-sans overflow-x-hidden">
      <Background />
      <Navbar onLoginClick={() => setCurrentView('login')} />
      <main className="flex flex-col gap-20 md:gap-32 pb-20">
        <Hero />
        <Partners />
        <Features />
        <Profitability />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default App;