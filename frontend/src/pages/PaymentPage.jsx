import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { CreditCard, ArrowRight, Wallet } from 'lucide-react';

const PaymentPage = () => {
    const { shippingAddress, paymentMethod: currentMethod } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth || { userInfo: null });
    
    const [paymentMethod, setPaymentMethod] = useState(currentMethod || 'PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=payment');
        } else if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="pt-24 pb-24 px-6 max-w-3xl mx-auto min-h-screen flex flex-col items-center">
            <CheckoutSteps step1 step2 step3 />

            <div className="w-full glass-morphism rounded-3xl border border-white/5 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2 flex items-center gap-3">
                    <CreditCard className="text-primary" size={28} /> Payment <span className="text-primary italic">Method</span>
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-8">How would you like to pay?</p>

                <form onSubmit={submitHandler} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <label 
                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'PayPal' ? 'border-primary bg-primary/5' : 'border-white/10 bg-dark-dark/50 hover:border-white/20'}`}
                        >
                            <input
                                type="radio"
                                className="w-5 h-5 accent-primary cursor-pointer"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <div className="flex-grow flex items-center gap-3">
                                <CreditCard className={paymentMethod === 'PayPal' ? 'text-primary' : 'text-gray-400'} size={24} />
                                <span className={`font-black uppercase tracking-widest ${paymentMethod === 'PayPal' ? 'text-white' : 'text-gray-400'}`}>PayPal or Credit Card</span>
                            </div>
                        </label>

                        <label 
                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'Cash on Delivery' ? 'border-primary bg-primary/5' : 'border-white/10 bg-dark-dark/50 hover:border-white/20'}`}
                        >
                            <input
                                type="radio"
                                className="w-5 h-5 accent-primary cursor-pointer"
                                id="Cash on Delivery"
                                name="paymentMethod"
                                value="Cash on Delivery"
                                checked={paymentMethod === 'Cash on Delivery'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <div className="flex-grow flex items-center gap-3">
                                <Wallet className={paymentMethod === 'Cash on Delivery' ? 'text-primary' : 'text-gray-400'} size={24} />
                                <span className={`font-black uppercase tracking-widest ${paymentMethod === 'Cash on Delivery' ? 'text-white' : 'text-gray-400'}`}>Cash on Delivery</span>
                            </div>
                        </label>
                    </div>

                    <div className="pt-6 border-t border-white/5 mt-8">
                        <button 
                            type="submit"
                            className="w-full py-4 bg-primary hover:bg-primary-dark text-dark-dark rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/10 group"
                        >
                            REVIEW ORDER <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
