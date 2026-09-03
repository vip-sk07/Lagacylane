import React from 'react';
import { Trophy, Bot, Users, Activity, PlusCircle, LogIn, LogOut, User, Home } from 'lucide-react';
import { ATHLETE_PROFILES } from '../data/mockData';

export default function Header({
  activeSport,
  onSportChange,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenAIChat,
  onOpenFollowModal,
  onOpenSentimentModal,
  onOpenAddLevelModal,
  onGoHome,
  pendingRequestsCount = 1
}) {
  const currentProfile = ATHLETE_PROFILES[activeSport] || ATHLETE_PROFILES.football;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 md:px-8 py-3 flex flex-col gap-2">
      {/* Collaborative Lead Notification Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-950/80 via-blue-950/80 to-purple-950/80 border border-emerald-500/30 rounded-xl px-3.5 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px] uppercase tracking-wider border border-emerald-400/30">
            Frontend Lead Update
          </span>
          <p className="text-slate-200 font-semibold">
            <span className="text-emerald-400 font-bold">Gowtham</span> has pushed the repository into the collaborative workspace!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/LegacyLogin.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] transition-all"
          >
            🔑 Legacy Login
          </a>
          <a
            href="/journey-selection.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/30 font-bold text-[11px] transition-all"
          >
            🚀 Journey Selection
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Home Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
            title="Back to Home Page"
          >
            <Home className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1
                onClick={onGoHome}
                className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent cursor-pointer"
              >
                LegacyLane
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700">
                The One Who Lives
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              3D Chronological Ground Roadmap & AI Younger Self
            </p>
          </div>
        </div>

      {/* Dynamic Role / Sport Switcher */}
      <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800/80 shadow-inner overflow-x-auto">
        <button
          onClick={() => onSportChange('football')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeSport === 'football'
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 shadow-md shadow-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>⚽</span>
          <span>Football Pitch</span>
        </button>

        <button
          onClick={() => onSportChange('cricket')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeSport === 'cricket'
              ? 'bg-gradient-to-r from-green-500 to-lime-600 text-slate-950 shadow-md shadow-lime-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>🏏</span>
          <span>Cricket Ground</span>
        </button>

        <button
          onClick={() => onSportChange('basketball')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeSport === 'basketball'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>🏀</span>
          <span>Basketball Court</span>
        </button>

        <button
          onClick={() => onSportChange('journaler')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            activeSport === 'journaler'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span>📖</span>
          <span>Life Galaxy</span>
        </button>
      </div>

      {/* Action Controls & User Auth */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Log New Level Button */}
        <button
          onClick={onOpenAddLevelModal}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Add Level Node</span>
        </button>

        {/* AI Younger Self Chat Button */}
        <button
          onClick={onOpenAIChat}
          className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-xs font-semibold shadow-lg shadow-purple-950/40 hover:scale-105 active:scale-95 transition-all"
        >
          <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="hidden sm:inline">AI Younger Self</span>
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
        </button>

        {/* Sentiment Analytics */}
        <button
          onClick={onOpenSentimentModal}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold hover:text-emerald-400 transition-all"
          title="Mental Wellness & Sentiment"
        >
          <Activity className="w-4 h-4 text-emerald-400" />
        </button>

        {/* Multi-User Follow Connections */}
        <button
          onClick={onOpenFollowModal}
          className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold hover:text-blue-400 transition-all"
          title="Connections & Follow Requests"
        >
          <Users className="w-4 h-4 text-blue-400" />
          {pendingRequestsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-black text-[10px] flex items-center justify-center border-2 border-slate-950 shadow-md">
              {pendingRequestsCount}
            </span>
          )}
        </button>

        {/* User Account Login / Profile Button */}
        {currentUser ? (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <User className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white max-w-[100px] truncate">{currentUser.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-800 transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-950/40 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}
