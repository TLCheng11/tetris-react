export interface IElementRef {
  element: HTMLDivElement;
  merged: boolean;
}

export interface ITetromino {
  shape: number[][][];
  color: string;
}

export interface ITetrominos {
  [k: string]: ITetromino;
}

export interface IPlayer {
  pos: {
    x: number;
    y: number;
  };
  shape: number;
  tetromino: ITetromino;
  collided: boolean;
}
