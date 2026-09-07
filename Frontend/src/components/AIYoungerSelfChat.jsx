import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Sparkles, RefreshCw, Cpu, CheckCircle2, BookOpen, Trophy } from 'lucide-react';
import { isSportsJourney, getActiveDomainDescriptor } from '../utils/journey';
import { JOURNEY_TYPES } from '../data/journeyConfig';
import { API_BASE_URL, testApiConnection } from '../utils/api';

export default function AIYoungerSelfChat({
  activeJourney,
  initialEra,
  onClose,
  levels = [],
  currentUser
}) {
  const isLife = activeJourney ? !isSportsJourney(activeJourney) : false;
  const descriptor = getActiveDomainDescriptor(activeJourney);
  const domainLabel = isLife ? 'Life Journal' : descriptor?.label || 'Sports';
  const domainId = activeJourney?.domain || (isLife ? 'life' : 'football');

  // Scope levels strictly to the active domain
  const domainLevels = levels.filter((l) => {
    if (isLife) {
      return l.journeyType === JOURNEY_TYPES.LIFE || !l.journeyType;
    }
    return (!l.journeyType || l.journeyType === JOURNEY_TYPES.SPORTS) && (!l.domain || l.domain === domainId);
  });

  // Dynamically derive eras from active domain memories only
  const derivedEras = Array.from(new Set(domainLevels.map((l) => l.era).filter(Boolean)));
  const fallbackEras = isLife
    ? ['College Days (2018-2022)', 'Career & Adulthood (2022+)', 'Present Day Reflections']
    : ['Youth Era (2018-2020)', 'Pro Debut Era (2021-2023)', 'Championship Era (2024+)'];

  const availableEras = derivedEras.length > 0 ? derivedEras : fallbackEras;

  // Determine starting era
  const defaultEra = initialEra && availableEras.includes(initialEra) ? initialEra : availableEras[0];
  const [selectedEra, setSelectedEra] = useState(defaultEra);

  // Initial greeting generator
  const getInitialGreeting = (era) => {
    if (isLife) {
      return `Hey! I'm your AI Younger Self from your Life Journal during ${era}. I hold the memories of your personal choices, college milestones, and early reflections. What would you like to explore today?`;
    }
    if (domainId === 'cricket') {
      return `Hey! I'm your AI Younger Self from your Cricket journey during ${era}. I remember swinging the new ball, perfecting our seam position, and fighting hard in every innings. What match or memory are we discussing today?`;
    }
    if (domainId === 'basketball') {
      return `Hey! I'm your AI Younger Self from your Basketball days during ${era}. I remember the morning drills on the hardwood and the rush of game-winning buzzer beaters. What's on your mind today?`;
    }
    if (domainId === 'athletics') {
      return `Hey! I'm your AI Younger Self from your Track & Field career during ${era}. I remember the interval training on the track and chasing every split second. What race or milestone are we revisiting?`;
    }
    return `Hey! I'm your AI Younger Self from your Football career during ${era}. I remember tying my boots before the academy trials and dreaming of leading the attack. What's on your mind today?`;
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: getInitialGreeting(defaultEra),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState('connecting'); // connecting, connected, fallback
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Check if backend service is reachable
  useEffect(() => {
    testApiConnection().then((isLive) => {
      setOllamaStatus(isLive ? 'connected' : 'fallback');
    });
  }, []);

  const handleEraChange = (era) => {
    setSelectedEra(era);
    const eraMemories = domainLevels.filter((l) => l.era === era);
    const memoryHint =
      eraMemories.length > 0
        ? ` I have ${eraMemories.length} logged ${domainLabel} memories from this time, including "${eraMemories[0].title}".`
        : '';

    const newGreeting = {
      id: Date.now(),
      sender: 'ai',
      text: `Switched era to ${era}! I'm now locked into your ${domainLabel} memories from this period.${memoryHint} What would you like to ask me about back then?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newGreeting]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    const ragPayload = {
      userId: currentUser?.id || 'usr_default',
      journeyType: isLife ? JOURNEY_TYPES.LIFE : JOURNEY_TYPES.SPORTS,
      domain: isLife ? null : domainId,
      era: selectedEra,
      userMessage: currentInput,
      clientMemories: domainLevels,
      history: messages.slice(-6).map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', content: m.text }))
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ragPayload)
      });

      const data = await response.json();
      const aiText = data.response || 'I remember working hard every single day. We never gave up!';

      const photoMem = domainLevels.find((l) => (l.mediaUrl || l.photo) && (
        aiText.toLowerCase().includes((l.title || '').toLowerCase()) || 
        currentInput.toLowerCase().includes('photo') || 
        currentInput.toLowerCase().includes('picture') ||
        currentInput.toLowerCase().includes('pic')
      ));

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiText,
          photo: photoMem ? (photoMem.mediaUrl || photoMem.photo) : null,
          photoCaption: photoMem ? (photoMem.caption || photoMem.photoCaption || photoMem.title) : null,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      const matchingMemories = domainLevels.filter((l) => l.era === selectedEra);
      let fallbackText = `I'm right here with you! During ${selectedEra} in our ${domainLabel} journey, our commitment was 100%.`;
      let photoUrl = null;
      let photoCap = null;

      if (matchingMemories.length > 0) {
        const topMemory = matchingMemories[0];
        if (topMemory.mediaUrl || topMemory.photo) {
          photoUrl = topMemory.mediaUrl || topMemory.photo;
          photoCap = topMemory.caption || topMemory.photoCaption || topMemory.title;
        }

        const lowerIn = currentInput.toLowerCase();
        if (lowerIn.includes('burnout') || lowerIn.includes('tired') || lowerIn.includes('giving up')) {
          fallbackText = `Hey... take a deep breath. Look at how far we've come since ${selectedEra}! Back then, we sacrificed so much sleep and sweat for this dream. Don't give up on us now—remember why we started! Remember "${topMemory.title}" (${topMemory.date}): "${topMemory.content || topMemory.matchDetails}". That fire is still inside you!`;
        } else if (lowerIn.includes('future') || lowerIn.includes('2025') || lowerIn.includes('2026') || lowerIn.includes('what happens')) {
          fallbackText = `I don't remember that happening yet—did that happen after this season? Back here in ${selectedEra}, I can only see the obstacles right in front of us! Tell me what our future looks like!`;
        } else if (isLife) {
          fallbackText = `Thinking back to ${selectedEra}, especially "${topMemory.title}" (${topMemory.date}): "${topMemory.content || topMemory.matchDetails}" That lesson shaped who we are today. Whatever challenges you are facing right now, trust the resilience we discovered back then!`;
        } else {
          fallbackText = `Looking back at ${selectedEra}, especially our match milestone in "${topMemory.title}" (${topMemory.matchDetails || topMemory.date}): We gave everything on the pitch. The discipline and composure we forged then are with you every step today!`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: fallbackText,
          photo: photoUrl,
          photoCaption: photoCap,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const matchingEraMemories = domainLevels.filter((l) => l.era === selectedEra);
  const firstMem = matchingEraMemories[0] || domainLevels[0];

  const quickPrompts = [
    firstMem ? `Tell me about "${firstMem.title}"` : `What was our biggest dream in ${selectedEra}?`,
    "Remind me why we started",
    firstMem?.mediaUrl ? "Look at our uploaded photo" : "How did we overcome our hardest day?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[640px] glass-panel rounded-3xl border border-purple-500/40 shadow-2xl shadow-purple-950/50 flex flex-col overflow-hidden">
        <div className="p-4 md:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">AI Younger Self — {domainLabel}</h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                  {isLife ? '🌱 Life Sanctuary' : '⚡ Sideline Ready'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Cognitively grounded in your {domainLevels.length} logged {domainLabel} milestones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            aria-label="Close Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Temporal Era:</span>
          {availableEras.map((era) => (
            <button
              key={era}
              onClick={() => handleEraChange(era)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedEra === era
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {era}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-purple-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                }`}
              >
                <p className="font-normal whitespace-pre-wrap">{msg.text}</p>
                {msg.photo && (
                  <div className="rounded-xl overflow-hidden border border-purple-500/30 max-w-[220px] bg-black/60 shadow-lg mt-2">
                    <img src={msg.photo} alt="Memory Visual" className="w-full h-28 object-cover" />
                    {msg.photoCaption && (
                      <p className="p-1.5 text-[10px] text-purple-200 italic bg-black/80">📸 "{msg.photoCaption}"</p>
                    )}
                  </div>
                )}
                <span className="text-[9px] text-slate-400 font-medium block text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-purple-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                <span>Thinking back to {selectedEra} in {domainLabel}...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/40 flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[9px] uppercase font-bold text-slate-400 shrink-0">Ask Younger Self:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(prompt);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-950/50 hover:border-purple-500/50 text-slate-300 text-[10px] font-medium border border-slate-800 shrink-0 transition-all text-left truncate max-w-[200px]"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask your younger self about ${selectedEra}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white disabled:opacity-50 transition-all shadow-md shadow-purple-950/40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
