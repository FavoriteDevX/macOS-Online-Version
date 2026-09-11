import React, { useState } from 'react';
import { Send, Search, Video, Phone, ExternalLink } from 'lucide-react';
import { MessageThread } from '../../types';

const INITIAL_THREADS: MessageThread[] = [
  {
    id: 'craig',
    name: 'Craig Federighi',
    avatar: '👨‍🦳',
    messages: [
      { id: '1', sender: 'them', text: 'Hey! The authentic macOS Dock icons look crisp.', time: '10:14 AM' },
      { id: '2', sender: 'them', text: 'The upward parabolic magnification and glass shadow match Sequoia perfectly!', time: '10:15 AM' },
    ],
  },
  {
    id: 'tim',
    name: 'Tim Cook',
    avatar: '👓',
    messages: [
      { id: '1', sender: 'them', text: 'Good morning! Welcome to macOS on the web.', time: '09:30 AM' },
      { id: '2', sender: 'them', text: 'Everything is running smoothly with native responsiveness.', time: '09:31 AM' },
    ],
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    avatar: '👩‍💻',
    messages: [
      { id: '1', sender: 'them', text: 'Did you check out the new wallpapers in System Settings?', time: '08:45 AM' },
    ],
  },
];

export default function MessagesApp() {
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('craig');
  const [inputText, setInputText] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const userMsg = {
      id: Date.now().toString(),
      sender: 'me' as const,
      text: inputText.trim(),
      time: timeStr,
    };

    const currentId = activeThreadId;
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === currentId) {
          return {
            ...t,
            messages: [...t.messages, userMsg],
          };
        }
        return t;
      })
    );
    setInputText('');

    // Simulated reply after 1 second
    setTimeout(() => {
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === currentId) {
            return {
              ...t,
              messages: [
                ...t.messages,
                {
                  id: (Date.now() + 1).toString(),
                  sender: 'them' as const,
                  text: 'Sounds great! Enjoy your macOS experience.',
                  time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                },
              ],
            };
          }
          return t;
        })
      );
    }, 1200);
  };

  return (
    <div className="flex h-full w-full select-none bg-neutral-50/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200">
      {/* Sidebar: Threads List */}
      <div className="w-60 shrink-0 bg-neutral-200/50 dark:bg-neutral-800/50 border-r border-black/10 dark:border-white/10 flex flex-col">
        {/* Search */}
        <div className="p-3 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-lg text-xs">
            <Search className="w-3.5 h-3.5 text-neutral-400 mr-1.5" />
            <input
              type="text"
              placeholder="Search messages"
              className="bg-transparent outline-none w-full text-xs placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {threads.map((thread) => {
            const lastMsg = thread.messages[thread.messages.length - 1];
            return (
              <div
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`flex items-center space-x-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                  thread.id === activeThreadId
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-lg shrink-0">
                  {thread.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs truncate">{thread.name}</span>
                    <span
                      className={`text-[10px] ${
                        thread.id === activeThreadId ? 'text-white/80' : 'text-neutral-400'
                      }`}
                    >
                      {lastMsg?.time}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      thread.id === activeThreadId ? 'text-white/90' : 'text-neutral-500'
                    }`}
                  >
                    {lastMsg?.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Pane */}
      <div className="flex-1 flex flex-col bg-white/70 dark:bg-neutral-900/70">
        {/* Header */}
        <div className="h-12 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-neutral-400">To:</span>
            <span className="font-bold text-xs">{activeThread.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-500">
            <button className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Bubble History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeThread.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-md px-3.5 py-2 rounded-2xl text-xs shadow-xs ${
                  msg.sender === 'me'
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-neutral-400 px-1 mt-0.5">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-black/10 dark:border-white/10">
          <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-full px-4 py-2 text-xs focus-within:ring-2 focus-within:ring-blue-500/30">
            <input
              type="text"
              placeholder="iMessage"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="bg-transparent outline-none w-full text-xs placeholder:text-neutral-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="ml-2 p-1 rounded-full bg-blue-500 text-white disabled:opacity-40 transition-opacity cursor-pointer"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
