import { useState } from "react";
import { IPlayer } from "../types/utilsTypes";
import { randomTetShape } from "../utils/tetrominos";

function usePlayer() {
  const [player, setPlayer] = useState<IPlayer>({
    pos: { x: 0, y: 0 },
    tetromino: randomTetShape(),
    collided: false,
  });

  return [player];
}

export default usePlayer;
