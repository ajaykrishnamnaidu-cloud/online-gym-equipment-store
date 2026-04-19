import React from 'react';
import { ShoppingCart, Search, ArrowRight, Activity, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StoreHero = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className="relative w-full h-[95vh] overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--bg-base)' }}>
            {/* Background with Dark Overlay */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent"></div>
                <img 
                    src="/hero_bg.png" 
                    alt="Elite Gym Store" 
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#030712] to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        <Activity size={12} className="animate-pulse" /> PERFORMANCE ENGINEERED
                    </div>
                    
                    <h1 className="text-8xl md:text-9xl font-black mb-6 tracking-tighter text-white leading-[0.85]">
                        PUSH YOUR <span className="text-primary italic block">LIMITS.</span>
                    </h1>
                    
                    <p className="text-gray-400 text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
                        Precision-calibrated equipment for elite athletes and home gym enthusiasts. Experience the core of professional performance in every rep.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 text-white">
                        <button 
                            onClick={() => navigate('/shop')}
                            className="w-full sm:w-auto px-10 py-5 bg-primary text-dark-dark rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 group"
                        >
                            EXPLORE CATALOG <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <div className="w-full sm:w-auto relative glass-morphism rounded-2xl flex items-center px-6 py-5 border border-white/10 group focus-within:border-primary/50 transition-all">
                            <Search size={18} className="text-gray-500 mr-3 group-focus-within:text-primary transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search Gear..." 
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && navigate(`/shop?search=${encodeURIComponent(searchValue)}`)}
                                className="bg-transparent border-none outline-none text-xs font-bold text-white w-full uppercase tracking-widest placeholder-gray-600 focus:ring-0"
                            />
                        </div>
                    </div>

                    <div className="mt-12 flex items-center gap-12 text-gray-500 opacity-60">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white italic tracking-tighter">12K+</span>
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] mt-1">ATHLETES SERVED</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white italic tracking-tighter">150+</span>
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] mt-1">PREMIUM GEAR</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white italic tracking-tighter">100%</span>
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] mt-1">SATISFACTION</span>
                        </div>
                    </div>
                </motion.div>

                <div className="hidden lg:flex justify-end">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -top-12 -left-12 p-8 glass-morphism rounded-3xl border border-white/10 z-20">
                            <Zap className="text-primary mb-4" size={32} />
                            <p className="text-xs font-black text-white uppercase tracking-widest leading-tight">Instant <br/> Energy</p>
                        </div>
                        <div className="absolute -bottom-12 -right-12 p-8 glass-morphism rounded-3xl border border-white/10 z-20">
                            <ShieldCheck className="text-primary mb-4" size={32} />
                            <p className="text-xs font-black text-white uppercase tracking-widest leading-tight">Certified <br/> Elite</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StoreHero;
