import React, { useState } from 'react';
import { Image, Heart, Share2, ZoomIn, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  location: string;
  url: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: '1',
    title: 'Big Sur Pacific Coast',
    location: 'California, USA',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Yosemite National Park',
    location: 'Sierra Nevada, California',
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Apple Park Campus',
    location: 'Cupertino, California',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Tokyo Night Skyline',
    location: 'Shibuya, Tokyo, Japan',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    title: 'Northern Lights Aurora',
    location: 'Tromsø, Norway',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    title: 'Swiss Alps in Autumn',
    location: 'Bernese Oberland, Switzerland',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
  },
];

export default function PhotosApp() {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-full w-full select-none bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 overflow-hidden relative">
      {/* Sidebar */}
      <div className="w-48 shrink-0 bg-neutral-200/50 dark:bg-neutral-800/50 border-r border-black/10 dark:border-white/10 p-3 space-y-4">
        <div>
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2">
            Library
          </span>
          <div className="mt-1 space-y-0.5">
            <button className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white cursor-pointer">
              <Image className="w-4 h-4" />
              <span>All Photos</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </button>
          </div>
        </div>

        <button
          onClick={() => window.open('https://unsplash.com', '_blank', 'noopener,noreferrer')}
          className="w-full flex items-center justify-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Browse Unsplash</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-xl overflow-hidden aspect-video bg-neutral-800 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{photo.title}</p>
                  <p className="text-[10px] text-white/70 truncate">{photo.location}</p>
                </div>
                <button
                  onClick={(e) => toggleFavorite(photo.id, e)}
                  className="p-1 rounded-full bg-black/40 text-white hover:text-red-500 cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      favorites.includes(photo.id) ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 animate-fade-in">
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={activePhoto.url}
            alt={activePhoto.title}
            className="max-h-[80%] max-w-[90%] object-contain rounded-xl shadow-2xl"
          />
          <div className="mt-3 text-center text-white">
            <h3 className="font-semibold text-sm">{activePhoto.title}</h3>
            <p className="text-xs text-white/60">{activePhoto.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}
