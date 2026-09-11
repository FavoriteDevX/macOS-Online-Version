import React, { useState } from 'react';
import { Mic, Sparkles, Send } from 'lucide-react';

interface SiriAppProps {
  onOpenApp: (appId: string) => void;
}

export default function SiriApp({ onOpenApp }: SiriAppProps) {
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('How can I help you today?');

  const handleAsk = (textToAsk?: string) => {
    const q = (textToAsk || query).toLowerCase().trim();
    if (!q) return;

    if (q.includes('time') || q.includes('date') || q.includes('clock')) {
      setReply(`It is ${new Date().toLocaleTimeString('en-US')} on ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.`);
    } else if (q.includes('weather') || q.includes('temperature')) {
      setReply('In Cupertino, California, it is 70°F and sunny with clear skies.');
    } else if (q.includes('safari')) {
      setReply('Opening Safari for web browsing...');
      onOpenApp('safari');
    } else if (q.includes('finder') || q.includes('file')) {
      setReply('Opening Finder to explore files...');
      onOpenApp('finder');
    } else if (q.includes('music') || q.includes('song')) {
      setReply('Starting Apple Music player...');
      onOpenApp('music');
    } else if (q.includes('terminal')) {
      setReply('Opening Terminal...');
      onOpenApp('terminal');
    } else {
      setReply(`Got it! Processing "${q}". All macOS system services are operating normally.`);
    }
    setQuery('');
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-neutral-900/95 text-white p-6 items-center justify-between">
      {/* Siri Header */}
      <div className="flex items-center space-x-2 text-neutral-400 text-xs">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span>Siri • Apple Intelligence</span>
      </div>

      {/* Animated Orb & Message */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-sm">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-75 animate-pulse" />
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 shadow-2xl flex items-center justify-center animate-spin"
            style={{ animationDuration: '8s' }}
          >
            <Mic className="w-8 h-8 text-white drop-shadow" />
          </div>
        </div>

        <p className="text-sm font-medium text-neutral-200 leading-relaxed min-h-[48px]">
          "{reply}"
        </p>

        {/* Quick prompt chips */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {['What time is it?', "What's the weather?", 'Open Safari', 'Play Music'].map((chip) => (
            <button
              key={chip}
              onClick={() => handleAsk(chip)}
              className="text-xs px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 transition cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Siri Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="w-full max-w-sm flex items-center bg-white/10 rounded-full px-4 py-2 text-xs border border-white/10 focus-within:border-blue-500/50"
      >
        <input
          type="text"
          placeholder="Ask Siri anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none w-full text-xs text-white placeholder:text-neutral-400"
        />
        <button
          type="submit"
          className="ml-2 p-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition cursor-pointer"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}
