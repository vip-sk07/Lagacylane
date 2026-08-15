import React from 'react';
import { Star, Lock, Play, Trophy, Calendar, Sparkles, CheckCircle2, ChevronRight, Award, Zap, Flag, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScoreHeroLevelMap({ profile, onSelectLevel, onAddLevelClick }) {
  const handleNodeClick = (level) => {
    if (level.status === 'locked') return;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });

    onSelectLevel(level);
  };

  const getSportRoadColor = () => {
    if (profile.sport === 'Football') return { border: '#10b981', center: '#34d399', fill: 'rgba(16, 185, 129, 0.15)' };
    if (profile.sport === 'Cricket') return { border: '#84cc16', center: '#a3e635', fill: 'rgba(132, 204, 22, 0.15)' };
    if (profile.sport === 'Basketball') return { border: '#f97316', center: '#fb923c', fill: 'rgba(249, 115, 22, 0.15)' };
    return { border: '#06b6d4', center: '#22d3ee', fill: 'rgba(6, 182, 212, 0.15)' };
  };

  const roadColors = getSportRoadColor();

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] px-4 py-8 max-w-6xl mx-auto flex flex-col items-center">
      {/* Athlete Bio & Stats Banner */}
      <div className="w-full mb-10 glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: profile.theme.glow }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${profile.theme.accent} p-1 shadow-xl flex items-center justify-center text-slate-950 font-black text-2xl`}>
              <div className="w-full h-full rounded-xl bg-slate-950/20 backdrop-blur-sm flex items-center justify-center">
                {profile.sport === 'Football'
                  ? '⚽'
                  : profile.sport === 'Cricket'
                  ? '🏏'
                  : profile.sport === 'Basketball'
                  ? '🏀'
                  : '📖'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white tracking-tight">{profile.name}</h2>
                <span className={`text-xs px-2.5 py-1 rounded-full font-extrabold border ${profile.theme.badge}`}>
                  {profile.position}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {profile.team} • Winding {profile.sport} Ground Road
              </p>
            </div>
          </div>

          {/* Key Stats Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {profile.sport === 'Football' && (
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

            {profile.sport === 'Cricket' && (
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

            {profile.sport === 'Basketball' && (
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

            {profile.sport === 'Life Journal' && (
              <>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Memories</span>
                  <span className="text-lg font-black text-cyan-400">{profile.stats.memoriesLogged}</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Wellness</span>
                  <span className="text-lg font-black text-cyan-300">{profile.stats.wellnessIndex}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3D Score! Hero Ground Winding Road Map Container */}
      <div className="relative w-full max-w-4xl py-6 flex flex-col items-center">
        {/* Title Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-black tracking-widest text-emerald-400 uppercase px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-1.5 w-fit mx-auto">
            <MapPin className="w-3.5 h-3.5" />
            Score! Hero Connected Ground Road
          </span>
          <h3 className="text-3xl font-black text-white mt-2">
            Career Level Journey Road
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            Follow the ground road connecting each level node from your youth academy origins to your championship glory.
          </p>
        </div>

        {/* Winding Road Container */}
        <div className="relative w-full flex flex-col items-center gap-24 py-6">
          {/* SVG Textured 3D Winding Road Surface connecting all nodes */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))' }}
          >
            <defs>
              <linearGradient id="roadBaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

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

            {/* Layer 3: Glowing Road Curbs / Side Borders */}
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
          {profile.levels.map((level, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={level.id}
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
                      <Flag className="w-3 h-3 text-emerald-400" />
                      {level.era}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {level.date}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    Level {level.levelNumber}: {level.title}
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
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Passed</span>
                        </span>
                      )}
                      {level.status === 'current' && (
                        <span className="flex items-center gap-1 text-amber-400 animate-pulse">
                          <Zap className="w-3.5 h-3.5" />
                          <span>Active Stage</span>
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

                {/* 3D Road Checkpoint Node (Positioned directly on the Road path) */}
                <div className="relative flex flex-col items-center">
                  <div
                    onClick={() => handleNodeClick(level)}
                    className={`hero-level-node z-20 w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer font-black text-xl shadow-2xl transition-all border-4 ${
                      level.status === 'locked'
                        ? 'bg-slate-950 border-slate-800 text-slate-600'
                        : level.status === 'current'
                        ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-yellow-200 text-slate-950 shadow-amber-500/70 animate-bounce'
                        : 'bg-gradient-to-tr from-emerald-500 via-teal-400 to-green-300 border-emerald-200 text-slate-950 shadow-emerald-500/60'
                    }`}
                  >
                    {level.status === 'locked' ? (
                      <Lock className="w-7 h-7 text-slate-600" />
                    ) : (
                      <>
                        <span className="text-2xl leading-none">{level.levelNumber}</span>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold opacity-80">Level</span>
                      </>
                    )}
                  </div>

                  {/* Road Checkpoint Label */}
                  <span className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-slate-300 text-[10px] font-black border border-slate-800 shadow-md">
                    STAGE {level.levelNumber}
                  </span>
                </div>

                {/* Spacer */}
                <div className="w-80 hidden md:block" />
              </div>
            );
          })}
        </div>

        {/* Add Level Floating Action Button */}
        <div className="mt-16 text-center z-10">
          <button
            onClick={onAddLevelClick}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>Unlock & Extend Ground Road</span>
          </button>
        </div>
      </div>
    </div>
  );
}
