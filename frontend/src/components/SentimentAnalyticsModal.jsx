import React from 'react';
import { X, Activity, TrendingUp, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';

export default function SentimentAnalyticsModal({ onClose, profile }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-emerald-500/40 shadow-2xl shadow-emerald-950/40 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Mental Wellness & Sentiment Insights</h3>
              <p className="text-xs text-slate-400">Derived from sentiment analysis of your logged memories</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Sentiment</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-black text-emerald-400">+0.88</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Positive</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mental Resilience</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-black text-cyan-400">96%</span>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">High</span>
              </div>
            </div>
          </div>

          {/* Sentiment Trend Timeline Visual */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Career Sentiment Curve Across Eras</span>
            </h4>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Youth Academy Era (2018-2020)</span>
                  <span className="text-emerald-400">+0.85 (High Hope)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Pro Debut & Injury Recovery (2021-2023)</span>
                  <span className="text-amber-400">+0.68 (Resilient Recovery)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full w-[68%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Championship Winner Era (2024+)</span>
                  <span className="text-emerald-400">+0.96 (Peak Fulfillment)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full w-[96%]" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Sentiment Reflection */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
            <HeartPulse className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-black text-emerald-300">Emotional Resilience Highlight</h5>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Your memory logs show incredible mental fortitude during your 2021 knee rehab period. The transition from frustration to your comeback hattrick reflects a 40% increase in emotional drive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
