export interface ICellProp {
  addToRefs(el: HTMLDivElement | null): void;
}

export interface IGameBackgroundProp {
  children: JSX.Element | null;
  move: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface IRowProp {}
