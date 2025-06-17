import type { Balls, TestTubes, TubeType } from "~/interfaces";
import { COLORS_BALL } from "~/utils/colors";
import {
  HEIGHT_OFFSET_PERCENTAGE,
  WIDTH_PADDING_PERCENTAGE,
} from "~/utils/constants";

export const getStyles = (size: number, capacity: number) => {
  const width = Math.round(size + size * WIDTH_PADDING_PERCENTAGE);
  const borderWidth = Math.round(width - width * 0.95);
  const height = Math.round(size * capacity + size * HEIGHT_OFFSET_PERCENTAGE);

  return { width, borderWidth, height };
};

export const getInitialBalls = (tubes: TubeType) => {
  const newBalls: Balls[] = [];
  let index = 0;
  console.log("---", tubes);

  for (let tube in tubes) {
    const balls = tubes[tube].balls || [];

    if (balls.length !== 0) {
      for (let i = 0; i < balls.length; i++) {
        newBalls.push({
          index,
          indexTube: +tube,
          incognito: balls[i].incognito || false,
          animate: false,
          positionTube: i,
          color: balls[i].value,
          colors: COLORS_BALL[balls[i].value],
        });
      }
    }
  }

  return newBalls;
};

export const getInitialTestTubes = (
  tubes: TubeType,
  distribution: number[],
  capacity: number,
  size: number
) => {
  const totalTubes = distribution.reduce((a, s) => a + s, 0);
  const newTestTubes: TestTubes[] = [];

  for (let i = 0, indexBase = 0; i < totalTubes; i++) {
    const balls = (tubes[i]?.balls || []).map(
      (_, ballIndex) => ballIndex + indexBase
    );

    const tubeCapacity = tubes[i]?.capacity || capacity;
    const isComplete = tubes[i]?.isComplete || false;
    indexBase += balls.length;

    newTestTubes.push({
      balls,
      capacity: tubeCapacity,
      index: i,
      isComplete,
      showConfetti: false,
      style: getStyles(size, tubeCapacity),
    });
  }
};
