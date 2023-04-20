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
import { IPlayer } from "../types/utilsTypes";

function useStage(
  player: IPlayer
): [
  ReactElement<any, string | JSXElementConstructor<any>>[] | null,
  () => void
] {
  const [stage, setStage] = useState<ReactElement[] | null>(null);
  const cellRefs = useRef<HTMLDivElement[][]>(
    Array.from(Array(HEIGHT), () => [])
  );

  useEffect(() => {
    function addToRefs(el: HTMLDivElement): void {
      if (cellRefs.current && cellRefs.current.length === HEIGHT) {
        let row = 0;
        while (row < HEIGHT && cellRefs.current[row].length >= WIDTH) {
          row++;
        }
        if (row < HEIGHT) {
          cellRefs.current[row].push(el);
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
    const H = currShape.length;
    const W = currShape.length;
    for (let h = 0; h < H; h++) {
      for (let w = 0; w < W; w++) {
        const x = player.pos.x + h;
        const y = player.pos.y + w;
        if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
          if (action === "clear") {
            cellRefs.current[y][x].style.backgroundColor = "black";
          } else if (action === "fill") {
            if (currShape[h][w]) {
              cellRefs.current[y][x].style.backgroundColor = "red";
            }
          }
        }
      }
    }
  }, []);

  return [stage, clearCells];
}

export default useStage;