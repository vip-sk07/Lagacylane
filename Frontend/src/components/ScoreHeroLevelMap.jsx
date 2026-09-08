import React from 'react';
import {
  Star,
  Lock,
  Play,
  Trophy,
  Calendar,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Award,
  Zap,
  Flag,
  MapPin,
  PlusCircle,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ChronologicalTimeline from './ChronologicalTimeline';
import { SPORT_DOMAINS, JOURNEY_TYPES } from '../data/journeyConfig';
import { isSportsJourney } from '../utils/journey';

export default function ScoreHeroLevelMap({
  profile,
  onSelectLevel,
  onAddLevelClick,
  activeJourney,
  allProfiles,
  onJourneyChange,
  onOpenAIChatForEra
}) {
  // If in Life Journey, render the dedicated Chronological Timeline
  if (!isSportsJourney(activeJourney)) {
    return (
      <ChronologicalTimeline
        profile={profile}
        onSelectLevel={onSelectLevel}
        onAddLevelClick={onAddLevelClick}
        onOpenAIChatForEra={onOpenAIChatForEra}
      />
    );
  }

  const activeDomainId = activeJourney?.domain || 'football';

  // Filter levels matching the active domain
  const filteredLevels = (profile?.levels || []).filter(
    (l) =>
      (!l.journeyType || l.journeyType === JOURNEY_TYPES.SPORTS) &&
      (!l.domain || l.domain === activeDomainId)
  );

  const handleNodeClick = (level) => {
    if (level.status === 'locked') return;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });

    if (onSelectLevel) onSelectLevel(level);
  };

  const getSportRoadColor = () => {
    if (profile?.sport === 'Football' || activeDomainId === 'football')
      return { border: '#2D6A4F', center: '#52B788', fill: 'rgba(45, 106, 79, 0.18)' };
    if (profile?.sport === 'Cricket' || activeDomainId === 'cricket')
      return { border: '#D4AF37', center: '#F3D068', fill: 'rgba(212, 175, 55, 0.18)' };
    if (profile?.sport === 'Basketball' || activeDomainId === 'basketball')
      return { border: '#C05621', center: '#EA580C', fill: 'rgba(192, 86, 33, 0.18)' };
    if (profile?.sport === 'Athletics' || activeDomainId === 'athletics')
      return { border: '#9C2A2A', center: '#C53030', fill: 'rgba(156, 42, 42, 0.18)' };
    return { border: '#D4AF37', center: '#F3D068', fill: 'rgba(212, 175, 55, 0.18)' };
  };

  const roadColors = getSportRoadColor();

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] px-4 py-8 max-w-6xl mx-auto flex flex-col items-center">
      {/* Athlete Bio & Stats Banner */}
      <div className="w-full mb-8 archival-panel rounded-3xl p-6 border border-[#2C2621] shadow-2xl relative overflow-hidden">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: profile?.theme?.glow || 'rgba(212, 175, 55, 0.25)' }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                profile?.theme?.accentClass || 'from-amber-700 to-stone-900'
              } p-1 shadow-xl flex items-center justify-center text-stone-950 font-black text-2xl border border-[#D4AF37]/30`}
            >
              <div className="w-full h-full rounded-xl bg-[#0E0D0B]/40 backdrop-blur-sm flex items-center justify-center text-white">
                {activeDomainId === 'football'
                  ? '⚽'
                  : activeDomainId === 'cricket'
                  ? '🏏'
                  : activeDomainId === 'basketball'
                  ? '🏀'
                  : activeDomainId === 'athletics'
                  ? '🏃'
                  : '🏆'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl font-bold text-[#F5F2EB] tracking-tight">{profile?.name || 'Athlete'}</h2>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    profile?.theme?.badge || 'bg-[#1E1B18] text-[#D4AF37] border-[#D4AF37]/30'
                  }`}
                >
                  {profile?.position}
                </span>
              </div>
              <p className="text-xs text-[#8C8273] font-medium mt-0.5">
                {profile?.team} • {profile?.sport} Journey Timeline
              </p>
            </div>
          </div>

          {/* Key Stats Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {activeDomainId === 'football' && profile?.stats && (
              <>
                <div className="bg-[#171513] border border-[#2C2621] px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-[#8C8273] uppercase tracking-wider font-bold block">Goals</span>
                  <span className="font-serif text-lg font-bold text-[#D4AF37]">{profile.stats.goals}</span>
                </div>
                <div className="bg-[#171513] border border-[#2C2621] px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-[#8C8273] uppercase tracking-wider font-bold block">Assists</span>
                  <span className="font-serif text-lg font-bold text-[#C2B9A7]">{profile.stats.assists}</span>
                </div>
                <div className="bg-[#171513] border border-[#2C2621] px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-[#8C8273] uppercase tracking-wider font-bold block">Rating</span>
                  <span className="font-serif text-lg font-bold text-[#D4AF37]">{profile.stats.careerRating}</span>
                </div>
              </>
            )}

            {activeDomainId === 'cricket' && profile?.stats && (
              <>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Wickets</span>
                  <span className="text-lg font-black text-lime-400">{profile.stats.wickets}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Runs</span>
                  <span className="text-lg font-black text-lime-300">{profile.stats.runs}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">High Score</span>
                  <span className="text-lg font-black text-amber-400">{profile.stats.highestScore}</span>
                </div>
              </>
            )}

            {activeDomainId === 'basketball' && profile?.stats && (
              <>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">PPG</span>
                  <span className="text-lg font-black text-amber-400">{profile.stats.ppg}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">APG</span>
                  <span className="text-lg font-black text-amber-300">{profile.stats.apg}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Rating</span>
                  <span className="text-lg font-black text-amber-400">{profile.stats.careerRating}</span>
                </div>
              </>
            )}

            {activeDomainId === 'athletics' && profile?.stats && (
              <>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Races</span>
                  <span className="text-lg font-black text-pink-400">{profile.stats.races}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">PB</span>
                  <span className="text-lg font-black text-rose-300">{profile.stats.personalBest}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Golds</span>
                  <span className="text-lg font-black text-amber-400">{profile.stats.golds}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightweight Domain-Switch Tab Strip (In-Roadmap View) */}
      <div className="w-full mb-8 flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-md shadow-xl overflow-x-auto max-w-full">
          {SPORT_DOMAINS.map((domain) => {
            const isActive = activeDomainId === domain.id;
            const domainLevelCount =
              allProfiles?.sports?.[domain.id]?.levels?.length ??
              (domain.id === activeDomainId ? filteredLevels.length : 0);

            return (
              <button
                key={domain.id}
                onClick={() => {
                  if (onJourneyChange) {
                    onJourneyChange({
                      type: JOURNEY_TYPES.SPORTS,
                      domain: domain.id
                    });
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-md border'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
                style={isActive ? { borderColor: domain.theme.primary } : {}}
              >
                <span className="text-sm">{domain.icon}</span>
                <span>{domain.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-white/10 text-white' : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  {domainLevelCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Score! Hero Ground Winding Road Map Container */}
      <div className="relative w-full max-w-4xl py-6 flex flex-col items-center">
        {/* Title Header */}
        <div className="text-center mb-12">
          <span
            className="text-xs font-black tracking-widest uppercase px-3.5 py-1 rounded-full border flex items-center justify-center gap-1.5 w-fit mx-auto"
            style={{
              color: roadColors.border,
              backgroundColor: roadColors.fill,
              borderColor: `${roadColors.border}40`
            }}
          >
            <MapPin className="w-3.5 h-3.5" />
            {profile?.sport || 'Sports'} Career Timeline
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#F5F2EB] mt-2">
            Milestones & Career Roadmap
          </h3>
          <p className="text-xs text-[#8C8273] max-w-md mx-auto mt-1">
            Trace your journey through every match, milestone, and hard-earned victory.
          </p>
        </div>

        {/* Winding Road Container */}
        <div className="relative w-full flex flex-col items-center gap-24 py-6">
          {/* SVG Textured 3D Winding Road Surface */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))' }}
          >
            <defs>
              <linearGradient id="roadGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={roadColors.border} />
                <stop offset="50%" stopColor={roadColors.center} />
                <stop offset="100%" stopColor={roadColors.border} />
              </linearGradient>

              {/* Asphalt Road Pattern */}
              <pattern id="roadAsphaltPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#141210" />
                <circle cx="5" cy="5" r="1" fill="#24201C" />
                <circle cx="15" cy="15" r="1" fill="#312B24" />
              </pattern>
            </defs>

            {/* Layer 1: Wide Outer Road Bed */}
            <path
              d="M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300"
              fill="none"
              stroke="#0E0D0B"
              strokeWidth="68"
              strokeLinecap="round"
            />

            {/* Layer 2: Surface */}
            <path
              d="M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300"
              fill="none"
              stroke="url(#roadAsphaltPattern)"
              strokeWidth="56"
              strokeLinecap="round"
            />

            {/* Layer 3: Road Curbs */}
            <path
              d="M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300"
              fill="none"
              stroke="url(#roadGlowGradient)"
              strokeWidth="50"
              strokeLinecap="round"
              opacity="0.25"
            />

            <path
              d="M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300"
              fill="none"
              stroke={roadColors.border}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Layer 4: Center Dashed Lane Divider Line */}
            <path
              d="M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2.5"
              strokeDasharray="14 14"
              opacity="0.75"
            />
          </svg>

          {/* Level Nodes Mapping along the Road */}
          {filteredLevels.length === 0 ? (
            <div className="relative z-10 w-full max-w-md p-8 archival-panel rounded-3xl border border-[#2C2621] text-center my-12 flex flex-col items-center animate-fadeIn shadow-2xl">
              <div
                className="w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl mb-4 shadow-lg"
                style={{
                  backgroundColor: roadColors.fill,
                  borderColor: `${roadColors.border}40`,
                  boxShadow: `0 10px 25px ${roadColors.fill}`
                }}
              >
                {activeDomainId === 'football'
                  ? '⚽'
                  : activeDomainId === 'cricket'
                  ? '🏏'
                  : activeDomainId === 'basketball'
                  ? '🏀'
                  : activeDomainId === 'athletics'
                  ? '🏃'
                  : '🏆'}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5F2EB]">
                Start Your {profile?.sport || 'Career'} Journey
              </h3>
              <p className="text-xs text-[#8C8273] mt-2 max-w-xs leading-relaxed font-normal">
                No milestones recorded yet. Preserve your first match victory, personal record, or career memory to begin your timeline!
              </p>
              <button
                type="button"
                onClick={onAddLevelClick}
                className="mt-6 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Record First Memory</span>
              </button>
            </div>
          ) : (
            filteredLevels.map((level, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={level.id || idx}
                  className={`relative z-10 flex items-center justify-between w-full max-w-2xl px-4 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Level Details Card */}
                  <div
                    onClick={() => handleNodeClick(level)}
                    className={`w-80 p-5 rounded-3xl archival-card cursor-pointer group relative overflow-hidden transition-all duration-300 ${
                      level.status === 'locked'
                        ? 'opacity-60 grayscale cursor-not-allowed border-[#2C2621]'
                        : level.status === 'current'
                        ? 'border-2 border-[#D4AF37] shadow-2xl shadow-amber-950/40 scale-[1.02]'
                        : 'border-[#2C2621] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {/* Era Tag */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-md bg-[#1E1B18] text-[#C2B9A7] border border-[#2C2621] flex items-center gap-1">
                        <Flag className="w-3 h-3 text-[#D4AF37]" />
                        {level.era}
                      </span>
                      <span className="text-[10px] text-[#8C8273] font-medium">
                        {level.date}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#F5F2EB] group-hover:text-[#D4AF37] transition-colors">
                      {level.title}
                    </h4>
                    <p className="text-xs text-[#C2B9A7] line-clamp-2 mt-1 font-normal">
                      {level.matchDetails}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#2C2621]">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= level.stars
                                ? 'text-[#D4AF37] fill-[#D4AF37]'
                                : 'text-stone-700'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {level.status === 'completed' && (
                          <span className="flex items-center gap-1 text-[#D4AF37]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Preserved</span>
                          </span>
                        )}
                        {level.status === 'current' && (
                          <span className="flex items-center gap-1 text-[#F59E0B] animate-pulse">
                            <Zap className="w-3.5 h-3.5" />
                            <span>In Progress</span>
                          </span>
                        )}
                        {level.status === 'locked' && (
                          <span className="flex items-center gap-1 text-[#8C8273]">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Level Progression Circle Node on Road */}
                  <div className="flex flex-col items-center justify-center my-4 group cursor-pointer">
                    <div
                      onClick={() => handleNodeClick(level)}
                      className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center font-bold transition-all duration-300 ${
                        level.status === 'locked'
                          ? 'bg-[#171513] border-[#2C2621] text-stone-600 shadow-md'
                          : level.status === 'current'
                          ? 'bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] text-stone-950 border-white shadow-xl shadow-amber-950/40 animate-bounce scale-110'
                          : 'bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-stone-950 border-[#F3D068] shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95'
                      }`}
                    >
                      {level.status === 'locked' ? (
                        <Lock className="w-6 h-6 text-stone-600" />
                      ) : (
                        <>
                          <span className="font-serif text-xl leading-none font-bold">{level.levelNumber || idx + 1}</span>
                          <span className="text-[8px] uppercase tracking-wider font-semibold opacity-90">Stage</span>
                        </>
                      )}
                    </div>

                    {/* Road Checkpoint Label */}
                    <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#171513] text-[#C2B9A7] text-[10px] font-semibold border border-[#2C2621] shadow-sm">
                      CHAPTER {level.levelNumber || idx + 1}
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="w-80 hidden md:block" />
                </div>
              );
            })
          )}
        </div>

        {/* Add Memory Action Button */}
        <div className="mt-16 text-center z-10">
          <button
            onClick={onAddLevelClick}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#E2C799] hover:to-[#D4AF37] text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Preserve New Milestone in {profile?.sport} Journey</span>
          </button>
        </div>
      </div>
    </div>
  );
}
