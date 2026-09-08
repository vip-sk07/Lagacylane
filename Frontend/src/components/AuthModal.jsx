import React, { useState } from 'react';
import { X, User, Lock, Mail, Trophy, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { API_BASE_URL } from '../utils/api';

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('Athlete');
  const [sportType, setSportType] = useState('football');
  const [position, setPosition] = useState('Central Attacking Midfielder (#10)');
  const [teamHistory, setTeamHistory] = useState('Legacy Lane Academy XI');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const googleUserEmail = email || 'karan.sharma.athlete@gmail.com';
      const googleUserName = name || 'Karan Sharma';

      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: googleUserEmail,
          name: googleUserName,
          sportType,
          position,
          teamHistory
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Google Authentication failed.');
        setLoading(false);
        return;
      }

      onAuthSuccess(data.user);
      onClose();
    } catch (err) {
      setError('Cannot connect to Google Authentication service.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Login failed.');
          setLoading(false);
          return;
        }

        onAuthSuccess(data.user);
        onClose();
      } else {
        const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            profileType,
            sportType,
            position,
            teamHistory
          })
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Account creation failed.');
          setLoading(false);
          return;
        }

        onAuthSuccess(data.user);
        onClose();
      }
    } catch (err) {
      setError('Cannot connect to database backend API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E0D0B]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md archival-panel rounded-3xl border border-[#2C2621] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-[#171513] border-b border-[#2C2621] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-stone-950 font-bold shadow-lg shadow-amber-950/30">
              <Trophy className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#F5F2EB]">
                {isLogin ? 'Welcome to LegacyLane' : 'Begin Your Archive'}
              </h3>
              <p className="text-xs text-[#8C8273]">
                {isLogin
                  ? 'Sign in to access your personal timeline & memories'
                  : 'Create an account to preserve your life & sports journey'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1E1B18] hover:bg-[#2C2621] text-[#8C8273] hover:text-white transition-all border border-[#2C2621]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#2C2621] bg-[#0E0D0B] p-1.5 gap-1.5">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
              isLogin ? 'bg-[#1E1B18] text-[#D4AF37] border border-[#D4AF37]/30 shadow-sm' : 'text-[#8C8273] hover:text-[#F5F2EB]'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
              !isLogin ? 'bg-[#1E1B18] text-[#D4AF37] border border-[#D4AF37]/30 shadow-sm' : 'text-[#8C8273] hover:text-[#F5F2EB]'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 max-h-[75vh]">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* GOOGLE SIGN-IN BUTTON */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1E1B18] hover:bg-[#2C2621] text-[#F5F2EB] font-semibold text-xs border border-[#2C2621] shadow-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.01]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#2C2621]"></div>
            <span className="flex-shrink mx-4 text-[#8C8273] text-[10px] uppercase font-semibold tracking-wider">or with email</span>
            <div className="flex-grow border-t border-[#2C2621]"></div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-[#C2B9A7] uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C8273] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0E0D0B] border border-[#2C2621] text-xs text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#C2B9A7] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C8273] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0E0D0B] border border-[#2C2621] text-xs text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#C2B9A7] uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C8273] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0E0D0B] border border-[#2C2621] text-xs text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-3 pt-2 border-t border-[#2C2621]">
              <div>
                <label className="block text-xs font-semibold text-[#C2B9A7] uppercase tracking-wider mb-1">
                  Primary Domain
                </label>
                <select
                  value={sportType}
                  onChange={(e) => setSportType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E0D0B] border border-[#2C2621] text-xs text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="football">Football</option>
                  <option value="cricket">Cricket</option>
                  <option value="basketball">Basketball</option>
                  <option value="athletics">Athletics</option>
                  <option value="journaler">Personal Life Journal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C2B9A7] uppercase tracking-wider mb-1">
                  Position / Role
                </label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Midfielder (#10) or Writer"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E0D0B] border border-[#2C2621] text-xs text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C2B9A7] uppercase tracking-wider mb-1">
                  Team / Club / Organization
                </label>
                <input
                  type="text"
                  value={teamHistory}
                  onChange={(e) => setTeamHistory(e.target.value)}
                  placeholder="e.g. City FC Academy"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0E0D0B] border border-[#2C2621] text-xs text-[#F5F2EB] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#2C2621] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#171513] hover:bg-[#1E1B18] text-[#C2B9A7] font-semibold text-xs border border-[#2C2621]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#E2C799] hover:to-[#D4AF37] text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isLogin ? 'Enter Your Archive' : 'Create Account'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
