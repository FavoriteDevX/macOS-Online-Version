import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Plus } from 'lucide-react';

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Compute days in month
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const currentDayNumber = today.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const dayHeaders = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="flex flex-col h-full w-full select-none bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      {/* Calendar Header */}
      <div className="h-12 px-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60">
        <div className="flex items-center space-x-3">
          <CalIcon className="w-5 h-5 text-red-500" />
          <h2 className="text-sm font-bold capitalize">{monthName}</h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
          >
            Today
          </button>
          <div className="flex border border-black/10 dark:border-white/10 rounded-md overflow-hidden">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 border-b border-black/10 dark:border-white/10 bg-neutral-100/50 dark:bg-neutral-800/30 text-center py-2 text-[11px] font-semibold text-neutral-400">
        {dayHeaders.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6 p-2 gap-1 bg-white/50 dark:bg-neutral-900/50">
        {/* Leading blank days */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`blank-${i}`} className="p-2 text-neutral-300 dark:text-neutral-700" />
        ))}

        {/* Days of month */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const isToday = isCurrentMonth && day === currentDayNumber;

          return (
            <div
              key={`day-${day}`}
              className={`p-2 rounded-xl flex flex-col justify-between hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer ${
                isToday ? 'bg-red-500/10 border border-red-500/30' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday ? 'bg-red-500 text-white' : ''
                  }`}
                >
                  {day}
                </span>
              </div>
              <div className="space-y-1">
                {isToday && (
                  <div className="text-[10px] bg-red-500/20 text-red-500 dark:text-red-400 font-medium px-1.5 py-0.5 rounded truncate">
                    macOS Review
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
