import type { HEADER_ACTIONS } from "~/utils/constants";

export type HeaderAction = keyof typeof HEADER_ACTIONS;

export interface Coordinate {
  x: number;
  y: number;
}
