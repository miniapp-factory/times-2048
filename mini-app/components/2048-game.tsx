"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const BOARD_SIZE = 4;
const TARGET = 2048;

const getRandomTile = () => (Math.random() < 0.9 ? 2 : 4);

const emptyCells = (board: number[][]) =>
  board.flatMap((row, r) =>
    row.map((cell, c) => (cell === 0 ? { r, c } : null)).filter(Boolean) as { r: number; c: number }[]
  );

const addRandomTile = (board: number[][]) => {
  const empties = emptyCells(board);
  if (empties.length === 0) return board;
  const { r, c } = empties[Math.floor(Math.random() * empties.length)];
  const newBoard = board.map(row => [...row]);
  newBoard[r][c] = getRandomTile();
  return newBoard;
};

const compress = (row: number[]) => row.filter(v => v !== 0);

const merge = (row: number[]) => {
  const newRow: number[] = [];
  let skip = false;
  for (let i = 0; i < row.length; i++) {
    if (skip) {
      skip = false;
      continue;
    }
    if (i + 1 < row.length && row[i] === row[i + 1]) {
      newRow.push(row[i] * 2);
      skip = true;
    } else {
      newRow.push(row[i]);
    }
  }
  return newRow;
};

const moveLeft = (board: number[][]) => {
  const newBoard = board.map(row => {
    const compressed = compress(row);
    const merged = merge(compressed);
    const padded = [...merged, ...Array(BOARD_SIZE - merged.length).fill(0)];
    return padded;
  });
  return newBoard;
};

const moveRight = (board: number[][]) => {
  const newBoard = board.map(row => {
    const reversed = [...row].reverse();
    const compressed = compress(reversed);
    const merged = merge(compressed);
    const padded = [...merged, ...Array(BOARD_SIZE - merged.length).fill(0)];
    return padded.reverse();
  });
  return newBoard;
};

const transpose = (board: number[][]) =>
  board[0].map((_, i) => board.map(row => row[i]));

const moveUp = (board: number[][]) => transpose(moveLeft(transpose(board)));
const moveDown = (board: number[][]) => transpose(moveRight(transpose(board)));

const hasMoves = (board: number[][]) => {
  if (emptyCells(board).length > 0) return true;
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE - 1; c++) {
      if (board[r][c] === board[r][c + 1]) return true;
    }
  }
  for (let c = 0; c < BOARD_SIZE; c++) {
    for (let r = 0; r < BOARD_SIZE - 1; r++) {
      if (board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
};

const tileColors: Record<number, string> = {
  0: "bg-gray-200",
  2: "bg-yellow-200",
  4: "bg-yellow-300",
  8: "bg-orange-200",
  16: "bg-orange-300",
  32: "bg-red-200",
  64: "bg-red-300",
  128: "bg-green-200",
  256: "bg-green-300",
  512: "bg-blue-200",
  1024: "bg-blue-300",
  2048: "bg-orange-500",
};

export default function Game2048() {
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0))
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const updateScore = useCallback((newBoard: number[][]) => {
    const newScore = newBoard.flat().reduce((a, b) => a + b, 0);
    setScore(newScore);
  }, []);

  const handleMove = useCallback(
    (moveFn: (b: number[][]) => number[][]) => {
      if (gameOver) return;
      const newBoard = moveFn(board);
      if (JSON.stringify(newBoard) === JSON.stringify(board)) return;
      const boardWithTile = addRandomTile(newBoard);
      setBoard(boardWithTile);
      updateScore(boardWithTile);
      if (boardWithTile.flat().includes(TARGET)) {
        setWon(true);
        setGameOver(true);
      } else if (!hasMoves(boardWithTile)) {
        setGameOver(true);
      }
    },
    [board, gameOver, updateScore]
  );

  const resetGame = () => {
    const newBoard = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
    const boardWithTile = addRandomTile(addRandomTile(newBoard));
    setBoard(boardWithTile);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-4 gap-2">
        {board.flat().map((value, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-center h-16 w-16 rounded-md text-xl font-bold ${tileColors[value]}`}
          >
            {value !== 0 ? value : null}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Button onClick={() => handleMove(moveUp)}>↑</Button>
        <Button onClick={() => handleMove(moveLeft)}>←</Button>
        <Button onClick={() => handleMove(moveRight)}>→</Button>
        <Button onClick={() => handleMove(moveDown)}>↓</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={resetGame}>
          Restart
        </Button>
        {gameOver && (
          <Share
            text={`I scored ${score} in 2048! ${url}`}
          />
        )}
      </div>
      <span className="text-lg">
        Score: {score} {gameOver && (won ? " (You won!)" : " (Game over)")}
      </span>
    </div>
  );
}
