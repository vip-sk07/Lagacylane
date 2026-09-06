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
      return { border: '#10b981', center: '#34d399', fill: 'rgba(16, 185, 129, 0.15)' };
    if (profile?.sport === 'Cricket' || activeDomainId === 'cricket')
      return { border: '#84cc16', center: '#a3e635', fill: 'rgba(132, 204, 22, 0.15)' };
    if (profile?.sport === 'Basketball' || activeDomainId === 'basketball')
      return { border: '#f97316', center: '#fb923c', fill: 'rgba(249, 115, 22, 0.15)' };
    if (profile?.sport === 'Athletics' || activeDomainId === 'athletics')
      return { border: '#ec4899', center: '#f472b6', fill: 'rgba(236, 72, 153, 0.15)' };
    return { border: '#06b6d4', center: '#22d3ee', fill: 'rgba(6, 182, 212, 0.15)' };
  };

  const roadColors = getSportRoadColor();

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] px-4 py-8 max-w-6xl mx-auto flex flex-col items-center">
      {/* Athlete Bio & Stats Banner */}
      <div className="w-full mb-6 glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: profile?.theme?.glow || 'rgba(16, 185, 129, 0.4)' }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                profile?.theme?.accent || 'from-emerald-500 to-green-600'
              } p-1 shadow-xl flex items-center justify-center text-slate-950 font-black text-2xl`}
            >
              <div className="w-full h-full rounded-xl bg-slate-950/20 backdrop-blur-sm flex items-center justify-center text-white">
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
                <h2 className="text-2xl font-black text-white tracking-tight">{profile?.name || 'Athlete'}</h2>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-extrabold border ${
                    profile?.theme?.badge || 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {profile?.position}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {profile?.team} • Winding {profile?.sport} Ground Road
              </p>
            </div>
          </div>

          {/* Key Stats Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {activeDomainId === 'football' && profile?.stats && (
              <>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Goals</span>
                  <span className="text-lg font-black text-emerald-400">{profile.stats.goals}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Assists</span>
                  <span className="text-lg font-black text-emerald-300">{profile.stats.assists}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Rating</span>
                  <span className="text-lg font-black text-amber-400">{profile.stats.careerRating}</span>
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
            {profile?.sport || 'Sports'} Career Ground Road
          </span>
          <h3 className="text-3xl font-black text-white mt-2">
            Career Level Progression
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            Follow the ground road connecting each level node from your youth origins to your championship glory.
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
                <rect width="20" height="20" fill="#0f172a" />
                <circle cx="5" cy="5" r="1" fill="#1e293b" />
                <circle cx="15" cy="15" r="1" fill="#334155" />
              </pattern>
            </defs>

            {/* Layer 1: Wide Outer Road Bed */}
            <path
              d="M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300"
              fill="none"
              stroke="#090d16"
              strokeWidth="68"
              strokeLinecap="round"
            />

            {/* Layer 2: Asphalt Surface */}
            <path
              d="M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300"
              fill="none"
              stroke="url(#roadAsphaltPattern)"
              strokeWidth="56"
              strokeLinecap="round"
            />

            {/* Layer 3: Glowing Road Curbs */}
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
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Layer 4: Center Dashed Lane Divider Line */}
            <path
              d="M 330 60 C 150 180, 550 320, 330 460 C 150 600, 550 740, 330 880 C 150 1020, 550 1160, 330 1300"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeDasharray="14 14"
              opacity="0.9"
            />
          </svg>

          {/* Level Nodes Mapping along the Road */}
          {filteredLevels.length === 0 ? (
            <div className="relative z-10 w-full max-w-md p-8 glass-panel rounded-3xl border border-slate-700/80 text-center my-12 flex flex-col items-center animate-fadeIn shadow-2xl">
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
              <h3 className="text-xl font-black text-white">
                Start your {profile?.sport || 'Career'} Journey
              </h3>
              <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed font-normal">
                No milestone nodes logged yet for this domain. Log your first match victory, personal record, or memory entry to begin your 3D roadmap!
              </p>
              <button
                type="button"
                onClick={onAddLevelClick}
                className="mt-6 px-5 py-2.5 rounded-xl text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                style={{
                  background: `linear-gradient(to right, ${roadColors.border}, ${roadColors.center})`
                }}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Log First Level Node</span>
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
                    className={`w-80 p-5 rounded-3xl glass-card cursor-pointer group relative overflow-hidden transition-all duration-300 ${
                      level.status === 'locked'
                        ? 'opacity-60 grayscale cursor-not-allowed border-slate-800'
                        : level.status === 'current'
                        ? 'border-2 border-amber-400/80 shadow-2xl shadow-amber-500/20 scale-[1.02]'
                        : 'border-slate-700/80 hover:border-emerald-500/60'
                    }`}
                  >
                    {/* Era Tag */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700 flex items-center gap-1">
                        <Flag className="w-3 h-3" style={{ color: roadColors.border }} />
                        {level.era}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {level.date}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                      Level {level.levelNumber || idx + 1}: {level.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1 font-medium">
                      {level.matchDetails}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/80">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= level.stars
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        {level.status === 'completed' && (
                          <span className="flex items-center gap-1" style={{ color: roadColors.border }}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Passed</span>
                          </span>
                        )}
                        {level.status === 'current' && (
                          <span className="flex items-center gap-1 text-amber-400 animate-pulse">
                            <Zap className="w-3.5 h-3.5" />
                            <span>In Progress</span>
                          </span>
                        )}
                        {level.status === 'locked' && (
                          <span className="flex items-center gap-1 text-slate-500">
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
                      className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center font-black transition-all duration-300 ${
                        level.status === 'locked'
                          ? 'bg-slate-900 border-slate-700 text-slate-500 shadow-md'
                          : level.status === 'current'
                          ? 'bg-amber-400 text-slate-950 border-white shadow-xl shadow-amber-400/50 animate-bounce scale-110'
                          : `${profile?.theme?.nodeUnlocked || 'bg-emerald-500 text-slate-950'} border-white shadow-xl hover:scale-105 active:scale-95`
                      }`}
                    >
                      {level.status === 'locked' ? (
                        <Lock className="w-7 h-7 text-slate-600" />
                      ) : (
                        <>
                          <span className="text-2xl leading-none">{level.levelNumber || idx + 1}</span>
                          <span className="text-[9px] uppercase tracking-wider font-extrabold opacity-80">Level</span>
                        </>
                      )}
                    </div>

                    {/* Road Checkpoint Label */}
                    <span className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-slate-300 text-[10px] font-black border border-slate-800 shadow-md">
                      STAGE {level.levelNumber || idx + 1}
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="w-80 hidden md:block" />
                </div>
              );
            })
          )}
        </div>

        {/* Add Level Floating Action Button */}
        <div className="mt-16 text-center z-10">
          <button
            onClick={onAddLevelClick}
            className="px-6 py-3.5 rounded-2xl text-slate-950 font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
            style={{
              background: `linear-gradient(to right, ${roadColors.border}, ${roadColors.center})`
            }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Unlock & Extend {profile?.sport} Road</span>
          </button>
        </div>
      </div>
    </div>
  );
}
