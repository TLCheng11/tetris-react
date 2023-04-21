import { ITetromino, ITetrominos } from "../types/utilsTypes";

export const HEIGHT = 20;
export const WIDTH = 12;

export const TETROMINOS: ITetrominos = {
  N: { shape: [[[0]]], color: "rgba(0, 0, 0, 1)" },
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
    color: "rgba(80, 227, 230, 1)",
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
    color: "rgba(36, 95, 223, 1)",
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
    color: "rgba(223, 173, 36, 1)",
  },
  O: {
    shape: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
    color: "rgba(223, 217, 36, 1)",
  },
  S: {
    shape: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
    color: "rgba(48, 211, 56, 1)",
  },
  T: {
    shape: [
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
    ],
    color: "rgba(132, 61, 198, 1)",
  },
  Z: {
    shape: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
    ],
    color: "rgba(227, 78, 78, 1)",
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
