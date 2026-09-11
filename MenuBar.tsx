import React, { useState, useEffect, useRef } from 'react';
import {
  Wifi,
  Search,
  Sliders,
  BatteryCharging,
  Moon,
  Sun,
  Lock,
  Power,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { ThemeMode } from '../types';

interface MenuBarProps {
  activeAppName: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenSpotlight: () => void;
  onOpenControlCenter: () => void;
  onOpenWifiModal: () => void;
  onLockScreen: () => void;
  onShutdown: () => void;
  onRestart: () => void;
  onOpenApp: (appId: string) => void;
}

export default function MenuBar({
  activeAppName,
  theme,
  onToggleTheme,
  onOpenSpotlight,
  onOpenControlCenter,
  onOpenWifiModal,
  onLockScreen,
  onShutdown,
  onRestart,
  onOpenApp,
}: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [activeMenuDropdown, setActiveMenuDropdown] = useState<string | null>(null);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(90);
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);

  const appleMenuRef = useRef<HTMLDivElement>(null);
  const controlCenterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (appleMenuRef.current && !appleMenuRef.current.contains(e.target as Node)) {
        setAppleMenuOpen(false);
        setActiveMenuDropdown(null);
      }
      if (controlCenterRef.current && !controlCenterRef.current.contains(e.target as Node)) {
        setControlCenterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      id="macos-menubar"
      className="fixed top-0 left-0 right-0 h-7 z-50 flex items-center justify-between px-3 text-[13px] select-none text-white font-medium bg-black/30 backdrop-blur-xl border-b border-white/10"
    >
      {/* Left side: Apple Logo and Menus */}
      <div className="flex items-center space-x-3.5 relative" ref={appleMenuRef}>
        {/* Apple Logo Menu */}
        <div className="relative">
          <button
            id="apple-menu-button"
            onClick={() => {
              setAppleMenuOpen(!appleMenuOpen);
              setActiveMenuDropdown(null);
            }}
            className={`p-1 rounded transition-colors ${
              appleMenuOpen ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            {/* Apple vector logo */}
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 170 170"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.87-11.93-14.49-5.84-9.02-10.45-19.16-13.84-30.41-3.38-11.25-5.08-21.84-5.08-31.76 0-14.28 3.59-25.99 10.77-35.14 7.18-9.16 16.4-13.86 27.67-14.1 4.79 0 10.22 1.34 16.3 4.02 6.08 2.68 10.15 4.08 12.21 4.21 1.76 0 5.96-1.44 12.61-4.32 6.64-2.88 12.38-4.14 17.2-3.79 13.06.98 23.36 5.86 30.89 14.64-11.45 6.94-17.06 16.48-16.84 28.62.22 9.53 3.99 17.65 11.32 24.36 7.33 6.71 15.93 10.46 25.8 11.25-2.29 6.83-4.99 13.82-8.11 20.97zM119.22 33.34c0-7.29 2.62-14.24 7.86-20.85 5.24-6.61 11.83-11.13 19.78-13.56.22 1.34.33 2.57.33 3.69 0 7.27-2.73 14.28-8.19 21.03-5.46 6.75-12.06 11.24-19.78 13.47v-3.78z" />
            </svg>
          </button>

          {/* Apple Dropdown */}
          {appleMenuOpen && (
            <div className="absolute top-7 left-0 w-60 py-1.5 bg-neutral-900/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/10 text-[13px] text-neutral-100 z-50 animate-fade-in">
              <button
                onClick={() => {
                  onOpenApp('settings');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
              >
                About This Mac
              </button>
              <div className="h-[1px] bg-white/10 my-1 mx-2" />
              <button
                onClick={() => {
                  onOpenApp('settings');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
              >
                System Settings...
              </button>
              <button
                onClick={() => {
                  onOpenApp('appstore');
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
              >
                App Store...
              </button>
              <a
                href="/macos-web-project.zip"
                download="macos-web-project.zip"
                onClick={() => setAppleMenuOpen(false)}
                className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors flex items-center justify-between font-medium text-emerald-400 hover:text-white"
              >
                <span>Download Project (.zip)</span>
                <span className="text-xs">⬇</span>
              </a>
              <div className="h-[1px] bg-white/10 my-1 mx-2" />
              <button
                onClick={() => {
                  onToggleTheme();
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors flex items-center justify-between"
              >
                <span>Dark Mode</span>
                <span>{theme === 'dark' ? '✓' : ''}</span>
              </button>
              <div className="h-[1px] bg-white/10 my-1 mx-2" />
              <button
                onClick={() => {
                  onLockScreen();
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors flex items-center justify-between"
              >
                <span>Lock Screen</span>
                <span className="text-[11px] opacity-60">^⌘Q</span>
              </button>
              <button
                onClick={() => {
                  onRestart();
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
              >
                Restart...
              </button>
              <button
                onClick={() => {
                  onShutdown();
                  setAppleMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
              >
                Shut Down...
              </button>
            </div>
          )}
        </div>

        {/* Active App Title */}
        <span className="font-bold tracking-tight text-white cursor-default">
          {activeAppName}
        </span>

        {/* Standard macOS App Menus */}
        {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((menu) => (
          <div key={menu} className="relative">
            <button
              onClick={() => {
                setActiveMenuDropdown(activeMenuDropdown === menu ? null : menu);
                setAppleMenuOpen(false);
              }}
              className={`px-1.5 py-0.5 rounded text-white/90 hover:text-white transition-colors ${
                activeMenuDropdown === menu ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              {menu}
            </button>

            {activeMenuDropdown === menu && (
              <div className="absolute top-7 left-0 w-48 py-1.5 bg-neutral-900/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/10 text-[13px] text-neutral-100 z-50 animate-fade-in">
                <button
                  onClick={() => setActiveMenuDropdown(null)}
                  className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  New Window
                </button>
                <button
                  onClick={() => setActiveMenuDropdown(null)}
                  className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Close Window
                </button>
                <div className="h-[1px] bg-white/10 my-1 mx-2" />
                <button
                  onClick={() => setActiveMenuDropdown(null)}
                  className="w-full text-left px-4 py-1 hover:bg-blue-600 hover:text-white rounded-md transition-colors"
                >
                  Preferences...
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side: Status Items */}
      <div className="flex items-center space-x-3 text-white/90">
        {/* Battery */}
        <div className="flex items-center space-x-1 hover:bg-white/10 px-1 py-0.5 rounded transition-colors cursor-default">
          <span className="text-[11px] font-medium">100%</span>
          <BatteryCharging className="w-4 h-4 fill-white/80" />
        </div>

        {/* Wi-Fi */}
        <button
          onClick={onOpenWifiModal}
          className="hover:bg-white/10 p-1 rounded transition-colors"
          title="Wi-Fi"
        >
          <Wifi className="w-3.5 h-3.5" />
        </button>

        {/* Spotlight */}
        <button
          onClick={onOpenSpotlight}
          className="hover:bg-white/10 p-1 rounded transition-colors"
          title="Spotlight Search"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center */}
        <div className="relative" ref={controlCenterRef}>
          <button
            onClick={() => setControlCenterOpen(!controlCenterOpen)}
            className={`p-1 rounded transition-colors ${
              controlCenterOpen ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            title="Control Center"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* Control Center Popup */}
          {controlCenterOpen && (
            <div className="absolute top-7 right-0 w-80 p-3 bg-neutral-900/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 text-neutral-100 z-50 animate-fade-in space-y-3">
              {/* Top Quick Toggles */}
              <div className="grid grid-cols-2 gap-2">
                {/* Wi-Fi toggle */}
                <div
                  onClick={() => setWifiOn(!wifiOn)}
                  className="bg-white/10 hover:bg-white/15 p-2.5 rounded-xl cursor-pointer flex items-center space-x-2.5 transition-colors"
                >
                  <div className={`p-2 rounded-full ${wifiOn ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold">Wi-Fi</div>
                    <div className="text-[10px] opacity-60">{wifiOn ? 'Home Network' : 'Off'}</div>
                  </div>
                </div>

                {/* Bluetooth toggle */}
                <div
                  onClick={() => setBluetoothOn(!bluetoothOn)}
                  className="bg-white/10 hover:bg-white/15 p-2.5 rounded-xl cursor-pointer flex items-center space-x-2.5 transition-colors"
                >
                  <div className={`p-2 rounded-full ${bluetoothOn ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}>
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold">Bluetooth</div>
                    <div className="text-[10px] opacity-60">{bluetoothOn ? 'AirPods Pro' : 'Off'}</div>
                  </div>
                </div>
              </div>

              {/* Display Brightness Slider */}
              <div className="bg-white/10 p-3 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Display</span>
                  <span className="opacity-60">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer h-1.5 rounded-lg bg-white/20"
                />
              </div>

              {/* Sound Volume Slider */}
              <div className="bg-white/10 p-3 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Sound</span>
                  <span className="opacity-60">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer h-1.5 rounded-lg bg-white/20"
                />
              </div>

              {/* Dark Mode Quick Toggle */}
              <button
                onClick={() => onToggleTheme()}
                className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                <span>{theme === 'dark' ? 'Dark Mode: On' : 'Dark Mode: Off'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Date & Time */}
        <div className="flex items-center space-x-1.5 cursor-default hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors text-[13px]">
          <span>{currentDate}</span>
          <span>{currentTime}</span>
        </div>
      </div>
    </header>
  );
}
