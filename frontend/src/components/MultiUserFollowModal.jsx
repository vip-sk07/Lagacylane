import React, { useState } from 'react';
import { X, UserPlus, Check, UserCheck, Search, Users, Trophy, ChevronRight } from 'lucide-react';
import { INITIAL_CONNECTIONS } from '../data/mockData';

export default function MultiUserFollowModal({ onClose, onInspectUser }) {
  const [connections, setConnections] = useState(INITIAL_CONNECTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('connections'); // connections, requests, find

  const handleAcceptRequest = (id) => {
    setConnections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'accepted' } : c))
    );
  };

  const handleDeclineRequest = (id) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
  };

  const pendingRequests = connections.filter((c) => c.status === 'pending');
  const acceptedConnections = connections.filter((c) => c.status === 'accepted');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl h-[560px] glass-panel rounded-3xl border border-blue-500/40 shadow-2xl shadow-blue-950/40 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Athlete Connections & Follows</h3>
              <p className="text-xs text-slate-400">Share timeline levels with teammates & competitors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs & Search */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search athletes by name or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'connections'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              Following ({acceptedConnections.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all relative ${
                activeTab === 'requests'
                  ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              Requests ({pendingRequests.length})
              {pendingRequests.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[9px] font-black">
                  {pendingRequests.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {activeTab === 'connections' && (
            <>
              {acceptedConnections.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">No connections yet.</p>
              ) : (
                acceptedConnections.map((user) => (
                  <div
                    key={user.id}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <h4 className="text-xs font-black text-white">{user.name}</h4>
                        <p className="text-[10px] text-blue-400 font-semibold">{user.role}</p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {user.recentMilestone}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onInspectUser(user)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold text-xs transition-all"
                    >
                      <span>View Map</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'requests' && (
            <>
              {pendingRequests.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">No pending follow requests.</p>
              ) : (
                pendingRequests.map((user) => (
                  <div
                    key={user.id}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <h4 className="text-xs font-black text-white">{user.name}</h4>
                        <p className="text-[10px] text-blue-400 font-semibold">{user.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAcceptRequest(user.id)}
                        className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all"
                        title="Accept Follow Request"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(user.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                        title="Decline"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
