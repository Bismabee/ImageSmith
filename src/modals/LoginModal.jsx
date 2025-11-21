import React, { useState } from 'react';
import { Sparkles, Mail, ArrowLeft, X } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, handleLogin, isDarkMode }) => {
    const [authMethod, setAuthMethod] = useState('menu');
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
       e.preventDefault();
       setIsLoading(true);
       setTimeout(() => { setIsLoading(false); handleLogin('email'); }, 1500);
    };

    return (
       <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl relative overflow-hidden ${isDarkMode ? 'bg-[#1a1a2e] border border-white/10' : 'bg-white'}`}>
             <div className="flex justify-between items-center mb-6">
                {authMethod === 'email' ? (<button onClick={() => setAuthMethod('menu')} className="p-2 rounded-full hover:bg-gray-500/10 transition-colors"><ArrowLeft className="w-5 h-5" /></button>) : (<div className="w-9" />)}
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-500/10 transition-colors"><X className="w-5 h-5" /></button>
             </div>
             <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-violet-500 mb-4 shadow-lg shadow-pink-500/30"><Sparkles className="w-6 h-6 text-white" /></div>
                <h2 className="text-2xl font-bold mb-2">{authMethod === 'menu' ? 'Unlock Potential' : (isSignUp ? 'Create Account' : 'Welcome Back')}</h2>
                <p className="text-sm opacity-60">{authMethod === 'menu' ? 'Save your workflow and access God Mode.' : (isSignUp ? 'Enter your details to get started.' : 'Enter your credentials to continue.')}</p>
             </div>
             {authMethod === 'menu' ? (
                <div className="space-y-3 animate-in slide-in-from-right-4 duration-300">
                   <button onClick={() => handleLogin('google')} className={`w-full py-3.5 rounded-xl border font-medium flex items-center justify-center gap-3 transition-all group ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>Continue with Google</button>
                   <button onClick={() => setAuthMethod('email')} className={`w-full py-3.5 rounded-xl border font-medium flex items-center justify-center gap-3 transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}><Mail className="w-5 h-5" /> Continue with Email</button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                   <div className="space-y-1"><label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1">Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-3 rounded-xl outline-none border transition-all focus:border-pink-500 ${isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="you@example.com" /></div>
                   <div className="space-y-1"><label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1">Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-3 rounded-xl outline-none border transition-all focus:border-pink-500 ${isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`} placeholder="••••••••" /></div>
                   <button type="submit" disabled={isLoading} className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70">{isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (isSignUp ? 'Create Account' : 'Sign In')}</button>
                   <div className="text-center mt-4"><button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-sm font-medium hover:text-pink-500 transition-colors opacity-70 hover:opacity-100">{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</button></div>
                </form>
             )}
          </div>
       </div>
    );
};

export default LoginModal;