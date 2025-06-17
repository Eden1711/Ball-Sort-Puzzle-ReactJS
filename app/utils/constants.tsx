export enum HEADER_ACTIONS {
  "HOME" = "HOME",
  "RESTART" = "RESTART",
  "UNDO" = "UNDO",
  "TUBE" = "TUBE",
}

export const BASE_HEIGHT = 732;
export const BASE_WIDTH = 412;

export const SPEED_ANIMATION = 80;

export const WIDTH_PADDING_PERCENTAGE = 0.4;

export const HEIGHT_OFFSET_PERCENTAGE = 0.95;

export const INITIAL_SELECT_ITEMS = { originTubeIndex: -1, originBallInde: -1 };

export const INITIAL_TWEEN_BALLS = {
  tweens: [],
  tubes: { origin: -1, destinity: -1 },
};
