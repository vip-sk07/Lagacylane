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
      primary: '#10b981',
      secondary: '#059669',
      accentClass: 'from-emerald-500 to-green-600',
      threeColors: {
        primary: 0x10b981,
        secondary: 0x059669
      },
      glow: 'rgba(16, 185, 129, 0.4)',
      bg: 'from-slate-950 via-emerald-950/30 to-slate-950',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      nodeUnlocked: 'bg-emerald-500 text-slate-950 shadow-emerald-500/50',
      line: 'stroke-emerald-500',
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
      primary: '#22c55e',
      secondary: '#d97706',
      accentClass: 'from-green-500 to-lime-600',
      threeColors: {
        primary: 0x22c55e,
        secondary: 0xd97706
      },
      glow: 'rgba(132, 204, 22, 0.4)',
      bg: 'from-slate-950 via-lime-950/30 to-slate-950',
      badge: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
      nodeUnlocked: 'bg-lime-500 text-slate-950 shadow-lime-500/50',
      line: 'stroke-lime-500',
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
      primary: '#f97316',
      secondary: '#ea580c',
      accentClass: 'from-amber-500 to-orange-600',
      threeColors: {
        primary: 0xf97316,
        secondary: 0xea580c
      },
      glow: 'rgba(249, 115, 22, 0.4)',
      bg: 'from-slate-950 via-amber-950/30 to-slate-950',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      nodeUnlocked: 'bg-amber-500 text-slate-950 shadow-amber-500/50',
      line: 'stroke-amber-500',
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
      primary: '#ec4899',
      secondary: '#be185d',
      accentClass: 'from-pink-500 to-rose-600',
      threeColors: {
        primary: 0xec4899,
        secondary: 0xbe185d
      },
      glow: 'rgba(236, 72, 153, 0.4)',
      bg: 'from-slate-950 via-rose-950/30 to-slate-950',
      badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
      nodeUnlocked: 'bg-pink-500 text-slate-950 shadow-pink-500/50',
      line: 'stroke-pink-500',
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
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accentClass: 'from-cyan-500 to-blue-600',
    threeColors: {
      primary: 0x06b6d4,
      secondary: 0x3b82f6
    },
    glow: 'rgba(6, 182, 212, 0.4)',
    bg: 'from-slate-950 via-cyan-950/30 to-slate-950',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    nodeUnlocked: 'bg-cyan-500 text-slate-950 shadow-cyan-500/50',
    line: 'stroke-cyan-500',
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
