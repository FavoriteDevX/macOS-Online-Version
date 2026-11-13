import React, { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { WindowState } from './types';
import { APP_MAP } from '../apps';

interface WindowFrameProps {
  key?: React.Key;
  window: WindowState;
  isActive: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onUpdateBounds: (id: string, bounds: { x: number; y: number; width: number; height: number }) => void;
  children: React.ReactNode;
}

const EXTERNAL_URLS: Record<string, string> = {
  safari: 'https://www.google.com',
  youtube: 'https://www.youtube.com',
  maps: 'https://www.google.com/maps',
  music: 'https://music.apple.com',
  mail: 'https://mail.google.com',
  messages: 'https://messages.google.com/web',
  appstore: 'https://apps.apple.com',
  facetime: 'https://facetime.apple.com',
  minecraft: 'https://classic.minecraft.net',
};

export default function WindowFrame({
  window,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdateBounds,
  children,
}: WindowFrameProps) {
  const [trafficHovered, setTrafficHovered] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; initW: number; initH: number } | null>(null);

  const appDef = APP_MAP.get(window.appId);
  const externalUrl = EXTERNAL_URLS[window.appId];

  // Handle Dragging
  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    if ((e.target as HTMLElement).closest('.traffic-light-button')) return;
    if ((e.target as HTMLElement).closest('.external-link-btn')) return;

    onFocus(window.id);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: window.x,
      initY: window.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      const newX = Math.max(10, Math.min(document.documentElement.clientWidth - 100, dragRef.current.initX + dx));
      const newY = Math.max(30, Math.min(document.documentElement.clientHeight - 80, dragRef.current.initY + dy));

      onUpdateBounds(window.id, {
        x: newX,
        y: newY,
        width: window.width,
        height: window.height,
      });
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle Resizing
  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.isMaximized) return;

    onFocus(window.id);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initW: window.width,
      initH: window.height,
    };

    const minW = appDef?.minWidth || 340;
    const minH = appDef?.minHeight || 280;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;
      const dw = moveEvent.clientX - resizeRef.current.startX;
      const dh = moveEvent.clientY - resizeRef.current.startY;

      const newW = Math.max(minW, resizeRef.current.initW + dw);
      const newH = Math.max(minH, resizeRef.current.initH + dh);

      onUpdateBounds(window.id, {
        x: window.x,
        y: window.y,
        width: newW,
        height: newH,
      });
    };

    const handleMouseUp = () => {
      resizeRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (window.isMinimized) return null;

  const style: React.CSSProperties = window.isMaximized
    ? {
        position: 'fixed',
        top: '28px',
        left: 0,
        right: 0,
        bottom: '76px',
        width: '100%',
        height: 'calc(100vh - 104px)',
        zIndex: window.zIndex,
      }
    : {
        position: 'fixed',
        left: `${window.x}px`,
        top: `${window.y}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
        zIndex: window.zIndex,
      };

  const handleOpenForReal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (externalUrl) {
      globalThis.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      id={`window-${window.id}`}
      style={style}
      onMouseDown={() => onFocus(window.id)}
      className={`flex flex-col rounded-xl overflow-hidden transition-shadow duration-200 select-none ${
        window.isMaximized ? 'rounded-none' : ''
      } ${
        isActive
          ? 'macos-window-shadow-focused ring-1 ring-white/25 dark:ring-white/15'
          : 'macos-window-shadow ring-1 ring-white/10 dark:ring-black/40'
      } bg-neutral-100/95 dark:bg-neutral-900/95 backdrop-blur-3xl text-neutral-800 dark:text-neutral-100`}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleMouseDownHeader}
        onDoubleClick={() => onMaximize(window.id)}
        className="h-10 shrink-0 flex items-center justify-between px-3.5 bg-neutral-200/80 dark:bg-neutral-800/80 border-b border-black/10 dark:border-white/10 cursor-default"
      >
        {/* macOS Traffic Light Buttons */}
        <div
          className="flex items-center space-x-2"
          onMouseEnter={() => setTrafficHovered(true)}
          onMouseLeave={() => setTrafficHovered(false)}
        >
          {/* Close (Red) */}
          <button
            onClick={() => onClose(window.id)}
            className="traffic-light-button w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-black/70 hover:opacity-90 active:brightness-75 transition-opacity cursor-pointer"
            title="Close"
          >
            {trafficHovered && (
              <span className="text-[9px] leading-none font-bold select-none">×</span>
            )}
          </button>

          {/* Minimize (Yellow) */}
          <button
            onClick={() => onMinimize(window.id)}
            className="traffic-light-button w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-black/70 hover:opacity-90 active:brightness-75 transition-opacity cursor-pointer"
            title="Minimize"
          >
            {trafficHovered && (
              <span className="text-[9px] leading-none font-bold select-none -mt-0.5">−</span>
            )}
          </button>

          {/* Zoom (Green) */}
          <button
            onClick={() => onMaximize(window.id)}
            className="traffic-light-button w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-black/70 hover:opacity-90 active:brightness-75 transition-opacity cursor-pointer"
            title="Zoom"
          >
            {trafficHovered && (
              <span className="text-[8px] leading-none font-bold select-none">+</span>
            )}
          </button>
        </div>

        {/* Window Title & Icon */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 truncate pointer-events-none">
          {appDef && (
            <img
              src={appDef.icon}
              alt=""
              className="w-4 h-4 rounded-sm object-contain"
              onError={(e) => {
                if (appDef.fallbackIcon) e.currentTarget.src = appDef.fallbackIcon;
              }}
            />
          )}
          <span className="truncate">{window.title || appDef?.name}</span>
        </div>

        {/* Right Action Bar: Open Real App Button */}
        <div className="flex items-center space-x-2">
          {externalUrl && (
            <button
              onClick={handleOpenForReal}
              className="external-link-btn flex items-center space-x-1 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-500 dark:hover:text-blue-400 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 rounded-md transition-colors"
              title="Open real app in new browser tab"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Open Real App</span>
            </button>
          )}
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-white/50 dark:bg-neutral-900/50">
        {children}
      </div>

      {/* Resize Handle (Bottom-Right) */}
      {!window.isMaximized && (
        <div
          onMouseDown={handleMouseDownResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-30 flex items-end justify-end p-0.5 opacity-40 hover:opacity-100"
          title="Resize"
        >
          <svg className="w-2.5 h-2.5 fill-current text-neutral-400" viewBox="0 0 6 6">
            <path d="M6 6H4V4H6V6ZM6 2H4V0H6V2ZM2 6H0V4H2V6Z" />
          </svg>
        </div>
      )}
    </div>
  );
}
