import React, { useState } from 'react';
import { BarChart3, ExternalLink } from 'lucide-react';

const COLS = ['A', 'B', 'C', 'D', 'E', 'F'];
const ROWS = Array.from({ length: 12 }, (_, i) => i + 1);

const INITIAL_GRID: Record<string, string> = {
  A1: 'Month',
  B1: 'Revenue',
  C1: 'Expenses',
  D1: 'Net Profit',
  A2: 'January',
  B2: '12400',
  C2: '5100',
  D2: '7300',
  A3: 'February',
  B3: '14800',
  C3: '6200',
  D3: '8600',
  A4: 'March',
  B4: '18900',
  C4: '7100',
  D4: '11800',
  A5: 'April',
  B5: '21500',
  C5: '7800',
  D5: '13700',
};

export default function NumbersApp() {
  const [grid, setGrid] = useState<Record<string, string>>(INITIAL_GRID);
  const [selectedCell, setSelectedCell] = useState('B2');
  const [showChart, setShowChart] = useState(true);

  const handleCellChange = (cellKey: string, value: string) => {
    setGrid((prev) => ({ ...prev, [cellKey]: value }));
  };

  // Extract chart data from rows 2 to 5
  const chartData = [2, 3, 4, 5].map((row) => ({
    name: grid[`A${row}`] || `Row ${row}`,
    revenue: parseFloat(grid[`B${row}`]) || 0,
    profit: parseFloat(grid[`D${row}`]) || 0,
  }));

  const maxVal = Math.max(...chartData.map((d) => Math.max(d.revenue, d.profit, 100)));

  return (
    <div className="flex flex-col h-full w-full select-none bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      {/* Numbers Toolbar */}
      <div className="h-11 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-neutral-100 dark:bg-neutral-800/80">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
            Table 1 - Financial Summary
          </span>
          <div className="h-4 w-[1px] bg-black/10 dark:border-white/10" />
          <button
            onClick={() => setShowChart(!showChart)}
            className={`flex items-center space-x-1.5 px-2 py-1 rounded text-xs transition cursor-pointer ${
              showChart ? 'bg-emerald-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Chart</span>
          </button>
        </div>

        <button
          onClick={() => window.open('https://www.apple.com/numbers/', '_blank', 'noopener,noreferrer')}
          className="flex items-center space-x-1 text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
        >
          <ExternalLink className="w-3 h-3" />
          <span>About Numbers</span>
        </button>
      </div>

      {/* Embedded Chart Preview if enabled */}
      {showChart && (
        <div className="p-4 border-b border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-neutral-850 flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Q1-Q2 Revenue vs. Net Profit
            </span>
            <div className="flex items-center space-x-4 text-[11px]">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                <span>Revenue</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-xs bg-blue-500" />
                <span>Profit</span>
              </div>
            </div>
          </div>

          <div className="flex items-end space-x-6 h-28 pt-2 px-4">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center space-y-1 h-full justify-end">
                <div className="flex items-end space-x-1 w-full justify-center h-20">
                  <div
                    className="w-4 bg-emerald-500 rounded-t-xs transition-all duration-300"
                    style={{ height: `${(d.revenue / maxVal) * 100}%` }}
                    title={`Revenue: $${d.revenue}`}
                  />
                  <div
                    className="w-4 bg-blue-500 rounded-t-xs transition-all duration-300"
                    style={{ height: `${(d.profit / maxVal) * 100}%` }}
                    title={`Profit: $${d.profit}`}
                  />
                </div>
                <span className="text-[10px] text-neutral-500 truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Sheet */}
      <div className="flex-1 overflow-auto bg-white dark:bg-neutral-900">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-semibold sticky top-0">
              <th className="w-10 border border-black/10 dark:border-white/10 p-1 text-center bg-neutral-200/60 dark:bg-neutral-800">
                #
              </th>
              {COLS.map((c) => (
                <th
                  key={c}
                  className="w-28 border border-black/10 dark:border-white/10 p-1 text-center font-mono"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row}>
                <td className="border border-black/10 dark:border-white/10 text-center text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/50 font-mono text-[10px]">
                  {row}
                </td>
                {COLS.map((col) => {
                  const key = `${col}${row}`;
                  const isSelected = selectedCell === key;
                  const isHeader = row === 1;

                  return (
                    <td
                      key={key}
                      onClick={() => setSelectedCell(key)}
                      className={`border border-black/10 dark:border-white/10 p-0 relative ${
                        isSelected
                          ? 'ring-2 ring-emerald-500 z-10'
                          : 'hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="text"
                        value={grid[key] || ''}
                        onChange={(e) => handleCellChange(key, e.target.value)}
                        className={`w-full h-7 px-2 bg-transparent outline-none text-xs ${
                          isHeader ? 'font-bold bg-neutral-50 dark:bg-neutral-800' : ''
                        }`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
