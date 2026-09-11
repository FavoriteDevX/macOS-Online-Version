import React, { useState } from 'react';
import { Pickaxe, RotateCcw, ExternalLink } from 'lucide-react';

type BlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'leaves' | 'water' | 'diamond' | 'air';

const BLOCK_COLORS: Record<BlockType, string> = {
  grass: '#5c9e31',
  dirt: '#8b5a2b',
  stone: '#757575',
  wood: '#a0522d',
  leaves: '#2e8b57',
  water: '#1e90ff',
  diamond: '#00ffff',
  air: 'transparent',
};

const COLS = 24;
const ROWS = 16;

const generateInitialWorld = (): BlockType[][] => {
  const world: BlockType[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: BlockType[] = [];
    for (let c = 0; c < COLS; c++) {
      if (r > 12) row.push('stone');
      else if (r > 9) row.push('dirt');
      else if (r === 9) row.push('grass');
      else row.push('air');
    }
    world.push(row);
  }
  // Add tree
  world[8][6] = 'wood';
  world[7][6] = 'wood';
  world[6][6] = 'wood';
  world[5][5] = 'leaves';
  world[5][6] = 'leaves';
  world[5][7] = 'leaves';
  world[4][6] = 'leaves';

  return world;
};

export default function MinecraftApp() {
  const [world, setWorld] = useState<BlockType[][]>(generateInitialWorld);
  const [selectedBlock, setSelectedBlock] = useState<BlockType>('grass');
  const [isMouseDown, setIsMouseDown] = useState(false);

  const setBlockAt = (r: number, c: number) => {
    setWorld((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = selectedBlock;
      return next;
    });
  };

  return (
    <div
      onMouseUp={() => setIsMouseDown(false)}
      className="flex flex-col h-full w-full select-none bg-[#1d1d21] text-white"
    >
      {/* Header */}
      <div className="h-11 px-4 border-b border-white/10 flex items-center justify-between bg-[#29292e]">
        <div className="flex items-center space-x-2">
          <Pickaxe className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-sm">Minecraft • 2D Creative Canvas</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.open('https://www.minecraft.net', '_blank', 'noopener,noreferrer')}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs transition cursor-pointer"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Minecraft.net</span>
          </button>
          <button
            onClick={() => setWorld(generateInitialWorld())}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset World</span>
          </button>
        </div>
      </div>

      {/* Voxel Grid Viewport */}
      <div className="flex-1 flex items-center justify-center p-4 bg-[#7ec0ee] relative overflow-hidden">
        {/* Sun in sky */}
        <div className="absolute top-4 right-8 w-12 h-12 rounded-sm bg-yellow-300 shadow-[0_0_20px_#fde047]" />

        <div
          onMouseDown={() => setIsMouseDown(true)}
          className="grid border-2 border-black/40 shadow-2xl bg-sky-200/50 backdrop-blur-xs"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            width: '100%',
            maxWidth: '620px',
            aspectRatio: `${COLS}/${ROWS}`,
          }}
        >
          {world.map((row, r) =>
            row.map((block, c) => (
              <div
                key={`${r}-${c}`}
                onMouseDown={() => setBlockAt(r, c)}
                onMouseEnter={() => {
                  if (isMouseDown) setBlockAt(r, c);
                }}
                className={`border border-black/10 transition-transform ${
                  block === 'air' ? 'hover:bg-white/20' : 'hover:brightness-110'
                }`}
                style={{ backgroundColor: BLOCK_COLORS[block] }}
              />
            ))
          )}
        </div>
      </div>

      {/* Hotbar (Block Palette) */}
      <div className="h-14 px-4 bg-[#232326] border-t border-white/10 flex items-center justify-center space-x-2">
        {(['grass', 'dirt', 'stone', 'wood', 'leaves', 'water', 'diamond', 'air'] as BlockType[]).map(
          (b) => (
            <button
              key={b}
              onClick={() => setSelectedBlock(b)}
              className={`flex flex-col items-center p-1.5 rounded-lg border-2 transition cursor-pointer ${
                selectedBlock === b
                  ? 'border-emerald-400 bg-white/15 scale-105'
                  : 'border-transparent hover:bg-white/5'
              }`}
            >
              <div
                className="w-6 h-6 rounded-xs border border-black/30"
                style={{
                  backgroundColor: BLOCK_COLORS[b],
                  borderStyle: b === 'air' ? 'dashed' : 'solid',
                }}
              />
              <span className="text-[9px] capitalize mt-0.5 text-neutral-300">
                {b === 'air' ? 'Erase' : b}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
}
