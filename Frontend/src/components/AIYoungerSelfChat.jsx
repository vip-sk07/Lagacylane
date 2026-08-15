import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Sparkles, RefreshCw, Cpu, CheckCircle2 } from 'lucide-react';

export default function AIYoungerSelfChat({ initialEra = 'Youth Era (2018-2020)', onClose, levels = [], currentUser }) {
  const [selectedEra, setSelectedEra] = useState(initialEra);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hey! I'm your AI Younger Self from the ${initialEra}. I remember tying my boots before the academy trials and dreaming of making it big. What's on your mind today?`,
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
    fetch('http://localhost:5000/api/memories/test-connection')
      .then(() => setOllamaStatus('connected'))
      .catch(() => setOllamaStatus('fallback'));
  }, []);

  const handleEraChange = (era) => {
    setSelectedEra(era);
    const newGreeting = {
      id: Date.now(),
      sender: 'ai',
      text: `Switched era to ${era}! I'm locked in with your memories logged during this period. Ask me about our training, match feelings, or how we handled pressure back then!`,
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

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser?.id || '',
          era: selectedEra,
          userMessage: currentInput
        })
      });

      const data = await response.json();
      const aiText = data.response || 'I remember working hard every single day. We never gave up!';

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: `I'm right here with you! During ${selectedEra}, our focus was 100% on grinding and improving every single day.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[620px] glass-panel rounded-3xl border border-purple-500/40 shadow-2xl shadow-purple-950/50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">AI Younger Self Chat</h3>
                <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <Cpu className="w-3 h-3" />
                  {ollamaStatus === 'connected' ? 'Ollama Llama3 (Live)' : 'Persona Engine'}
                </span>
              </div>
              <p className="text-xs text-slate-400">Conversational Era Persona Grounded on Logged Memories</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Era Selector Toolbar */}
        <div className="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold">Active Era Persona:</span>
          <select
            value={selectedEra}
            onChange={(e) => handleEraChange(e.target.value)}
            className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-700 text-purple-300 font-bold focus:outline-none focus:border-purple-400"
          >
            <option value="Youth Era (2018-2020)">Youth Era (2018-2020)</option>
            <option value="Pro Debut Era (2021-2023)">Pro Debut Era (2021-2023)</option>
            <option value="Championship Era (2024+)">Championship Era (2024+)</option>
          </select>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
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
                className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
                }`}
              >
                <p className="font-normal whitespace-pre-wrap">{msg.text}</p>
                <span className="text-[9px] text-slate-400 font-medium block mt-1.5 text-right">
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
                <span>Thinking back to {selectedEra}...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
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
