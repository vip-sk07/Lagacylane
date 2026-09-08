import {
  buildFootballGround,
  buildFootballBall,
  getFootballLighting,
  buildFootballAccessory
} from '../three/scenes/footballScene.js';

import {
  buildCricketGround,
  buildCricketBall,
  getCricketLighting,
  buildCricketAccessory
} from '../three/scenes/cricketScene.js';

import {
  buildBasketballGround,
  buildBasketballBall,
  getBasketballLighting,
  buildBasketballAccessory
} from '../three/scenes/basketballScene.js';

import {
  buildAthleticsGround,
  buildAthleticsBall,
  getAthleticsLighting,
  buildAthleticsAccessory
} from '../three/scenes/athleticsScene.js';

import {
  buildLifeGround,
  buildLifeBall,
  getLifeLighting,
  buildLifeAccessory
} from '../three/scenes/lifeScene.js';

export const JOURNEY_TYPES = Object.freeze({
  LIFE: 'life',
  SPORTS: 'sports'
});

export const SPORT_DOMAINS = [
  {
    id: 'football',
    label: 'Football',
    icon: '⚽',
    threeSceneKey: 'football',
    theme: {
      primary: '#2D6A4F',
      secondary: '#1B4332',
      accentClass: 'from-emerald-800 to-stone-900',
      threeColors: {
        primary: 0x2D6A4F,
        secondary: 0x1B4332
      },
      glow: 'rgba(45, 106, 79, 0.3)',
      bg: 'from-[#0E0D0B] via-[#122118]/40 to-[#0E0D0B]',
      badge: 'bg-emerald-950/80 text-emerald-200 border-emerald-700/50',
      nodeUnlocked: 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-amber-500/30 border border-amber-300/60',
      line: 'stroke-emerald-700',
      icon: 'Trophy'
    },
    buildGround: buildFootballGround,
    buildBall: buildFootballBall,
    getLighting: getFootballLighting,
    buildAccessory: buildFootballAccessory
  },
  {
    id: 'cricket',
    label: 'Cricket',
    icon: '🏏',
    threeSceneKey: 'cricket',
    theme: {
      primary: '#D4AF37',
      secondary: '#8C2D19',
      accentClass: 'from-amber-800 to-stone-900',
      threeColors: {
        primary: 0xD4AF37,
        secondary: 0x8C2D19
      },
      glow: 'rgba(212, 175, 55, 0.25)',
      bg: 'from-[#0E0D0B] via-[#241A10]/40 to-[#0E0D0B]',
      badge: 'bg-amber-950/80 text-amber-200 border-amber-700/50',
      nodeUnlocked: 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-amber-500/30 border border-amber-300/60',
      line: 'stroke-amber-600',
      icon: 'Award'
    },
    buildGround: buildCricketGround,
    buildBall: buildCricketBall,
    getLighting: getCricketLighting,
    buildAccessory: buildCricketAccessory
  },
  {
    id: 'basketball',
    label: 'Basketball',
    icon: '🏀',
    threeSceneKey: 'basketball',
    theme: {
      primary: '#C05621',
      secondary: '#9C4123',
      accentClass: 'from-orange-900 to-stone-900',
      threeColors: {
        primary: 0xC05621,
        secondary: 0x9C4123
      },
      glow: 'rgba(192, 86, 33, 0.25)',
      bg: 'from-[#0E0D0B] via-[#261710]/40 to-[#0E0D0B]',
      badge: 'bg-orange-950/80 text-orange-200 border-orange-700/50',
      nodeUnlocked: 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-amber-500/30 border border-amber-300/60',
      line: 'stroke-orange-600',
      icon: 'Zap'
    },
    buildGround: buildBasketballGround,
    buildBall: buildBasketballBall,
    getLighting: getBasketballLighting,
    buildAccessory: buildBasketballAccessory
  },
  {
    id: 'athletics',
    label: 'Athletics',
    icon: '🏃',
    threeSceneKey: 'athletics',
    theme: {
      primary: '#9C2A2A',
      secondary: '#6B1D1D',
      accentClass: 'from-red-950 to-stone-900',
      threeColors: {
        primary: 0x9C2A2A,
        secondary: 0x6B1D1D
      },
      glow: 'rgba(156, 42, 42, 0.25)',
      bg: 'from-[#0E0D0B] via-[#261214]/40 to-[#0E0D0B]',
      badge: 'bg-red-950/80 text-red-200 border-red-700/50',
      nodeUnlocked: 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-amber-500/30 border border-amber-300/60',
      line: 'stroke-red-700',
      icon: 'Flame'
    },
    buildGround: buildAthleticsGround,
    buildBall: buildAthleticsBall,
    getLighting: getAthleticsLighting,
    buildAccessory: buildAthleticsAccessory
  }
];

export const LIFE_DOMAIN = {
  id: 'life',
  label: 'Life Journal',
  icon: '📖',
  threeSceneKey: 'life',
  theme: {
    primary: '#D4AF37',
    secondary: '#1B2E4B',
    accentClass: 'from-indigo-950 to-stone-900',
    threeColors: {
      primary: 0xD4AF37,
      secondary: 0x1B2E4B
    },
    glow: 'rgba(212, 175, 55, 0.25)',
    bg: 'from-[#0E0D0B] via-[#141B29]/40 to-[#0E0D0B]',
    badge: 'bg-stone-900/90 text-amber-200 border-amber-600/40',
    nodeUnlocked: 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-amber-500/30 border border-amber-300/60',
    line: 'stroke-amber-600',
    icon: 'BookOpen'
  },
  buildGround: buildLifeGround,
  buildBall: buildLifeBall,
  getLighting: getLifeLighting,
  buildAccessory: buildLifeAccessory
};

export const DEFAULT_JOURNEY = Object.freeze({
  type: JOURNEY_TYPES.SPORTS,
  domain: 'football'
});
