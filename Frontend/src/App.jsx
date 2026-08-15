import React, { useState } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import Header from './components/Header';
import ScoreHeroLevelMap from './components/ScoreHeroLevelMap';
import MemoryInspectorModal from './components/MemoryInspectorModal';
import AddLevelModal from './components/AddLevelModal';
import AIYoungerSelfChat from './components/AIYoungerSelfChat';
import MultiUserFollowModal from './components/MultiUserFollowModal';
import SentimentAnalyticsModal from './components/SentimentAnalyticsModal';
import AuthModal from './components/AuthModal';
import HomePage from './components/HomePage';
import { ATHLETE_PROFILES } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'ground'
  const [activeSport, setActiveSport] = useState('football');
  const [profiles, setProfiles] = useState(ATHLETE_PROFILES);
  const [currentUser, setCurrentUser] = useState(null);

  // Modal States
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isAddLevelOpen, setIsAddLevelOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [initialAIChatEra, setInitialAIChatEra] = useState('Youth Era (2018-2020)');
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [isSentimentModalOpen, setIsSentimentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const currentProfile = profiles[activeSport] || profiles.football;

  // Handle successful login or account creation
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    const userSport = (user.sport || 'football').toLowerCase();

    // Dynamically change 3D Ground & UI Theme based on registered sport passion
    if (['football', 'cricket', 'basketball', 'journaler'].includes(userSport)) {
      setActiveSport(userSport);
    } else {
      setActiveSport('football');
    }

    setProfiles((prev) => ({
      ...prev,
      [userSport || 'football']: {
        ...prev[userSport || 'football'],
        name: user.name,
        position: user.position || prev[userSport || 'football'].position,
        team: user.team || prev[userSport || 'football'].team
      }
    }));

    // Transition smoothly to the 3D Ground Roadmap view
    setCurrentView('ground');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleAddLevel = async (newLevelData) => {
    if (currentUser) {
      try {
        await fetch('http://localhost:5000/api/memories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser.id,
            ...newLevelData
          })
        });
      } catch (err) {
        console.error('Failed to sync memory to SQLite backend:', err);
      }
    }

    setProfiles((prev) => {
      const targetProfile = prev[activeSport];
      const nextLevelNumber = targetProfile.levels.length + 1;

      const newLevel = {
        ...newLevelData,
        id: Date.now(),
        levelNumber: nextLevelNumber,
        status: 'completed',
        media: newLevelData.mediaUrl || newLevelData.media
      };

      return {
        ...prev,
        [activeSport]: {
          ...targetProfile,
          levels: [...targetProfile.levels, newLevel]
        }
      };
    });
  };

  const handleOpenAIChatForEra = (era) => {
    setInitialAIChatEra(era);
    setIsAIChatOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#070a12] text-slate-100 selection:bg-emerald-500 selection:text-black flex flex-col font-sans">
      {/* -------------------------------------------------- */}
      {/* HOME PAGE VIEW (Clean Landing Dashboard) */}
      {/* -------------------------------------------------- */}
      {currentView === 'home' ? (
        <HomePage
          onEnterRoadmap={() => setCurrentView('ground')}
          onSelectSport={(sport) => {
            setActiveSport(sport);
            setCurrentView('ground');
          }}
          onOpenAuthModal={() => setIsAuthModalOpen(false) || setIsAuthModalOpen(true)}
          currentUser={currentUser}
          onOpenAIChat={() => setIsAIChatOpen(true)}
          onOpenFollowModal={() => setIsFollowModalOpen(true)}
          onOpenSentimentModal={() => setIsSentimentModalOpen(true)}
        />
      ) : (
        /* -------------------------------------------------- */
        /* 3D GROUND ROADMAP VIEW */
        /* -------------------------------------------------- */
        <>
          {/* 3D WebGL Background Ground Canvas */}
          <ThreeCanvas sport={activeSport} />

          {/* Top Header Navigation */}
          <Header
            activeSport={activeSport}
            onSportChange={setActiveSport}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            onOpenAIChat={() => setIsAIChatOpen(true)}
            onOpenFollowModal={() => setIsFollowModalOpen(true)}
            onOpenSentimentModal={() => setIsSentimentModalOpen(true)}
            onOpenAddLevelModal={() => setIsAddLevelOpen(true)}
            onGoHome={() => setCurrentView('home')}
          />

          {/* Main Content Area: Score! Hero Level Progression Map */}
          <main className="flex-1 relative z-10">
            <ScoreHeroLevelMap
              profile={currentProfile}
              onSelectLevel={setSelectedLevel}
              onAddLevelClick={() => setIsAddLevelOpen(true)}
            />
          </main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500 glass-panel mt-auto">
            <p>
              <span className="font-bold text-slate-400">LegacyLane: The One Who Lives</span> • SQLite Database & Dynamic 3D Career Ground Platform
            </p>
          </footer>
        </>
      )}

      {/* Shared Modals */}
      {selectedLevel && (
        <MemoryInspectorModal
          level={selectedLevel}
          onClose={() => setSelectedLevel(null)}
          onOpenAIChatForEra={handleOpenAIChatForEra}
        />
      )}

      {isAddLevelOpen && (
        <AddLevelModal
          onClose={() => setIsAddLevelOpen(false)}
          onAddLevel={handleAddLevel}
          currentSport={activeSport}
        />
      )}

      {isAIChatOpen && (
        <AIYoungerSelfChat
          initialEra={initialAIChatEra}
          onClose={() => setIsAIChatOpen(false)}
          levels={currentProfile.levels}
          currentUser={currentUser}
        />
      )}

      {isFollowModalOpen && (
        <MultiUserFollowModal
          onClose={() => setIsFollowModalOpen(false)}
          onInspectUser={(user) => {
            alert(`Inspecting ${user.name}'s Timeline Roadmap...`);
            setIsFollowModalOpen(false);
          }}
        />
      )}

      {isSentimentModalOpen && (
        <SentimentAnalyticsModal
          onClose={() => setIsSentimentModalOpen(false)}
          profile={currentProfile}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
