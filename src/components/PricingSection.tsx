import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, HelpCircle, ArrowUpRight, Shield, Zap, Flame, Sliders } from 'lucide-react';
import { PRICING_PLANS } from '../data';

interface PricingSectionProps {
  onPlanSelect: (planName: string, calculatedPrice: string) => void;
}

export default function PricingSection({ onPlanSelect }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [strategyHours, setStrategyHours] = useState(15); // Dynamic calculator slider
  const [activeTab, setActiveTab] = useState<'standard' | 'interactive'>('standard');

  const getPriceMultiplier = () => (isYearly ? 0.8 : 1);

  // Custom estimator price based on strategy hours
  const calculateCustomPrice = () => {
    const baseVal = 1500;
    const hourlyRate = 120;
    const total = baseVal + strategyHours * hourlyRate;
    return Math.round(total * getPriceMultiplier());
  };

  return (
    <section id="pricing" className="py-12 sm:py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      
      {/* Background circle blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-lime/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-sky/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="bg-slate-200 px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 mb-4 border border-slate-300/40">
            <span className="w-1.5 h-1.5 bg-brand-sky rounded-full animate-pulse" />
            <span className="font-display text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">
              • PRICING
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#0e1118] tracking-tight leading-[1.25] sm:leading-[1.1] max-w-3xl mb-4">
            Flexible Plans Built for <br className="hidden sm:inline" />
            Every Stage of Growth
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Whether you're just starting your AI journey or scaling enterprise-wide innovation, we offer tailored solutions that grow with you.
          </p>

          {/* Pricing Tabs & Multi-billing Switch */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            {/* Standard vs Interactive estimator toggle */}
            <div className="bg-white p-1 rounded-full border border-slate-200/80 shadow-sm flex">
              <button
                onClick={() => setActiveTab('standard')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-colors uppercase ${
                  activeTab === 'standard'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                STANDARD PLANS
              </button>
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-colors uppercase flex items-center gap-1.5 ${
                  activeTab === 'interactive'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                DYNAMIC ESTIMATOR
              </button>
            </div>

            {/* Monthly / Yearly Switch */}
            <div className="flex items-center gap-2 bg-white/85 px-4 py-2 rounded-full border border-slate-200/60 shadow-sm">
              <span className={`text-[11px] font-bold tracking-wide transition-colors ${!isYearly ? 'text-slate-800' : 'text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center px-0.5 ${
                  isYearly ? 'bg-brand-sky' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                    isYearly ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-[11px] font-bold tracking-wide transition-colors ${isYearly ? 'text-brand-sky' : 'text-slate-400'}`}>
                Yearly <span className="bg-brand-lime text-slate-900 text-[8px] px-1.5 py-0.5 rounded-full font-black ml-1">SAVE 20%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic content wrapper based on Active Tab */}
        {activeTab === 'standard' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch mt-8">
            {PRICING_PLANS.map((plan, index) => {
              // Convert pricing to numeric and apply discount if yearly
              const numericPrice = parseInt(plan.price.replace('$', '').replace(',', ''));
              const discountedPrice = isYearly ? Math.round(numericPrice * 0.8) : numericPrice;
              const priceString = '$' + discountedPrice.toLocaleString();

              const icons = [
                <Zap className="w-5 h-5 text-slate-800" />,
                <Flame className="w-5 h-5 text-brand-dark" />,
                <Shield className="w-5 h-5 text-slate-800" />
              ];

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.01] ${
                    plan.isPopular
                      ? 'bg-white border-2 border-[#d5ff3f] shadow-xl md:-translate-y-2'
                      : 'bg-white border border-slate-100 shadow-sm'
                  }`}
                >
                  
                  {/* Popular badge */}
                  {plan.isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-lime text-slate-950 font-display text-[9px] font-black tracking-widest px-4 py-1 rounded-full uppercase shadow-md border border-[#c6ef1d]">
                      POPULAR CHOICE
                    </span>
                  )}

                  <div>
                    {/* Header of Plan */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="text-left">
                        <span className="font-mono text-[9px] font-bold text-slate-400 block tracking-widest leading-none">
                          {plan.name}
                        </span>
                        <span className="text-slate-500 text-[10px] block mt-1 leading-relaxed max-w-[160px]">
                          {plan.tag}
                        </span>
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.isPopular ? 'bg-brand-lime' : 'bg-slate-100'}`}>
                        {icons[index]}
                      </div>
                    </div>

                    {/* Pricing Display */}
                    <div className="text-left border-b border-slate-50 pb-6 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">
                          {priceString}
                        </span>
                        <span className="text-xs text-slate-400 font-bold font-mono">
                          {plan.description}
                        </span>
                      </div>
                      {isYearly && (
                        <p className="text-[10px] text-emerald-600 font-bold mt-1.5">
                          Billed annually (Save ${(numericPrice * 12 * 0.2).toLocaleString()}/year)
                        </p>
                      )}
                    </div>

                    {/* Features list */}
                    <ul className="space-y-3 mb-8 text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <button
                      onClick={() => onPlanSelect(plan.name, priceString)}
                      className={`w-full py-3.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5 group ${
                        plan.isPopular
                          ? 'bg-brand-dark text-white hover:bg-brand-sky hover:shadow-lg'
                          : 'bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800'
                      }`}
                    >
                      GET STARTED
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Interactive Budget Estimator Tool */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-xl text-left mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column Controls */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h3 className="text-lg font-display font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-brand-sky" />
                    Dynamic Consulting Estimator
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Adjust the slider to configure the desired expert strategy consultation hours. Our pipeline estimates your monthly retainer rate.
                  </p>
                </div>

                {/* Hours Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                      Consultation Hours
                    </span>
                    <span className="bg-brand-sky/10 text-brand-sky font-mono font-black text-xs px-3 py-1 rounded-full">
                      {strategyHours} Hours / mo
                    </span>
                  </div>
                  
                  {/* Actual Slider Input */}
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={strategyHours}
                    onChange={(e) => setStrategyHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-sky"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>5 HR MIN</span>
                    <span>40 HR HALF-TIME</span>
                    <span>80 HR FULL-TIME</span>
                  </div>
                </div>

                {/* List of included estimator features */}
                <div className="pt-4 border-t border-slate-50 grid grid-cols-2 gap-3">
                  {[
                    'Custom automation setups',
                    'Dedicated project manager',
                    'Bi-weekly analysis reports',
                    '24/7 Slack escalation'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Price Output */}
              <div className="md:col-span-5 bg-slate-900 rounded-2xl p-6 text-white text-center flex flex-col justify-between min-h-[260px] border border-slate-800 shadow-lg">
                <div>
                  <span className="text-[9px] font-mono font-bold text-brand-lime tracking-widest block uppercase mb-1">
                    ESTIMATED RETAINER
                  </span>
                  
                  <div className="text-4xl lg:text-5xl font-display font-black text-white mt-3 mb-1 tracking-tight">
                    ${calculateCustomPrice().toLocaleString()}
                  </div>
                  
                  <span className="text-slate-400 text-[10px] font-bold font-mono">
                    / MONTH
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Billed {isYearly ? 'annually' : 'monthly'} based on target configuration. Fully elastic consultation rate.
                  </p>

                  <button
                    onClick={() => onPlanSelect(`Custom Consultation (${strategyHours} hrs)`, `$${calculateCustomPrice().toLocaleString()}`)}
                    className="w-full bg-brand-lime hover:bg-brand-sky text-slate-950 hover:text-white py-3.5 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    BOOK ESTIMATE RATE
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
