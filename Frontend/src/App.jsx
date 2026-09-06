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
import { ATHLETE_PROFILES, LIFE_PROFILE, INITIAL_PROFILES } from './data/mockData';
import { JOURNEY_TYPES, DEFAULT_JOURNEY } from './data/journeyConfig';
import { getActiveProfile, isSportsJourney, loadSavedJourney, saveJourney } from './utils/journey';
import JourneySelector from './components/JourneySelector';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'ground'
  const [activeJourney, setActiveJourney] = useState(() => loadSavedJourney());
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [currentUser, setCurrentUser] = useState(null);

  // Modal States
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isAddLevelOpen, setIsAddLevelOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [initialAIChatEra, setInitialAIChatEra] = useState('Youth Era (2018-2020)');
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [isSentimentModalOpen, setIsSentimentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isJourneySelectorOpen, setIsJourneySelectorOpen] = useState(false);

  const currentProfile = getActiveProfile(activeJourney, profiles);

  const handleJourneyChange = (journey) => {
    setActiveJourney(journey);
    saveJourney(journey);
  };

  // Handle successful login or account creation
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    const userSport = (user.sport || 'football').toLowerCase();

    // Dynamically update active journey & UI theme based on registered passion
    let nextJourney;
    if (userSport === 'journaler' || userSport === 'life') {
      nextJourney = { type: JOURNEY_TYPES.LIFE, domain: null };
    } else if (['football', 'cricket', 'basketball', 'athletics'].includes(userSport)) {
      nextJourney = { type: JOURNEY_TYPES.SPORTS, domain: userSport };
    } else {
      nextJourney = { type: JOURNEY_TYPES.SPORTS, domain: 'football' };
    }
    handleJourneyChange(nextJourney);

    setProfiles((prev) => {
      if (nextJourney.type === JOURNEY_TYPES.LIFE) {
        return {
          ...prev,
          life: {
            ...prev.life,
            name: user.name,
            position: user.position || prev.life.position,
            team: user.team || prev.life.team
          }
        };
      }

      const domain = nextJourney.domain;
      const targetDomainProfile = prev.sports[domain] || prev.sports.football;
      return {
        ...prev,
        sports: {
          ...prev.sports,
          [domain]: {
            ...targetDomainProfile,
            name: user.name,
            position: user.position || targetDomainProfile.position,
            team: user.team || targetDomainProfile.team
          }
        }
      };
    });

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
      const targetProfile = getActiveProfile(activeJourney, prev);
      const nextLevelNumber = (targetProfile?.levels?.length || 0) + 1;
      const isLife = !isSportsJourney(activeJourney);

      const newLevel = {
        ...newLevelData,
        id: Date.now(),
        levelNumber: nextLevelNumber,
        status: 'completed',
        journeyType: isLife ? JOURNEY_TYPES.LIFE : JOURNEY_TYPES.SPORTS,
        domain: isLife ? null : (activeJourney.domain || 'football'),
        media: newLevelData.mediaUrl || newLevelData.media
      };

      if (isLife) {
        return {
          ...prev,
          life: {
            ...prev.life,
            levels: [...(prev.life?.levels || []), newLevel]
          }
        };
      }

      const domain = activeJourney.domain || 'football';
      const currentDomainProfile = prev.sports[domain] || prev.sports.football;

      return {
        ...prev,
        sports: {
          ...prev.sports,
          [domain]: {
            ...currentDomainProfile,
            levels: [...(currentDomainProfile?.levels || []), newLevel]
          }
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
          activeJourney={activeJourney}
          onEnterRoadmap={() => setCurrentView('ground')}
          onSelectSport={(sport) => {
            if (sport === 'journaler' || sport === 'life') {
              handleJourneyChange({ type: JOURNEY_TYPES.LIFE, domain: null });
            } else {
              handleJourneyChange({ type: JOURNEY_TYPES.SPORTS, domain: sport });
            }
            setCurrentView('ground');
          }}
          onSelectJourney={(journey) => {
            handleJourneyChange(journey);
            setCurrentView('ground');
          }}
          onOpenJourneySelector={() => setIsJourneySelectorOpen(true)}
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
          <ThreeCanvas
            journey={activeJourney}
            sport={activeJourney.domain || 'journaler'}
          />

          {/* Top Header Navigation */}
          <Header
            activeJourney={activeJourney}
            onJourneyChange={handleJourneyChange}
            activeSport={activeJourney.domain || 'journaler'}
            onSportChange={(sport) => {
              if (sport === 'journaler' || sport === 'life') {
                handleJourneyChange({ type: JOURNEY_TYPES.LIFE, domain: null });
              } else {
                handleJourneyChange({ type: JOURNEY_TYPES.SPORTS, domain: sport });
              }
            }}
            currentUser={currentUser}
            onOpenJourneySelector={() => setIsJourneySelectorOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            onOpenAIChat={() => setIsAIChatOpen(true)}
            onOpenFollowModal={() => setIsFollowModalOpen(true)}
            onOpenSentimentModal={() => setIsSentimentModalOpen(true)}
            onOpenAddLevelModal={() => setIsAddLevelOpen(true)}
            onGoHome={() => setCurrentView('home')}
          />

          {/* Main Content Area: Score! Hero Level Progression Map or Life Chronological Timeline */}
          <main className="flex-1 relative z-10">
            <ScoreHeroLevelMap
              profile={currentProfile}
              activeJourney={activeJourney}
              allProfiles={profiles}
              onJourneyChange={handleJourneyChange}
              onSelectLevel={setSelectedLevel}
              onAddLevelClick={() => setIsAddLevelOpen(true)}
              onOpenAIChatForEra={handleOpenAIChatForEra}
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
          activeJourney={activeJourney}
          currentSport={activeJourney.domain || 'life'}
        />
      )}

      {isAIChatOpen && (
        <AIYoungerSelfChat
          initialEra={initialAIChatEra}
          onClose={() => setIsAIChatOpen(false)}
          levels={currentProfile?.levels || []}
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

      {isJourneySelectorOpen && (
        <JourneySelector
          mode="modal"
          activeJourney={activeJourney}
          onSelectJourney={(journey) => {
            handleJourneyChange(journey);
            setIsJourneySelectorOpen(false);
            setCurrentView('ground');
          }}
          onClose={() => setIsJourneySelectorOpen(false)}
        />
      )}
    </div>
  );
}
