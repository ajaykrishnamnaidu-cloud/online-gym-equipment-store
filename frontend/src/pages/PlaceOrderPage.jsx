import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrder } from '../store/slices/orderSlice';
import { clearCart } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { CheckCircle, Truck, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';

const PlaceOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth || { userInfo: null });

    // Ensure state validity
    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=placeorder');
        } else if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [navigate, cart.shippingAddress, cart.paymentMethod, userInfo]);

    const orderCreate = useSelector((state) => state.orders);
    const { order, success, error, loading } = orderCreate || { loading: false, success: false, error: null };

    // Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    const shippingPrice = addDecimals(itemsPrice > 5000 ? 0 : 500); // Sample logic: > 5000 is free shipping
    const taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2))); // Sample logic: 18% tax
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    useEffect(() => {
        if (success) {
            alert('Order placed successfully!');
            dispatch(clearCart());
            dispatch(resetOrder());
            navigate('/profile'); // Redirect to profile or home
        }
    }, [success, navigate, dispatch]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            })
        );
    };

    return (
        <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center">
            <CheckoutSteps step1 step2 step3 step4 />

            <div className="w-full flex flex-col lg:flex-row gap-12 mt-8">
                {/* Order Details Left Side */}
                <div className="lg:w-2/3 space-y-8">
                    
                    {/* Shipping Details */}
                    <div className="glass-morphism rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                            <Truck className="text-primary" size={24} /> Shipping details
                        </h2>
                        <div className="text-gray-400 space-y-2 relative z-10">
                            <p className="font-bold flex items-start gap-2">
                                <span className="text-gray-500 uppercase tracking-widest text-xs mt-1 w-20">Address:</span> 
                                <span className="text-white">
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Payment Method Details */}
                    <div className="glass-morphism rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                            <CreditCard className="text-primary" size={24} /> Payment Method
                        </h2>
                        <div className="text-gray-400 space-y-2 relative z-10">
                            <p className="font-bold flex items-start gap-2">
                                <span className="text-gray-500 uppercase tracking-widest text-xs mt-1 w-20">Method:</span> 
                                <span className="text-white font-black italic tracking-wide">{cart.paymentMethod}</span>
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="glass-morphism rounded-3xl border border-white/5 p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                            <ShoppingBag className="text-primary" size={24} /> Order Items
                        </h2>
                        
                        {cart.cartItems.length === 0 ? (
                            <p className="text-gray-400 font-bold uppercase tracking-widest">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-4 relative z-10">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-6 p-4 rounded-2xl bg-dark-dark/50 border border-white/5 hover:border-white/10 transition-all">
                                        <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5 overflow-hidden flex-shrink-0 p-1">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-screen" />
                                        </div>
                                        <div className="flex-grow">
                                            <Link to={`/product/${item.product}`} className="text-white font-bold uppercase tracking-tighter hover:text-primary transition-colors text-sm block mb-1">
                                                {item.name}
                                            </Link>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Qty: {item.qty}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-white italic tracking-tighter shrink-0">
                                                {item.qty} x ₹{item.price} = <span className="text-primary text-base">₹{(item.qty * item.price).toFixed(2)}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* Order Summary Right Side */}
                <div className="lg:w-1/3">
                    <div className="glass-morphism rounded-3xl border border-white/5 p-8 sticky top-28">
                        <h2 className="text-xl font-bold text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                            <CheckCircle className="text-primary" size={24} /> Order Summary
                        </h2>
                        
                        <div className="space-y-4 mb-8 text-sm">
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-gray-400 font-bold uppercase tracking-widest">Items</span>
                                <span className="text-white font-black">₹{itemsPrice}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-gray-400 font-bold uppercase tracking-widest">Shipping</span>
                                <span className={shippingPrice === '0.00' ? "text-green-500 font-black uppercase tracking-widest" : "text-white font-black"}>
                                    {shippingPrice === '0.00' ? 'FREE' : `₹${shippingPrice}`}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-gray-400 font-bold uppercase tracking-widest">Tax</span>
                                <span className="text-white font-black">₹{taxPrice}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-white font-extrabold uppercase tracking-widest text-lg">Total</span>
                                <span className="text-2xl font-black text-primary italic tracking-tighter shadow-primary">₹{totalPrice}</span>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl mb-6 text-sm font-bold uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}

                        <button 
                            type="button"
                            className="w-full py-5 bg-primary hover:bg-primary-dark text-dark-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/10 group disabled:opacity-50"
                            disabled={cart.cartItems.length === 0 || loading}
                            onClick={placeOrderHandler}
                        >
                            {loading ? 'PROCESSING...' : 'PLACE ORDER'} 
                            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
