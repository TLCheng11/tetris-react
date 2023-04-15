import css from "../styles/tetris.module.css";
import { ICellProp } from "../types/componentsTypes";

function Cell({ addToRefs }: ICellProp) {
  return <div className={css.cell} ref={addToRefs}></div>;
}

export default Cell;
