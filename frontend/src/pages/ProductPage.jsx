import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, createProductReview, resetProductReview } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, ChevronRight, ChevronLeft, Truck, Heart, Share2, Facebook, Twitter, Link2, MessageSquare, Send } from 'lucide-react';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { product, loading, error, successProductReview, loadingProductReview, errorProductReview } = useSelector((state) => state.products);
    const { userInfo } = useSelector((state) => state.auth);
    
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment('');
            dispatch(resetProductReview());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, successProductReview]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview({
            productId: id,
            review: { rating, comment }
        }));
    };

    const addToCartHandler = () => {
        dispatch(addToCart({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty
        }));
        navigate('/cart');
    };

    const addToWishlistHandler = () => {
        dispatch(addToWishlist({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
        }));
    };

    if (loading) return (
        <div className="pt-24 min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="pt-24 min-h-screen flex items-center justify-center p-6">
            <div className="p-8 bg-red-400/10 border border-red-400/20 rounded-3xl text-red-400 text-center font-bold">
                {error}
            </div>
        </div>
    );

    return (
        <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
            <Link to="/shop" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-all mb-8 uppercase tracking-widest">
                <ArrowLeft size={16} /> BACK TO SHOP
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Product Image */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative aspect-square overflow-hidden bg-dark-light/40 border border-white/5 rounded-3xl">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover p-8 mix-blend-screen opacity-90 group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <span className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 block w-fit">
                            {product.category}
                        </span>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-tight">{product.name}</h1>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={16} 
                                        className={`${i < Math.round(product.rating) ? 'text-primary fill-primary' : 'text-gray-600'}`} 
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-400 font-bold tracking-widest uppercase">({product.numReviews} REVIEWS)</span>
                        </div>

                        <p className="text-3xl font-black text-white italic tracking-tighter mb-6">₹{product.price}</p>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">{product.description}</p>
                    </div>

                    <div className="p-8 glass-morphism rounded-3xl border border-white/5 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">STATUS</span>
                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${product.countInStock > 0 ? 'bg-green-500 text-dark-dark' : 'bg-red-500 text-white'}`}>
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">QUANTITY</span>
                                <div className="flex items-center gap-4 bg-dark-dark/50 rounded-2xl p-2 border border-white/5">
                                    <button 
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="text-lg font-black w-8 text-center">{qty}</span>
                                    <button 
                                        onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                        className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className="w-full py-5 bg-primary hover:bg-primary-dark text-dark-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group mb-4"
                        >
                            <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform" /> ADD TO BAG
                        </button>

                        <div className="flex gap-4">
                            <button 
                                onClick={addToWishlistHandler}
                                className="flex-1 py-4 bg-white/5 hover:bg-red-500/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-red-500/20"
                            >
                                <Heart size={16} className="text-red-500" /> Wishlist
                            </button>
                            <button 
                                className="flex-1 py-4 bg-white/5 hover:bg-primary/20 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/5 hover:border-primary/20"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }}
                            >
                                <Share2 size={16} className="text-primary" /> Share
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 group">
                            <ShieldCheck className="text-primary group-hover:scale-110 transition-transform" size={24} />
                            <div>
                                <h4 className="text-xs font-black text-white tracking-widest uppercase">Verified Quality</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">1 YEAR WARRANTY</p>
                            </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 group">
                            <Truck className="text-primary group-hover:scale-110 transition-transform" size={24} />
                            <div>
                                <h4 className="text-xs font-black text-white tracking-widest uppercase">Fast Shipping</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">3-5 BUSINESS DAYS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* REVIEWS SECTION */}
            <div className="mt-24 max-w-4xl">
                <div className="flex items-center gap-4 mb-12">
                    <MessageSquare className="text-primary" size={24} />
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Athlete <span className="text-primary italic">Feedback</span></h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Review List */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">Recent Reviews ({product.reviews?.length || 0})</h3>
                        {product.reviews?.length === 0 ? (
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/5 text-gray-500 font-bold uppercase tracking-widest text-xs">
                                No reviews yet. Be the first to calibrate this gear.
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {product.reviews?.map((review) => (
                                    <div key={review._id} className="p-8 glass-morphism rounded-3xl border border-white/5">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-black text-white uppercase tracking-tighter">{review.name}</span>
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={10} className={`${i < review.rating ? 'text-primary fill-primary' : 'text-gray-700'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{review.comment}</p>
                                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Review Form */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">Write a Review</h3>
                        {userInfo ? (
                            <div className="p-8 glass-morphism rounded-3xl border border-white/5 relative overflow-hidden">
                                {loadingProductReview && (
                                    <div className="absolute inset-0 bg-dark-dark/50 backdrop-blur-sm z-10 flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                
                                {errorProductReview && (
                                    <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 rounded-2xl text-red-500 text-xs font-bold">
                                        {errorProductReview}
                                    </div>
                                )}

                                <form onSubmit={submitHandler} className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Rating</label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setRating(num)}
                                                    className={`w-10 h-10 rounded-xl border transition-all flex items-center justify-center ${rating >= num ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/5 text-gray-600 hover:border-white/20'}`}
                                                >
                                                    <Star size={16} fill={rating >= num ? 'currentColor' : 'none'} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Your Feedback</label>
                                        <textarea
                                            rows="4"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Share your performance experience..."
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-primary transition-all resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loadingProductReview || rating === 0}
                                        className="w-full py-4 bg-primary hover:bg-primary-dark text-dark-dark rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Send size={14} /> SUBMIT FEEDBACK
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/5 text-gray-500 font-bold text-center">
                                Please <Link to="/login" className="text-primary hover:underline">sign in</Link> to write a review.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
