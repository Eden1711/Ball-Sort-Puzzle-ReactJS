import type React from "react";
import type {
  Balls,
  CoordinateTube,
  SelectdItems,
  TestTubes,
  TubeDistribution,
  TubeType,
  Tween,
  TweenBall,
} from "~/interfaces";
import { COLORS_BALL } from "~/utils/colors";
import {
  HEIGHT_OFFSET_PERCENTAGE,
  INITIAL_SELECT_ITEMS,
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

const getPositionBallOutsideTube = (
  tubePosition: CoordinateTube,
  size: number
) => {
  return tubePosition.y - (size + size * 0.2);
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

const getTweensBall = (
  ballIndex: number,
  tubePositions: CoordinateTube[],
  originTubeIndex: number,
  targetTubeIndex: number,
  size: number,
  positionBallTube: number,
  balls: Balls[],
  firstBall: false
) => {
  const tween: TweenBall[] = [];

  const { x, y } = getPositionBallTube(
    tubePositions[targetTubeIndex],
    size,
    positionBallTube
  );

  tween.push(
    {
      ballIndex,
      tweenIndex: 1,
      completed: firstBall,
      x: balls[ballIndex].x || 0,
      y: getPositionBallOutsideTube(tubePositions[originTubeIndex], size),
    },
    {
      ballIndex,
      tweenIndex: 2,
      completed: false,
      x,
      y: getPositionBallOutsideTube(tubePositions[originTubeIndex], size),
    },
    {
      ballIndex,
      tweenIndex: 3,
      completed: false,
      x,
      y,
      positionTube: positionBallTube,
    }
  );
};

interface GenerateTweenBalls {
  originBallIndex: number;
  testTubes: TestTubes[];
  originTubeIndex: number;
  targetTubeIndex: number;
  tubePositions: CoordinateTube[];
  size: number;
  balls: Balls[];
}

const generateTweenBalls = ({
  originBallIndex,
  testTubes,
  originTubeIndex,
  targetTubeIndex,
  tubePositions,
  size,
  balls,
}: GenerateTweenBalls) => {
  const colorBallMove = balls[originBallIndex].color;

  const positionBallTube = testTubes[targetTubeIndex].balls.length;

  console.log({ colorBallMove, positionBallTube });

  const tween: TweenBall[] = getTweensBall(originBallIndex, tubePositions);
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

interface ValidateSelectedTubes {
  balls: Balls[];
  indexSelectedTube: number;
  selectedItems: SelectdItems;
  size: number;
  testTubes: TestTubes[];
  tubePositions: CoordinateTube[];
  setBalls: React.Dispatch<React.SetStateAction<Balls[]>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectdItems>>;
  setTweenBalls: React.Dispatch<React.SetStateAction<Tween>>;
}

export const validateSelectedTubes = ({
  balls,
  indexSelectedTube,
  selectedItems,
  size,
  testTubes,
  tubePositions,
  setBalls,
  setSelectedItems,
  setTweenBalls,
}: ValidateSelectedTubes) => {
  const copyBalls: Balls[] = JSON.parse(JSON.stringify(balls));

  const { originBallIndex, originTubeIndex } = selectedItems;

  // infomation select tube
  const tube = testTubes[indexSelectedTube];

  const ballTube = tube.balls;

  // validate if select tube is empty
  const isEmpty = ballTube.length === 0;

  // get index first ball in tube if not empty
  const ballIndex = !isEmpty ? ballTube[ballTube.length - 1] : -1;

  // find ball can move to another tube
  let ballCanMove = false;

  if (originTubeIndex < 0) {
    if (!isEmpty && !copyBalls[ballIndex].incognito) {
      copyBalls[ballIndex].originalY = copyBalls[ballIndex].y;
      copyBalls[ballIndex].animate = true;

      copyBalls[ballIndex].y = getPositionBallOutsideTube(
        tubePositions[indexSelectedTube],
        size
      );

      copyBalls[ballIndex].bounce = false;

      setBalls(copyBalls);

      setSelectedItems({
        originBallIndex: ballIndex,
        originTubeIndex: indexSelectedTube,
      });
    }
  } else {
    if (originTubeIndex === indexSelectedTube) {
      copyBalls[ballIndex].y = copyBalls[ballIndex].originalY;
      copyBalls[ballIndex].animate = true;
      copyBalls[ballIndex].bounce = true;

      setBalls(copyBalls);
      setSelectedItems(INITIAL_SELECT_ITEMS);
    } else {
      if (isEmpty) {
        ballCanMove = true;
      } else {
        const ballMove = balls[originBallIndex];
        const firstBallTargetTube = balls[ballIndex];

        const isSameColor = ballMove.color === firstBallTargetTube.color;

        const isIncognito = firstBallTargetTube.incognito;

        const isFullTube = tube.balls.length === tube.capacity;

        if (isSameColor && !isFullTube && !isIncognito) {
          ballCanMove = true;
        } else {
          copyBalls[originBallIndex].y = copyBalls[originBallIndex].originalY;
          copyBalls[originBallIndex].animate = true;
          copyBalls[originBallIndex].bounce = true;

          // the new ball select
          copyBalls[ballIndex].animate = true;
          copyBalls[ballIndex].bounce = false;
          copyBalls[ballIndex].originalY = copyBalls[ballIndex].y;
          copyBalls[ballIndex].y = getPositionBallOutsideTube(
            tubePositions[indexSelectedTube],
            size
          );

          setBalls(copyBalls);

          setSelectedItems({
            originBallIndex: ballIndex,
            originTubeIndex: indexSelectedTube,
          });
        }
      }
    }
  }

  if (ballCanMove) {
    generateTweenBalls({
      originBallIndex,
      testTubes,
      originTubeIndex,
      targetTubeIndex: indexSelectedTube,
      tubePositions,
      size,
      balls,
    });
    console.log("move");
  }
};
