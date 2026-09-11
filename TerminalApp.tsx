import React, { useState, useRef, useEffect } from 'react';
import { APPS } from '../../data/apps';

interface TerminalAppProps {
  onOpenApp: (appId: string) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

const NEOFETCH_ART = `
                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.
`;

export default function TerminalApp({ onOpenApp }: TerminalAppProps) {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'welcome',
      command: '',
      output: (
        <div className="text-neutral-400">
          <p>Last login: {new Date().toUTCString()} on ttys001</p>
          <p className="mt-1">
            Type <span className="text-emerald-400 font-semibold">help</span> to view commands or <span className="text-emerald-400 font-semibold">neofetch</span> for system specifications.
          </p>
        </div>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const parts = cmd.split(' ');
    const root = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: React.ReactNode = null;

    switch (root) {
      case 'help':
        output = (
          <div className="space-y-1 text-neutral-300">
            <p><span className="text-emerald-400 font-mono">neofetch</span> - Display macOS system information and ASCII art</p>
            <p><span className="text-emerald-400 font-mono">apps</span> - List all installed applications</p>
            <p><span className="text-emerald-400 font-mono">open &lt;app&gt;</span> - Launch an application (e.g., open safari, open finder)</p>
            <p><span className="text-emerald-400 font-mono">ls</span> - List directory contents</p>
            <p><span className="text-emerald-400 font-mono">whoami</span> - Display current user</p>
            <p><span className="text-emerald-400 font-mono">date</span> - Display system date and time</p>
            <p><span className="text-emerald-400 font-mono">pwd</span> - Print working directory</p>
            <p><span className="text-emerald-400 font-mono">clear</span> - Clear terminal window</p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      case 'neofetch':
        output = (
          <div className="flex flex-col sm:flex-row items-start space-x-4">
            <pre className="text-emerald-400 font-mono text-[11px] leading-tight select-none">
              {NEOFETCH_ART}
            </pre>
            <div className="space-y-1 font-mono text-xs text-neutral-200 mt-2 sm:mt-0">
              <p className="font-bold text-blue-400">user@macbook-pro</p>
              <p className="text-neutral-500">------------------</p>
              <p><strong className="text-neutral-400">OS:</strong> macOS Sequoia (Web Edition)</p>
              <p><strong className="text-neutral-400">Host:</strong> MacBook Pro 16-inch, Nov 2024</p>
              <p><strong className="text-neutral-400">Kernel:</strong> Darwin 24.0.0</p>
              <p><strong className="text-neutral-400">Uptime:</strong> 42 mins</p>
              <p><strong className="text-neutral-400">Shell:</strong> zsh 5.9</p>
              <p><strong className="text-neutral-400">CPU:</strong> Apple M3 Max (16-core)</p>
              <p><strong className="text-neutral-400">GPU:</strong> Apple M3 Max (40-core GPU)</p>
              <p><strong className="text-neutral-400">Memory:</strong> 36 GB Unified Memory</p>
            </div>
          </div>
        );
        break;

      case 'ls':
        output = (
          <div className="flex flex-wrap gap-4 text-blue-400 font-semibold">
            <span>Applications/</span>
            <span>Desktop/</span>
            <span>Documents/</span>
            <span>Downloads/</span>
            <span>Movies/</span>
            <span>Music/</span>
            <span>Pictures/</span>
          </div>
        );
        break;

      case 'apps':
        output = (
          <div className="grid grid-cols-3 gap-2 text-neutral-300">
            {APPS.map((a) => (
              <span key={a.id} className="text-emerald-400">{a.id}</span>
            ))}
          </div>
        );
        break;

      case 'open': {
        const target = args[0]?.toLowerCase();
        const found = APPS.find(
          (a) => a.id.toLowerCase() === target || a.name.toLowerCase() === target
        );
        if (found) {
          onOpenApp(found.id);
          output = <p className="text-emerald-400">Opening {found.name}...</p>;
        } else {
          output = (
            <p className="text-red-400">
              Application not found: "{target}". Type <span className="underline">apps</span> to list available applications.
            </p>
          );
        }
        break;
      }

      case 'whoami':
        output = <p className="text-neutral-200">user</p>;
        break;

      case 'pwd':
        output = <p className="text-neutral-200">/Users/user</p>;
        break;

      case 'date':
        output = <p className="text-neutral-200">{new Date().toString()}</p>;
        break;

      case 'echo':
        output = <p className="text-neutral-200">{args.join(' ')}</p>;
        break;

      default:
        output = (
          <p className="text-red-400">
            zsh: command not found: {cmd}. Type <span className="underline font-semibold">help</span>.
          </p>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: cmd,
        output,
      },
    ]);
    setInput('');
  };

  return (
    <div
      onClick={() => {
        document.getElementById('terminal-input')?.focus();
      }}
      className="h-full w-full bg-[#1e1e1e]/95 text-neutral-100 p-4 font-mono text-xs overflow-y-auto cursor-text select-text"
    >
      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="space-y-1">
            {log.command && (
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">user@macbook ~ %</span>
                <span>{log.command}</span>
              </div>
            )}
            <div>{log.output}</div>
          </div>
        ))}

        {/* Active prompt line */}
        <form onSubmit={handleCommand} className="flex items-center space-x-2 pt-1">
          <span className="text-emerald-400 font-bold shrink-0">user@macbook ~ %</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent outline-none text-white border-none p-0 font-mono"
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}
