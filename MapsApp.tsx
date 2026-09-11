import React, { useState } from 'react';
import { MapPin, Navigation, Search, ExternalLink, Compass } from 'lucide-react';

interface CityPreset {
  name: string;
  location: string;
  bbox: string;
  query: string;
}

const PRESET_CITIES: CityPreset[] = [
  {
    name: 'Apple Park (Cupertino)',
    location: 'Cupertino, California',
    bbox: '-122.036,37.330,-122.028,37.338',
    query: 'One Apple Park Way, Cupertino, CA',
  },
  {
    name: 'San Francisco',
    location: 'California, United States',
    bbox: '-122.45,37.75,-122.38,37.81',
    query: 'San Francisco, CA',
  },
  {
    name: 'New York City',
    location: 'New York, United States',
    bbox: '-74.02,40.70,-73.93,40.78',
    query: 'New York City, NY',
  },
  {
    name: 'Tokyo',
    location: 'Kanto, Japan',
    bbox: '139.69,35.65,139.78,35.72',
    query: 'Tokyo, Japan',
  },
  {
    name: 'London',
    location: 'Greater London, United Kingdom',
    bbox: '-0.15,51.48,-0.06,51.54',
    query: 'London, UK',
  },
];

export default function MapsApp() {
  const [activeCity, setActiveCity] = useState<CityPreset>(PRESET_CITIES[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleOpenExternal = () => {
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(activeCity.query)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      {/* Header bar */}
      <div className="h-11 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="text-xs font-semibold">Apple Maps</span>
          <span className="text-xs text-neutral-400">• {activeCity.name}</span>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xs mx-4">
          <div className="flex items-center bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-lg text-xs">
            <Search className="w-3.5 h-3.5 text-neutral-400 mr-1.5" />
            <input
              type="text"
              placeholder="Search address or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-xs placeholder:text-neutral-400"
            />
          </div>
        </form>

        {/* Open Real Maps Button */}
        <button
          onClick={handleOpenExternal}
          className="flex items-center space-x-1.5 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors shadow-sm cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open in Google Maps</span>
        </button>
      </div>

      {/* Main Map Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* City Quick Picker Sidebar */}
        <div className="w-56 shrink-0 bg-white/80 dark:bg-neutral-800/80 border-r border-black/10 dark:border-white/10 p-3 space-y-1 overflow-y-auto">
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-2">
            Suggested Places
          </span>
          <div className="mt-1 space-y-1">
            {PRESET_CITIES.map((city) => (
              <button
                key={city.name}
                onClick={() => setActiveCity(city)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  activeCity.name === city.name
                    ? 'bg-blue-500 text-white font-medium shadow-sm'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="font-semibold">{city.name}</div>
                <div
                  className={`text-[10px] truncate ${
                    activeCity.name === city.name ? 'text-white/80' : 'text-neutral-400'
                  }`}
                >
                  {city.location}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Real Interactive OpenStreetMap Embed */}
        <div className="flex-1 relative h-full w-full bg-neutral-200">
          <iframe
            key={activeCity.bbox}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeCity.bbox}&layer=mapnik&marker=${activeCity.bbox.split(',')[1]}%2C${activeCity.bbox.split(',')[0]}`}
            title={`Map of ${activeCity.name}`}
            className="w-full h-full border-none"
          />

          {/* Map Overlay Badge */}
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow border border-black/10 dark:border-white/10 text-xs font-medium flex items-center space-x-2">
            <Compass className="w-3.5 h-3.5 text-blue-500 animate-spin-slow" />
            <span>Interactive Map Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
