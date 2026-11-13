import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { AppDefinition, WindowState } from './types';
import { APPS } from './apps';

interface DockProps {
  openWindows: WindowState[];
  activeWindowId: string | null;
  onLaunchApp: (appId: string) => void;
  onToggleLaunchpad: () => void;
  trashCount: number;
}

interface DockIconItemProps {
  key?: React.Key;
  app: AppDefinition;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  isRunning: boolean;
  isFocused: boolean;
  onClick: () => void;
  bouncing: boolean;
  calendarDay?: number;
  calendarMonth?: string;
}

function DockIconItem({
  app,
  mouseX,
  isRunning,
  isFocused,
  onClick,
  bouncing,
  calendarDay,
  calendarMonth,
}: DockIconItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(app.icon);

  // Parabolic distance calculation from mouse cursor
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Base icon size: 48px, smoothly magnifies to 68px within 120px range
  const sizeSync = useTransform(distance, [-120, 0, 120], [48, 68, 48]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 220, damping: 16 });

  const handleImgError = () => {
    if (app.fallbackIcon && imgSrc !== app.fallbackIcon) {
      setImgSrc(app.fallbackIcon);
    }
  };

  return (
    <div
      ref={ref}
      id={`dock-item-${app.id}`}
      className="relative flex flex-col items-center justify-end px-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* macOS Glass Tooltip */}
      {isHovered && (
        <div className="absolute -top-10 z-50 px-3 py-1 text-[11px] font-medium text-white/95 bg-neutral-900/80 backdrop-blur-xl rounded-lg shadow-xl border border-white/15 pointer-events-none whitespace-nowrap animate-fade-in">
          {app.name}
        </div>
      )}

      {/* Magnifying Animated Icon Container anchored at bottom center */}
      <motion.div
        style={{
          width: size,
          height: size,
          transformOrigin: 'bottom center',
        }}
        animate={
          bouncing
            ? {
                y: [0, -26, 0, -16, 0, -8, 0],
                transition: { duration: 1.1, ease: 'easeInOut' },
              }
            : { y: 0 }
        }
        whileTap={{ scale: 0.88 }}
        className="relative flex items-center justify-center cursor-pointer select-none"
      >
        <img
          src={imgSrc}
          alt={app.name}
          onError={handleImgError}
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-transform"
          draggable={false}
        />

        {/* Dynamic calendar date overlay for Calendar app */}
        {app.id === 'calendar' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none pb-0.5">
            <span className="text-[7.5px] font-extrabold text-red-500 uppercase tracking-tighter -mt-2">
              {calendarMonth || 'SEP'}
            </span>
            <span className="text-[16px] font-black text-neutral-800 dark:text-neutral-900 leading-none">
              {calendarDay || new Date().getDate()}
            </span>
          </div>
        )}
      </motion.div>

      {/* macOS Running Indicator Dot */}
      <div className="h-2 flex items-center justify-center mt-0.5">
        {isRunning && (
          <span
            className={`w-1 h-1 rounded-full transition-all duration-200 ${
              isFocused
                ? 'bg-neutral-900 dark:bg-white shadow-[0_0_4px_#ffffff]'
                : 'bg-neutral-800/60 dark:bg-white/60'
            }`}
          />
        )}
      </div>
    </div>
  );
}

export default function Dock({
  openWindows,
  activeWindowId,
  onLaunchApp,
  onToggleLaunchpad,
  trashCount,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const [bouncingApps, setBouncingApps] = useState<Record<string, boolean>>({});

  const now = new Date();
  const calendarDay = now.getDate();
  const calendarMonth = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  const triggerBounce = (appId: string) => {
    setBouncingApps((prev) => ({ ...prev, [appId]: true }));
    setTimeout(() => {
      setBouncingApps((prev) => ({ ...prev, [appId]: false }));
    }, 1100);
  };

  const handleAppClick = (app: AppDefinition) => {
    triggerBounce(app.id);
    if (app.id === 'launchpad') {
      onToggleLaunchpad();
    } else {
      onLaunchApp(app.id);
    }
  };

  // Dock items: all apps except trash
  const dockApps = APPS.filter((a) => a.id !== 'trash');
  const trashApp = APPS.find((a) => a.id === 'trash') || {
    id: 'trash',
    name: 'Trash',
    icon: '/icons/trash_empty.svg',
    fallbackIcon: '/Trash-Icon-284x298.png',
  };

  const isTrashOpen = openWindows.some((w) => w.appId === 'trash' && !w.isMinimized);

  return (
    <nav
      aria-label="macOS Dock"
      id="macos-dock-container"
      className="fixed bottom-2.5 left-0 right-0 z-40 flex justify-center pointer-events-none"
    >
      <div
        id="macos-dock"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end px-3 py-1.5 gap-1 rounded-[22px] bg-white/20 dark:bg-black/35 backdrop-blur-2xl border border-white/25 dark:border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.35)] relative overflow-visible"
        style={{
          overflow: 'visible',
        }}
      >
        {dockApps.map((app) => {
          const isRunning = openWindows.some((w) => w.appId === app.id);
          const isFocused = openWindows.some(
            (w) => w.appId === app.id && w.id === activeWindowId && !w.isMinimized
          );

          return (
            <DockIconItem
              key={app.id}
              app={app}
              mouseX={mouseX}
              isRunning={isRunning}
              isFocused={isFocused}
              bouncing={!!bouncingApps[app.id]}
              calendarDay={calendarDay}
              calendarMonth={calendarMonth}
              onClick={() => handleAppClick(app)}
            />
          );
        })}

        {/* macOS Dock Separator */}
        <div className="w-[1px] h-9 mx-1.5 self-center bg-black/15 dark:bg-white/20 shrink-0" />

        {/* Trash */}
        <DockIconItem
          key={trashApp.id}
          app={{
            ...trashApp,
            icon:
              trashCount > 0
                ? '/icons/trash_full.svg'
                : '/icons/trash_empty.svg',
            fallbackIcon: '/Trash-Icon-284x298.png',
          }}
          mouseX={mouseX}
          isRunning={isTrashOpen}
          isFocused={openWindows.some(
            (w) => w.appId === 'trash' && w.id === activeWindowId && !w.isMinimized
          )}
          bouncing={!!bouncingApps['trash']}
          onClick={() => handleAppClick(trashApp)}
        />
      </div>
    </nav>
  );
}
