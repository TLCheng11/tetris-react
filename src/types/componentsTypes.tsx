import { JSXElementConstructor, ReactElement } from "react";

export interface ICellProp {
  addToRefs(el: HTMLDivElement | null): void;
}

export interface IGameBackgroundProp {
  children: JSX.Element | null;
  move: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface IRowProp {}

export interface IStageProp {
  stage: ReactElement<any, string | JSXElementConstructor<any>>[] | null;
}
