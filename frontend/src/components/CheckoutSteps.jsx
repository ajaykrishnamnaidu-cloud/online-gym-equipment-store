import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="flex justify-center items-center mb-12 flex-wrap gap-2 md:gap-4 w-full">
            {/* Step 1: Sign In */}
            <div className="flex flex-col items-center">
                {step1 ? (
                    <Link to="/login" className="flex items-center text-primary transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-primary text-dark-dark flex items-center justify-center font-black text-sm mb-2 shadow-[0_0_15px_rgba(var(--color-primary),0.5)]">
                            <Check size={16} />
                        </div>
                    </Link>
                ) : (
                    <div className="flex items-center text-gray-500 opacity-50">
                        <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center font-black text-sm mb-2">1</div>
                    </div>
                )}
                <span className={`text-xs font-bold uppercase tracking-widest ${step1 ? 'text-primary' : 'text-gray-500'}`}>Sign In</span>
            </div>

            <div className={`h-[2px] w-12 md:w-24 -mt-6 ${step1 && step2 ? 'bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.5)]' : 'bg-white/10'}`}></div>

            {/* Step 2: Shipping */}
            <div className="flex flex-col items-center">
                {step2 ? (
                    <Link to="/shipping" className="flex items-center text-primary transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-primary text-dark-dark flex items-center justify-center font-black text-sm mb-2 shadow-[0_0_15px_rgba(var(--color-primary),0.5)]">
                            {step3 ? <Check size={16} /> : '2'}
                        </div>
                    </Link>
                ) : (
                    <div className="flex items-center text-gray-500 opacity-50">
                        <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center font-black text-sm mb-2">2</div>
                    </div>
                )}
                <span className={`text-xs font-bold uppercase tracking-widest ${step2 ? 'text-primary' : 'text-gray-500'}`}>Shipping</span>
            </div>

            <div className={`h-[2px] w-12 md:w-24 -mt-6 ${step2 && step3 ? 'bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.5)]' : 'bg-white/10'}`}></div>

            {/* Step 3: Payment */}
            <div className="flex flex-col items-center">
                {step3 ? (
                    <Link to="/payment" className="flex items-center text-primary transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-primary text-dark-dark flex items-center justify-center font-black text-sm mb-2 shadow-[0_0_15px_rgba(var(--color-primary),0.5)]">
                            {step4 ? <Check size={16} /> : '3'}
                        </div>
                    </Link>
                ) : (
                    <div className="flex items-center text-gray-500 opacity-50">
                        <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center font-black text-sm mb-2">3</div>
                    </div>
                )}
                <span className={`text-xs font-bold uppercase tracking-widest ${step3 ? 'text-primary' : 'text-gray-500'}`}>Payment</span>
            </div>

            <div className={`h-[2px] w-12 md:w-24 -mt-6 ${step3 && step4 ? 'bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.5)]' : 'bg-white/10'}`}></div>

            {/* Step 4: Place Order */}
            <div className="flex flex-col items-center">
                {step4 ? (
                    <div className="flex items-center text-primary transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-primary text-dark-dark flex items-center justify-center font-black text-sm mb-2 shadow-[0_0_15px_rgba(var(--color-primary),0.5)]">
                            4
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center text-gray-500 opacity-50">
                        <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center font-black text-sm mb-2">4</div>
                    </div>
                )}
                <span className={`text-xs font-bold uppercase tracking-widest ${step4 ? 'text-primary' : 'text-gray-500'}`}>Review</span>
            </div>
        </div>
    );
};

export default CheckoutSteps;
