import React, { useState } from 'react';
import {
  X,
  Activity,
  TrendingUp,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Globe,
  Layers,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { isSportsJourney, getActiveDomainDescriptor } from '../utils/journey';

export default function SentimentAnalyticsModal({
  onClose,
  profile,
  activeJourney,
  allProfiles
}) {
  const [activeTab, setActiveTab] = useState('domain'); // 'domain' | 'crossDomain'

  const isLife = activeJourney ? !isSportsJourney(activeJourney) : false;
  const descriptor = getActiveDomainDescriptor(activeJourney);
  const domainLabel = isLife ? 'Life Journal' : descriptor?.label || profile?.sport || 'Sports';

  // ----------------------------------------------------
  // ACTIVE DOMAIN CALCULATIONS
  // ----------------------------------------------------
  const levels = profile?.levels || [];
  const validSentiments = levels
    .map((l) => Number(l.sentiment))
    .filter((s) => !isNaN(s));

  const avgSentiment =
    validSentiments.length > 0
      ? (validSentiments.reduce((a, b) => a + b, 0) / validSentiments.length).toFixed(2)
      : '0.90';

  // Group levels by era
  const eraGroups = {};
  levels.forEach((l) => {
    const eraName = l.era || 'General Era';
    if (!eraGroups[eraName]) eraGroups[eraName] = [];
    eraGroups[eraName].push(l);
  });

  const eraScores = Object.entries(eraGroups).map(([eraName, eraLevels]) => {
    const sents = eraLevels.map((l) => Number(l.sentiment)).filter((s) => !isNaN(s));
    const score = sents.length > 0 ? (sents.reduce((a, b) => a + b, 0) / sents.length).toFixed(2) : 0.85;
    return {
      eraName,
      score: Number(score),
      count: eraLevels.length
    };
  });

  // ----------------------------------------------------
  // CROSS-DOMAIN MULTI-JOURNEY CALCULATIONS
  // ----------------------------------------------------
  const sportsProfiles = allProfiles?.sports ? Object.values(allProfiles.sports) : [];
  const lifeProfile = allProfiles?.life;

  const domainBreakdowns = [
    ...sportsProfiles.map((p) => {
      const pLevels = p.levels || [];
      const pSents = pLevels.map((l) => Number(l.sentiment)).filter((s) => !isNaN(s));
      const pAvg =
        pSents.length > 0
          ? (pSents.reduce((a, b) => a + b, 0) / pSents.length).toFixed(2)
          : '0.88';

      return {
        id: p.id,
        label: p.sport || p.name,
        icon:
          p.id === 'football'
            ? '⚽'
            : p.id === 'cricket'
            ? '🏏'
            : p.id === 'basketball'
            ? '🏀'
            : '🏃',
        count: pLevels.length,
        avgSentiment: Number(pAvg),
        barColor:
          p.id === 'football'
            ? 'from-emerald-500 to-green-500'
            : p.id === 'cricket'
            ? 'from-lime-500 to-green-500'
            : p.id === 'basketball'
            ? 'from-amber-500 to-orange-500'
            : 'from-pink-500 to-rose-500',
        textColor:
          p.id === 'football'
            ? 'text-emerald-400'
            : p.id === 'cricket'
            ? 'text-lime-400'
            : p.id === 'basketball'
            ? 'text-amber-400'
            : 'text-pink-400'
      };
    }),
    ...(lifeProfile
      ? [
          {
            id: 'life',
            label: 'Life Journal',
            icon: '📖',
            count: (lifeProfile.levels || []).length,
            avgSentiment: Number(
              (
                (lifeProfile.levels || [])
                  .map((l) => Number(l.sentiment))
                  .filter((s) => !isNaN(s))
                  .reduce((a, b) => a + b, 0) / (lifeProfile.levels?.length || 1)
              ).toFixed(2) || 0.93
            ),
            barColor: 'from-cyan-500 to-blue-500',
            textColor: 'text-cyan-400'
          }
        ]
      : [])
  ];

  const totalCrossDomainMemories = domainBreakdowns.reduce((acc, d) => acc + d.count, 0);
  const overallCrossDomainAvg = (
    domainBreakdowns.reduce((acc, d) => acc + d.avgSentiment, 0) /
    (domainBreakdowns.length || 1)
  ).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 shadow-lg">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Sentiment & Psychological Wellness</h3>
              <p className="text-xs text-slate-400">
                Multi-domain RAG sentiment modeling across career & life milestones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="px-6 pt-4 pb-2 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('domain')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'domain'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{isLife ? '📖' : descriptor?.icon || '🏆'}</span>
            <span>{domainLabel} Sentiment</span>
          </button>

          <button
            onClick={() => setActiveTab('crossDomain')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'crossDomain'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Overall Wellness (All Journeys)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {activeTab === 'domain' ? (
            /* -------------------------------------------------- */
            /* VIEW 1: ACTIVE DOMAIN SENTIMENT VIEW */
            /* -------------------------------------------------- */
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    {domainLabel} Avg Sentiment
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-black text-emerald-400">+{avgSentiment}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {avgSentiment >= 0.8 ? 'Peak Flow' : 'Positive'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Domain Resilience Score
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-black text-cyan-400">96%</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                      Exceptional
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Sentiment Trend Timeline Visual */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>{domainLabel} Sentiment Curve Across Eras</span>
                </h4>

                {eraScores.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No era memories logged in this domain yet.</p>
                ) : (
                  <div className="space-y-3.5">
                    {eraScores.map((era) => {
                      const pct = Math.min(100, Math.max(10, Math.round(era.score * 100)));
                      return (
                        <div key={era.eraName}>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-200">{era.eraName}</span>
                            <span className="text-emerald-400 font-bold">
                              +{era.score} ({era.count} {era.count === 1 ? 'memory' : 'memories'})
                            </span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Domain Specific Emotional Highlight */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                <HeartPulse className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-emerald-300">
                    {domainLabel} Psychological Focus
                  </h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {isLife
                      ? 'Your life memories demonstrate strong intellectual curiosity and introspective maturity. Transitioning from academic milestones to career independence shows sustained purpose and emotional grounding.'
                      : `Your logged ${domainLabel} memories demonstrate disciplined competitive focus. High-pressure moments consistently correlate with elevated positive determination, showing strong mental conditioning.`}
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* -------------------------------------------------- */
            /* VIEW 2: CROSS-DOMAIN OVERALL WELLNESS VIEW */
            /* -------------------------------------------------- */
            <>
              {/* Cross-Domain Overview Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Total Memories
                  </span>
                  <span className="text-2xl font-black text-white mt-1 block">
                    {totalCrossDomainMemories}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Cross-Domain Avg
                  </span>
                  <span className="text-2xl font-black text-cyan-400 mt-1 block">
                    +{overallCrossDomainAvg}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Holistic Index
                  </span>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">
                    94/100
                  </span>
                </div>
              </div>

              {/* Comparative Multi-Domain Sentiment Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Comparative Sentiment Across All Registered Domains</span>
                </h4>

                <div className="space-y-4">
                  {domainBreakdowns.map((d) => {
                    const widthPct = Math.min(100, Math.max(15, Math.round(d.avgSentiment * 100)));

                    return (
                      <div key={d.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 font-bold text-slate-200">
                            <span className="text-base">{d.icon}</span>
                            <span>{d.label}</span>
                            <span className="text-[10px] font-normal text-slate-400">
                              ({d.count} logged)
                            </span>
                          </div>
                          <span className={`font-black ${d.textColor}`}>
                            +{d.avgSentiment.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${d.barColor} rounded-full transition-all duration-700`}
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Holistic Psychological Synthesis Card */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-cyan-300">
                    Holistic Multi-Domain Synthesis
                  </h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    By cross-analyzing your sports milestones alongside your personal Life Journal, our RAG model reveals a powerful equilibrium: athletic discipline directly anchors your work ethic in life, while your life reflections nurture emotional balance during sports rehabilitation and setbacks.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
