import { PropsWithChildren } from "react";
import { IRowProp } from "../types/componentsTypes";
import css from "../styles/tetris.module.css";

function Row({ children }: PropsWithChildren<IRowProp>) {
  return <div className={css.row}>{children}</div>;
}

export default Row;
