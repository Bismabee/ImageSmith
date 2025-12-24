import React, { useState } from 'react';
import { Crown, Lock, CreditCard, X } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, handlePurchase, isDarkMode }) => {
    const [tab, setTab] = useState('india');
    if (!isOpen) return null;
    return (
       <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#1a1a2e] border border-white/10' : 'bg-white'}`}>
             <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-yellow-400 to-amber-600"></div>
             <button onClick={onClose} className="absolute top-4 right-4 opacity-50 hover:opacity-100"><X className="w-6 h-6" /></button>
             <div className="text-center mb-6 mt-2">
                <div className="inline-block p-3 rounded-full bg-yellow-500/10 text-yellow-500 mb-4"><Crown className="w-8 h-8 fill-current" /></div>
                <h2 className="text-2xl font-bold">Unlock God Mode</h2>
                <p className="text-sm opacity-60 mt-2">One-time payment of <span className="font-bold text-lg">$5.00</span></p>
             </div>
             <div className={`flex p-1 rounded-xl mb-6 ${isDarkMode ? 'bg-black/20' : 'bg-gray-100'}`}>
                <button onClick={() => setTab('india')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'india' ? 'bg-white text-black shadow' : 'opacity-50'}`}>🇮🇳 India (UPI)</button>
                <button onClick={() => setTab('global')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'global' ? 'bg-white text-black shadow' : 'opacity-50'}`}>🌍 Global</button>
             </div>
             <div className="space-y-3">
                {tab === 'india' ? (
                   <>
                      <button onClick={handlePurchase} className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold flex items-center justify-center gap-2">Pay via PhonePe / UPI</button>
                      <button onClick={handlePurchase} className="w-full py-3 rounded-xl bg-[#022B9A] hover:bg-[#022B9A]/90 text-white font-bold flex items-center justify-center gap-2">Pay via Razorpay</button>
                   </>
                ) : (
                   <>
                      <button onClick={handlePurchase} className="w-full py-3 rounded-xl bg-[#635BFF] hover:bg-[#635BFF]/90 text-white font-bold flex items-center justify-center gap-2"><CreditCard className="w-4 h-4" /> Pay with Stripe</button>
                      <button onClick={handlePurchase} className="w-full py-3 rounded-xl bg-[#FF4F00] hover:bg-[#FF4F00]/90 text-white font-bold flex items-center justify-center gap-2">🍋 Pay with Lemon Squeezy</button>
                   </>
                )}
             </div>
             <p className="text-center text-xs mt-6 opacity-40 flex items-center justify-center gap-1"><Lock className="w-3 h-3" /> Secure SSL Encrypted Payment</p>
          </div>
       </div>
    );
};

export default PaymentModal;