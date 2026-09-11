import React, { useState } from 'react';
import {
  Monitor,
  Palette,
  HardDrive,
  Cpu,
  Info,
  Sliders,
  Sun,
  Moon,
  Check,
  Laptop,
} from 'lucide-react';
import { WALLPAPERS, WallpaperOption } from '../../data/wallpapers';

interface SettingsAppProps {
  currentWallpaper: WallpaperOption;
  onSelectWallpaper: (wp: WallpaperOption) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

type SettingsSection = 'appearance' | 'wallpaper' | 'displays' | 'about';

export default function SettingsApp({
  currentWallpaper,
  onSelectWallpaper,
  isDarkMode,
  onToggleDarkMode,
}: SettingsAppProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>('wallpaper');

  return (
    <div className="flex h-full w-full select-none bg-neutral-50/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200">
      {/* Settings Sidebar */}
      <div className="w-52 shrink-0 bg-neutral-200/50 dark:bg-neutral-800/50 border-r border-black/10 dark:border-white/10 p-3 flex flex-col space-y-1">
        <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-2 mb-2">
          System Settings
        </div>

        <button
          onClick={() => setActiveSection('wallpaper')}
          className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeSection === 'wallpaper'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Wallpaper</span>
        </button>

        <button
          onClick={() => setActiveSection('appearance')}
          className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeSection === 'appearance'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Appearance</span>
        </button>

        <button
          onClick={() => setActiveSection('displays')}
          className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeSection === 'displays'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Displays</span>
        </button>

        <button
          onClick={() => setActiveSection('about')}
          className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            activeSection === 'about'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>About</span>
        </button>
      </div>

      {/* Settings Content Pane */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {activeSection === 'wallpaper' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold">Wallpaper</h2>
              <p className="text-xs text-neutral-500">
                Choose an authentic Apple macOS desktop wallpaper.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => onSelectWallpaper(wp)}
                  className={`group relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer shadow-md ${
                    currentWallpaper.id === wp.id
                      ? 'border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-transparent hover:border-black/20 dark:hover:border-white/20'
                  }`}
                >
                  <div
                    style={{
                      backgroundImage: wp.imageUrl ? `url("${wp.imageUrl}")` : undefined,
                      background: wp.imageUrl ? undefined : wp.previewGradient,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    className="w-full h-full flex items-end p-2.5 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="text-[11px] font-semibold text-white drop-shadow relative z-10">
                      {wp.name}
                    </span>
                  </div>
                  {currentWallpaper.id === wp.id && (
                    <div className="absolute top-2 right-2 p-1 bg-blue-500 rounded-full text-white shadow">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold">Appearance</h2>
              <p className="text-xs text-neutral-500">
                Select the overall visual theme of your system.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (isDarkMode) onToggleDarkMode();
                }}
                className={`p-4 rounded-xl border flex flex-col items-center space-y-2 w-36 transition-all cursor-pointer ${
                  !isDarkMode
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Sun className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold">Light</span>
              </button>

              <button
                onClick={() => {
                  if (!isDarkMode) onToggleDarkMode();
                }}
                className={`p-4 rounded-xl border flex flex-col items-center space-y-2 w-36 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-100 flex items-center justify-center">
                  <Moon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold">Dark</span>
              </button>
            </div>
          </div>
        )}

        {activeSection === 'displays' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold">Displays</h2>
              <p className="text-xs text-neutral-500">Built-in Retina Display configuration.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
              <div className="flex items-center space-x-3">
                <Monitor className="w-8 h-8 text-blue-500" />
                <div>
                  <h4 className="text-sm font-semibold">Liquid Retina XDR Display</h4>
                  <p className="text-xs text-neutral-500">3024 × 1964 Native Resolution @ 120Hz ProMotion</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg text-white font-bold text-3xl">
                
              </div>
              <div>
                <h1 className="text-xl font-bold">macOS Sequoia</h1>
                <p className="text-xs text-neutral-500">Version 15.0 (24A335)</p>
                <p className="text-xs text-neutral-400 mt-1">Apple Intelligence Enabled</p>
              </div>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/5 text-xs bg-black/5 dark:bg-white/5 rounded-xl p-4 space-y-2">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Model</span>
                <span className="font-semibold">MacBook Pro (16-inch, 2024)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Chip</span>
                <span className="font-semibold">Apple M3 Max (16-core CPU, 40-core GPU)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Memory</span>
                <span className="font-semibold">36 GB Unified Memory</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Startup Disk</span>
                <span className="font-semibold">Macintosh HD (1 TB SSD)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Serial Number</span>
                <span className="font-mono text-[11px] text-neutral-400">C02G458XMD6M</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
