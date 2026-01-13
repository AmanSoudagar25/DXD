import React from 'react';
import { motion } from 'framer-motion';
import { Check, Wallet, ArrowUpRight } from 'lucide-react';

const Profitability: React.FC = () => {
  return (
    <section id="profitability" className="max-w-7xl mx-auto px-6 py-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Don't just Design. <span className="text-accent">Earn.</span></h2>
          <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
            Turn your material specifications into a revenue stream. DimensionXD tracks every product you place. When your client buys through our generated list, you get paid.
          </p>
          
          <ul className="space-y-4">
            {[
              "Partner Catalog Integration (500+ Brands)",
              "Automated Receipt Tracking & Invoicing",
              "Monthly Payouts via Direct Transfer"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-300">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <Check size={14} className="text-accent" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Graphic Side - Wallet UI */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="flex-1 w-full flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-accent/20 blur-[80px] rounded-full"></div>
            
            {/* Glass Card */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
               {/* Header */}
               <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-zinc-400 text-sm font-medium mb-1">Total Balance</div>
                    <div className="text-4xl font-mono font-bold text-white tracking-tight">₹12,450.00</div>
                  </div>
                  <div className="p-3 bg-accent rounded-full text-black shadow-lg shadow-accent/20">
                    <Wallet size={24} />
                  </div>
               </div>

               {/* Recent Transactions */}
               <div className="space-y-4">
                  <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Recent Activity</div>
                  
                  {[
                    { name: 'Asian Paints Royalty', date: '2h ago', amount: '+₹450.00' },
                    { name: 'IKEA Furniture', date: '5h ago', amount: '+₹1,200.00' },
                    { name: 'Jaquar Fittings', date: '1d ago', amount: '+₹850.00' },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <ArrowUpRight size={14} className="text-green-500" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-zinc-200">{tx.name}</div>
                                <div className="text-xs text-zinc-500">{tx.date}</div>
                            </div>
                        </div>
                        <div className="font-mono text-green-400 text-sm">{tx.amount}</div>
                    </div>
                  ))}
               </div>

               {/* Withdraw Button */}
               <button className="w-full mt-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-sm border border-zinc-700 transition-colors">
                  Withdraw Funds
               </button>
            </div>

            {/* Floating Decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-zinc-900 border border-border-dim rounded-xl flex items-center justify-center z-20 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                 <div className="text-center">
                    <div className="text-accent font-bold text-xl">+5%</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Cashback</div>
                 </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profitability;