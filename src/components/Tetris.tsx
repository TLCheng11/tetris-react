import { useRef, useState } from "react";
import GameBackground from "./GameBackground";
import Stage from "./Stage";
import usePlayer from "../hooks/usePlayer";
import useStage from "../hooks/useStage";
import { HEIGHT } from "../utils/tetrominos";
import { IElementRef } from "../types/utilsTypes";

function Tetris() {
  const cellRefs = useRef<IElementRef[][]>(Array.from(Array(HEIGHT), () => []));

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [
    player,
    resetPlayer,
    movePlayer,
    dropPlayer,
    updatePlayerShape,
    checkCollisonMove,
  ] = usePlayer(cellRefs);
  const [stage, clearCells] = useStage(player, cellRefs);

  function move(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (!gameOver) {
      // console.log(e.key);
      if (e.key === "ArrowUp") {
        updatePlayerShape();
      } else if (e.key === "ArrowDown") {
        if (!checkCollisonMove(0, 1)) {
          clearCells();
          dropPlayer();
        }
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
