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
import ToastContainer from './components/Toast';
import { ATHLETE_PROFILES, LIFE_PROFILE, INITIAL_PROFILES } from './data/mockData';
import { JOURNEY_TYPES, DEFAULT_JOURNEY } from './data/journeyConfig';
import { getActiveProfile, isSportsJourney, loadSavedJourney, saveJourney } from './utils/journey';
import { saveMemoryApi, fetchMemoriesApi, updateUserProfileApi } from './utils/api';
import JourneySelector from './components/JourneySelector';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'ground'
  const [activeJourney, setActiveJourney] = useState(() => loadSavedJourney());
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [currentUser, setCurrentUser] = useState(null);
  const [toasts, setToasts] = useState([]);

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

  // Toast notification helper
  const addToast = (type, message, title = '') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleJourneyChange = (journey) => {
    setActiveJourney(journey);
    saveJourney(journey);

    // Persist journey choice to user's remote cloud profile if authenticated
    if (currentUser?.id) {
      updateUserProfileApi(currentUser.id, {
        activeJourney: journey,
        sportType: journey.domain || 'football'
      }).catch((err) => {
        console.warn('Cloud account journey sync note:', err.message);
      });
    }
  };

  // Handle successful login or account creation
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);

    // 1. Determine active journey (from user profile or registered sport)
    let nextJourney;
    if (user.activeJourney && user.activeJourney.type) {
      nextJourney = user.activeJourney;
    } else {
      const userSport = (user.sport || user.sportType || 'football').toLowerCase();
      if (userSport === 'journaler' || userSport === 'life') {
        nextJourney = { type: JOURNEY_TYPES.LIFE, domain: null };
      } else if (['football', 'cricket', 'basketball', 'athletics'].includes(userSport)) {
        nextJourney = { type: JOURNEY_TYPES.SPORTS, domain: userSport };
      } else {
        nextJourney = { type: JOURNEY_TYPES.SPORTS, domain: 'football' };
      }
    }

    handleJourneyChange(nextJourney);

    // 2. Update user profile information in local state
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

    // 3. Fetch remote memories scoped by the active journey
    fetchMemoriesApi(user.id, nextJourney.type, nextJourney.domain)
      .then((remoteMemories) => {
        if (remoteMemories && remoteMemories.length > 0) {
          setProfiles((prev) => {
            if (nextJourney.type === JOURNEY_TYPES.LIFE) {
              return {
                ...prev,
                life: {
                  ...prev.life,
                  levels: remoteMemories
                }
              };
            }
            const d = nextJourney.domain;
            return {
              ...prev,
              sports: {
                ...prev.sports,
                [d]: {
                  ...(prev.sports[d] || prev.sports.football),
                  levels: remoteMemories
                }
              }
            };
          });
          addToast(
            'success',
            `Loaded ${remoteMemories.length} cloud memories for your ${nextJourney.domain || 'life'} journey.`,
            'Cloud Sync Complete'
          );
        }
      })
      .catch((err) => {
        console.warn('Cloud memories fetch note:', err.message);
        addToast(
          'info',
          'Cloud database unreachable. Running in local offline roadmap mode.',
          'Offline Mode'
        );
      });

    // Transition smoothly to the 3D Ground Roadmap view
    setCurrentView('ground');
    addToast('success', `Welcome back, ${user.name}!`, 'Signed In');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    addToast('info', 'You have been signed out.', 'Logged Out');
  };

  const handleAddLevel = async (newLevelData) => {
    const isLife = !isSportsJourney(activeJourney);
    const domain = isLife ? null : (activeJourney.domain || 'football');
    const journeyType = isLife ? JOURNEY_TYPES.LIFE : JOURNEY_TYPES.SPORTS;

    const nextLevelNumber = (currentProfile?.levels?.length || 0) + 1;

    const newLevel = {
      ...newLevelData,
      id: Date.now(),
      levelNumber: nextLevelNumber,
      status: 'completed',
      journeyType,
      domain,
      media: newLevelData.mediaUrl || newLevelData.media
    };

    // Attempt to persist to remote cloud database if logged in
    if (currentUser) {
      try {
        await saveMemoryApi({
          userId: currentUser.id,
          journeyType,
          domain,
          ...newLevel
        });
        addToast(
          'success',
          `Milestone "${newLevel.title}" synced to cloud database. AI persona updated!`,
          'Memory Saved'
        );
      } catch (err) {
        console.error('Failed to sync memory to cloud:', err);
        addToast(
          'warning',
          'Cloud database unreachable. Milestone saved locally to this device.',
          'Cloud Sync Warning'
        );
      }
    } else {
      addToast(
        'info',
        `Milestone "${newLevel.title}" logged locally. Sign in to sync across devices.`,
        'Saved to Local Session'
      );
    }

    // Always update local UI state immediately
    setProfiles((prev) => {
      if (isLife) {
        return {
          ...prev,
          life: {
            ...prev.life,
            levels: [...(prev.life?.levels || []), newLevel]
          }
        };
      }

      const d = domain || 'football';
      const currentDomainProfile = prev.sports[d] || prev.sports.football;

      return {
        ...prev,
        sports: {
          ...prev.sports,
          [d]: {
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
      {/* User-facing Toast Notification Alerts */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

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
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
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
          activeJourney={activeJourney}
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
          activeJourney={activeJourney}
          allProfiles={profiles}
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
