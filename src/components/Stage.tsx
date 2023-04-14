import { useEffect, useState } from "react";
import css from "../styles/tetris.module.css";
import Cell from "./Cell";
import Row from "./Row";

function Stage() {
  const [stage, setStage] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    const rows: JSX.Element[] = [];
    // create 20 rows and create 12 cells for each row
    for (let i = 0; i < 200; i += 10) {
      const row = (
        <Row key={"row_" + i / 10}>
          {/* create 12 cells for each row */}
          {Array.from(Array(12).keys()).map((k) => (
            <Cell key={"cell_" + i + k} />
          ))}
        </Row>
      );
      rows.push(row);
    }
    setStage(rows);
  }, []);

  return <div id={css.stage}>{stage}</div>;
}

export default Stage;
