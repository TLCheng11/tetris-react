import { PropsWithChildren } from "react";
import { IRow } from "../types/componentsTypes";
import css from "../styles/tetris.module.css";

function Row({ children }: PropsWithChildren<IRow>) {
  return <div className={css.row}>{children}</div>;
}

export default Row;
