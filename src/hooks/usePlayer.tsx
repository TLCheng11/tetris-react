import { useCallback, useState } from "react";
import { IElementRef, IPlayer } from "../types/utilsTypes";
import {
  HEIGHT,
  TETROMINOS,
  WIDTH,
  randomTetromino,
} from "../utils/tetrominos";

function usePlayer(
  cellRefs: React.MutableRefObject<IElementRef[][]>
): [
  IPlayer,
  () => void,
  (x: number) => void,
  () => void,
  () => void,
  (x: number, y: number) => boolean,
  () => boolean
] {
  const [player, setPlayer] = useState<IPlayer>({
    pos: { x: 0, y: 0 },
    shape: 0,
    tetromino: randomTetromino(),
    collided: false,
  });

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: Math.floor(WIDTH / 2) - 2, y: 0 },
      shape: 0,
      tetromino: randomTetromino(),
      collided: false,
    });
  }, []);

  function updatePlayerPos(x: number, y: number, collided: boolean): void {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  }

  function movePlayer(x: number): void {
    updatePlayerPos(x, 0, false);
  }

  function drop(): void {
    updatePlayerPos(0, 1, false);
  }

  function dropPlayer(): void {
    drop();
  }

  function updatePlayerShape(): void {
    const choice = player.tetromino.shape.length;
    const nextShape = player.shape + 1 === choice ? 0 : player.shape + 1;
    setPlayer((player) => ({ ...player, shape: nextShape }));
  }

  function checkCollisonMove(x: number, y: number): boolean {
    const currShape = player.tetromino.shape[player.shape];
    return currShape.some((row, h) => {
      return row.some((value, w) => {
        // check if current position has tetrominos
        if (value) {
          const newPos = { x: player.pos.x + w + x, y: player.pos.y + h + y };
          // check if new position is out of bounds
          return (
            newPos.x < 0 ||
            newPos.x === WIDTH ||
            newPos.y < 0 ||
            newPos.y === HEIGHT ||
            cellRefs.current[newPos.y][newPos.x].merged
          );
        }
      });
    });
  }

  function checkCollisonShape(): boolean {
    const choice = player.tetromino.shape.length;
    const nextShape = player.shape + 1 === choice ? 0 : player.shape + 1;
    const newShape = player.tetromino.shape[nextShape];
    return newShape.some((row, h) => {
      return row.some((value, w) => {
        if (value) {
          const x = player.pos.x + w;
          const y = player.pos.y + h;
          return (
            x < 0 ||
            x >= WIDTH ||
            y < 0 ||
            y >= HEIGHT ||
            cellRefs.current[y][x].merged
          );
        }
      });
    });
  }

  return [
    player,
    resetPlayer,
    movePlayer,
    dropPlayer,
    updatePlayerShape,
    checkCollisonMove,
    checkCollisonShape,
  ];
}

export default usePlayer;
