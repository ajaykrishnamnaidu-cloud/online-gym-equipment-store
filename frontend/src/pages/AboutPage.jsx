import React from 'react';
import { motion } from 'framer-motion';
import { Target, Activity, Zap, ShieldCheck, Award, Users, Globe } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="pt-24 pb-24 px-6 bg-dark-dark min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] max-w-7xl mx-auto rounded-[50px] overflow-hidden group mb-24">
                <img 
                    src="/about_bg.png" 
                    alt="Arxon Fitness Team" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-dark via-transparent to-transparent"></div>
                
                <div className="absolute bottom-16 left-12 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-4">
                           EST. 2024 • THE NEW STANDARD
                        </span>
                        <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-none mb-6">OUR <span className="text-primary italic">STORY.</span></h1>
                        <p className="text-gray-300 text-lg font-medium max-w-xl">Born from the fusion of elite athletic performance and professional-grade engineering. We don't just sell equipment; we calibrate success.</p>
                    </motion.div>
                </div>
            </section>

            {/* Our Values */}
            <section className="max-w-7xl mx-auto mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="glass-morphism p-12 rounded-[40px] border border-white/5 hover:border-primary/20 transition-all">
                        <Target className="text-primary mb-12" size={48} />
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Precision</h3>
                        <p className="text-gray-400 font-medium leading-relaxed">Every piece of Arxon Fitness Store gear is manufactured to within 0.1% of the weight and performance specification. We believe that elite gains start with elite measurement.</p>
                    </div>
                    <div className="glass-morphism p-12 rounded-[40px] border border-white/5 hover:border-primary/20 transition-all">
                        <Zap className="text-primary mb-12" size={48} />
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Power</h3>
                        <p className="text-gray-400 font-medium leading-relaxed">Engineered for absolute failure training. Our racks, plates, and machines are tested against forces 5x higher than any human can generate.</p>
                    </div>
                    <div className="glass-morphism p-12 rounded-[40px] border border-white/5 hover:border-primary/20 transition-all">
                        <Activity className="text-primary mb-12" size={48} />
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Performance</h3>
                        <p className="text-gray-400 font-medium leading-relaxed">Designed by athletes, for athletes. We prioritize biomechanics and ergonomic efficiency, ensuring that every movement is as natural as it is intense.</p>
                    </div>
                </div>
            </section>

            {/* Global Reach */}
            <section className="max-w-7xl mx-auto mb-32 text-center p-24 glass-morphism rounded-[60px] border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-20 pointer-events-none"></div>
                <Globe className="text-primary absolute -right-12 -bottom-12 opacity-10" size={300} />
                
                <h2 className="text-6xl font-black text-white tracking-tighter uppercase mb-12 italic relative z-10">GLOBAL IMPACT <br/><span className="text-primary">LOCAL REACH.</span></h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-white tracking-tighter italic mb-2">50+</span>
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">COUNTRIES REPRESENTED</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-white tracking-tighter italic mb-2">500K</span>
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">HAPPY ATHLETES</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-white tracking-tighter italic mb-2">100%</span>
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">CARBON NEUTRAL MANUFACTURING</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-white tracking-tighter italic mb-2">24/7</span>
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">EXPERT SUPPORT</span>
                    </div>
                </div>
            </section>

            {/* Our Commitment */}
            <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-8 leading-none">THE <span className="text-primary italic">ARXON FITNESS STORE</span><br/>PROMISE.</h2>
                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                <Award className="text-primary" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2 italic">Lifetime Warranty</h4>
                                <p className="text-gray-500 font-medium">We stand behind every weld, every bolt, and every plate we ship. Our lifetime guarantee is a testament to our confidence in our gear.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                <Users className="text-primary" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2 italic">Athlete-First Design</h4>
                                <p className="text-gray-500 font-medium">We collaborate with the world's most elite trainers and athletes to iterate on every design before it ever hits the market.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="relative">
                    <div className="absolute inset-0 bg-primary opacity-20 blur-3xl animate-pulse"></div>
                    <div className="glass-morphism p-12 rounded-[50px] border border-white/10 relative z-10 text-center">
                        <ShieldCheck className="text-primary mx-auto mb-8" size={64} />
                        <h3 className="text-4xl font-black text-white tracking-tighter mb-6 uppercase italic">Elite Guaranteed.</h3>
                        <p className="text-gray-400 font-medium leading-relaxed mb-10">We don't compromised on safety or quality. Every product undergoes rigorous stress testing in our dedicated performance lab.</p>
                        <button className="px-10 py-5 bg-primary text-dark-dark rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl shadow-primary/20">
                            READ THE CHARTER
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
