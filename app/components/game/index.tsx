import {
  type Balls,
  type Coordinate,
  type CoordinateTube,
  type GameProps,
  type HeaderAction,
  type SelectdItems,
  type TestTubes,
  type TubeDistribution,
  type Tween,
} from "~/interfaces";
import { COLORS_BALL } from "~/utils/colors";
import {
  Ball,
  GameWrapper,
  Header,
  RenderBalls,
  Tube,
  Tubes,
} from "./components";
import {
  getInitialBalls,
  getInitialTestTubes,
  getInitialValueDistribution,
  getStyles,
  setPositionBalls,
  validateSelectedTubes,
} from "./helpers";
import { useEffect, useRef, useState } from "react";
import { INITIAL_SELECT_ITEMS, INITIAL_TWEEN_BALLS } from "~/utils/constants";

const SITE_TEST = 30;

interface GamePropsComponent extends GameProps {
  handleNextLevel: (isNextLevel?: boolean) => void;
}

const Game = ({
  size,
  capacity,
  distribution,
  handleNextLevel,
  isSpecialLevel,
  level,
  tubes,
}: GamePropsComponent) => {
  const tubesRef = useRef<CoordinateTube[]>([]);
  const [balls, setBalls] = useState<Balls[]>(() => getInitialBalls(tubes));
  // console.log(balls);

  const [testTubes] = useState<TestTubes[]>(() =>
    getInitialTestTubes(tubes, distribution, capacity, size)
  );

  // Save the local distribution of the pipes
  // this is necessary beacause it can mutate when a new tube add.
  const [tubeDistribution] = useState(() =>
    getInitialValueDistribution({ balls, capacity, distribution, testTubes })
  );

  const [selectedItems, setSelectedItems] =
    useState<SelectdItems>(INITIAL_SELECT_ITEMS);

  const [tweenBalls, setTweenBalls] = useState<Tween>(INITIAL_TWEEN_BALLS);

  useEffect(() => {
    setBalls((data) => setPositionBalls(data, tubesRef.current, size));
  }, [size, tubeDistribution]);

  const handleAction = (type: HeaderAction) => {
    console.log(type);
  };

  const handleOnClick = (indexSelectedTube: number) => {
    validateSelectedTubes({
      balls,
      indexSelectedTube,
      selectedItems,
      size,
      testTubes,
      tubePositions: tubesRef.current,
      setBalls,
      setSelectedItems,
      setTweenBalls,
    });
  };

  const handlePosition = (index: number, data: CoordinateTube) => {
    tubesRef.current[index] = data;
  };

  const disabledUI = tweenBalls.tubes.origin >= 0;
  return (
    <GameWrapper disableUI={disabledUI}>
      <Header
        level={level}
        isSpecialLevel={true}
        totalUndo={2}
        tubeHelpEnabled={tubeDistribution.isComplete}
        handleAction={handleAction}
      />
      <RenderBalls balls={balls} size={size} />
      <Tubes
        distribution={tubeDistribution.distribution}
        size={size}
        testTubes={testTubes}
        handleOnClick={handleOnClick}
        handlePosition={handlePosition}
      />
    </GameWrapper>
  );
};

export default Game;
