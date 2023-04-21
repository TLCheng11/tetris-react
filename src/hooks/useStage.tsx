import {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { HEIGHT, WIDTH } from "../utils/tetrominos";
import Cell from "../components/Cell";
import Row from "../components/Row";
import { IElementRef, IPlayer } from "../types/utilsTypes";

function useStage(
  player: IPlayer,
  cellRefs: React.MutableRefObject<IElementRef[][]>
): [
  ReactElement<any, string | JSXElementConstructor<any>>[] | null,
  () => void
] {
  const [stage, setStage] = useState<ReactElement[] | null>(null);

  useEffect(() => {
    function addToRefs(el: HTMLDivElement): void {
      if (cellRefs.current && cellRefs.current.length === HEIGHT) {
        let row = 0;
        while (row < HEIGHT && cellRefs.current[row].length >= WIDTH) {
          row++;
        }
        if (row < HEIGHT) {
          cellRefs.current[row].push({ element: el, merged: false });
        }
      }
    }

    if (cellRefs.current) {
      const rows: ReactElement[] = [];
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

  function clearCells(): void {
    // clear the current tetromino
    if (
      cellRefs.current[HEIGHT - 1] &&
      cellRefs.current[HEIGHT - 1][WIDTH - 1]
    ) {
      updateCell(player, "clear");
    }
  }

  useEffect(() => {
    // fill tetromino into next positon automatically when player updated
    if (
      cellRefs.current[HEIGHT - 1] &&
      cellRefs.current[HEIGHT - 1][WIDTH - 1]
    ) {
      updateCell(player, "fill");
    }
  }, [player]);

  // function to update cell base on current player position and tetromino
  const updateCell = useCallback((player: IPlayer, action: string) => {
    const currShape = player.tetromino.shape[player.shape];
    currShape.forEach((row, h) => {
      row.forEach((value, w) => {
        const x = player.pos.x + w;
        const y = player.pos.y + h;
        if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
          if (action === "clear" && !cellRefs.current[y][x].merged) {
            cellRefs.current[y][x].element.style.backgroundColor = "";
          } else if (action === "fill") {
            if (value) {
              cellRefs.current[y][x].element.style.backgroundColor =
                player.tetromino.color;
            }
          }
        }
      });
    });
  }, []);

  return [stage, clearCells];
}

export default useStage;
