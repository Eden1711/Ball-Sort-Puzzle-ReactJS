import type { HEADER_ACTIONS } from "~/utils/constants";

export type HeaderAction = keyof typeof HEADER_ACTIONS;

export interface Coordinate {
  x: number;
  y: number;
}

export interface CoordinateTube extends Coordinate {
  capacity: number;
}

export interface BallsInTestTubes {
  value: number;
  incognito?: boolean;
}

export type TubeType = Record<
  string,
  { balls?: BallsInTestTubes[]; capacity?: number; isComplete?: boolean }
>;

export interface GameProps {
  size: number;
  distribution: number[];
  capacity: number;
  level: number;
  isSpecialLevel: boolean;
  tubes: TubeType;
}

export interface TestTubes {
  balls: number[];
  capacity: number;
  index: number;
  isComplete: boolean;
  showConfetti: boolean;
  style: React.CSSProperties;
}

export interface Balls {
  color: number;
  colors: [string, string];
  index: number;
  indexTube: number;
  positionTube: number;
  bounce?: boolean;
  originalY?: number;
  incognito?: boolean;
  animate?: boolean;
  x?: number;
  y?: number;
}

export interface TubeDistribution {
  distribution: number[];
  isComplete: boolean;
}
