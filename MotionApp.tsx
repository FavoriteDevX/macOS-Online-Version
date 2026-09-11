import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

export default function MotionApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(1.5);
  const [particleCount, setParticleCount] = useState(80);
  const [colorTheme, setColorTheme] = useState<'magenta' | 'cyber' | 'gold'>('magenta');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      radius: Math.random() * 4 + 1.5,
      alpha: Math.random() * 0.8 + 0.2,
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(15, 10, 25, 0.25)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Colors
        let color = '#ff1493';
        if (colorTheme === 'cyber') color = '#00f2fe';
        if (colorTheme === 'gold') color = '#ffd700';

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = 1 - dist / 85;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [speed, particleCount, colorTheme]);

  return (
    <div className="flex flex-col h-full w-full select-none bg-[#0e0717] text-white">
      {/* Motion Header Toolbar */}
      <div className="h-10 px-4 border-b border-white/10 flex items-center justify-between bg-[#190d28] text-xs">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="font-bold">Apple Motion • Realtime Particle FX</span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] text-neutral-400">Speed:</span>
            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-20 accent-pink-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setColorTheme('magenta')}
              className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                colorTheme === 'magenta' ? 'bg-pink-600 text-white' : 'bg-white/10'
              }`}
            >
              Magenta
            </button>
            <button
              onClick={() => setColorTheme('cyber')}
              className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                colorTheme === 'cyber' ? 'bg-cyan-600 text-white' : 'bg-white/10'
              }`}
            >
              Cyber
            </button>
            <button
              onClick={() => setColorTheme('gold')}
              className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                colorTheme === 'gold' ? 'bg-amber-600 text-white' : 'bg-white/10'
              }`}
            >
              Gold
            </button>
          </div>

          <button
            onClick={() => window.open('https://www.apple.com/motion/', '_blank', 'noopener,noreferrer')}
            className="flex items-center space-x-1 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Info</span>
          </button>
        </div>
      </div>

      {/* Motion Canvas Viewport */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-neutral-400 pointer-events-none">
          Render: 60fps Canvas2D • Active particles: {particleCount}
        </div>
      </div>
    </div>
  );
}
