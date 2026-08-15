export const ATHLETE_PROFILES = {
  football: {
    id: 'football',
    name: 'Karan Sharma',
    role: 'Athlete',
    sport: 'Football',
    position: 'Central Attacking Midfielder (#10)',
    team: 'Legacy Lane Football Academy / City FC',
    stats: {
      matches: 48,
      goals: 34,
      assists: 22,
      mvpCount: 12,
      careerRating: '9.2'
    },
    theme: {
      accent: 'from-emerald-500 to-green-600',
      glow: 'rgba(16, 185, 129, 0.4)',
      bg: 'from-slate-950 via-emerald-950/30 to-slate-950',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      nodeUnlocked: 'bg-emerald-500 text-slate-950 shadow-emerald-500/50',
      line: 'stroke-emerald-500',
      icon: 'Trophy'
    },
    levels: [
      {
        id: 1,
        levelNumber: 1,
        title: 'Youth Academy Trials',
        era: 'Youth Era (2018-2020)',
        date: '2018-09-14',
        stars: 3,
        status: 'completed',
        matchDetails: 'Scored 2 goals on debut trial match. Selected for Academy U-18 squad.',
        stats: { goals: 2, assists: 1, rating: '8.9' },
        tags: ['Debut', 'Trial', 'High Hopes'],
        sentiment: 0.85,
        media: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
        content: 'The day I walked into the city academy complex with my old boots. The coach called my name in the 60th minute. Two minutes later, I hit the top right corner. A dream started today.'
      },
      {
        id: 2,
        levelNumber: 2,
        title: 'First Professional Contract',
        era: 'Youth Era (2018-2020)',
        date: '2020-03-22',
        stars: 3,
        status: 'completed',
        matchDetails: 'Signed official 3-year contract with City FC First Team.',
        stats: { contractYears: 3, squadNo: 10 },
        tags: ['Contract', 'Pro Debut', 'Milestone'],
        sentiment: 0.92,
        media: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
        content: 'Sat at the signing table with my family. Signed my first professional football contract. Wore jersey #10 for the first time.'
      },
      {
        id: 3,
        levelNumber: 3,
        title: 'ACL Injury & Mental Struggle',
        era: 'Pro Debut Era (2021-2023)',
        date: '2021-11-05',
        stars: 2,
        status: 'completed',
        matchDetails: 'Knee injury in 78th min against Rival FC. 8 months rehabilitation.',
        stats: { recoveryMonths: 8, resilience: '100%' },
        tags: ['Injury', 'Rehab', 'Mental Resilience'],
        sentiment: -0.42,
        media: 'https://images.unsplash.com/photo-1517649763962-0c6232662000?auto=format&fit=crop&w=800&q=80',
        content: 'Heard a pop in my left knee during a aerial duel. The doctor confirmed ACL tear. Darkest moment of my career, but I promised myself I would come back stronger than ever.'
      },
      {
        id: 4,
        levelNumber: 4,
        title: 'The Comeback Hattrick',
        era: 'Pro Debut Era (2021-2023)',
        date: '2022-09-18',
        stars: 3,
        status: 'completed',
        matchDetails: 'Came off bench in 65th minute. Scored 3 goals in 20 minutes!',
        stats: { goals: 3, assists: 0, rating: '9.8' },
        tags: ['Hattrick', 'Comeback', 'MOTM'],
        sentiment: 0.98,
        media: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
        content: 'Subbed on after 300 days out. First touch was a volley into the bottom net. Scored two more before the final whistle. The stadium roared my name.'
      },
      {
        id: 5,
        levelNumber: 5,
        title: 'Championship Winning Goal',
        era: 'Championship Era (2024+)',
        date: '2024-05-12',
        stars: 3,
        status: 'current',
        matchDetails: 'Free-kick winner in 94th minute of League Final.',
        stats: { goals: 1, assists: 1, rating: '9.6' },
        tags: ['Trophy', 'Champions', 'Golden Boot'],
        sentiment: 0.96,
        media: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
        content: 'Curved the free-kick over the wall into the top corner. We are League Champions!'
      }
    ]
  },

  cricket: {
    id: 'cricket',
    name: 'Karan Sharma',
    role: 'Athlete',
    sport: 'Cricket',
    position: 'Fast-Bowling All-Rounder (#7)',
    team: 'State Cricket Academy / Royals XI',
    stats: {
      matches: 54,
      wickets: 78,
      runs: 1420,
      highestScore: '108*',
      careerRating: '9.4'
    },
    theme: {
      accent: 'from-green-500 to-lime-600',
      glow: 'rgba(34, 197, 94, 0.4)',
      bg: 'from-slate-950 via-lime-950/30 to-slate-950',
      badge: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
      nodeUnlocked: 'bg-lime-500 text-slate-950 shadow-lime-500/50',
      line: 'stroke-lime-500',
      icon: 'Trophy'
    },
    levels: [
      {
        id: 1,
        levelNumber: 1,
        title: 'Under-19 State Championship Five-Wicket Haul',
        era: 'Youth Era (2018-2020)',
        date: '2019-01-20',
        stars: 3,
        status: 'completed',
        matchDetails: 'Took 5 wickets for 24 runs on green pitch pitch.',
        stats: { wickets: 5, runsConceded: 24, economy: '3.2' },
        tags: ['FiveWicketHaul', 'U19State', 'BowlingMagic'],
        sentiment: 0.94,
        media: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
        content: 'Swung the new seam ball both ways. Clean bowled the top order in the first spell. Led our state team into the finals!'
      },
      {
        id: 2,
        levelNumber: 2,
        title: 'First-Class Debut & Maiden Century',
        era: 'Pro Debut Era (2021-2023)',
        date: '2021-12-08',
        stars: 3,
        status: 'completed',
        matchDetails: 'Scored 108* batting at #7 under intense pressure.',
        stats: { runs: 108, fours: 12, sixes: 4 },
        tags: ['MaidenCentury', 'FirstClass', 'BattingHero'],
        sentiment: 0.96,
        media: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
        content: 'Walked in at 120/5. Played through the evening session. Reached my 100 with a lofted cover drive. Raised my helmet to the pavilion!'
      },
      {
        id: 3,
        levelNumber: 3,
        title: 'T20 League Final Last-Ball Six Winner',
        era: 'Championship Era (2024+)',
        date: '2024-04-28',
        stars: 3,
        status: 'current',
        matchDetails: 'Needed 5 runs off 1 ball. Hit a massive 95m six over long-on!',
        stats: { runs: 34, balls: 14, sixes: 4 },
        tags: ['T20Champions', 'LastBallSix', 'MatchWinner'],
        sentiment: 0.99,
        media: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
        content: '5 needed off the final delivery. Yorker length ball outside off, swung hard over long-on. The crowd erupted into wild celebrations!'
      }
    ]
  },

  basketball: {
    id: 'basketball',
    name: 'Karan Sharma',
    role: 'Athlete',
    sport: 'Basketball',
    position: 'Point Guard (#3)',
    team: 'Legacy Hoops / Metro Vipers',
    stats: {
      matches: 62,
      ppg: '26.4',
      apg: '8.2',
      rpg: '5.1',
      careerRating: '9.4'
    },
    theme: {
      accent: 'from-amber-500 to-orange-600',
      glow: 'rgba(245, 158, 11, 0.4)',
      bg: 'from-slate-950 via-amber-950/30 to-slate-950',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      nodeUnlocked: 'bg-amber-500 text-slate-950 shadow-amber-500/50',
      line: 'stroke-amber-500',
      icon: 'Activity'
    },
    levels: [
      {
        id: 1,
        levelNumber: 1,
        title: 'High School State Finals MVP',
        era: 'Rookie Days (2019-2021)',
        date: '2019-03-15',
        stars: 3,
        status: 'completed',
        matchDetails: 'Dropped 42 points in state final win. Hit game-winning buzzer beater.',
        stats: { points: 42, assists: 9, rating: '9.9' },
        tags: ['StateChamp', 'BuzzerBeater', 'MVP'],
        sentiment: 0.95,
        media: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
        content: '3 seconds left on the clock. Trailing by 1. Stepped back behind the arc and released the ball as the horn sounded. Swish!'
      },
      {
        id: 2,
        levelNumber: 2,
        title: 'College Draft First Round Pick',
        era: 'Rookie Days (2019-2021)',
        date: '2021-06-25',
        stars: 3,
        status: 'completed',
        matchDetails: 'Drafted #5 overall pick in National Pro League.',
        stats: { draftPick: '#5', team: 'Vipers' },
        tags: ['DraftDay', 'ProLeague', 'Pick5'],
        sentiment: 0.91,
        media: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
        content: 'Heard my name announced on live national broadcast. Put on the team cap and shook hands on stage.'
      },
      {
        id: 3,
        levelNumber: 3,
        title: 'Rookie of the Year Award',
        era: 'Pro Prime Era (2022-2024)',
        date: '2022-05-10',
        stars: 3,
        status: 'current',
        matchDetails: 'Averaged 22.5 PPG and 7.8 APG across rookie season.',
        stats: { ppg: '22.5', apg: '7.8', award: 'ROY' },
        tags: ['RookieOfTheYear', 'StatsLeader'],
        sentiment: 0.88,
        media: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
        content: 'Awarded Rookie of the Year trophy at the postseason gala.'
      }
    ]
  },

  journaler: {
    id: 'journaler',
    name: 'Karan Sharma',
    role: 'Primary User',
    sport: 'Life Journal',
    position: 'Story Creator',
    team: 'Personal Timeline',
    stats: {
      memoriesLogged: 84,
      erasRecorded: 4,
      streakDays: 45,
      wellnessIndex: '91/100'
    },
    theme: {
      accent: 'from-cyan-500 to-blue-600',
      glow: 'rgba(6, 182, 212, 0.4)',
      bg: 'from-slate-950 via-cyan-950/30 to-slate-950',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      nodeUnlocked: 'bg-cyan-500 text-slate-950 shadow-cyan-500/50',
      line: 'stroke-cyan-500',
      icon: 'BookOpen'
    },
    levels: [
      {
        id: 1,
        levelNumber: 1,
        title: 'First Coding Project Launch',
        era: 'College Days (2018-2022)',
        date: '2020-02-10',
        stars: 3,
        status: 'completed',
        matchDetails: 'Launched full-stack web application with 1,000 active users.',
        stats: { users: 1000, linesOfCode: 15000 },
        tags: ['Coding', 'Launch', 'Milestone'],
        sentiment: 0.89,
        media: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        content: 'Pushed final commit to GitHub. First 1,000 users logged in within 48 hours.'
      },
      {
        id: 2,
        levelNumber: 2,
        title: 'Graduation Day',
        era: 'College Days (2018-2022)',
        date: '2022-06-15',
        stars: 3,
        status: 'completed',
        matchDetails: 'Graduated with First Class Honors in Software Engineering.',
        stats: { gpa: '3.9', degree: 'B.Tech CS' },
        tags: ['Graduation', 'Engineering', 'Family'],
        sentiment: 0.94,
        media: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
        content: 'Threw graduation cap in the air with all my classmates. Family was cheering in the front row.'
      }
    ]
  }
};

export const INITIAL_CONNECTIONS = [
  {
    id: 'u2',
    name: 'Alex Rivera',
    username: '@arivera_11',
    role: 'Football Striker',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'accepted',
    sharedLevels: 4,
    recentMilestone: 'Scored 20th Goal of Season'
  },
  {
    id: 'u3',
    name: 'Marcus Vance',
    username: '@mvance_hoops',
    role: 'Basketball Guard',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'accepted',
    sharedLevels: 6,
    recentMilestone: 'Triple-Double in Semi-Finals'
  },
  {
    id: 'u5',
    name: 'Rohan Patel',
    username: '@rpatel_cricket',
    role: 'Cricket Pace Bowler',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'accepted',
    sharedLevels: 5,
    recentMilestone: '5-Wicket Haul in Championship Final'
  }
];
