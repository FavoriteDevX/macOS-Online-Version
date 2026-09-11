import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Scissors,
  Layers,
  Film,
  Music,
  ExternalLink,
} from 'lucide-react';

export default function FinalCutApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(35); // 0 to 100%

  return (
    <div className="flex flex-col h-full w-full select-none bg-[#121214] text-neutral-200">
      {/* Top Header / Menus */}
      <div className="h-9 px-3 border-b border-white/10 flex items-center justify-between bg-[#1e1e22] text-xs">
        <div className="flex items-center space-x-3 text-neutral-400">
          <span className="font-bold text-white">Final Cut Pro</span>
          <span className="hover:text-white cursor-pointer">Library: Cinema Project</span>
          <span className="hover:text-white cursor-pointer">Event: Master Sequence</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] font-mono text-emerald-400">
          <span>4K ProRes 422 HQ • 24.00 fps</span>
          <button
            onClick={() => window.open('https://www.apple.com/final-cut-pro/', '_blank', 'noopener,noreferrer')}
            className="flex items-center space-x-1 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <ExternalLink className="w-3 h-3" />
            <span>apple.com</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport (Upper Half) */}
      <div className="flex-1 flex min-h-0 border-b border-white/10">
        {/* Media Browser */}
        <div className="w-64 border-r border-white/10 flex flex-col bg-[#161618]">
          <div className="p-2.5 border-b border-white/10 text-xs font-semibold text-neutral-400 flex items-center space-x-2">
            <Film className="w-3.5 h-3.5 text-blue-400" />
            <span>Media Browser</span>
          </div>
          <div className="p-2 space-y-2 overflow-y-auto text-xs">
            <div className="p-2 rounded bg-white/5 border border-white/10 hover:border-blue-500 cursor-pointer flex items-center space-x-2">
              <div className="w-12 h-8 bg-neutral-800 rounded flex items-center justify-center font-mono text-[9px] text-neutral-500">
                CLIP 01
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">Sonoma_Coastline_Aerial.mov</p>
                <p className="text-[10px] text-neutral-400">00:15:20</p>
              </div>
            </div>

            <div className="p-2 rounded bg-white/5 border border-white/10 hover:border-blue-500 cursor-pointer flex items-center space-x-2">
              <div className="w-12 h-8 bg-neutral-800 rounded flex items-center justify-center font-mono text-[9px] text-neutral-500">
                CLIP 02
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">Dialogue_CloseUp_A.mov</p>
                <p className="text-[10px] text-neutral-400">00:08:44</p>
              </div>
            </div>

            <div className="p-2 rounded bg-white/5 border border-white/10 hover:border-blue-500 cursor-pointer flex items-center space-x-2">
              <div className="w-12 h-8 bg-neutral-800 rounded flex items-center justify-center font-mono text-[9px] text-neutral-500">
                AUDIO
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">Soundtrack_Orchestra.wav</p>
                <p className="text-[10px] text-neutral-400">03:45:12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Canvas Viewer */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#09090b] relative p-4">
          <div className="w-full max-w-lg aspect-video bg-neutral-900 border border-white/10 rounded shadow-2xl relative overflow-hidden flex items-center justify-center">
            {/* Mock video content */}
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/60 px-2 py-0.5 rounded font-mono text-[10px] text-emerald-400">
              REC • 00:01:24:18
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center space-x-4 mt-3">
            <button
              onClick={() => setTimelineProgress(0)}
              className="p-1 hover:text-white text-neutral-400 cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white text-black hover:scale-105 transition cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setTimelineProgress(100)}
              className="p-1 hover:text-white text-neutral-400 cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Editor (Bottom Half) */}
      <div className="h-44 flex flex-col bg-[#161619] p-3 space-y-2">
        {/* Timeline toolbar */}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 hover:text-white cursor-pointer">
              <Scissors className="w-3.5 h-3.5" />
              <span>Blade Tool (B)</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-white cursor-pointer">
              <Layers className="w-3.5 h-3.5" />
              <span>Index</span>
            </button>
          </div>
          <span className="font-mono text-[11px] text-neutral-300">00:01:24:18 / 00:04:12:00</span>
        </div>

        {/* Magnetic Timeline tracks */}
        <div className="flex-1 bg-neutral-950/80 rounded border border-white/5 relative p-2 flex flex-col justify-center space-y-1.5 overflow-hidden">
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-20 pointer-events-none"
            style={{ left: `${timelineProgress}%` }}
          >
            <div className="w-2.5 h-2.5 bg-red-500 -ml-1 rotate-45" />
          </div>

          {/* Video track */}
          <div className="h-9 w-full flex space-x-1">
            <div className="w-[35%] h-full bg-blue-600/80 rounded-sm border border-blue-400/40 px-2 flex items-center text-[10px] font-mono text-white truncate">
              Sonoma_Coastline_Aerial.mov
            </div>
            <div className="w-[45%] h-full bg-purple-600/80 rounded-sm border border-purple-400/40 px-2 flex items-center text-[10px] font-mono text-white truncate">
              Dialogue_CloseUp_A.mov
            </div>
            <div className="w-[20%] h-full bg-indigo-600/80 rounded-sm border border-indigo-400/40 px-2 flex items-center text-[10px] font-mono text-white truncate">
              B-Roll_Sunset.mov
            </div>
          </div>

          {/* Audio track */}
          <div className="h-6 w-full flex space-x-1">
            <div className="w-[80%] h-full bg-emerald-600/80 rounded-sm border border-emerald-400/40 px-2 flex items-center text-[9px] font-mono text-white truncate">
              <Music className="w-3 h-3 mr-1 shrink-0" />
              Master_Score_Stereo.wav
            </div>
            <div className="w-[20%] h-full bg-emerald-700/60 rounded-sm border border-emerald-500/30 px-2 flex items-center text-[9px] font-mono text-white truncate">
              SFX_Waves.wav
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
