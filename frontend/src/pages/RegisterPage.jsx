import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/authSlice';
import { Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { userInfo, loading, error } = useSelector((state) => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect.startsWith('/') ? redirect : `/${redirect}`);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register({ name, email, password }));
        }
    };

    return (
        <div className="pt-24 min-h-[90vh] flex items-center justify-center p-6">
            <div className="w-full max-w-md glass-morphism rounded-3xl border border-white/5 p-12 relative overflow-hidden group">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
                
                <div className="relative z-10 text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Create <span className="text-primary italic">Identity</span></h1>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Join the elite performance club</p>
                </div>

                {(error || message) && (
                    <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                        {error || message}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Full Identity</label>
                        <div className="relative glass-morphism rounded-2xl flex items-center px-4 py-4 border border-white/5 group-focus-within:border-primary/50 transition-all">
                            <User size={18} className="text-gray-500 mr-3" />
                            <input 
                                type="text" 
                                placeholder="John Doe" 
                                className="bg-transparent border-none outline-none text-sm text-white w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Identity</label>
                        <div className="relative glass-morphism rounded-2xl flex items-center px-4 py-4 border border-white/5 group-focus-within:border-primary/50 transition-all">
                            <Mail size={18} className="text-gray-500 mr-3" />
                            <input 
                                type="email" 
                                placeholder="john@example.com" 
                                className="bg-transparent border-none outline-none text-sm text-white w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Secure Gateway</label>
                        <div className="relative glass-morphism rounded-2xl flex items-center px-4 py-4 border border-white/5 group-focus-within:border-primary/50 transition-all">
                            <Lock size={18} className="text-gray-500 mr-3" />
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="bg-transparent border-none outline-none text-sm text-white w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Confirm Gateway</label>
                        <div className="relative glass-morphism rounded-2xl flex items-center px-4 py-4 border border-white/5 group-focus-within:border-primary/50 transition-all">
                            <Lock size={18} className="text-gray-500 mr-3" />
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="bg-transparent border-none outline-none text-sm text-white w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-5 bg-primary hover:bg-primary-dark text-dark-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/10 disabled:opacity-50 group"
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-dark-dark border-t-transparent rounded-full animate-spin"></div> : <UserPlus size={18} />} CREATE IDENTITY
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                        Already have an identity? 
                        <Link to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'} className="text-primary hover:text-white ml-2 inline-flex items-center gap-1 group transition-colors">
                            Access Login <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
