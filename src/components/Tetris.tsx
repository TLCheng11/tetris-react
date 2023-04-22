import { useEffect, useRef, useState } from "react";
import GameBackground from "./GameBackground";
import Stage from "./Stage";
import usePlayer from "../hooks/usePlayer";
import useStage from "../hooks/useStage";
import { HEIGHT } from "../utils/tetrominos";
import { IElementRef } from "../types/utilsTypes";
import { useInterval } from "../hooks/useInterval";

function Tetris() {
  const cellRefs = useRef<IElementRef[][]>(Array.from(Array(HEIGHT), () => []));

  const [dropTime, setDropTime] = useState<number>(1000);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [
    player,
    resetPlayer,
    movePlayer,
    dropPlayer,
    updatePlayerShape,
    checkCollisonMove,
    checkCollisonShape,
  ] = usePlayer(cellRefs);
  const [stage, clearCells] = useStage(player, resetPlayer, cellRefs);

  useEffect(() => {
    if (gameOver) {
      console.log("gameover");
    } else {
      setDropTime(1000);
    }
  }, [gameOver]);

  useInterval(drop, dropTime);

  function drop() {
    if (!checkCollisonMove(0, 1)) {
      clearCells();
      dropPlayer(false);
    } else {
      dropPlayer(true);
      if (player.pos.y === 0) {
        setGameOver(true);
      }
    }
  }

  function move(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (!gameOver) {
      // console.log(e.key);
      if (e.key === "ArrowUp") {
        if (!checkCollisonShape()) {
          clearCells();
          updatePlayerShape();
        }
      } else if (e.key === "ArrowDown") {
        drop();
      } else if (e.key === "ArrowLeft") {
        if (!checkCollisonMove(-1, 0)) {
          clearCells();
          movePlayer(-1);
        }
      } else if (e.key === "ArrowRight") {
        if (!checkCollisonMove(1, 0)) {
          clearCells();
          movePlayer(1);
        }
      }
    }
  }

  return (
    <GameBackground move={move}>
      <Stage stage={stage} />
    </GameBackground>
  );
}

export default Tetris;
