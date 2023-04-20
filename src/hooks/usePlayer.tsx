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
        const oldPos = { x: player.pos.x + w, y: player.pos.y + h };
        const newPos = { x: oldPos.x + x, y: oldPos.y + y };
        // check if old position has tetrominos
        if (
          oldPos.x >= 0 &&
          oldPos.x < WIDTH &&
          oldPos.y >= 0 &&
          oldPos.y < HEIGHT &&
          cellRefs.current[oldPos.y][oldPos.x].element.style.backgroundColor
        ) {
          // check if new position is out of bounds
          if (
            newPos.x < 0 ||
            newPos.x === WIDTH ||
            newPos.y < 0 ||
            newPos.y === HEIGHT ||
            cellRefs.current[oldPos.y][oldPos.x].merged
          ) {
            return true;
          }
        }
        return false;
      });
    });

    // const H = currShape.length;
    // const W = currShape.length;
    // for (let h = 0; h < H; h++) {
    //   for (let w = 0; w < W; w++) {
    //     const oldPos = { x: player.pos.x + w, y: player.pos.y + h };
    //     const newPos = { x: oldPos.x + x, y: oldPos.y + y };
    //     // check if old position has tetrominos
    //     if (
    //       oldPos.x >= 0 &&
    //       oldPos.x < WIDTH &&
    //       oldPos.y >= 0 &&
    //       oldPos.y < HEIGHT &&
    //       cellRefs.current[oldPos.y][oldPos.x].element.style.backgroundColor
    //     ) {
    //       // check if new position is out of bounds
    //       if (
    //         newPos.x < 0 ||
    //         newPos.x === WIDTH ||
    //         newPos.y < 0 ||
    //         newPos.y === HEIGHT ||
    //         cellRefs.current[oldPos.y][oldPos.x].merged
    //       ) {
    //         return true;
    //       }
    //     }
    //   }
    // }
    // return false
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
          if (
            x < 0 ||
            x >= WIDTH ||
            y < 0 ||
            y >= HEIGHT ||
            cellRefs.current[y][x].merged
          ) {
            return true;
          }
        }
        return false;
      });
    });

    // const H = newShape.length;
    // const W = newShape.length;
    // for (let h = 0; h < H; h++) {
    //   for (let w = 0; w < W; w++) {
    //     if (newShape[h][w]) {
    //       const x = player.pos.x + w;
    //       const y = player.pos.y + h;
    //       if (
    //         x < 0 ||
    //         x >= WIDTH ||
    //         y < 0 ||
    //         y >= HEIGHT ||
    //         cellRefs.current[y][x].merged
    //       ) {
    //         return true;
    //       }
    //     }
    //   }
    // }
    // return false;
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
