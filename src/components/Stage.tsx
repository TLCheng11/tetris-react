import css from "../styles/tetris.module.css";
import { IStageProp } from "../types/componentsTypes";

function Stage({ stage }: IStageProp) {
  return <div id={css.stage}>{stage}</div>;
}

export default Stage;
