import React, { useState } from 'react';
import { Mail, Inbox, Send, Archive, Trash2, Reply, Star, Search, ExternalLink } from 'lucide-react';

interface EmailItem {
  id: string;
  sender: string;
  email: string;
  subject: string;
  date: string;
  body: string;
}

const EMAILS: EmailItem[] = [
  {
    id: '1',
    sender: 'Apple Developer',
    email: 'news@developer.apple.com',
    subject: 'Welcome to macOS Sequoia Web Edition',
    date: '10:30 AM',
    body: 'Welcome to your complete macOS desktop workstation.\n\nAll official system app icons have been placed on the Dock with authentic physics, parabolic magnification, and centered alignment.\n\nEnjoy browsing, coding, writing notes, and exploring the apps.',
  },
  {
    id: '2',
    sender: 'Craig Federighi',
    email: 'craig@apple.com',
    subject: 'WWDC Keynote Demo Confirmation',
    date: 'Yesterday',
    body: 'Hi Team,\n\nThe new upward-expanding Dock and smooth window dragging look great. We are looking forward to showing this off.\n\nBest,\nCraig',
  },
  {
    id: '3',
    sender: 'App Store Connect',
    email: 'no-reply@apple.com',
    subject: 'Your applications are ready for use',
    date: 'Monday',
    body: 'All registered apps have passed verification. Finder, Safari, Messages, Mail, Maps, Photos, Music, Terminal, Calculator, and Settings are ready.',
  },
];

export default function MailApp() {
  const [emails, setEmails] = useState<EmailItem[]>(EMAILS);
  const [activeEmailId, setActiveEmailId] = useState<string>(EMAILS[0].id);

  const activeEmail = emails.find((e) => e.id === activeEmailId) || emails[0];

  const handleDelete = (id: string) => {
    const remaining = emails.filter((e) => e.id !== id);
    setEmails(remaining);
    if (activeEmailId === id && remaining.length > 0) {
      setActiveEmailId(remaining[0].id);
    }
  };

  const handleOpenWebmail = () => {
    window.open('https://mail.google.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex h-full w-full select-none bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      {/* Mailbox Sidebar */}
      <div className="w-44 shrink-0 bg-neutral-100/70 dark:bg-neutral-800/50 border-r border-black/10 dark:border-white/10 p-3 space-y-4">
        <div>
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2">
            Mailboxes
          </span>
          <div className="mt-1 space-y-0.5">
            <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white cursor-pointer">
              <div className="flex items-center space-x-2">
                <Inbox className="w-4 h-4" />
                <span>Inbox</span>
              </div>
              <span className="text-[11px] font-bold">{emails.length}</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
              <Send className="w-4 h-4" />
              <span>Sent</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
              <Archive className="w-4 h-4" />
              <span>Archive</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
              <Trash2 className="w-4 h-4" />
              <span>Trash</span>
            </button>
          </div>
        </div>

        <button
          onClick={handleOpenWebmail}
          className="w-full flex items-center justify-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Webmail</span>
        </button>
      </div>

      {/* Email Item List */}
      <div className="w-64 shrink-0 border-r border-black/10 dark:border-white/10 flex flex-col bg-neutral-50/50 dark:bg-neutral-800/30">
        <div className="p-3 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center bg-black/5 dark:bg-white/10 px-2 py-1 rounded-lg text-xs">
            <Search className="w-3.5 h-3.5 text-neutral-400 mr-1.5" />
            <input
              type="text"
              placeholder="Search Mail"
              className="bg-transparent outline-none w-full text-xs placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-black/5 dark:divide-white/5 p-1.5 space-y-1">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setActiveEmailId(email.id)}
              className={`p-3 rounded-xl cursor-pointer transition-colors ${
                email.id === activeEmailId
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold truncate">{email.sender}</span>
                <span
                  className={`text-[10px] ${
                    email.id === activeEmailId ? 'text-white/80' : 'text-neutral-400'
                  }`}
                >
                  {email.date}
                </span>
              </div>
              <h4 className="text-xs font-medium truncate mt-0.5">{email.subject}</h4>
              <p
                className={`text-[11px] truncate mt-1 ${
                  email.id === activeEmailId ? 'text-white/80' : 'text-neutral-500'
                }`}
              >
                {email.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Pane */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-white dark:bg-neutral-900">
        {activeEmail ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {activeEmail.subject}
                </h2>
                <div className="flex items-center space-x-2 text-xs text-neutral-500 mt-1">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {activeEmail.sender}
                  </span>
                  <span>&lt;{activeEmail.email}&gt;</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-neutral-500">
                <button
                  onClick={() => handleDelete(activeEmail.id)}
                  className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 hover:text-red-500 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer" title="Reply">
                  <Reply className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed font-sans pt-2">
              {activeEmail.body}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-neutral-400">
            <Mail className="w-12 h-12 stroke-1 mb-2" />
            <p className="text-xs">No message selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
