import React from 'react';
import {
  BookOpen,
  Calendar,
  Sparkles,
  Heart,
  Tag,
  ArrowRight,
  PlusCircle,
  MessageSquare,
  Bot,
  Activity,
  Compass,
  CheckCircle2,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ChronologicalTimeline({
  profile,
  onSelectLevel,
  onAddLevelClick,
  onOpenAIChatForEra
}) {
  const levels = profile?.levels || [];
  // Sort chronologically (oldest to newest or levelNumber)
  const sortedLevels = [...levels].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleCardClick = (level) => {
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 }
    });
    if (onSelectLevel) onSelectLevel(level);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] px-4 py-8 max-w-5xl mx-auto flex flex-col items-center">
      {/* Life Profile Bio & Stats Banner */}
      <div className="w-full mb-10 glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: profile?.theme?.glow || 'rgba(6, 182, 212, 0.4)' }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-xl flex items-center justify-center text-slate-950 font-black text-2xl">
              <div className="w-full h-full rounded-xl bg-slate-950/20 backdrop-blur-sm flex items-center justify-center text-white">
                📖
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white tracking-tight">{profile?.name || 'Life Chronicle'}</h2>
                <span className="text-xs px-2.5 py-1 rounded-full font-extrabold border bg-cyan-500/20 text-cyan-300 border-cyan-500/40">
                  {profile?.position || 'Story Creator'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {profile?.team || 'Personal Timeline'} • Chronological Life Odyssey
              </p>
            </div>
          </div>

          {/* Life Stats Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Memories</span>
              <span className="text-lg font-black text-cyan-400">{profile?.stats?.memoriesLogged || levels.length}</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Eras</span>
              <span className="text-lg font-black text-blue-400">{profile?.stats?.erasRecorded || 3}</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Streak</span>
              <span className="text-lg font-black text-emerald-400">{profile?.stats?.streakDays || 12}d</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Wellness</span>
              <span className="text-lg font-black text-cyan-300">{profile?.stats?.wellnessIndex || '92/100'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Header & Quick Action */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-black tracking-widest text-cyan-400 uppercase px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-1.5 w-fit">
            <Compass className="w-3.5 h-3.5" />
            Chronological Life Timeline
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Your Life Journey Chronicles
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mt-1 leading-relaxed">
            A chronological timeline of milestones, personal growth moments, and heartfelt memories. Click any card to inspect or converse with your younger self.
          </p>
        </div>

        <button
          onClick={onAddLevelClick}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Log Life Memory</span>
        </button>
      </div>

      {/* Empty State */}
      {sortedLevels.length === 0 ? (
        <div className="w-full max-w-md p-10 glass-panel rounded-3xl border border-slate-800 text-center my-12 flex flex-col items-center shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-4xl mb-4 shadow-xl shadow-cyan-500/20">
            📖
          </div>
          <h3 className="text-xl font-black text-white">Begin Your Life Chronicle</h3>
          <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
            You haven't logged any personal life milestones yet. Capture your graduation, career start, travels, or personal reflections to illuminate your timeline.
          </p>
          <button
            onClick={onAddLevelClick}
            className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log First Memory</span>
          </button>
        </div>
      ) : (
        /* Vertical Chronological Timeline Spine & Cards */
        <div className="relative w-full py-6">
          {/* Central Glowing Timeline Spine */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)] pointer-events-none" />

          <div className="space-y-12">
            {sortedLevels.map((level, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={level.id || idx}
                  className="relative flex flex-col md:flex-row items-start md:items-center group"
                >
                  {/* Central Node Badge on the Spine */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-2xl bg-slate-950 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center font-black text-xs shadow-[0_0_12px_rgba(6,182,212,0.5)] z-20 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>

                  {/* Left Side (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:hidden'
                    }`}
                  >
                    {isEven && (
                      <TimelineCard
                        level={level}
                        onCardClick={handleCardClick}
                        onOpenAIChatForEra={onOpenAIChatForEra}
                        alignRight={true}
                      />
                    )}
                  </div>

                  {/* Right Side (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-12 ${
                      !isEven ? 'md:block' : 'md:hidden'
                    }`}
                  >
                    <TimelineCard
                      level={level}
                      onCardClick={handleCardClick}
                      onOpenAIChatForEra={onOpenAIChatForEra}
                      alignRight={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline End Milestone Cap */}
          <div className="flex flex-col items-center justify-center mt-16 relative z-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(6,182,212,0.6)] mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-cyan-300 uppercase tracking-wider">
              Journey Continues
            </span>
            <p className="text-[11px] text-slate-400 max-w-xs mt-1">
              Every day writes a new chapter in your legacy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Individual Chronological Timeline Card
 */
function TimelineCard({ level, onCardClick, onOpenAIChatForEra, alignRight }) {
  return (
    <div
      onClick={() => onCardClick(level)}
      className="cursor-pointer glass-panel rounded-3xl p-5 border border-slate-800/90 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group/card relative overflow-hidden"
    >
      {/* Top Banner: Date & Era */}
      <div
        className={`flex items-center gap-2 mb-3 flex-wrap ${
          alignRight ? 'md:justify-end' : 'justify-start'
        }`}
      >
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 bg-slate-900/90 px-2.5 py-0.5 rounded-lg border border-slate-800">
          <Calendar className="w-3 h-3 text-cyan-400" />
          {level.date}
        </span>
        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
          {level.era}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-base sm:text-lg font-black text-white group-hover/card:text-cyan-300 transition-colors">
        {level.title}
      </h4>

      {/* Media Image Preview */}
      {level.media && (
        <div className="my-3 relative w-full h-36 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
          <img
            src={level.media}
            alt={level.title}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
        </div>
      )}

      {/* Reflection Excerpt */}
      <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-3 my-2.5 font-medium">
        "{level.content}"
      </p>

      {/* Emotion Tags */}
      {level.tags && level.tags.length > 0 && (
        <div
          className={`flex flex-wrap gap-1.5 my-3 ${
            alignRight ? 'md:justify-end' : 'justify-start'
          }`}
        >
          {level.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800 flex items-center gap-1"
            >
              <Tag className="w-2.5 h-2.5 text-cyan-400" />
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Footer: Sentiment & AI Younger Self Trigger */}
      <div
        className={`flex items-center justify-between pt-3 border-t border-slate-800/80 mt-3 text-xs ${
          alignRight ? 'md:flex-row-reverse' : ''
        }`}
      >
        <span
          className={`text-[11px] font-bold flex items-center gap-1 ${
            level.sentiment >= 0 ? 'text-emerald-400' : 'text-amber-400'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>{level.sentiment >= 0 ? `Positive (+${level.sentiment})` : `Reflective (${level.sentiment})`}</span>
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenAIChatForEra) onOpenAIChatForEra(level.era);
          }}
          className="px-2.5 py-1 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-500/30 font-bold text-[10px] flex items-center gap-1 transition-all"
        >
          <Bot className="w-3 h-3" />
          <span>Chat AI ({level.era?.split(' ')[0] || 'Era'})</span>
        </button>
      </div>
    </div>
  );
}
