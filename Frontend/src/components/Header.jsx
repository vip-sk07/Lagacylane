import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Bot, Users, Activity, PlusCircle, LogIn, LogOut, User, Home, ChevronDown } from 'lucide-react';
import { JOURNEY_TYPES } from '../data/journeyConfig';
import { isSportsJourney, getActiveDomainDescriptor } from '../utils/journey';
import JourneySelector from './JourneySelector';

export default function Header({
  activeJourney,
  onJourneyChange,
  activeSport,
  onSportChange,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenAIChat,
  onOpenFollowModal,
  onOpenSentimentModal,
  onOpenAddLevelModal,
  onOpenJourneySelector,
  onGoHome,
  pendingRequestsCount = 1
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isSport = activeJourney ? isSportsJourney(activeJourney) : activeSport !== 'journaler';
  const descriptor = getActiveDomainDescriptor(activeJourney);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (domain) => {
    if (domain === 'journaler' || domain === 'life') {
      if (onJourneyChange) {
        onJourneyChange({ type: JOURNEY_TYPES.LIFE, domain: null });
      } else if (onSportChange) {
        onSportChange('journaler');
      }
    } else {
      if (onJourneyChange) {
        onJourneyChange({ type: JOURNEY_TYPES.SPORTS, domain });
      } else if (onSportChange) {
        onSportChange(domain);
      }
    }
  };

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
          <button
            type="button"
            onClick={onOpenJourneySelector || (() => window.open('/journey-selection.html', '_blank'))}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/30 font-bold text-[11px] transition-all flex items-center gap-1.5"
            title="Open Full Journey Selector"
          >
            <span>🚀</span> Journey Selection
          </button>
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

      {/* Compact Journey & Domain Switcher */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all duration-300 border shadow-lg ${
            !isSport
              ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-slate-900 text-cyan-300 border-cyan-500/50 shadow-cyan-950/40 hover:border-cyan-400'
              : 'bg-gradient-to-r from-emerald-500/20 via-slate-900 to-slate-900 text-emerald-300 border-emerald-500/50 shadow-emerald-950/40 hover:border-emerald-400'
          }`}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          aria-label="Active Journey Switcher"
        >
          <span className="text-base">{descriptor?.icon || '🏆'}</span>
          <div className="text-left leading-tight hidden sm:block">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">
              {isSport ? 'Sport Domain' : 'Journey'}
            </span>
            <span className="font-extrabold text-white text-xs">
              {descriptor?.label || 'Select Domain'}
            </span>
          </div>
          <span className="sm:hidden font-extrabold text-white text-xs">
            {descriptor?.label || 'Select'}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 ml-0.5 text-slate-400 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180 text-white' : ''
            }`}
          />
        </button>

        {/* Dropdown Popover */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 animate-fadeIn">
            <JourneySelector
              mode="compact"
              activeJourney={activeJourney}
              onSelectJourney={(journey) => {
                if (onJourneyChange) onJourneyChange(journey);
                setIsDropdownOpen(false);
              }}
              onClose={() => setIsDropdownOpen(false)}
            />
          </div>
        )}
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
      </div>
    </header>
  );
}
