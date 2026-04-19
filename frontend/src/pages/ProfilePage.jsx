import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, Lock, Save, Package } from 'lucide-react';
import axios from 'axios';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            
            const fetchOrders = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                    };
                    const { data } = await axios.get('/api/orders/myorders', config);
                    setOrders(data);
                    setLoadingOrders(false);
                } catch (error) {
                    setLoadingOrders(false);
                }
            };
            fetchOrders();
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.put('/api/users/profile', { id: userInfo._id, name, email, password }, config);
                setSuccess(true);
                setMessage(null);
            } catch (error) {
                setMessage(error.response && error.response.data.message ? error.response.data.message : error.message);
            }
        }
    };

    return (
        <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-12">User <span className="text-primary italic">Profile</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Profile Form */}
                <div className="lg:col-span-1">
                    <div className="glass-morphism rounded-3xl border border-white/5 p-8">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Update Identity</h2>
                        
                        {(message || success) && (
                            <div className={`mb-6 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center ${success ? 'bg-green-500/10 border border-green-500/20 text-green-500' : 'bg-red-400/10 border border-red-400/20 text-red-400'}`}>
                                {message || 'Profile Updated Successfully'}
                            </div>
                        )}

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Name</label>
                                <div className="relative bg-dark-dark/50 rounded-2xl flex items-center px-4 py-3 border border-white/5 focus-within:border-primary/50 transition-all">
                                    <User size={16} className="text-gray-500 mr-3" />
                                    <input 
                                        type="text" 
                                        className="bg-transparent border-none outline-none text-sm text-white w-full"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email</label>
                                <div className="relative bg-dark-dark/50 rounded-2xl flex items-center px-4 py-3 border border-white/5 focus-within:border-primary/50 transition-all">
                                    <Mail size={16} className="text-gray-500 mr-3" />
                                    <input 
                                        type="email" 
                                        className="bg-transparent border-none outline-none text-sm text-white w-full"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">New Password (Optional)</label>
                                <div className="relative bg-dark-dark/50 rounded-2xl flex items-center px-4 py-3 border border-white/5 focus-within:border-primary/50 transition-all">
                                    <Lock size={16} className="text-gray-500 mr-3" />
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="bg-transparent border-none outline-none text-sm text-white w-full"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Confirm Password</label>
                                <div className="relative bg-dark-dark/50 rounded-2xl flex items-center px-4 py-3 border border-white/5 focus-within:border-primary/50 transition-all">
                                    <Lock size={16} className="text-gray-500 mr-3" />
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="bg-transparent border-none outline-none text-sm text-white w-full"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full py-4 bg-primary hover:bg-primary-dark text-dark-dark rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
                            >
                                <Save size={16} /> SAVE CHANGES
                            </button>
                        </form>
                    </div>
                </div>

                {/* Orders History */}
                <div className="lg:col-span-2">
                    <div className="glass-morphism rounded-3xl border border-white/5 p-8 min-h-[400px]">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                            <Package size={20} className="text-primary" /> Order History
                        </h2>

                        {loadingOrders ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-20 bg-white/5 animate-pulse rounded-2xl"></div>
                                ))}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                <Package size={48} className="mb-4 opacity-20" />
                                <p className="font-bold uppercase tracking-widest text-sm">No orders found.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order._id} className="p-6 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">ORDER ID: {order._id}</p>
                                            <p className="text-sm font-bold text-white uppercase tracking-tighter">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-col md:items-end">
                                            <p className="text-lg font-black text-white italic tracking-tighter">₹{order.totalPrice}</p>
                                            <div className="flex gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${order.isPaid ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                                    {order.isPaid ? 'Paid' : 'Unpaid'}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${order.isDelivered ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-500/20 text-gray-500'}`}>
                                                    {order.isDelivered ? 'Delivered' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
