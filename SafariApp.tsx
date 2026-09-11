import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Share2,
  Plus,
  Shield,
  Search,
  ExternalLink,
  Compass,
} from 'lucide-react';

interface FavoriteLink {
  title: string;
  url: string;
  iconBg: string;
  iconText: string;
}

const FAVORITES: FavoriteLink[] = [
  { title: 'Apple', url: 'https://www.apple.com', iconBg: 'bg-black text-white', iconText: '' },
  { title: 'Google', url: 'https://www.google.com', iconBg: 'bg-blue-600 text-white', iconText: 'G' },
  { title: 'Wikipedia', url: 'https://en.wikipedia.org', iconBg: 'bg-neutral-800 text-white', iconText: 'W' },
  { title: 'GitHub', url: 'https://github.com', iconBg: 'bg-neutral-950 text-white', iconText: '🐙' },
  { title: 'YouTube', url: 'https://www.youtube.com', iconBg: 'bg-red-600 text-white', iconText: '▶' },
  { title: 'Reddit', url: 'https://www.reddit.com', iconBg: 'bg-orange-600 text-white', iconText: 'r/' },
];

export default function SafariApp() {
  const [urlInput, setUrlInput] = useState('https://www.apple.com');
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = urlInput.trim();
    if (!url) return;

    if (!url.includes('.') || url.includes(' ')) {
      // Treat as search query
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    setUrlInput(url);
    setCurrentUrl(url);
  };

  const handleFavoriteClick = (url: string) => {
    setUrlInput(url);
    setCurrentUrl(url);
  };

  const handleOpenExternal = () => {
    const target = currentUrl || urlInput || 'https://www.google.com';
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      {/* Safari Navigation Bar */}
      <div className="h-11 px-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between space-x-3 bg-neutral-200/60 dark:bg-neutral-800/60">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentUrl(null)}
            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 cursor-pointer"
            title="Back to Start Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            className="p-1 rounded opacity-40 text-neutral-600 dark:text-neutral-400 cursor-default"
            title="Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (currentUrl) {
                const temp = currentUrl;
                setCurrentUrl(null);
                setTimeout(() => setCurrentUrl(temp), 50);
              }
            }}
            className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 cursor-pointer"
            title="Reload this page"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
          <div className="relative flex items-center bg-white/70 dark:bg-black/40 border border-black/10 dark:border-white/15 rounded-lg px-3 py-1 text-xs shadow-inner">
            <Shield className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Search or enter website name"
              className="bg-transparent outline-none w-full text-center text-xs text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400"
            />
            <button type="submit" className="text-neutral-400 hover:text-blue-500 cursor-pointer">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Action Controls */}
        <div className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400">
          <button
            onClick={handleOpenExternal}
            className="flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded hover:bg-black/10 dark:hover:bg-white/10 text-blue-500 transition-colors cursor-pointer"
            title="Open in real browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Real Tab</span>
          </button>
          <button
            onClick={() => setCurrentUrl(null)}
            className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
            title="New Tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safari Content Body */}
      <div className="flex-1 overflow-auto">
        {!currentUrl ? (
          /* Start Page */
          <div className="p-8 max-w-3xl mx-auto space-y-8 animate-fade-in">
            {/* Favorites Section */}
            <div>
              <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                Favorites
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {FAVORITES.map((fav) => (
                  <button
                    key={fav.title}
                    onClick={() => handleFavoriteClick(fav.url)}
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group cursor-pointer"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform ${fav.iconBg}`}
                    >
                      {fav.iconText}
                    </div>
                    <span className="text-xs font-medium mt-2 text-neutral-700 dark:text-neutral-300">
                      {fav.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Report Banner */}
            <div className="p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold">Privacy Report</h4>
                  <p className="text-[11px] text-neutral-500">
                    Safari prevented 41 trackers from profiling you this week.
                  </p>
                </div>
              </div>
              <button
                onClick={handleOpenExternal}
                className="text-xs font-medium text-blue-500 hover:underline cursor-pointer"
              >
                Browse Real Web →
              </button>
            </div>
          </div>
        ) : (
          /* Web Page Viewer / Fallback */
          <div className="w-full h-full flex flex-col bg-white">
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 border-b border-black/10 flex items-center justify-between text-xs px-4">
              <span className="text-neutral-600 dark:text-neutral-300 font-mono truncate">
                Viewing: {currentUrl}
              </span>
              <button
                onClick={handleOpenExternal}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium shadow-sm cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Real Browser</span>
              </button>
            </div>

            <iframe
              src={currentUrl}
              title="Safari Browser View"
              className="w-full flex-1 border-none bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        )}
      </div>
    </div>
  );
}
