import React, { useState } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, FileText } from 'lucide-react';

export default function TextEditApp() {
  const [content, setContent] = useState(
    'Welcome to TextEdit on macOS!\n\nYou can draft rich notes, articles, code snippets, and outlines with formatting tools, live word count, and authentic Mac typography.'
  );
  const [fontSize, setFontSize] = useState('14');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full w-full select-none bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      {/* TextEdit Toolbar */}
      <div className="h-10 px-3 border-b border-black/10 dark:border-white/10 flex items-center space-x-3 bg-neutral-200/70 dark:bg-neutral-800/70 text-xs">
        {/* Font Picker */}
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="bg-white dark:bg-neutral-700 px-2 py-1 rounded border border-black/10 dark:border-white/10 outline-none cursor-pointer"
        >
          <option value="sans-serif">Helvetica</option>
          <option value="serif">Times New Roman</option>
          <option value="monospace">SF Mono</option>
        </select>

        {/* Font Size */}
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="bg-white dark:bg-neutral-700 px-2 py-1 rounded border border-black/10 dark:border-white/10 outline-none w-16 cursor-pointer"
        >
          {['11', '12', '13', '14', '16', '18', '24', '32'].map((s) => (
            <option key={s} value={s}>
              {s} pt
            </option>
          ))}
        </select>

        <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10" />

        {/* Formatting Buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsBold(!isBold)}
            className={`p-1.5 rounded cursor-pointer ${
              isBold ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsItalic(!isItalic)}
            className={`p-1.5 rounded cursor-pointer ${
              isItalic ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsUnderline(!isUnderline)}
            className={`p-1.5 rounded cursor-pointer ${
              isUnderline ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Underline"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10" />

        {/* Alignment */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setAlignment('left')}
            className={`p-1.5 rounded cursor-pointer ${
              alignment === 'left' ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setAlignment('center')}
            className={`p-1.5 rounded cursor-pointer ${
              alignment === 'center' ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setAlignment('right')}
            className={`p-1.5 rounded cursor-pointer ${
              alignment === 'right' ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 p-8 bg-white dark:bg-neutral-900 overflow-y-auto cursor-text select-text flex justify-center">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily,
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none',
            textAlign: alignment,
          }}
          className="w-full max-w-2xl h-full bg-transparent outline-none resize-none leading-relaxed text-neutral-800 dark:text-neutral-100 font-sans"
        />
      </div>

      {/* Status Bar */}
      <div className="h-6 px-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800/50">
        <span>UTF-8 Document</span>
        <span>{words} words</span>
      </div>
    </div>
  );
}
