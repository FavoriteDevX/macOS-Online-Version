import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, FileText } from 'lucide-react';
import { NoteItem } from '../../types';

const INITIAL_NOTES: NoteItem[] = [
  {
    id: '1',
    title: 'macOS Sequoia Setup',
    body: 'Welcome to your macOS desktop experience!\n\nAll real system icons are integrated into the Dock with smooth parabolic magnification and running indicators.\n\nApps included: Finder, Safari, Messages, Mail, Maps, Photos, FaceTime, Calendar, Reminders, Notes, Music, App Store, System Settings, Terminal, Calculator, YouTube, and Trash.',
    updatedAt: 'Today at 3:20 PM',
  },
  {
    id: '2',
    title: 'Meeting Notes & Tasks',
    body: '• Test Dock icon centering and upward hover magnification\n• Verify window dragging, resizing, minimizing and zooming\n• Explore interactive apps and open real external tabs\n• Check System Settings wallpapers and Dark Mode switch',
    updatedAt: 'Yesterday at 6:45 PM',
  },
];

export default function NotesApp() {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('macos_notes_en');
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '1');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('macos_notes_en', JSON.stringify(notes));
    } catch {}
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const timeStr = 'Today at ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: 'New Note',
      body: '',
      updatedAt: timeStr,
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string) => {
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    if (activeNoteId === id && remaining.length > 0) {
      setActiveNoteId(remaining[0].id);
    }
  };

  const handleUpdateBody = (body: string) => {
    const lines = body.split('\n');
    const title = lines[0]?.trim() || 'New Note';
    const timeStr = 'Today at ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNoteId
          ? {
              ...n,
              title,
              body,
              updatedAt: timeStr,
            }
          : n
      )
    );
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full w-full select-none bg-neutral-50/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200">
      {/* Sidebar: Notes List */}
      <div className="w-64 shrink-0 bg-neutral-200/50 dark:bg-neutral-800/50 border-r border-black/10 dark:border-white/10 flex flex-col">
        {/* Toolbar */}
        <div className="p-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between space-x-2">
          <div className="flex items-center bg-black/5 dark:bg-white/10 px-2 py-1 rounded-lg flex-1">
            <Search className="w-3.5 h-3.5 text-neutral-400 mr-1.5" />
            <input
              type="text"
              placeholder="Search notes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full text-xs placeholder:text-neutral-400"
            />
          </div>
          <button
            onClick={handleCreateNote}
            className="p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-sm transition-colors cursor-pointer"
            title="Create Note"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Notes Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-black/5 dark:divide-white/5 p-2 space-y-1">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`p-3 rounded-xl cursor-pointer transition-colors group ${
                note.id === activeNoteId
                  ? 'bg-amber-500/20 dark:bg-amber-500/25 border border-amber-500/30'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold truncate text-neutral-900 dark:text-neutral-100">
                  {note.title || 'New Note'}
                </h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                  title="Delete Note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">
                {note.body.replace(note.title, '').trim() || 'No additional text'}
              </p>
              <span className="text-[10px] text-neutral-400 mt-2 block">{note.updatedAt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden bg-white/70 dark:bg-neutral-900/70">
        {activeNote ? (
          <>
            <div className="text-[11px] text-neutral-400 mb-3">{activeNote.updatedAt}</div>
            <textarea
              value={activeNote.body}
              onChange={(e) => handleUpdateBody(e.target.value)}
              placeholder="Start typing your note here..."
              className="w-full flex-1 bg-transparent outline-none resize-none text-sm text-neutral-800 dark:text-neutral-100 leading-relaxed font-sans"
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-2">
            <FileText className="w-12 h-12 stroke-1" />
            <p className="text-xs font-medium">No note selected</p>
            <button
              onClick={handleCreateNote}
              className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg shadow cursor-pointer"
            >
              Create a Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
