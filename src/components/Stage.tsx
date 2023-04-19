import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import css from "../styles/tetris.module.css";
import Cell from "./Cell";
import Row from "./Row";
import { HEIGHT, WIDTH } from "../utils/tetrominos";

function Stage() {
  const [stage, setStage] = useState<JSX.Element[] | null>(null);
  const cellRefs = useRef<HTMLDivElement[][]>(
    Array.from(Array(HEIGHT), () => new Array())
  );

  useEffect(() => {
    if (cellRefs.current) {
      const rows: JSX.Element[] = [];
      // create 20 rows and create 12 cells for each row
      for (let i = 0; i < HEIGHT * 10; i += 10) {
        const rowIndex = i / 10;

        const row = (
          <Row key={"row_" + rowIndex}>
            {/* create 12 cells for each row */}
            {Array.from(Array(WIDTH).keys()).map((k) => (
              <Cell key={"cell_" + i + k} addToRefs={addToRefs} />
            ))}
          </Row>
        );
        rows.push(row);
      }
      setStage(rows);
    }
  }, []);

  const addToRefs = useCallback((el: HTMLDivElement): void => {
    if (cellRefs.current && cellRefs.current.length === HEIGHT) {
      let row = 0;
      while (row < HEIGHT && cellRefs.current[row].length >= WIDTH) {
        row++;
      }
      if (row < HEIGHT) {
        cellRefs.current[row].push(el);
      }
    }
  }, []);

  return <div id={css.stage}>{stage}</div>;
}

export default Stage;
