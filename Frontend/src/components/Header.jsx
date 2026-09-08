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
    <header className="sticky top-0 z-40 w-full archival-panel border-b border-[#2C2621] px-4 md:px-8 py-3.5 flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Home Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="p-2.5 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-stone-950 font-bold shadow-lg shadow-amber-950/30 hover:scale-105 transition-all"
            title="Back to Home Page"
          >
            <Home className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1
                onClick={onGoHome}
                className="font-serif text-xl font-bold tracking-tight text-[#F5F2EB] cursor-pointer hover:text-[#D4AF37] transition-colors"
              >
                LegacyLane
              </h1>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#1E1B18] text-[#D4AF37] font-semibold border border-[#D4AF37]/30">
                Living Archive
              </span>
            </div>
            <p className="text-[11px] text-[#8C8273] font-normal">
              Chronological Roadmap & Milestone Keepsake
            </p>
          </div>
        </div>

        {/* Compact Journey & Domain Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-medium transition-all duration-300 border bg-[#171513] text-[#F5F2EB] border-[#2C2621] shadow-lg hover:border-[#D4AF37]/50"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            aria-label="Active Journey Switcher"
          >
            <span className="text-base">{descriptor?.icon || '🏆'}</span>
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[9px] uppercase font-bold text-[#8C8273] block tracking-wider">
                {isSport ? 'Sport Domain' : 'Journey'}
              </span>
              <span className="font-bold text-[#F5F2EB] text-xs">
                {descriptor?.label || 'Select Domain'}
              </span>
            </div>
            <span className="sm:hidden font-bold text-[#F5F2EB] text-xs">
              {descriptor?.label || 'Select'}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 ml-0.5 text-[#8C8273] transition-transform duration-200 ${
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
          {/* Record New Memory Button */}
          <button
            onClick={onOpenAddLevelModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#E2C799] hover:to-[#D4AF37] text-stone-950 font-bold text-xs shadow-md shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Record Memory</span>
          </button>

          {/* Reflections / Dialogue Button */}
          <button
            onClick={onOpenAIChat}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#171513] hover:bg-[#1E1B18] text-amber-200/90 border border-amber-900/30 text-xs font-medium shadow-sm hover:scale-105 active:scale-95 transition-all"
            title="Reflect with Past Era Memories"
          >
            <Bot className="w-4 h-4 text-[#D4AF37]" />
            <span className="hidden sm:inline">Reflections</span>
          </button>

          {/* Emotional Journey Analytics */}
          <button
            onClick={onOpenSentimentModal}
            className="p-2.5 rounded-xl bg-[#171513] hover:bg-[#1E1B18] text-[#C2B9A7] border border-[#2C2621] text-xs font-semibold hover:text-[#D4AF37] transition-all"
            title="Emotional Journey & Growth"
          >
            <Activity className="w-4 h-4 text-[#D4AF37]" />
          </button>

          {/* Multi-User Follow Connections */}
          <button
            onClick={onOpenFollowModal}
            className="relative p-2.5 rounded-xl bg-[#171513] hover:bg-[#1E1B18] text-[#C2B9A7] border border-[#2C2621] text-xs font-semibold hover:text-[#D4AF37] transition-all"
            title="Family & Teammates Circle"
          >
            <Users className="w-4 h-4 text-[#D4AF37]" />
            {pendingRequestsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9C4123] text-white font-bold text-[9px] flex items-center justify-center border-2 border-[#0E0D0B] shadow-sm">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          {/* User Account Login / Profile Button */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-[#2C2621]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#171513] border border-[#2C2621] text-xs text-[#C2B9A7]">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold text-[#F5F2EB] max-w-[100px] truncate">{currentUser.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-[#171513] hover:bg-red-950/40 text-[#8C8273] hover:text-red-300 border border-[#2C2621] transition-all"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E1B18] hover:bg-[#2C2621] border border-[#D4AF37]/30 text-[#F5F2EB] font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <LogIn className="w-4 h-4 text-[#D4AF37]" />
              <span>Sign In / Join</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
