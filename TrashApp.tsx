import React, { useState } from 'react';
import { Trash2, FileText, CheckCircle2 } from 'lucide-react';

interface TrashItem {
  id: string;
  name: string;
  size: string;
  deletedAt: string;
}

const INITIAL_TRASH: TrashItem[] = [
  { id: '1', name: 'Old_Project_Draft.pages', size: '2.4 MB', deletedAt: 'Today at 11:20 AM' },
  { id: '2', name: 'Screenshot_2024.png', size: '4.8 MB', deletedAt: 'Yesterday' },
  { id: '3', name: 'Temporary_Installer.dmg', size: '84.2 MB', deletedAt: 'Monday' },
];

export default function TrashApp() {
  const [items, setItems] = useState<TrashItem[]>(INITIAL_TRASH);

  const emptyTrash = () => {
    setItems([]);
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      {/* Header bar */}
      <div className="h-11 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-neutral-200/60 dark:bg-neutral-800/60">
        <div className="flex items-center space-x-2">
          <Trash2 className="w-4 h-4 text-neutral-500" />
          <span className="text-xs font-semibold">Trash ({items.length} items)</span>
        </div>

        {items.length > 0 && (
          <button
            onClick={emptyTrash}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs font-semibold transition cursor-pointer"
          >
            Empty Trash
          </button>
        )}
      </div>

      {/* Item List */}
      <div className="flex-1 p-6 overflow-y-auto">
        {items.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-center group"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-neutral-500">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-xs font-medium mt-2 truncate w-full">{item.name}</p>
                <p className="text-[10px] text-neutral-400">{item.size}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              The Trash is empty
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
