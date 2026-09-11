import React, { useState } from 'react';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  const inputPercent = () => {
    const val = parseFloat(display);
    setDisplay(String(val / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;

      if (operator === '+') newValue = currentValue + inputValue;
      else if (operator === '-') newValue = currentValue - inputValue;
      else if (operator === '×') newValue = currentValue * inputValue;
      else if (operator === '÷') newValue = inputValue !== 0 ? currentValue / inputValue : 0;

      setPrevValue(newValue);
      setDisplay(String(Number(newValue.toFixed(8))));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculateEquals = () => {
    if (!operator || prevValue === null) return;
    performOperation(operator);
    setOperator(null);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1c1c1e] text-white p-3 select-none">
      {/* Display Screen */}
      <div className="flex-1 flex items-end justify-end px-3 py-2">
        <span className="text-4xl font-light tracking-tight truncate max-w-full">
          {display}
        </span>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-4 gap-2 text-lg font-medium">
        {/* Row 1 */}
        <button
          onClick={clearAll}
          className="h-11 rounded-full bg-[#505050] text-white hover:brightness-110 active:brightness-90 transition"
        >
          {display !== '0' ? 'C' : 'AC'}
        </button>
        <button
          onClick={toggleSign}
          className="h-11 rounded-full bg-[#505050] text-white hover:brightness-110 active:brightness-90 transition"
        >
          ±
        </button>
        <button
          onClick={inputPercent}
          className="h-11 rounded-full bg-[#505050] text-white hover:brightness-110 active:brightness-90 transition"
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className={`h-11 rounded-full ${
            operator === '÷' ? 'bg-white text-[#ff9f0a]' : 'bg-[#ff9f0a] text-white'
          } hover:brightness-110 active:brightness-90 transition`}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputDigit('7')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          7
        </button>
        <button
          onClick={() => inputDigit('8')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          8
        </button>
        <button
          onClick={() => inputDigit('9')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          9
        </button>
        <button
          onClick={() => performOperation('×')}
          className={`h-11 rounded-full ${
            operator === '×' ? 'bg-white text-[#ff9f0a]' : 'bg-[#ff9f0a] text-white'
          } hover:brightness-110 active:brightness-90 transition`}
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputDigit('4')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          4
        </button>
        <button
          onClick={() => inputDigit('5')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          5
        </button>
        <button
          onClick={() => inputDigit('6')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          6
        </button>
        <button
          onClick={() => performOperation('-')}
          className={`h-11 rounded-full ${
            operator === '-' ? 'bg-white text-[#ff9f0a]' : 'bg-[#ff9f0a] text-white'
          } hover:brightness-110 active:brightness-90 transition`}
        >
          −
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputDigit('1')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          1
        </button>
        <button
          onClick={() => inputDigit('2')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          2
        </button>
        <button
          onClick={() => inputDigit('3')}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          3
        </button>
        <button
          onClick={() => performOperation('+')}
          className={`h-11 rounded-full ${
            operator === '+' ? 'bg-white text-[#ff9f0a]' : 'bg-[#ff9f0a] text-white'
          } hover:brightness-110 active:brightness-90 transition`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputDigit('0')}
          className="col-span-2 h-11 rounded-full bg-[#333333] px-5 text-left hover:brightness-125 active:brightness-90 transition"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="h-11 rounded-full bg-[#333333] hover:brightness-125 active:brightness-90 transition"
        >
          ,
        </button>
        <button
          onClick={calculateEquals}
          className="h-11 rounded-full bg-[#ff9f0a] text-white hover:brightness-110 active:brightness-90 transition"
        >
          =
        </button>
      </div>
    </div>
  );
}
