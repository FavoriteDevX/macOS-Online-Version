import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { ReminderItem } from '../../types';

const INITIAL_REMINDERS: ReminderItem[] = [
  { id: '1', text: 'Configure Dock with official macOS icons', completed: true },
  { id: '2', text: 'Verify all apps launch properly and open web versions', completed: true },
  { id: '3', text: 'Test window dragging, resizing, minimizing, and zooming', completed: false },
  { id: '4', text: 'Customize desktop wallpaper in System Settings', completed: false },
];

export default function RemindersApp() {
  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    try {
      const saved = localStorage.getItem('macos_reminders_en');
      return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
    } catch {
      return INITIAL_REMINDERS;
    }
  });

  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('macos_reminders_en', JSON.stringify(reminders));
    } catch {}
  }, [reminders]);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newItem: ReminderItem = {
      id: Date.now().toString(),
      text: inputVal.trim(),
      completed: false,
    };
    setReminders([...reminders, newItem]);
    setInputVal('');
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const completedCount = reminders.filter((r) => r.completed).length;

  return (
    <div className="flex flex-col h-full w-full select-none bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      {/* Header */}
      <div className="p-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-500">Today</h2>
          <p className="text-xs text-neutral-400">
            {completedCount} of {reminders.length} completed
          </p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            onClick={() => toggleReminder(reminder.id)}
            className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReminder(reminder.id);
                }}
                className="text-blue-500 hover:scale-110 transition-transform cursor-pointer"
              >
                {reminder.completed ? (
                  <CheckCircle2 className="w-5 h-5 fill-blue-500 text-white" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <span
                className={`text-xs font-medium ${
                  reminder.completed ? 'line-through text-neutral-400' : 'text-neutral-800 dark:text-neutral-100'
                }`}
              >
                {reminder.text}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteReminder(reminder.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-red-500 transition-opacity cursor-pointer"
              title="Delete Reminder"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add reminder input */}
      <form onSubmit={addReminder} className="p-4 border-t border-black/10 dark:border-white/10">
        <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-xl px-3 py-2 text-xs">
          <Plus className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Add a reminder"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="bg-transparent outline-none w-full text-xs placeholder:text-neutral-400 text-neutral-800 dark:text-neutral-100"
          />
        </div>
      </form>
    </div>
  );
}
