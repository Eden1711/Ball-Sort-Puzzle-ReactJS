import type {
  Balls,
  CoordinateTube,
  TestTubes,
  TubeDistribution,
  TubeType,
} from "~/interfaces";
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

const validateLastTubeHelp = (
  testTubes: TestTubes[],
  balls: Balls[],
  capacity: number
) => {
  const lastTube = testTubes[testTubes.length - 1];

  const totalTubesFill = [...new Set(balls.map((v) => v.color))].length;

  const totalTubes = testTubes.length;

  const minimumTubeValue =
    totalTubes + 1 <= totalTubesFill + 3 || lastTube.capacity < capacity;

  return minimumTubeValue;
};

const getPositionBallTube = (
  tubePosition: CoordinateTube,
  size: number,
  positionBallTube: number
) => {
  const { height, borderWidth } = getStyles(size, tubePosition.capacity);

  const { x, y } = tubePosition;

  const percentage = size * WIDTH_PADDING_PERCENTAGE;

  const baseX = Math.round(x + percentage / 2);
  const baseY = Math.round(y + height - size - borderWidth - percentage / 2);

  return {
    x: baseX,
    y: baseY - size * positionBallTube,
  };
};

export const getInitialBalls = (tubes: TubeType) => {
  const newBalls: Balls[] = [];
  let index = 0;

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

        index++;
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
  return newTestTubes;
};

interface GetInitialValueDistribution {
  balls: Balls[];
  capacity: number;
  distribution: number[];
  testTubes: TestTubes[];
}

export const getInitialValueDistribution = ({
  balls,
  capacity,
  distribution,
  testTubes,
}: GetInitialValueDistribution) => {
  const minimumTubeValue = validateLastTubeHelp(testTubes, balls, capacity);

  const newDistribution: TubeDistribution = {
    distribution,
    isComplete: !minimumTubeValue,
  };

  return newDistribution;
};

export const setPositionBalls = (
  balls: Balls[],
  coordinates: CoordinateTube[],
  size: number
) => {
  const copyBalls = JSON.parse(JSON.stringify(balls));

  for (let i = 0; i < coordinates.length; i++) {
    const ballsTube = copyBalls.filter((v: any) => v.indexTube === i);

    if (ballsTube.length !== 0) {
      for (let c = 0; c < ballsTube.length; c++) {
        const { x, y } = getPositionBallTube(
          coordinates[i],
          size,
          copyBalls[ballsTube[c].index].positionTube
        );

        copyBalls[ballsTube[c].index].x = x;
        copyBalls[ballsTube[c].index].y = y;
      }
    }
  }

  return copyBalls;
};
