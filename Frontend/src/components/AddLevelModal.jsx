import React, { useState } from 'react';
import { X, Plus, Sparkles, Image as ImageIcon, Upload, Trophy, MessageSquare } from 'lucide-react';

export default function AddLevelModal({ onClose, onAddLevel, currentSport }) {
  const [title, setTitle] = useState('');
  const [era, setEra] = useState('Youth Era (2018-2020)');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [matchDetails, setMatchDetails] = useState('');
  const [content, setContent] = useState('');
  const [victoryMessage, setVictoryMessage] = useState('');
  const [stars, setStars] = useState(3);
  const [tagsInput, setTagsInput] = useState('Victory, MatchWinner, Championship');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80');
  const [isUploading, setIsUploading] = useState(false);

  // Local Image Upload Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setMediaUrl(data.url);
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

    const fullContent = victoryMessage
      ? `${content}\n\n🏆 VICTORY NOTE: "${victoryMessage}"`
      : content;

    const newLevel = {
      title,
      era,
      date,
      matchDetails: matchDetails || title,
      content: fullContent,
      victoryMessage,
      stars: Number(stars),
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      mediaUrl: mediaUrl || null,
      sentiment: 0.95
    };

    onAddLevel(newLevel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-emerald-500/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Log Victory Milestone & Ground Image</h3>
              <p className="text-xs text-slate-400">AI Younger Self automatically ingests and learns your victory note</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Milestone / Match Victory Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Scored Match Winning Goal in League Final"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Conversation Era
              </label>
              <select
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
              >
                <option value="Youth Era (2018-2020)">Youth Era (2018-2020)</option>
                <option value="Pro Debut Era (2021-2023)">Pro Debut Era (2021-2023)</option>
                <option value="Championship Era (2024+)">Championship Era (2024+)</option>
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-emerald-400">
              <MessageSquare className="w-4 h-4" />
              <span>Victory Message & Personal Note (AI Ingested)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dedicated this victory to my family and academy coaches who believed in me!"
              value={victoryMessage}
              onChange={(e) => setVictoryMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Memory Journal Entry
            </label>
            <textarea
              required
              rows={3}
              placeholder="Write what happened during the match, the stadium environment, and your reflections..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none resize-none"
            />
          </div>

          {/* Media Image Upload Section */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Upload Ground Photo / Match Image
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-all border border-slate-700">
                <Upload className="w-4 h-4 text-emerald-400" />
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
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
            {mediaUrl && (
              <div className="mt-2.5 relative w-full h-24 rounded-2xl overflow-hidden border border-slate-800">
                <img src={mediaUrl} alt="Match Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

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
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
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
