'use client';

import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const inputDigit = (digit: number) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (nextOperation === '√') {
      const result = Math.sqrt(inputValue);
      setDisplay(String(result));
      setCurrentValue(result);
      setOperation(null);
      setWaitingForOperand(true);
      return;
    }

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operation) {
      const currentValueNum = currentValue;
      let newValue: number;
      switch (operation) {
        case '+':
          newValue = currentValueNum + inputValue;
          break;
        case '-':
          newValue = currentValueNum - inputValue;
          break;
        case '*':
          newValue = currentValueNum * inputValue;
          break;
        case '/':
          newValue = currentValueNum / inputValue;
          break;
        default:
          newValue = inputValue;
      }
      setCurrentValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((digit) => (
          <button key={digit} onClick={() => inputDigit(digit)}>
            {digit}
          </button>
        ))}
        <button onClick={inputDecimal}>.</button>
        <button onClick={() => performOperation('+')}>+</button>
        <button onClick={() => performOperation('-')}>-</button>
        <button onClick={() => performOperation('*')}>*</button>
        <button onClick={() => performOperation('/')}>/</button>
        <button onClick={() => performOperation('√')}>√</button>
        <button onClick={() => performOperation('=')}>=</button>
        <button onClick={clearDisplay}>C</button>
      </div>
    </div>
  );
};

export default Calculator;