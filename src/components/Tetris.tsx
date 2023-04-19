import { useState } from "react";
import GameBackground from "./GameBackground";
import Stage from "./Stage";
import usePlayer from "../hooks/usePlayer";

function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const [player, resetPlayer, movePlayer, dropPlayer] = usePlayer();

  function move(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (!gameOver) {
      // console.log(e.key);
      if (e.key === "ArrowUp") {
      } else if (e.key === "ArrowDown") {
        dropPlayer();
      } else if (e.key === "ArrowLeft") {
        movePlayer(-1);
      } else if (e.key === "ArrowRight") {
        movePlayer(1);
      }
    }
  }

  return (
    <GameBackground move={move}>
      <Stage />
    </GameBackground>
  );
}

export default Tetris;
