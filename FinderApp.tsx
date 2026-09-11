import React, { useState } from 'react';
import {
  Folder,
  HardDrive,
  Grid,
  List,
  Clock,
  Download,
  FileText,
  Search,
  Laptop,
  ChevronLeft,
  ChevronRight,
  Archive,
} from 'lucide-react';
import { APPS } from '../../data/apps';

interface FinderAppProps {
  onOpenApp: (appId: string) => void;
}

type FinderSection = 'applications' | 'recents' | 'desktop' | 'documents' | 'downloads';

export default function FinderApp({ onOpenApp }: FinderAppProps) {
  const [section, setSection] = useState<FinderSection>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredApps = APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full w-full select-none bg-neutral-50/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200">
      {/* Finder Sidebar */}
      <div className="w-48 shrink-0 bg-neutral-200/50 dark:bg-neutral-800/50 border-r border-black/10 dark:border-white/10 p-3 flex flex-col space-y-4">
        <div>
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-2">
            Favorites
          </span>
          <div className="mt-1 space-y-0.5">
            <button
              onClick={() => setSection('applications')}
              className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                section === 'applications'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Applications</span>
            </button>

            <button
              onClick={() => setSection('recents')}
              className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                section === 'recents'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Recents</span>
            </button>

            <button
              onClick={() => setSection('desktop')}
              className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                section === 'desktop'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setSection('documents')}
              className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                section === 'documents'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </button>

            <button
              onClick={() => setSection('downloads')}
              className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                section === 'downloads'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Downloads</span>
            </button>
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-2">
            Locations
          </span>
          <div className="mt-1 space-y-0.5">
            <div className="flex items-center space-x-2.5 px-2 py-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <HardDrive className="w-4 h-4" />
              <span>Macintosh HD</span>
            </div>
            <div className="flex items-center space-x-2.5 px-2 py-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              <Folder className="w-4 h-4" />
              <span>iCloud Drive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="h-10 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-neutral-100/50 dark:bg-neutral-800/50">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-neutral-400">
              <ChevronLeft className="w-4 h-4 opacity-50 cursor-default" />
              <ChevronRight className="w-4 h-4 opacity-50 cursor-default" />
            </div>
            <span className="text-xs font-semibold capitalize text-neutral-700 dark:text-neutral-200">
              {section}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* View switcher */}
            <div className="flex bg-black/5 dark:bg-white/10 p-0.5 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-neutral-700 shadow-sm' : ''} cursor-pointer`}
                title="Icon View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-white dark:bg-neutral-700 shadow-sm' : ''} cursor-pointer`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-lg text-xs">
              <Search className="w-3 h-3 text-neutral-400 mr-1.5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none w-28 text-xs placeholder:text-neutral-400"
              />
            </div>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 overflow-auto p-4">
          {section === 'applications' ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    onDoubleClick={() => onOpenApp(app.id)}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-blue-500/15 focus:bg-blue-500/20 focus:outline-none group cursor-pointer transition-colors"
                  >
                    <div className="w-16 h-16 relative flex items-center justify-center">
                      <img
                        src={app.icon}
                        alt={app.name}
                        onError={(e) => {
                          if (app.fallbackIcon) e.currentTarget.src = app.fallbackIcon;
                        }}
                        className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-xs font-medium text-center mt-2 px-1 rounded line-clamp-1">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="w-full text-xs">
                <div className="grid grid-cols-12 py-1.5 px-3 border-b border-black/10 dark:border-white/10 text-neutral-400 font-medium">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-3">Date Modified</div>
                  <div className="col-span-3">Kind</div>
                </div>
                <div className="divide-y divide-black/5 dark:divide-white/5">
                  {filteredApps.map((app) => (
                    <div
                      key={app.id}
                      onDoubleClick={() => onOpenApp(app.id)}
                      className="grid grid-cols-12 py-2 px-3 hover:bg-blue-500/15 cursor-pointer items-center rounded-lg"
                    >
                      <div className="col-span-6 flex items-center space-x-2.5">
                        <img
                          src={app.icon}
                          alt=""
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            if (app.fallbackIcon) e.currentTarget.src = app.fallbackIcon;
                          }}
                        />
                        <span className="font-medium truncate">{app.name}</span>
                      </div>
                      <div className="col-span-3 text-neutral-500">Today at 10:42 AM</div>
                      <div className="col-span-3 text-neutral-500 capitalize">Application</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : section === 'downloads' || section === 'desktop' ? (
            <div className="p-4">
              <a
                href="/macos-web-project.zip"
                download="macos-web-project.zip"
                className="inline-flex flex-col items-center p-3 rounded-xl hover:bg-blue-500/15 group cursor-pointer border border-transparent hover:border-blue-500/30 transition-all text-center w-36"
                title="Click to download macOS Web project archive"
              >
                <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform border border-amber-500/20">
                  <Archive className="w-8 h-8 text-amber-500" />
                </div>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 truncate w-full">
                  macos-web-project.zip
                </span>
                <span className="text-[10px] text-neutral-400 mt-0.5">2.5 MB • ZIP Archive</span>
                <span className="mt-2 text-[11px] font-medium text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  Download
                </span>
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-2">
              <Folder className="w-12 h-12 stroke-1" />
              <p className="text-xs font-medium">This folder is empty</p>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="h-6 px-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500 bg-neutral-100/50 dark:bg-neutral-800/50">
          <span>{filteredApps.length} items</span>
          <span>482.4 GB available</span>
        </div>
      </div>
    </div>
  );
}
