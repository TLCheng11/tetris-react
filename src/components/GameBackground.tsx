import { IGameBackgroundProp } from "../types/componentsTypes";
import css from "../styles/tetris.module.css";

function GameBackground({ children }: IGameBackgroundProp) {
  return <div id={css.background}>{children}</div>;
}

export default GameBackground;
