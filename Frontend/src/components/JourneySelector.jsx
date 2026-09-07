import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Activity, 
  ChevronRight,
  Compass
} from 'lucide-react';
import { JOURNEY_TYPES, SPORT_DOMAINS, LIFE_DOMAIN } from '../data/journeyConfig';
import { isSportsJourney } from '../utils/journey';

export default function JourneySelector({
  onSelectJourney,
  activeJourney,
  mode = 'hero', // 'hero' | 'modal' | 'compact'
  onClose
}) {
  // If mode is hero or modal: step 1 is Life vs Sports, step 2 is Sport Domain grid
  // If user opens selector with sports already selected, start on step 1 or allow step 2
  const [step, setStep] = useState(1);
  const containerRef = useRef(null);

  const isCurrentSports = isSportsJourney(activeJourney);
  const currentDomain = activeJourney?.domain;

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (step === 2 && mode !== 'compact') {
          setStep(1);
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, mode, onClose]);

  const handleSelectLife = () => {
    onSelectJourney({ type: JOURNEY_TYPES.LIFE, domain: null });
    if (onClose) onClose();
  };

  const handleSelectSportDomain = (domainId) => {
    onSelectJourney({ type: JOURNEY_TYPES.SPORTS, domain: domainId });
    if (onClose) onClose();
  };

  // -------------------------------------------------------------
  // COMPACT DROPDOWN MODE (for Header)
  // -------------------------------------------------------------
  if (mode === 'compact') {
    return (
      <div 
        ref={containerRef}
        className="w-72 glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-3 text-left animate-fadeIn z-50 overflow-hidden"
        role="menu"
        aria-label="Journey Switcher"
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            Switch Journey & Domain
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
            1-Click Swap
          </span>
        </div>

        {/* STRICT ISOLATION: When in Life Mode, NO sports domains are shown */}
        {!isCurrentSports ? (
          <div className="space-y-2.5">
            <div className="p-2.5 rounded-xl border border-cyan-500/60 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-md shadow-cyan-950/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{LIFE_DOMAIN.icon}</span>
                  <div>
                    <p className="text-xs font-bold leading-none text-white">{LIFE_DOMAIN.label}</p>
                    <p className="text-[10px] text-cyan-300 font-medium mt-0.5">Isolated Life Sanctuary</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 px-1 italic">
              Life mode active: all athletic sport domains are hidden for sanctuary focus.
            </p>
          </div>
        ) : (
          /* STRICT ISOLATION: When in Sports Mode, NO life domain is shown */
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 py-1">
              Active Sport Grounds (Isolated)
            </p>
            <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {SPORT_DOMAINS.map((domain) => {
                const isSelected = isCurrentSports && currentDomain === domain.id;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => handleSelectSportDomain(domain.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                      isSelected
                        ? `bg-slate-900 border-emerald-500/70 text-emerald-300 shadow-sm`
                        : `bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:border-slate-700`
                    }`}
                    role="menuitem"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{domain.icon}</span>
                      <span className="truncate">{domain.label}</span>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{domain.id}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // HERO OR MODAL CONTENT
  // -------------------------------------------------------------
  const content = (
    <div 
      ref={containerRef}
      className={`w-full max-w-4xl mx-auto transition-all duration-300 ${
        mode === 'modal'
          ? 'glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative'
          : 'my-6'
      }`}
      role="region"
      aria-label="Interactive Journey Selector"
    >
      {/* Modal Close Button */}
      {mode === 'modal' && onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all z-20"
          aria-label="Close Selector"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* STEP 1: Big Life vs Sports Choice */}
      {step === 1 && (
        <div className="animate-fadeIn space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Step 1: Choose Your Archive Horizon</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Select Your Journey Path
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Immortalize your athletic glory on 3D championship pitches, or chronicle milestones in your life memory galaxy.
            </p>
          </div>

          {/* Two Large Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Card 1: Personal Life */}
            <div
              tabIndex={0}
              role="button"
              onClick={handleSelectLife}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelectLife()}
              className={`group relative p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between text-left focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                !isCurrentSports
                  ? 'bg-gradient-to-b from-cyan-950/40 via-slate-900/90 to-slate-950 border-cyan-500/80 shadow-xl shadow-cyan-950/50 scale-[1.01]'
                  : 'bg-slate-900/70 border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-900/90'
              }`}
            >
              {/* Glow backdrop */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-cyan-500/15 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all flex items-center justify-center text-slate-950">
                    <BookOpen className="w-7 h-7 text-slate-950" />
                  </div>
                  <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    Life Chronicle
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                    Personal Life Journey
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Chronicle code launches, graduation milestones, family memories, and mental wellness curves across an evolving 3D cyan galaxy.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-bold text-slate-400">
                    📖 Milestones
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-bold text-slate-400">
                    🤖 AI Younger Self
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-bold text-slate-400">
                    🌌 Cyber Horizon
                  </span>
                </div>
              </div>

              <div className="pt-6 relative z-10 flex items-center justify-between border-t border-slate-800/80 mt-6">
                <span className="text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  <span>Enter Life Galaxy</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
                {!isCurrentSports && (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Card 2: Athletic Career */}
            <div
              tabIndex={0}
              role="button"
              onClick={() => setStep(2)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setStep(2)}
              className={`group relative p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                isCurrentSports
                  ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900/90 to-slate-950 border-emerald-500/80 shadow-xl shadow-emerald-950/50 scale-[1.01]'
                  : 'bg-slate-900/70 border-slate-800/90 hover:border-emerald-500/50 hover:bg-slate-900/90'
              }`}
            >
              {/* Glow backdrop */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-emerald-500/15 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all flex items-center justify-center text-slate-950">
                    <Trophy className="w-7 h-7 text-slate-950" />
                  </div>
                  <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    Athletic Ground
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
                    Athletic Career Journey
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Track match scores, trial debuts, championship rings, and tactical roadmaps across realistic 3D pitches and stadium floodlights.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-bold text-slate-400">
                    ⚽ Multi-Sport
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-bold text-slate-400">
                    🏆 3D Score! Hero
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-bold text-slate-400">
                    🏟️ Stadium Grounds
                  </span>
                </div>
              </div>

              <div className="pt-6 relative z-10 flex items-center justify-between border-t border-slate-800/80 mt-6">
                <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  <span>Select Sport Domain ({SPORT_DOMAINS.length} Available)</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
                {isCurrentSports && (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Active ({currentDomain})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Sport Domain Grid */}
      {step === 2 && (
        <div className="animate-fadeIn space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journey Types</span>
            </button>

            <div className="text-center sm:text-right">
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                Step 2 of 2
              </span>
              <h3 className="text-lg font-black text-white">
                Choose Your Sport Arena
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPORT_DOMAINS.map((domain) => {
              const isSelected = isCurrentSports && currentDomain === domain.id;
              return (
                <div
                  key={domain.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleSelectSportDomain(domain.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelectSportDomain(domain.id)}
                  className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between text-left focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  {/* Subtle color glow */}
                  <div
                    className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: domain.theme.primary }}
                  />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                        {domain.icon}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Active
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                        {domain.label}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {domain.id === 'football'
                          ? 'Pitch strip & penalty box'
                          : domain.id === 'cricket'
                          ? 'Oval outfield & center pitch'
                          : domain.id === 'basketball'
                          ? 'Hardwood court & key'
                          : domain.id === 'athletics'
                          ? 'Running track & sprint lanes'
                          : 'Dynamic 3D Arena'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                      <span>Launch Ground</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: domain.theme.primary }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  if (mode === 'modal') {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {content}
      </div>
    );
  }

  return content;
}
