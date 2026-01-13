import React from 'react';
import { Check } from 'lucide-react';

const PricingCard: React.FC<{
  title: string;
  subtitle: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  borderColor?: string;
}> = ({ title, subtitle, price, period, features, cta, highlight = false, borderColor = 'border-border-dim' }) => {
  return (
    <div className={`relative flex flex-col p-8 bg-surface rounded-sm border ${borderColor} ${highlight ? 'shadow-[0_0_30px_-10px_rgba(244,208,63,0.3)] scale-105 z-10' : 'hover:border-zinc-600'} transition-all duration-300`}>
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-glow">
          Most Popular
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm">{subtitle}</p>
      </div>

      <div className="mb-8">
        <span className={`text-4xl font-bold text-white ${price === 'Custom' ? 'font-sans' : 'font-mono'}`}>{price}</span>
        {period && <span className="text-zinc-500 text-sm font-medium">/{period}</span>}
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
            <Check size={16} className={`mt-0.5 flex-shrink-0 ${highlight ? 'text-accent' : 'text-zinc-500'}`} />
            <span className="leading-5">{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 rounded-sm text-sm font-bold transition-colors ${
        highlight 
          ? 'bg-accent text-black hover:bg-yellow-400' 
          : 'bg-zinc-800 text-white hover:bg-zinc-700'
      }`}>
        {cta}
      </button>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 pb-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Flexible plans for <span className="text-zinc-500">every scale.</span></h2>
        <p className="text-zinc-400">Start for free, upgrade when you earn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
        
        <PricingCard 
          title="Starter"
          subtitle="For Hobbyists"
          price="Free"
          features={[
            "5 High-Res Renders/mo",
            "Basic Material Library",
            "Standard Support",
            "Personal License"
          ]}
          cta="Start Free"
          borderColor="border-border-dim"
        />

        <PricingCard 
          title="Pro"
          subtitle="For Professionals"
          price="₹1999"
          period="mo"
          features={[
            "Unlimited Renders",
            "Priority Processing",
            "5% Cashback on Materials",
            "4K Export Resolution",
            "Commercial License"
          ]}
          cta="Get Pro"
          highlight={true}
          borderColor="border-accent"
        />

        <PricingCard 
          title="Agency"
          subtitle="For Studios"
          price="Custom"
          features={[
            "Team Dashboard & Roles",
            "8% Cashback on Materials",
            "Dedicated API Access",
            "White-label Reports",
            "24/7 Priority Support"
          ]}
          cta="Contact Sales"
          borderColor="border-white/50"
        />

      </div>
    </section>
  );
};

export default Pricing;