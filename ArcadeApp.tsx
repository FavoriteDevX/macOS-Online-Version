import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, Gamepad2, ExternalLink } from 'lucide-react';

const GRID_SIZE = 20;

export default function ArcadeApp() {
  const [snake, setSnake] = useState<[number, number][]>([
    [10, 10],
    [10, 11],
    [10, 12],
  ]);
  const [food, setFood] = useState<[number, number]>([5, 5]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('UP');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = () => {
    if (!isPlaying || gameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      let newHead: [number, number];

      if (direction === 'UP') newHead = [head[0], (head[1] - 1 + GRID_SIZE) % GRID_SIZE];
      else if (direction === 'DOWN') newHead = [head[0], (head[1] + 1) % GRID_SIZE];
      else if (direction === 'LEFT') newHead = [(head[0] - 1 + GRID_SIZE) % GRID_SIZE, head[1]];
      else newHead = [(head[0] + 1) % GRID_SIZE, head[1]];

      // Check self collision
      if (prevSnake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore((s) => {
          const next = s + 10;
          setHighScore((hs) => Math.max(hs, next));
          return next;
        });
        setFood([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(moveSnake, 120);
    return () => clearInterval(interval);
  }, [isPlaying, direction, food, gameOver]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code) && direction !== 'DOWN') setDirection('UP');
      if (['ArrowDown', 'KeyS'].includes(e.code) && direction !== 'UP') setDirection('DOWN');
      if (['ArrowLeft', 'KeyA'].includes(e.code) && direction !== 'RIGHT') setDirection('LEFT');
      if (['ArrowRight', 'KeyD'].includes(e.code) && direction !== 'LEFT') setDirection('RIGHT');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const restartGame = () => {
    setSnake([
      [10, 10],
      [10, 11],
      [10, 12],
    ]);
    setFood([5, 5]);
    setDirection('UP');
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col h-full w-full select-none bg-[#111] text-white">
      {/* Arcade Header */}
      <div className="h-11 px-4 border-b border-white/10 flex items-center justify-between bg-[#1f1624]">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="w-5 h-5 text-red-500" />
          <span className="font-bold text-sm">Apple Arcade • Retro Snake</span>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="text-neutral-400">
            Score: <strong className="text-white">{score}</strong>
          </span>
          <div className="flex items-center space-x-1 text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>Best: {highScore}</span>
          </div>
          <button
            onClick={() => window.open('https://www.apple.com/apple-arcade/', '_blank', 'noopener,noreferrer')}
            className="flex items-center space-x-1 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Arcade</span>
          </button>
        </div>
      </div>

      {/* Game Stage */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <div
          className="relative bg-neutral-900 border-2 border-red-500/30 rounded-xl overflow-hidden shadow-2xl"
          style={{ width: '320px', height: '320px' }}
        >
          {/* Food */}
          <div
            className="absolute bg-red-500 rounded-full shadow-[0_0_8px_#ff3333]"
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(food[0] * 100) / GRID_SIZE}%`,
              top: `${(food[1] * 100) / GRID_SIZE}%`,
            }}
          />

          {/* Snake */}
          {snake.map(([x, y], idx) => (
            <div
              key={idx}
              className={`absolute rounded-xs ${
                idx === 0 ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-emerald-600'
              }`}
              style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                left: `${(x * 100) / GRID_SIZE}%`,
                top: `${(y * 100) / GRID_SIZE}%`,
              }}
            />
          ))}

          {/* Overlay when paused / game over */}
          {(!isPlaying || gameOver) && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
              {gameOver ? (
                <>
                  <p className="text-xl font-bold text-red-400 mb-1">Game Over!</p>
                  <p className="text-xs text-neutral-300 mb-4">Final Score: {score}</p>
                  <button
                    onClick={restartGame}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-white mb-1">Apple Arcade Snake</p>
                  <p className="text-xs text-neutral-400 mb-4">
                    Use arrow keys or W, A, S, D to steer.
                  </p>
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition shadow-lg cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Game</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
