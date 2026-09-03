import React from 'react';
import { Trophy, ArrowRight, Sparkles, LogIn, User } from 'lucide-react';
import ThreeScoreHeroCharacter from './ThreeScoreHeroCharacter';

export default function HomePage({
  onOpenAuthModal,
  currentUser,
  onEnterRoadmap
}) {
  const userSport = currentUser ? (currentUser.sport || 'football').toLowerCase() : 'football';

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Navigation Bar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              LegacyLane
            </h1>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              The One Who Lives
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span>{currentUser.name} ({currentUser.sport})</span>
              </div>
              <button
                onClick={onEnterRoadmap}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Enter My Ground Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Home Page Body */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-6 flex flex-col items-center justify-center text-center z-10 relative">
        {/* Collaborative Lead Banner */}
        <div className="w-full max-w-2xl mb-6 p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-left">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase border border-emerald-500/30">
              Frontend Lead Notification
            </span>
            <p className="text-slate-200 font-medium">
              <span className="font-black text-emerald-400">Gowtham</span> has pushed the repo into the collaborative as Frontend Lead.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/LegacyLogin.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/30 font-bold text-xs transition-all shadow-md"
            >
              🔑 Legacy Login
            </a>
            <a
              href="/journey-selection.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/30 font-bold text-xs transition-all shadow-md"
            >
              🚀 Journey Selection
            </a>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold mb-4">
          <Sparkles className="w-4 h-4" />
          <span>3D Score! Hero Character & AI Learning Ground Platform</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl leading-tight">
          Talk to Your Younger Self Across Your Sports Ground Journey.
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-3 leading-relaxed font-normal">
          Log victory notes and match images. Your AI Younger Self automatically learns from every update to converse about your past victories!
        </p>

        {/* DYNAMIC 3D SCORE! HERO CHARACTER MODEL */}
        <div className="w-full max-w-3xl mt-6">
          <ThreeScoreHeroCharacter sport={userSport} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-6 px-6 text-center text-xs text-slate-500 z-20 mt-auto">
        <p>
          <span className="font-bold text-slate-400">LegacyLane: The One Who Lives</span> • SQLite Database & 3D Career Ground Platform
        </p>
      </footer>
    </div>
  );
}
