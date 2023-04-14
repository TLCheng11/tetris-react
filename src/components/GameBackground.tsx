import { IGameBackground } from "../types/componentsTypes";
import css from "../styles/tetris.module.css";

function GameBackground({ children }: IGameBackground) {
  return <div id={css.background}>{children}</div>;
}

export default GameBackground;
