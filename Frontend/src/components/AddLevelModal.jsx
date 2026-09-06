import React, { useState } from 'react';
import {
  X,
  Plus,
  Sparkles,
  Image as ImageIcon,
  Upload,
  Trophy,
  MessageSquare,
  BookOpen,
  Tag,
  Activity,
  Heart
} from 'lucide-react';
import { isSportsJourney, getActiveDomainDescriptor } from '../utils/journey';
import { JOURNEY_TYPES } from '../data/journeyConfig';
import { uploadMediaApi } from '../utils/api';

const LIFE_PRESET_TAGS = ['Grateful', 'Milestone', 'Family', 'Growth', 'Resilience', 'Nostalgia', 'Creative', 'Reflective'];
const SPORT_PRESET_TAGS = ['Victory', 'Championship', 'Comeback', 'MOTM', 'Debut', 'PersonalBest', 'Milestone'];

export default function AddLevelModal({ onClose, onAddLevel, activeJourney, currentSport }) {
  const isLife = activeJourney ? !isSportsJourney(activeJourney) : (currentSport === 'life' || currentSport === 'journaler');
  const descriptor = getActiveDomainDescriptor(activeJourney || currentSport);
  const sportDomain = isLife ? null : (activeJourney?.domain || currentSport || 'football');

  // Common State
  const [title, setTitle] = useState('');
  const [era, setEra] = useState(
    isLife ? 'College Days (2018-2022)' : 'Youth Era (2018-2020)'
  );
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [stars, setStars] = useState(3);

  // Sports Specific State
  const [matchDetails, setMatchDetails] = useState('');
  const [victoryMessage, setVictoryMessage] = useState('');
  const [stat1, setStat1] = useState(''); // Goals / Wickets / Points / Time
  const [stat2, setStat2] = useState(''); // Assists / Runs / Assists / Lane
  const [stat3, setStat3] = useState(''); // Rating / Highest / Rebounds / Rank

  // Life Specific State
  const [wisdomNote, setWisdomNote] = useState('');
  const [selectedTags, setSelectedTags] = useState(
    isLife ? ['Milestone', 'Grateful'] : ['Victory', 'Championship']
  );
  const [customTagInput, setCustomTagInput] = useState('');

  // Handle Tag Toggle
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = customTagInput.trim().replace(/^#/, '');
      if (trimmed && !selectedTags.includes(trimmed)) {
        setSelectedTags((prev) => [...prev, trimmed]);
        setCustomTagInput('');
      }
    }
  };

  // Local Image Upload Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('media', file);

    try {
      const url = await uploadMediaApi(file);
      if (url) {
        setMediaUrl(url);
      }
    } catch (err) {
      console.error('File Upload Error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (isLife) {
      const fullContent = wisdomNote
        ? `${content}\n\n💡 LIFE LESSON: "${wisdomNote}"`
        : content;

      const newLevel = {
        journeyType: JOURNEY_TYPES.LIFE,
        domain: null,
        title,
        era,
        date,
        matchDetails: 'Life Milestone: ' + title,
        content: fullContent,
        wisdomNote,
        stars: 3,
        tags: selectedTags,
        media: mediaUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
        sentiment: 0.95
      };

      onAddLevel(newLevel);
    } else {
      const fullContent = victoryMessage
        ? `${content}\n\n🏆 VICTORY NOTE: "${victoryMessage}"`
        : content;

      // Calculate Domain-Specific Stats Object
      let statsObj = { rating: '9.0' };
      if (sportDomain === 'football') {
        statsObj = { goals: Number(stat1) || 1, assists: Number(stat2) || 0, rating: stat3 || '9.0' };
      } else if (sportDomain === 'cricket') {
        statsObj = { wickets: Number(stat1) || 0, runs: Number(stat2) || 0, highestScore: stat3 || '-' };
      } else if (sportDomain === 'basketball') {
        statsObj = { points: Number(stat1) || 0, assists: Number(stat2) || 0, rating: stat3 || '9.0' };
      } else if (sportDomain === 'athletics') {
        statsObj = { time: stat1 || '45.0s', lane: Number(stat2) || 4, rank: Number(stat3) || 1 };
      }

      const newLevel = {
        journeyType: JOURNEY_TYPES.SPORTS,
        domain: sportDomain,
        title,
        era,
        date,
        matchDetails: matchDetails || title,
        stats: statsObj,
        content: fullContent,
        victoryMessage,
        stars: Number(stars),
        tags: selectedTags,
        media: mediaUrl || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
        sentiment: 0.95
      };

      onAddLevel(newLevel);
    }

    onClose();
  };

  const themePrimary = descriptor?.theme?.primary || (isLife ? '#06b6d4' : '#10b981');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-2xl text-slate-950 font-black shadow-lg"
              style={{
                background: `linear-gradient(to bottom right, ${themePrimary}, ${descriptor?.theme?.secondary || '#059669'})`
              }}
            >
              {isLife ? <BookOpen className="w-6 h-6 text-white" /> : <Trophy className="w-6 h-6 text-slate-950" />}
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {isLife ? 'Log Life Memory & Reflection' : `Log ${descriptor?.label || 'Sport'} Milestone`}
              </h3>
              <p className="text-xs text-slate-400">
                {isLife
                  ? 'AI Younger Self ingests and reflects on your life lessons'
                  : 'AI Younger Self automatically ingests and learns your victory note'}
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {isLife ? 'Memory / Milestone Title' : 'Milestone / Match Victory Title'}
            </label>
            <input
              type="text"
              required
              placeholder={
                isLife
                  ? 'e.g. Graduation Day Honors or Moved to First Solo Apartment'
                  : 'e.g. Scored Match Winning Goal in League Final'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Era & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Conversation Era
              </label>
              <select
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-cyan-500 focus:outline-none"
              >
                {isLife ? (
                  <>
                    <option value="School & Early Days">School & Early Days</option>
                    <option value="College Days (2018-2022)">College Days (2018-2022)</option>
                    <option value="Career & Adulthood (2022+)">Career & Adulthood (2022+)</option>
                    <option value="Present Day Reflections">Present Day Reflections</option>
                  </>
                ) : (
                  <>
                    <option value="Youth Era (2018-2020)">Youth Era (2018-2020)</option>
                    <option value="Pro Debut Era (2021-2023)">Pro Debut Era (2021-2023)</option>
                    <option value="Championship Era (2024+)">Championship Era (2024+)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Conditional: Sports Match Details vs Life Reflection */}
          {!isLife ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Match Details / Score Summary
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 Goals, 1 Assist | Final Score 3-2"
                  value={matchDetails}
                  onChange={(e) => setMatchDetails(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Domain Specific Numerical Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                    {sportDomain === 'football'
                      ? 'Goals'
                      : sportDomain === 'cricket'
                      ? 'Wickets'
                      : sportDomain === 'basketball'
                      ? 'Points'
                      : 'Lap Time'}
                  </label>
                  <input
                    type="text"
                    placeholder={sportDomain === 'athletics' ? '44.8s' : '2'}
                    value={stat1}
                    onChange={(e) => setStat1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                    {sportDomain === 'football'
                      ? 'Assists'
                      : sportDomain === 'cricket'
                      ? 'Runs'
                      : sportDomain === 'basketball'
                      ? 'Assists'
                      : 'Lane'}
                  </label>
                  <input
                    type="text"
                    placeholder={sportDomain === 'athletics' ? '4' : '1'}
                    value={stat2}
                    onChange={(e) => setStat2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                    {sportDomain === 'football'
                      ? 'Rating'
                      : sportDomain === 'cricket'
                      ? 'High Score'
                      : sportDomain === 'basketball'
                      ? 'Rating'
                      : 'Rank'}
                  </label>
                  <input
                    type="text"
                    placeholder={sportDomain === 'athletics' ? '1' : '9.5'}
                    value={stat3}
                    onChange={(e) => setStat3(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                  <span>Victory Message & Personal Note (AI Ingested)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dedicated this victory to my family and coaches who believed in me!"
                  value={victoryMessage}
                  onChange={(e) => setVictoryMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>Life Lesson & Wisdom Note (AI Ingested)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Realized that genuine presence and patience matter more than rushing milestones."
                value={wisdomNote}
                onChange={(e) => setWisdomNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/40 text-slate-100 text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>
          )}

          {/* Emotion & Context Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isLife ? 'Emotion & Mood Tags' : 'Milestone Tags'}</span>
            </label>

            {/* Quick Preset Chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(isLife ? LIFE_PRESET_TAGS : SPORT_PRESET_TAGS).map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              placeholder="Type custom tag & press Enter..."
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              onKeyDown={handleAddCustomTag}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none"
            />
          </div>

          {/* Journal Entry Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {isLife ? 'Full Memory Journal Reflection' : 'Full Match & Event Reflections'}
            </label>
            <textarea
              required
              rows={3}
              placeholder={
                isLife
                  ? 'Reflect on this life moment, the emotions you felt, and why it became an enduring memory...'
                  : 'Write what happened during the match, the stadium environment, and your personal reflections...'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          {/* Media Image Upload Section */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {isLife ? 'Upload Life Milestone Image' : 'Upload Ground Photo / Match Image'}
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-all border border-slate-700">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-500 font-bold">OR URL:</span>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>
            {mediaUrl && (
              <div className="mt-2.5 relative w-full h-24 rounded-2xl overflow-hidden border border-slate-800">
                <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              style={{
                background: `linear-gradient(to right, ${themePrimary}, ${descriptor?.theme?.secondary || '#059669'})`
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Save & Train AI</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
