import React, { useState } from 'react';
import { Search, Play, ExternalLink, ThumbsUp, Share2, Sparkles } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  embedId: string;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Apple Keynote: Introducing macOS Sequoia & Apple Intelligence',
    channel: 'Apple',
    views: '4.8M views',
    time: '3 months ago',
    embedId: 'RXeOiIDNNek',
  },
  {
    id: '2',
    title: 'lofi hip hop radio - beats to relax/study to',
    channel: 'Lofi Girl',
    views: '84M views',
    time: 'Live',
    embedId: 'jfKfPfyJRdk',
  },
  {
    id: '3',
    title: 'Minecraft 15th Anniversary Official Animation',
    channel: 'Minecraft',
    views: '9.2M views',
    time: '4 months ago',
    embedId: 'M_XwzBMTJaM',
  },
  {
    id: '4',
    title: 'Top 10 macOS Features You Should Be Using',
    channel: 'Marques Brownlee',
    views: '3.1M views',
    time: '2 weeks ago',
    embedId: 'dQw4w9WgXcQ',
  },
];

export default function YouTubeApp() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(DEFAULT_VIDEOS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customEmbed, setCustomEmbed] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // If user pasted a youtube URL or video ID:
    const match = query.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      setCustomEmbed(match[1]);
      return;
    }

    // Open real YouTube search or play matching
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenOnYouTube = () => {
    const videoId = customEmbed || selectedVideo.embedId;
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
  };

  const currentEmbedId = customEmbed || selectedVideo.embedId;

  return (
    <div className="flex flex-col h-full w-full select-none bg-[#0f0f0f] text-white overflow-y-auto">
      {/* YouTube Top Bar */}
      <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between bg-[#0f0f0f] sticky top-0 z-20">
        <div className="flex items-center space-x-2 font-bold text-sm tracking-tighter">
          <div className="w-7 h-5 bg-red-600 rounded-md flex items-center justify-center">
            <Play className="w-3 h-3 fill-white text-white" />
          </div>
          <span className="text-base tracking-tight font-bold">YouTube</span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <div className="flex items-center bg-[#222] border border-white/15 rounded-full px-3.5 py-1.5 text-xs focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Search or paste YouTube URL / video ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-xs text-white placeholder:text-neutral-500"
            />
            <button type="submit" className="text-neutral-400 hover:text-white cursor-pointer ml-2">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Direct Button: Open on YouTube */}
        <button
          onClick={handleOpenOnYouTube}
          className="flex items-center space-x-1.5 px-3 py-1 bg-red-600/90 hover:bg-red-600 text-white rounded-full text-xs font-semibold shadow transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open YouTube.com</span>
        </button>
      </div>

      {/* Main Video Theater */}
      <div className="p-4 space-y-4 max-w-5xl mx-auto w-full">
        {/* Active Player */}
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${currentEmbedId}?autoplay=0&rel=0`}
            title={selectedVideo.title}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h1 className="text-base font-bold leading-tight">{selectedVideo.title}</h1>
            <div className="flex items-center space-x-3 text-xs text-neutral-400 mt-1">
              <span className="font-medium text-white">{selectedVideo.channel}</span>
              <span>•</span>
              <span>{selectedVideo.views}</span>
              <span>•</span>
              <span>{selectedVideo.time}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenOnYouTube}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-medium cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Watch on YouTube</span>
            </button>
          </div>
        </div>

        {/* Suggested Videos Grid */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Popular on macOS Desktop
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {DEFAULT_VIDEOS.map((vid) => (
              <div
                key={vid.id}
                onClick={() => {
                  setSelectedVideo(vid);
                  setCustomEmbed(null);
                }}
                className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                  selectedVideo.id === vid.id && !customEmbed
                    ? 'bg-white/15 border-white/30'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="aspect-video bg-neutral-800 rounded-lg flex items-center justify-center relative overflow-hidden mb-2">
                  <Play className="w-6 h-6 text-white/80" />
                </div>
                <h4 className="text-xs font-semibold line-clamp-2 leading-tight">{vid.title}</h4>
                <p className="text-[11px] text-neutral-400 mt-1">{vid.channel}</p>
                <p className="text-[10px] text-neutral-500">{vid.views}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
