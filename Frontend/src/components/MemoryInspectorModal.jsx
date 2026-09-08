import React from 'react';
import {
  X,
  Calendar,
  Star,
  Tag,
  Bot,
  Trophy,
  Activity,
  Image as ImageIcon,
  BookOpen,
  Sparkles,
  Heart,
  Award
} from 'lucide-react';
import { JOURNEY_TYPES } from '../data/journeyConfig';

export default function MemoryInspectorModal({ level, onClose, onOpenAIChatForEra }) {
  if (!level) return null;

  const isLife =
    level.journeyType === JOURNEY_TYPES.LIFE ||
    (!level.journeyType && (level.domain === 'life' || level.domain === 'journaler'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E0D0B]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl archival-panel rounded-3xl border border-[#2C2621] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Banner */}
        <div className="p-6 bg-[#171513] border-b border-[#2C2621] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg font-serif font-bold text-xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-stone-950 border border-[#D4AF37]/30"
            >
              {isLife ? <BookOpen className="w-5 h-5" /> : level.levelNumber || '★'}
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#1E1B18] text-[#D4AF37] border border-[#D4AF37]/30">
                {level.era}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F5F2EB] mt-0.5">{level.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1E1B18] hover:bg-[#2C2621] text-[#8C8273] hover:text-white transition-all border border-[#2C2621]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Media Asset Preview */}
          {level.media && (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-[#2C2621] shadow-xl group">
              <img
                src={level.media}
                alt={level.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs text-[#C2B9A7] font-medium">
                <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>Memory Photo Attached</span>
              </div>
            </div>
          )}

          {/* Conditional Stats Grid: Sports vs Life */}
          {!isLife ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#171513] border border-[#2C2621]">
                <span className="text-[10px] text-[#8C8273] font-semibold uppercase tracking-wider block">Date</span>
                <span className="text-sm font-semibold text-[#F5F2EB] flex items-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  {level.date}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#171513] border border-[#2C2621]">
                <span className="text-[10px] text-[#8C8273] font-semibold uppercase tracking-wider block">Star Rating</span>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= (level.stars || 3) ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-stone-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#171513] border border-[#2C2621] col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#8C8273] font-semibold uppercase tracking-wider block">Mood & Tone</span>
                <span className="text-sm font-semibold flex items-center gap-1.5 mt-1 text-[#D4AF37]">
                  <Activity className="w-4 h-4" />
                  {(level.sentiment ?? 0.8) >= 0 ? 'Triumphant' : 'Reflective'}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#171513] border border-[#2C2621]">
                <span className="text-[10px] text-[#8C8273] font-semibold uppercase tracking-wider block">Recorded Date</span>
                <span className="text-sm font-semibold text-[#F5F2EB] flex items-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  {level.date}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#171513] border border-[#2C2621]">
                <span className="text-[10px] text-[#8C8273] font-semibold uppercase tracking-wider block">Tone</span>
                <span className="text-sm font-semibold flex items-center gap-1.5 mt-1 text-[#D4AF37]">
                  <Activity className="w-4 h-4" />
                  {(level.sentiment ?? 0.9) >= 0 ? 'Inspiring' : 'Reflective'}
                </span>
              </div>
            </div>
          )}

          {/* Match Details for Sports */}
          {!isLife && level.matchDetails && (
            <div className="p-3.5 rounded-2xl bg-[#171513] border border-[#2C2621]">
              <span className="text-[10px] text-[#8C8273] font-semibold uppercase tracking-wider block mb-1">
                The Defining Moment
              </span>
              <p className="text-xs text-[#F5F2EB] font-medium">{level.matchDetails}</p>
            </div>
          )}

          {/* Detailed Memory Entry Text */}
          <div className="p-4 rounded-2xl bg-[#171513] border border-[#2C2621]">
            <h4 className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
              {isLife ? 'Personal Reflection' : 'Match & Career Reflection'}
            </h4>
            <p className="font-serif text-sm text-[#E7E0D2] leading-relaxed whitespace-pre-line font-normal italic">
              "{level.content}"
            </p>
          </div>

          {/* Life Wisdom Note or Sports Victory Note */}
          {level.wisdomNote && (
            <div className="p-4 rounded-2xl bg-[#1E1B18] border border-[#D4AF37]/30">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Enduring Life Lesson</span>
              </span>
              <p className="text-xs text-[#F5F2EB] italic font-normal leading-relaxed">
                "{level.wisdomNote}"
              </p>
            </div>
          )}

          {level.victoryMessage && (
            <div className="p-4 rounded-2xl bg-[#1E1B18] border border-[#D4AF37]/30">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Trophy className="w-4 h-4" />
                <span>Words to Remember</span>
              </span>
              <p className="text-xs text-[#F5F2EB] italic font-normal leading-relaxed">
                "{level.victoryMessage}"
              </p>
            </div>
          )}

          {/* Emotion & Context Tags */}
          <div>
            <h4 className="text-xs font-semibold text-[#8C8273] uppercase tracking-wider mb-2">
              Tags & Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {level.tags?.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-[#1E1B18] text-[#C2B9A7] border border-[#2C2621]"
                >
                  <Tag className="w-3 h-3 text-[#D4AF37]" />
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#171513] border-t border-[#2C2621] flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              if (onOpenAIChatForEra) onOpenAIChatForEra(level.era);
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#E2C799] hover:to-[#D4AF37] text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reflect on this Milestone ({level.era})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
