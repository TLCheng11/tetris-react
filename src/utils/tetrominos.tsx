import { ITetromino, ITetrominos } from "../types/utilsTypes";

export const HEIGHT = 20;
export const WIDTH = 12;

export const TETROMINOS: ITetrominos = {
  N: { shape: [[[0]]], color: "0, 0, 0" },
  I: {
    shape: [
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    color: "80, 227, 230",
  },
  J: {
    shape: [
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
    ],
    color: "36, 95, 223",
  },
  L: {
    shape: [
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
    color: "48, 211, 56",
  },
  T: {
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
    ],
    color: "227, 78, 78",
  },
};

export function randomTetromino(): ITetromino {
  const tetrominos = "IJLOSTZ";
  const randTet: string =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTet];
}

// export function randomTetShape(): number[][] {
//   const currTet = randomTetromino();
//   const shapes = currTet.shape.length;
//   return currTet.shape[Math.floor(Math.random() * shapes)];
// }
