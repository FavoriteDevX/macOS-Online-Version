import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ExternalLink } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  art: string;
  audioUrl: string;
}

const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    album: 'Starboy',
    duration: '3:50',
    art: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
  },
  {
    id: '2',
    title: 'Midnight City',
    artist: 'M83',
    album: "Hurry Up, We're Dreaming",
    duration: '4:03',
    art: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3',
  },
  {
    id: '3',
    title: 'Get Lucky',
    artist: 'Daft Punk ft. Pharrell Williams',
    album: 'Random Access Memories',
    duration: '4:08',
    art: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=empty-mind-118973.mp3',
  },
];

export default function MusicApp() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleOpenAppleMusic = () => {
    window.open('https://music.apple.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-neutral-900 text-white">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onEnded={handleNext}
      />

      {/* Main Track List & Player View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Album Cover / Now Playing Banner */}
        <div className="w-full md:w-64 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 bg-neutral-950/60">
          <img
            src={currentTrack.art}
            alt={currentTrack.album}
            className="w-40 h-40 rounded-2xl object-cover shadow-2xl drop-shadow-lg"
          />
          <div className="mt-4 text-center">
            <h3 className="font-bold text-sm truncate max-w-[200px]">{currentTrack.title}</h3>
            <p className="text-xs text-neutral-400 truncate max-w-[200px]">{currentTrack.artist}</p>
          </div>

          <button
            onClick={handleOpenAppleMusic}
            className="mt-4 flex items-center space-x-1.5 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full text-xs font-medium transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Apple Music</span>
          </button>
        </div>

        {/* Right Track List */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Playing Next
          </h4>
          <div className="space-y-1">
            {TRACKS.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => {
                  setCurrentTrackIndex(idx);
                  setIsPlaying(true);
                }}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition ${
                  idx === currentTrackIndex
                    ? 'bg-red-500/20 text-red-400'
                    : 'hover:bg-white/5 text-neutral-200'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="text-xs font-mono text-neutral-500 w-4">{idx + 1}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{t.title}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{t.artist}</p>
                  </div>
                </div>
                <span className="text-xs text-neutral-500 font-mono">{t.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Music Bottom Controller Bar */}
      <div className="h-16 px-6 border-t border-white/10 bg-neutral-950/80 flex items-center justify-between">
        {/* Small track info */}
        <div className="flex items-center space-x-3 w-48 min-w-0">
          <img src={currentTrack.art} alt="" className="w-9 h-9 rounded-lg object-cover" />
          <div className="min-w-0">
            <p className="text-xs font-medium truncate">{currentTrack.title}</p>
            <p className="text-[10px] text-neutral-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-4">
            <button onClick={handlePrev} className="p-1 hover:text-white text-neutral-400 cursor-pointer">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-white text-black hover:scale-105 transition shadow cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button onClick={handleNext} className="p-1 hover:text-white text-neutral-400 cursor-pointer">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono">
            <span>
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, '0')}
            </span>
            <div className="w-44 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${Math.min(100, (currentTime / 240) * 100)}%` }}
              />
            </div>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2 w-48 justify-end">
          <Volume2 className="w-4 h-4 text-neutral-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              if (audioRef.current) audioRef.current.volume = v / 100;
            }}
            className="w-20 h-1 accent-neutral-300"
          />
        </div>
      </div>
    </div>
  );
}
