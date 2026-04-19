import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreHero from '../components/StoreHero';
import ProductCard from '../components/ProductCard';
import { listProducts } from '../store/slices/productSlice';
import { ArrowLeftRight, Zap, Target, Shield, Dumbbell, Activity, TrendingUp, Sparkles, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const categoryData = [
    { title: 'Weights',     Icon: Dumbbell,  count: '45+ Items', from: 'from-blue-500/20',   to: 'to-blue-600/5'    },
    { title: 'Cardio',      Icon: Activity,  count: '28+ Items', from: 'from-primary/20',    to: 'to-primary/5'     },
    { title: 'Strength',    Icon: Zap,       count: '32+ Items', from: 'from-orange-500/20', to: 'to-orange-600/5'  },
    { title: 'Accessories', Icon: Sparkles,  count: '15+ Items', from: 'from-purple-500/20', to: 'to-purple-600/5'  },
  ];

  return (
    <div className="overflow-x-hidden min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
      <StoreHero />

      {/* Categories Navigator */}
      <section className="py-24 px-6 max-w-7xl mx-auto -mt-12 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoryData.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-3xl border bg-gradient-to-br ${cat.from} ${cat.to} backdrop-blur-xl group cursor-pointer transition-all duration-500 hover:border-primary/30 shadow-2xl overflow-hidden relative`}
              style={{ borderColor: 'var(--border-soft)' }}
            >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-15 transition-opacity">
                <cat.Icon size={80} />
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--bg-base)', opacity: 0.7 }}>
                <cat.Icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-1 uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>{cat.title}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{cat.count}</p>
              <div className="mt-6 flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                EXPLORE <MoveRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-4">
              <Sparkles size={10} /> NEW COLLECTIONS 2024
            </div>
            <h2 className="text-6xl font-black tracking-tighter leading-none mb-6" style={{ color: 'var(--text-primary)' }}>
              ELITE <span className="text-primary italic">ARRIVALS.</span>
            </h2>
            <p className="font-medium text-lg" style={{ color: 'var(--text-muted)' }}>
              Engineered for absolute performance. Discover our latest professional-grade gym equipment.
            </p>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:border-primary/50 border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-medium)', color: 'var(--text-secondary)' }}>
            VIEW FULL CATALOG <TrendingUp size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[500px] animate-pulse rounded-[40px] border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-soft)' }}></div>
            ))}
          </div>
        ) : error ? (
          <div className="p-10 bg-red-400/10 border border-red-400/20 rounded-[40px] text-red-400 text-center font-bold">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(products || []).slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Trust & Features Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          {[
            { Icon: Zap,    title: 'Peak Performance', desc: 'Engineered for elite athletes who demand absolute perfection in every training session.' },
            { Icon: Target, title: 'Precision Aim',     desc: 'Every detail calculated to provide maximum comfort and efficiency during intense movements.' },
            { Icon: Shield, title: 'Unmatched Safety',  desc: 'Industry-leading safety standards with 100% certified professional-grade construction.' },
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col items-start glass-morphism p-10 rounded-[40px] border hover:border-primary/20 transition-all group" style={{ borderColor: 'var(--border-soft)' }}>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-10 text-primary group-hover:scale-110 transition-transform duration-500">
                <Icon size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>{title}</h3>
              <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <div className="glass-morphism rounded-[50px] p-20 border relative overflow-hidden group" style={{ borderColor: 'var(--border-medium)' }}>
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <h2 className="text-7xl font-black tracking-tighter mb-8 italic uppercase relative z-10" style={{ color: 'var(--text-primary)' }}>READY TO UPGRADE?</h2>
          <p className="text-xl font-medium mb-12 max-w-xl mx-auto relative z-10 leading-relaxed uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
            Join the elite athletes using ARXON FITNESS STORE gear globally.
          </p>
          <Link to="/register" className="relative z-10 inline-flex items-center gap-4 px-12 py-6 bg-primary text-dark-dark rounded-full font-black text-sm uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl shadow-primary/20">
            JOIN THE ELITE <ArrowLeftRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
