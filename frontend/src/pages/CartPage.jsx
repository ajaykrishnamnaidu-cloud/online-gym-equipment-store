import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Trash2, ArrowRight, Minus, Plus, CreditCard } from 'lucide-react';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    const updateQtyHandler = (item, qty) => {
        dispatch(addToCart({ ...item, qty }));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-12 flex items-center gap-4">
                <ShoppingCart size={32} className="text-primary" /> Shopping <span className="text-primary italic">Bag</span>
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-24 glass-morphism rounded-3xl border border-white/5">
                    <p className="text-gray-400 font-bold uppercase tracking-widest mb-6">Your bag is currently empty.</p>
                    <Link to="/shop" className="px-8 py-4 bg-primary text-dark-dark rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all">
                        EXPLORE COLLECTION
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.product} className="glass-morphism rounded-3xl border border-white/5 p-6 flex flex-col md:flex-row items-center gap-6 group">
                                <Link to={`/product/${item.product}`} className="w-24 h-24 bg-dark-dark/50 rounded-2xl overflow-hidden border border-white/5 p-2 flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-screen" />
                                </Link>
                                
                                <div className="flex-grow text-center md:text-left">
                                    <Link to={`/product/${item.product}`} className="text-lg font-bold text-white uppercase tracking-tighter hover:text-primary transition-colors block mb-1">
                                        {item.name}
                                    </Link>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">₹{item.price}</p>
                                </div>

                                <div className="flex items-center gap-4 bg-dark-dark/50 rounded-2xl p-2 border border-white/5">
                                    <button 
                                        onClick={() => updateQtyHandler(item, Math.max(1, item.qty - 1))}
                                        className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-sm font-black w-6 text-center">{item.qty}</span>
                                    <button 
                                        onClick={() => updateQtyHandler(item, Math.min(item.countInStock, item.qty + 1))}
                                        className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <div className="text-right hidden md:block w-24">
                                    <p className="text-lg font-black text-white italic tracking-tighter">₹{(item.qty * item.price).toFixed(2)}</p>
                                </div>

                                <button 
                                    onClick={() => removeFromCartHandler(item.product)}
                                    className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="glass-morphism rounded-3xl border border-white/5 p-8 sticky top-28">
                            <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest">Order Summary</h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest">SUBTOTAL ({totalItems} ITEMS)</span>
                                    <span className="text-white font-black">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest">ESTIMATED SHIPPING</span>
                                    <span className="text-green-500 font-black uppercase tracking-widest">FREE</span>
                                </div>
                                <div className="border-t border-white/5 pt-4 flex justify-between">
                                    <span className="text-white font-extrabold uppercase tracking-widest">TOTAL</span>
                                    <span className="text-2xl font-black text-primary italic tracking-tighter">₹{subtotal}</span>
                                </div>
                            </div>

                            <button 
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0}
                                className="w-full py-5 bg-primary hover:bg-primary-dark text-dark-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/10 group disabled:opacity-50"
                            >
                                <CreditCard size={18} /> CHECKOUT SECURELY <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-8 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-4 text-gray-500">
                                    <div className="flex gap-2">
                                        <div className="w-8 h-5 bg-white/10 rounded-sm"></div>
                                        <div className="w-8 h-5 bg-white/10 rounded-sm"></div>
                                        <div className="w-8 h-5 bg-white/10 rounded-sm"></div>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">SECURE PAYMENT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
