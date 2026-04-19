import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const addToCartHandler = (item) => {
        dispatch(addToCart({ ...item, qty: 1 }));
        dispatch(removeFromWishlist(item.product));
    };

    return (
        <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-12 flex items-center gap-4">
                <Heart size={32} className="text-red-500 fill-red-500" /> My <span className="text-primary italic">Wishlist</span>
            </h1>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-24 glass-morphism rounded-3xl border border-white/5">
                    <p className="text-gray-400 font-bold uppercase tracking-widest mb-6">Your wishlist is empty.</p>
                    <Link to="/shop" className="px-8 py-4 bg-primary text-dark-dark rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all">
                        EXPLORE COLLECTION
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wishlistItems.map((item) => (
                        <div key={item.product} className="glass-morphism rounded-3xl border border-white/5 overflow-hidden group">
                            <div className="relative aspect-square bg-dark-dark/50">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <button 
                                    onClick={() => removeFromWishlistHandler(item.product)}
                                    className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">{item.name}</h3>
                                <p className="text-primary font-black text-xl mb-6 italic">₹{item.price}</p>
                                <button 
                                    onClick={() => addToCartHandler(item)}
                                    className="w-full py-4 bg-white/5 hover:bg-primary hover:text-dark-dark text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/5"
                                >
                                    <ShoppingCart size={16} /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
