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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Banner */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg font-black text-xl ${
                isLife
                  ? 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-cyan-500/30'
                  : 'bg-gradient-to-tr from-emerald-500 to-teal-300 text-slate-950 shadow-emerald-500/30'
              }`}
            >
              {isLife ? <BookOpen className="w-6 h-6" /> : level.levelNumber || '★'}
            </div>
            <div>
              <span
                className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded border ${
                  isLife
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {level.era}
              </span>
              <h3 className="text-xl font-extrabold text-white mt-0.5">{level.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Media Asset Preview */}
          {level.media && (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
              <img
                src={level.media}
                alt={level.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>Memory Photo Attached</span>
              </div>
            </div>
          )}

          {/* Conditional Stats Grid: Sports vs Life */}
          {!isLife ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Date</span>
                <span className="text-sm font-extrabold text-white flex items-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  {level.date}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Star Rating</span>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= (level.stars || 3) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sentiment</span>
                <span
                  className={`text-sm font-extrabold flex items-center gap-1.5 mt-1 ${
                    (level.sentiment ?? 0.8) >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  {(level.sentiment ?? 0.8) >= 0
                    ? `Positive (+${level.sentiment ?? 0.85})`
                    : `Challenging (${level.sentiment})`}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Recorded Date</span>
                <span className="text-sm font-extrabold text-white flex items-center gap-1.5 mt-1">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  {level.date}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Reflection Sentiment</span>
                <span
                  className={`text-sm font-extrabold flex items-center gap-1.5 mt-1 ${
                    (level.sentiment ?? 0.9) >= 0 ? 'text-cyan-400' : 'text-amber-400'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  {(level.sentiment ?? 0.9) >= 0
                    ? `Inspiring (+${level.sentiment ?? 0.92})`
                    : `Reflective (${level.sentiment})`}
                </span>
              </div>
            </div>
          )}

          {/* Match Details for Sports */}
          {!isLife && level.matchDetails && (
            <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                Match & Performance Summary
              </span>
              <p className="text-xs text-slate-200 font-semibold">{level.matchDetails}</p>
            </div>
          )}

          {/* Detailed Memory Entry Text */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {isLife ? 'Life Reflection Journal Entry' : 'Match & Career Reflections'}
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
              "{level.content}"
            </p>
          </div>

          {/* Life Wisdom Note or Sports Victory Note */}
          {level.wisdomNote && (
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Enduring Life Lesson</span>
              </span>
              <p className="text-xs text-cyan-100 italic font-medium leading-relaxed">
                "{level.wisdomNote}"
              </p>
            </div>
          )}

          {level.victoryMessage && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Trophy className="w-4 h-4" />
                <span>Victory Personal Note</span>
              </span>
              <p className="text-xs text-emerald-100 italic font-medium leading-relaxed">
                "{level.victoryMessage}"
              </p>
            </div>
          )}

          {/* Emotion & Context Tags */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {isLife ? 'Emotion & Mood Tags' : 'Context & Achievement Tags'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {level.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold border ${
                    isLife
                      ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30'
                      : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  <Tag className={`w-3 h-3 ${isLife ? 'text-cyan-400' : 'text-emerald-400'}`} />
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              if (onOpenAIChatForEra) onOpenAIChatForEra(level.era);
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Bot className="w-4 h-4" />
            <span>Chat with AI Younger Self ({level.era})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
