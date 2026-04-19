import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { MapPin, ArrowRight } from 'lucide-react';

const ShippingPage = () => {
    const { shippingAddress } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth || { userInfo: null });

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=shipping');
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="pt-24 pb-24 px-6 max-w-3xl mx-auto min-h-screen flex flex-col items-center">
            <CheckoutSteps step1 step2 />

            <div className="w-full glass-morphism rounded-3xl border border-white/5 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2 flex items-center gap-3">
                    <MapPin className="text-primary" size={28} /> Shipping <span className="text-primary italic">Address</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-8">Where should we deliver your order?</p>

                <form onSubmit={submitHandler} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2" htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="123 Main St..."
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-dark-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold tracking-wide"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2" htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="City"
                                    value={city}
                                    required
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-dark-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold tracking-wide"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2" htmlFor="postalCode">Postal Code</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    required
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full bg-dark-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold tracking-wide"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2" htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                placeholder="Country"
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-dark-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold tracking-wide"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <button 
                            type="submit"
                            className="w-full py-4 bg-primary hover:bg-primary-dark text-dark-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/10 group"
                        >
                            CONTINUE TO PAYMENT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage;
