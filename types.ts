export type ThemeMode = 'light' | 'dark';

export type WallpaperId =
  | 'neo_indigo'
  | 'sonoma'
  | 'sequoia'
  | 'bigsur'
  | 'monterey'
  | 'mojave'
  | 'graphite';

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  fallbackIcon?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  category?: 'productivity' | 'utilities' | 'creativity' | 'entertainment' | 'system';
  showInDock?: boolean;
  isSpecialAction?: boolean; // like launchpad
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  prevBounds?: { x: number; y: number; width: number; height: number };
}

export interface NoteItem {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
}

export interface ReminderItem {
  id: string;
  text: string;
  completed: boolean;
  list?: string;
}

export interface MessageItem {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface MessageThread {
  id: string;
  name: string;
  avatar: string;
  messages: MessageItem[];
}
