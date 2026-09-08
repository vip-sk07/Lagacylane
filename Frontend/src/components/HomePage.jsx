import React, { useRef } from 'react';
import { Trophy, ArrowRight, Sparkles, LogIn, User, Bookmark } from 'lucide-react';
import ThreeScoreHeroCharacter from './ThreeScoreHeroCharacter';
import JourneySelector from './JourneySelector';

export default function HomePage({
  onOpenAuthModal,
  currentUser,
  onEnterRoadmap,
  onSelectSport,
  onSelectJourney,
  activeJourney
}) {
  const selectorRef = useRef(null);
  const userSport = currentUser ? (currentUser.sport || 'football').toLowerCase() : 'football';
  const characterJourney =
    userSport === 'journaler' || userSport === 'life'
      ? { type: 'life', domain: null }
      : { type: 'sports', domain: userSport };

  return (
    <div className="min-h-screen bg-[#0E0D0B] text-[#F5F2EB] flex flex-col font-sans relative overflow-hidden">
      {/* Warm Ambient Archival Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-[#D4AF37]/10 via-[#9C4123]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Navigation Bar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-stone-950 font-black shadow-lg shadow-amber-950/40">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#F5F2EB]">
              LegacyLane
            </h1>
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block -mt-0.5">
              The Living Archive
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-[#171513] border border-[#2C2621] text-xs font-medium flex items-center gap-2 text-[#C2B9A7]">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>{currentUser.name} ({currentUser.sport})</span>
              </div>
              <button
                onClick={onEnterRoadmap}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#E2C799] hover:to-[#D4AF37] text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Open My Archive</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => selectorRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 rounded-xl bg-[#171513] hover:bg-[#1E1B18] text-[#C2B9A7] border border-[#2C2621] font-semibold text-xs hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>Select Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenAuthModal}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#E2C799] hover:to-[#D4AF37] text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Join</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Home Page Body */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-8 flex flex-col items-center justify-center text-center z-10 relative">
        {/* Archival Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E1B18] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wide mb-5 shadow-sm">
          <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>A Sanctuary for Every Chapter & Milestone</span>
        </div>

        {/* Main Editorial Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F2EB] tracking-tight max-w-4xl leading-tight">
          Relive the Matches, Milestones, and Memories that Made You.
        </h2>

        {/* Human-Centered Subtext */}
        <p className="text-xs sm:text-base text-[#C2B9A7] max-w-2xl mt-4 leading-relaxed font-normal">
          Whether on the pitch, court, track, or in personal life, every journey has defining moments. Keep your victories, comebacks, and quiet breakthroughs preserved in an interactive personal timeline.
        </p>

        {/* PRIMARY ENTRY ACTION: TWO-STEP JOURNEY SELECTOR */}
        <div ref={selectorRef} className="w-full mt-10">
          <JourneySelector
            mode="hero"
            activeJourney={activeJourney}
            onSelectJourney={(journey) => {
              if (onSelectJourney) onSelectJourney(journey);
              onEnterRoadmap();
            }}
          />
        </div>

        {/* DYNAMIC 3D SCORE! HERO CHARACTER MODEL */}
        <div className="w-full max-w-3xl mt-8">
          <ThreeScoreHeroCharacter journey={activeJourney || characterJourney} sport={userSport} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#2C2621] py-6 px-6 text-center text-xs text-[#8C8273] z-20 mt-auto bg-[#0E0D0B]/80 backdrop-blur-sm">
        <p>
          <span className="font-serif font-bold text-[#C2B9A7]">LegacyLane</span> • Preserving personal stories and athletic legacies for generations.
        </p>
      </footer>
    </div>
  );
}
