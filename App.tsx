import React, { useState } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowFrame from './WindowFrame';
import DesktopIcons from './DesktopIcons';
import { WindowState } from './types';
import { APP_MAP, APPS } from './apps';
import { WALLPAPERS, WallpaperOption } from './wallpapers';

// Sub-apps
import FinderApp from './FinderApp';
import SafariApp from './SafariApp';
import MessagesApp from './MessagesApp';
import MailApp from './MailApp';
import MapsApp from './MapsApp';
import PhotosApp from './PhotosApp';
import MusicApp from './MusicApp';
import CalendarApp from './CalendarApp';
import RemindersApp from './RemindersApp';
import NotesApp from './NotesApp';
import NumbersApp from './NumbersApp';
import FinalCutApp from './FinalCutApp';
import MotionApp from './MotionApp';
import ArcadeApp from './ArcadeApp';
import AppStoreApp from './AppStoreApp';
import TextEditApp from './TextEditApp';
import CalculatorApp from './CalculatorApp';
import TerminalApp from './TerminalApp';
import MinecraftApp from './MinecraftApp';
import YouTubeApp from './YouTubeApp';
import SiriApp from './SiriApp';
import SettingsApp from './SettingsApp';
import TrashApp from './TrashApp';

export default function App() {
  const [wallpaper, setWallpaper] = useState<WallpaperOption>(WALLPAPERS[0]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [maxZ, setMaxZ] = useState(10);

  // Initial demo window: Finder and Notes
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'finder-init',
      appId: 'finder',
      title: 'Finder',
      x: 80,
      y: 70,
      width: 720,
      height: 460,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
    },
  ]);

  const [activeWindowId, setActiveWindowId] = useState<string | null>('finder-init');

  // Running apps set
  const runningAppIds = new Set(windows.map((w) => w.appId));

  // Determine active app name for the MenuBar
  const activeWindow = windows.find((w) => w.id === activeWindowId && !w.isMinimized);
  const activeAppName = activeWindow
    ? APP_MAP.get(activeWindow.appId)?.name || 'Finder'
    : 'Finder';

  const handleFocusWindow = (id: string) => {
    setActiveWindowId(id);
    setMaxZ((prev) => {
      const nextZ = prev + 1;
      setWindows((curr) =>
        curr.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w))
      );
      return nextZ;
    });
  };

  const handleLaunchApp = (appId: string) => {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        setWindows((prev) =>
          prev.map((w) => (w.id === existing.id ? { ...w, isMinimized: false } : w))
        );
      }
      handleFocusWindow(existing.id);
      return;
    }

    const appDef = APP_MAP.get(appId);
    const defW = appDef?.defaultWidth || 640;
    const defH = appDef?.defaultHeight || 420;

    // Offset cascade
    const offsetCount = (windows.length % 5) * 28;
    const initialX = Math.max(20, Math.min(window.innerWidth - defW - 20, 100 + offsetCount));
    const initialY = Math.max(35, Math.min(window.innerHeight - defH - 90, 60 + offsetCount));

    const nextZ = maxZ + 1;
    setMaxZ(nextZ);

    const newWin: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: appDef?.name || 'Application',
      x: initialX,
      y: initialY,
      width: defW,
      height: defH,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZ,
    };

    setWindows((prev) => [...prev, newWin]);
    setActiveWindowId(newWin.id);
  };

  const handleCloseWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        const topWin = remaining.reduce((prev, curr) => (curr.zIndex > prev.zIndex ? curr : prev));
        setActiveWindowId(topWin.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      const remaining = windows.filter((w) => w.id !== id && !w.isMinimized);
      if (remaining.length > 0) {
        const topWin = remaining.reduce((prev, curr) => (curr.zIndex > prev.zIndex ? curr : prev));
        setActiveWindowId(topWin.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const handleMaximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    handleFocusWindow(id);
  };

  const handleUpdateBounds = (
    id: string,
    bounds: { x: number; y: number; width: number; height: number }
  ) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...bounds } : w))
    );
  };

  const renderAppContent = (win: WindowState) => {
    switch (win.appId) {
      case 'finder':
        return <FinderApp onOpenApp={handleLaunchApp} />;
      case 'safari':
        return <SafariApp />;
      case 'messages':
        return <MessagesApp />;
      case 'mail':
        return <MailApp />;
      case 'maps':
        return <MapsApp />;
      case 'photos':
        return <PhotosApp />;
      case 'music':
        return <MusicApp />;
      case 'calendar':
        return <CalendarApp />;
      case 'reminders':
        return <RemindersApp />;
      case 'notes':
        return <NotesApp />;
      case 'numbers':
        return <NumbersApp />;
      case 'finalcut':
        return <FinalCutApp />;
      case 'motion':
        return <MotionApp />;
      case 'arcade':
        return <ArcadeApp />;
      case 'appstore':
        return <AppStoreApp onOpenApp={handleLaunchApp} />;
      case 'textedit':
        return <TextEditApp />;
      case 'calculator':
        return <CalculatorApp />;
      case 'terminal':
        return <TerminalApp onOpenApp={handleLaunchApp} />;
      case 'minecraft':
        return <MinecraftApp />;
      case 'youtube':
        return <YouTubeApp />;
      case 'siri':
        return <SiriApp onOpenApp={handleLaunchApp} />;
      case 'settings':
        return (
          <SettingsApp
            currentWallpaper={wallpaper}
            onSelectWallpaper={setWallpaper}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        );
      case 'trash':
        return <TrashApp />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <h3 className="text-base font-bold">{win.title}</h3>
            <p className="text-xs text-neutral-400 mt-1">Application loaded successfully.</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`h-screen w-screen overflow-hidden flex flex-col relative select-none ${
        isDarkMode ? 'dark' : ''
      }`}
      style={{
        backgroundImage: wallpaper.imageUrl ? `url("${wallpaper.imageUrl}")` : undefined,
        background: wallpaper.imageUrl ? undefined : wallpaper.previewGradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top macOS Menu Bar */}
      <MenuBar
        activeAppName={activeAppName}
        theme={isDarkMode ? 'dark' : 'light'}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenSpotlight={() => handleLaunchApp('finder')}
        onOpenControlCenter={() => handleLaunchApp('settings')}
        onOpenWifiModal={() => handleLaunchApp('settings')}
        onLockScreen={() => {}}
        onShutdown={() => {}}
        onRestart={() => window.location.reload()}
        onOpenApp={handleLaunchApp}
      />

      {/* Desktop Background Area */}
      <main
        className="flex-1 relative overflow-hidden"
        onClick={() => {
          // click on empty desktop drops window focus if desired
        }}
      >
        {/* Desktop Shortcuts */}
        <DesktopIcons onOpenApp={handleLaunchApp} />

        {/* Render Windows */}
        {windows.map((win) => (
          <WindowFrame
            key={win.id}
            window={win}
            isActive={activeWindowId === win.id}
            onFocus={handleFocusWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onUpdateBounds={handleUpdateBounds}
          >
            {renderAppContent(win)}
          </WindowFrame>
        ))}
      </main>

      {/* Interactive macOS Dock */}
      <Dock
        openWindows={windows}
        activeWindowId={activeWindowId}
        onLaunchApp={handleLaunchApp}
        onToggleLaunchpad={() => handleLaunchApp('appstore')}
        trashCount={3}
      />
    </div>
  );
}
