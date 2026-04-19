import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, History, ArrowRight } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            const fetchStats = async () => {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                // Using simple counts for stats (mocked if routes not fully available)
                const { data: products } = await axios.get('/api/products', config);
                const { data: users } = await axios.get('/api/users', config);
                const { data: orders } = await axios.get('/api/orders', config);
                setStats({ products: products.length, users: users.length, orders: orders.length });
            };
            fetchStats();
        }
    }, [userInfo, navigate]);

    return (
        <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                    <LayoutDashboard size={24} />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Admin <span className="text-primary italic">Control</span></h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="glass-morphism rounded-3xl p-8 border border-white/5 group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <ShoppingBag className="text-gray-400 group-hover:text-primary transition-colors" size={32} />
                        <span className="text-4xl font-black text-white tracking-tighter italic">{stats.products}</span>
                    </div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-1">TOTAL PRODUCTS</h3>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">ACTIVE IN CATALOG</p>
                </div>
                <div className="glass-morphism rounded-3xl p-8 border border-white/5 group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <Users className="text-gray-400 group-hover:text-primary transition-colors" size={32} />
                        <span className="text-4xl font-black text-white tracking-tighter italic">{stats.users}</span>
                    </div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-1">PLATFORM USERS</h3>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">REGISTERED IDENTITIES</p>
                </div>
                <div className="glass-morphism rounded-3xl p-8 border border-white/5 group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <History className="text-gray-400 group-hover:text-primary transition-colors" size={32} />
                        <span className="text-4xl font-black text-white tracking-tighter italic">{stats.orders}</span>
                    </div>
                    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-1">TOTAL ORDERS</h3>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">PROCESSED TRANSACTIONS</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <button onClick={() => navigate('/admin/products')} className="p-8 glass-morphism rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all text-left">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-1 uppercase tracking-tighter">Product Inventory</h4>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Add, Edit, or Remove items</p>
                    </div>
                    <ArrowRight className="text-gray-600 group-hover:text-primary group-hover:translate-x-2 transition-all" size={24} />
                </button>
                <button onClick={() => navigate('/admin/orders')} className="p-8 glass-morphism rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all text-left">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-1 uppercase tracking-tighter">Order Management</h4>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Track shipping and payment states</p>
                    </div>
                    <ArrowRight className="text-gray-600 group-hover:text-primary group-hover:translate-x-2 transition-all" size={24} />
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
