import {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { HEIGHT, WIDTH } from "../utils/tetrominos";
import Cell from "../components/Cell";
import Row from "../components/Row";
import { IElementRef, IPlayer } from "../types/utilsTypes";

function useStage(
  player: IPlayer,
  resetPlayer: () => void,
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
  }, [cellRefs]);

  useEffect(() => {
    // check if there is a fully merged line
    function checkLineClear() {
      let r = HEIGHT - 1;
      while (r >= 0) {
        const row = cellRefs.current[r];
        if (row.every((cell) => cell.merged)) {
          let i = r;
          while (i >= 0) {
            if (i === 0) {
              cellRefs.current[i].forEach((cell) => {
                cell.element.style.backgroundColor = "";
                cell.merged = false;
              });
            } else {
              for (let c = 0; c < WIDTH; c++) {
                cellRefs.current[i][c].element.style.backgroundColor =
                  cellRefs.current[i - 1][c].element.style.backgroundColor;
                cellRefs.current[i][c].merged =
                  cellRefs.current[i - 1][c].merged;
              }
            }
            i--;
          }
          r++;
        }
        r--;
      }
    }

    // fill tetromino into next positon automatically when player updated
    if (
      cellRefs.current[HEIGHT - 1] &&
      cellRefs.current[HEIGHT - 1][WIDTH - 1]
    ) {
      updateCell(player, "fill");
      if (player.collided) {
        resetPlayer();
        checkLineClear();
      }
    }
  }, [player, cellRefs, resetPlayer]);

  function clearCells(): void {
    // clear the current tetromino
    if (
      cellRefs.current[HEIGHT - 1] &&
      cellRefs.current[HEIGHT - 1][WIDTH - 1]
    ) {
      updateCell(player, "clear");
    }
  }

  // function to update cell base on current player position and tetromino
  const updateCell = useCallback(
    (player: IPlayer, action: string) => {
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
                cellRefs.current[y][x].merged = player.collided;
              }
            }
          }
        });
      });
    },
    [cellRefs]
  );

  return [stage, clearCells];
}

export default useStage;
