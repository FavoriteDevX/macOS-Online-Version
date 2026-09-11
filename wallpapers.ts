import { WallpaperId } from '../types';
import neoIndigoImage from '../assets/images/macbook_neo_indigo_1789166371247.jpg';

export interface WallpaperOption {
  id: WallpaperId;
  name: string;
  className: string;
  previewGradient: string;
  imageUrl?: string;
}

export const WALLPAPERS: WallpaperOption[] = [
  {
    id: 'neo_indigo',
    name: 'MacBook Neo Indigo',
    className: 'wp-neo-indigo',
    previewGradient: 'linear-gradient(135deg, #090d23 0%, #152252 35%, #2a3b8c 70%, #ff9e7a 100%)',
    imageUrl: neoIndigoImage,
  },
  {
    id: 'sonoma',
    name: 'macOS Sonoma',
    className: 'wp-sonoma',
    previewGradient: 'linear-gradient(135deg, #2b2f77 0%, #a248a0 50%, #ff8a3d 100%)',
  },
  {
    id: 'sequoia',
    name: 'macOS Sequoia',
    className: 'wp-sequoia',
    previewGradient: 'linear-gradient(135deg, #1b3a2b 0%, #2f6b4f 50%, #d49a42 100%)',
  },
  {
    id: 'bigsur',
    name: 'macOS Big Sur',
    className: 'wp-bigsur',
    previewGradient: 'linear-gradient(135deg, #0f3a63 0%, #2f9bd6 50%, #cfeaf4 100%)',
  },
  {
    id: 'monterey',
    name: 'macOS Monterey',
    className: 'wp-monterey',
    previewGradient: 'linear-gradient(135deg, #1a2a6c 0%, #7d5fc7 50%, #ff8f7a 100%)',
  },
  {
    id: 'mojave',
    name: 'macOS Mojave Night',
    className: 'wp-mojave',
    previewGradient: 'linear-gradient(135deg, #141522 0%, #6a3a63 50%, #e0731f 100%)',
  },
  {
    id: 'graphite',
    name: 'macOS Dark Graphite',
    className: 'wp-graphite',
    previewGradient: 'radial-gradient(circle at 30% 20%, #4a4a4e, #1a1a1e 75%)',
  },
];
