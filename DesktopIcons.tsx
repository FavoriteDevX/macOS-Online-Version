import React from 'react';
import { HardDrive, Folder, Archive } from 'lucide-react';

interface DesktopIconsProps {
  onOpenApp: (appId: string) => void;
}

export default function DesktopIcons({ onOpenApp }: DesktopIconsProps) {
  const handleDownloadZip = () => {
    const link = document.createElement('a');
    link.href = '/macos-web-project.zip';
    link.download = 'macos-web-project.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="absolute top-10 right-6 flex flex-col space-y-5 select-none z-10">
      {/* Macintosh HD */}
      <div
        onDoubleClick={() => onOpenApp('finder')}
        className="group flex flex-col items-center w-24 p-1.5 rounded-lg hover:bg-black/20 hover:backdrop-blur-xs cursor-pointer text-center transition"
      >
        <div className="w-12 h-12 flex items-center justify-center">
          <HardDrive className="w-10 h-10 text-neutral-300 drop-shadow-md group-hover:scale-105 transition-transform" />
        </div>
        <span className="text-[11px] font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1 px-1 rounded truncate max-w-full">
          Macintosh HD
        </span>
      </div>

      {/* Documents Folder */}
      <div
        onDoubleClick={() => onOpenApp('finder')}
        className="group flex flex-col items-center w-24 p-1.5 rounded-lg hover:bg-black/20 hover:backdrop-blur-xs cursor-pointer text-center transition"
      >
        <div className="w-12 h-12 flex items-center justify-center">
          <Folder className="w-10 h-10 text-blue-400 fill-blue-400/50 drop-shadow-md group-hover:scale-105 transition-transform" />
        </div>
        <span className="text-[11px] font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1 px-1 rounded truncate max-w-full">
          Documents
        </span>
      </div>

      {/* macOS Project Zip Archive */}
      <div
        onClick={handleDownloadZip}
        className="group flex flex-col items-center w-24 p-1.5 rounded-lg hover:bg-black/20 hover:backdrop-blur-xs cursor-pointer text-center transition"
        title="Click to download the complete macOS project (ZIP)"
      >
        <div className="w-12 h-12 flex items-center justify-center relative">
          <Archive className="w-10 h-10 text-amber-300 fill-amber-500/20 drop-shadow-md group-hover:scale-105 transition-transform" />
        </div>
        <span className="text-[11px] font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-1 px-1 rounded truncate max-w-full">
          macOS-Web.zip
        </span>
      </div>
    </div>
  );
}
