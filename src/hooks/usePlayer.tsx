import { useCallback, useState } from "react";
import { IPlayer } from "../types/utilsTypes";
import { TETROMINOS, WIDTH, randomTetromino } from "../utils/tetrominos";

function usePlayer(): [
  IPlayer,
  () => void,
  (x: number) => void,
  () => void,
  () => void
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
    let nextShape = player.shape + 1;
    if (nextShape === choice) {
      nextShape = 0;
    }
    setPlayer((player) => ({ ...player, shape: nextShape }));
  }

  return [player, resetPlayer, movePlayer, dropPlayer, updatePlayerShape];
}

export default usePlayer;
