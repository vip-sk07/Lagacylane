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
      <div className="w-full mb-10 archival-panel rounded-3xl p-6 border border-[#2C2621] shadow-2xl relative overflow-hidden">
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: profile?.theme?.glow || 'rgba(212, 175, 55, 0.25)' }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] p-1 shadow-xl flex items-center justify-center text-stone-950 font-black text-2xl border border-[#D4AF37]/40">
              <div className="w-full h-full rounded-xl bg-[#0E0D0B]/40 backdrop-blur-sm flex items-center justify-center text-white">
                📖
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl font-bold text-[#F5F2EB] tracking-tight">{profile?.name || 'Life Chronicle'}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border bg-[#1E1B18] text-[#D4AF37] border-[#D4AF37]/30">
                  {profile?.position || 'Story Creator'}
                </span>
              </div>
              <p className="text-xs text-[#8C8273] font-medium mt-0.5">
                {profile?.team || 'Personal Timeline'} • Chronological Odyssey
              </p>
            </div>
          </div>

          {/* Life Stats Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="bg-[#171513] border border-[#2C2621] px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
              <span className="text-[10px] text-[#8C8273] uppercase tracking-wider font-bold block">Memories</span>
              <span className="font-serif text-lg font-bold text-[#D4AF37]">{profile?.stats?.memoriesLogged || levels.length}</span>
            </div>
            <div className="bg-[#171513] border border-[#2C2621] px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
              <span className="text-[10px] text-[#8C8273] uppercase tracking-wider font-bold block">Chapters</span>
              <span className="font-serif text-lg font-bold text-[#C2B9A7]">{profile?.stats?.erasRecorded || 3}</span>
            </div>
            <div className="bg-[#171513] border border-[#2C2621] px-4 py-2.5 rounded-2xl text-center flex-1 md:flex-none">
              <span className="text-[10px] text-[#8C8273] uppercase tracking-wider font-bold block">Streak</span>
              <span className="font-serif text-lg font-bold text-[#D4AF37]">{profile?.stats?.streakDays || 12}d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Header & Quick Action */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase px-3.5 py-1 rounded-full bg-[#1E1B18] border border-[#D4AF37]/30 flex items-center gap-1.5 w-fit">
            <Compass className="w-3.5 h-3.5" />
            Chronological Life Timeline
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F2EB] mt-2">
            Your Life Journey Chronicle
          </h3>
          <p className="text-xs text-[#8C8273] max-w-lg mt-1 leading-relaxed">
            A chronological archive of milestones, personal growth moments, and quiet reflections preserved for a lifetime.
          </p>
        </div>

        <button
          onClick={onAddLevelClick}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#E2C799] hover:to-[#D4AF37] text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Record Life Memory</span>
        </button>
      </div>

      {/* Empty State */}
      {sortedLevels.length === 0 ? (
        <div className="w-full max-w-md p-10 archival-panel rounded-3xl border border-[#2C2621] text-center my-12 flex flex-col items-center shadow-2xl animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-[#1E1B18] border border-[#D4AF37]/30 flex items-center justify-center text-4xl mb-4 shadow-xl">
            📖
          </div>
          <h3 className="font-serif text-xl font-bold text-[#F5F2EB]">Begin Your Chronicle</h3>
          <p className="text-xs text-[#8C8273] mt-2 max-w-xs leading-relaxed">
            You haven't logged any personal life milestones yet. Capture your graduation, travels, career beginnings, or personal reflections to begin your timeline.
          </p>
          <button
            onClick={onAddLevelClick}
            className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:scale-105 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record First Memory</span>
          </button>
        </div>
      ) : (
        /* Vertical Chronological Timeline Spine & Cards */
        <div className="relative w-full py-6">
          {/* Central Warm Archival Spine */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#D4AF37] via-[#9C4123] to-[#D4AF37] opacity-60 rounded-full pointer-events-none" />

          <div className="space-y-12">
            {sortedLevels.map((level, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={level.id || idx}
                  className="relative flex flex-col md:flex-row items-start md:items-center group"
                >
                  {/* Central Node Badge on the Spine */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-2xl bg-[#171513] border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-serif font-bold text-xs shadow-md shadow-amber-950/50 z-20 group-hover:scale-110 transition-transform">
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#B45309] text-stone-950 flex items-center justify-center font-bold text-lg shadow-lg shadow-amber-950/40 mb-3 border border-[#F3D068]">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              The Journey Continues
            </span>
            <p className="text-[11px] text-[#8C8273] max-w-xs mt-1">
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
      className="cursor-pointer archival-card rounded-3xl p-5 border border-[#2C2621] hover:border-[#D4AF37]/50 shadow-xl transition-all duration-300 group/card relative overflow-hidden"
    >
      {/* Top Banner: Date & Era */}
      <div
        className={`flex items-center gap-2 mb-3 flex-wrap ${
          alignRight ? 'md:justify-end' : 'justify-start'
        }`}
      >
        <span className="text-[11px] font-semibold text-[#8C8273] flex items-center gap-1 bg-[#1E1B18] px-2.5 py-0.5 rounded-lg border border-[#2C2621]">
          <Calendar className="w-3 h-3 text-[#D4AF37]" />
          {level.date}
        </span>
        <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-lg bg-[#1E1B18] text-[#D4AF37] border border-[#D4AF37]/30">
          {level.era}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-serif text-base sm:text-lg font-bold text-[#F5F2EB] group-hover/card:text-[#D4AF37] transition-colors">
        {level.title}
      </h4>

      {/* Media Image Preview */}
      {level.media && (
        <div className="my-3 relative w-full h-36 rounded-2xl overflow-hidden border border-[#2C2621] shadow-md">
          <img
            src={level.media}
            alt={level.title}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-transparent to-transparent opacity-70" />
        </div>
      )}

      {/* Reflection Excerpt */}
      <p className="font-serif text-xs text-[#E7E0D2] leading-relaxed italic line-clamp-3 my-2.5 font-normal">
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
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#1E1B18] text-[#C2B9A7] border border-[#2C2621] flex items-center gap-1"
            >
              <Tag className="w-2.5 h-2.5 text-[#D4AF37]" />
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Footer: Sentiment & Reflections */}
      <div
        className={`flex items-center justify-between pt-3 border-t border-[#2C2621] mt-3 text-xs ${
          alignRight ? 'md:flex-row-reverse' : ''
        }`}
      >
        <span className="text-[11px] font-semibold flex items-center gap-1 text-[#D4AF37]">
          <Activity className="w-3.5 h-3.5" />
          <span>Mood: {level.sentiment >= 0 ? 'Triumphant' : 'Reflective'}</span>
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenAIChatForEra) onOpenAIChatForEra(level.era);
          }}
          className="px-2.5 py-1 rounded-xl bg-[#1E1B18] hover:bg-[#2C2621] text-amber-200 border border-[#D4AF37]/30 font-semibold text-[10px] flex items-center gap-1 transition-all"
        >
          <Bot className="w-3 h-3 text-[#D4AF37]" />
          <span>Reflect ({level.era?.split(' ')[0] || 'Era'})</span>
        </button>
      </div>
    </div>
  );
}
