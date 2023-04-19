export interface ITetromino {
  shape: number[][][];
  color: string;
}

export interface ITetrominos {
  [k: string]: ITetromino;
}
