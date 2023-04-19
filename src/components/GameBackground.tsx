import { IGameBackgroundProp } from "../types/componentsTypes";
import css from "../styles/tetris.module.css";

function GameBackground({ move, children }: IGameBackgroundProp) {
  return (
    <div id={css.background} role="button" tabIndex={0} onKeyDown={move}>
      {children}
    </div>
  );
}

export default GameBackground;
