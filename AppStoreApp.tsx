import React, { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { APPS } from '../../data/apps';

interface AppStoreProps {
  onOpenApp: (appId: string) => void;
}

export default function AppStoreApp({ onOpenApp }: AppStoreProps) {
  return (
    <div className="flex flex-col h-full w-full select-none bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 overflow-y-auto">
      {/* Featured Banner */}
      <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold uppercase tracking-wider opacity-80">
            Featured of the Week
          </span>
          <button
            onClick={() => window.open('https://apps.apple.com', '_blank', 'noopener,noreferrer')}
            className="flex items-center space-x-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Apple App Store</span>
          </button>
        </div>
        <h1 className="text-2xl font-black mt-2">macOS Sequoia Pro Essentials</h1>
        <p className="text-xs text-white/85 max-w-md mt-1">
          Explore native desktop applications with authentic Apple icon art, upward dock magnification, and responsive window controls.
        </p>
      </div>

      {/* Popular Apps Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold">Trending Apps</h2>
          <span className="text-xs text-neutral-400">Ready to launch</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {APPS.slice(0, 12).map((app) => (
            <div
              key={app.id}
              className="p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-xs border border-black/5 dark:border-white/5 flex items-center space-x-3.5 hover:shadow-md transition"
            >
              <img
                src={app.icon}
                alt={app.name}
                onError={(e) => {
                  if (app.fallbackIcon) e.currentTarget.src = app.fallbackIcon;
                }}
                className="w-12 h-12 object-contain rounded-xl drop-shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{app.name}</p>
                <p className="text-[10px] text-neutral-400">Utilities • 4.9 ★</p>
              </div>
              <button
                onClick={() => onOpenApp(app.id)}
                className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 hover:bg-blue-500 hover:text-white text-blue-500 text-xs font-bold transition cursor-pointer"
              >
                OPEN
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
