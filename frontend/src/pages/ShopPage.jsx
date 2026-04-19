import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { listProducts } from '../store/slices/productSlice';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ShopPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { products, loading, error } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        dispatch(listProducts());
        // Handle search param from URL
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search');
        if (searchParam) {
            setSearchTerm(searchParam);
        }
    }, [dispatch, location.search]);

    const categories = ['All', ...new Set((products || []).map(p => p.category))];

    const filteredProducts = (products || []).filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase">The <span className="text-primary italic">Catalog</span></h1>
                    <p className="text-gray-400 text-sm mt-2">Elevate your home gym with professional-grade equipment.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative rounded-2xl flex items-center px-4 py-2 border w-full md:w-64" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
                        <Search size={18} className="text-gray-500 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Search Gear..." 
                            className="bg-transparent border-none outline-none text-sm w-full"
                            style={{ color: 'var(--text-primary)' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex overflow-x-auto gap-2 mb-12 pb-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${category === cat ? 'bg-primary text-dark-dark border-primary' : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-[400px] bg-[#111827]/20 animate-pulse rounded-3xl"></div>
                    ))}
                </div>
            ) : error ? (
                <div className="p-8 bg-red-400/10 border border-red-400/20 rounded-3xl text-red-400 text-center font-bold">
                    {error}
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-24 glass-morphism rounded-3xl border border-white/5">
                    <p className="text-gray-400 font-bold uppercase tracking-widest">No products found for this criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopPage;
