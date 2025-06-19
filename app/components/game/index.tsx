import type {
  Balls,
  Coordinate,
  CoordinateTube,
  GameProps,
  HeaderAction,
  TestTubes,
  TubeDistribution,
} from "~/interfaces";
import { COLORS_BALL } from "~/utils/colors";
import { Ball, GameWrapper, Header, Tube, Tubes } from "./components";
import {
  getInitialBalls,
  getInitialTestTubes,
  getInitialValueDistribution,
  getStyles,
} from "./helpers";
import { useRef, useState } from "react";

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
  const tubeRef = useRef<CoordinateTube[]>([]);
  const [balls] = useState<Balls[]>(() => getInitialBalls(tubes));

  const [testTubes] = useState<TestTubes[]>(() =>
    getInitialTestTubes(tubes, distribution, capacity, size)
  );

  // setTubeDistribution
  // Save the local distribution of the pipes
  // this is necessary beacause it can mutate when a new tube add.
  const [tubeDistribution] = useState(() =>
    getInitialValueDistribution({ balls, capacity, distribution, testTubes })
  );

  const handleAction = (type: HeaderAction) => {
    console.log(type);
  };

  const handleOnClick = (indexSelectedTube: number) => {
    console.log(indexSelectedTube);
  };

  const handlePosition = (index: number, data: CoordinateTube) => {
    tubeRef.current[index] = data;
  };
  return (
    <GameWrapper disableUI={false}>
      <Header
        level={1}
        isSpecialLevel={true}
        totalUndo={0}
        tubeHelpEnabled={tubeDistribution.isComplete}
        handleAction={handleAction}
      />
      <Tubes
        distribution={tubeDistribution.distribution}
        size={size}
        testTubes={testTubes}
        handleOnClick={handleOnClick}
        handlePosition={handlePosition}
      />
      {/* <Ball colors={COLORS_BALL[0]} size={SITE_TEST} x={235} y={445} />
      <Ball
        colors={COLORS_BALL[2]}
        size={SITE_TEST}
        x={235}
        y={445 - SITE_TEST}
      />
      <div className="justify-evenly flex w-full">
        <Tube
          style={getStyles(SITE_TEST, 4)}
          index={0}
          handleOnClick={handleOnClick}
          handlePosition={handlePosition}
        />
        <Tube
          style={getStyles(SITE_TEST, 4)}
          index={1}
          handleOnClick={handleOnClick}
          handlePosition={handlePosition}
        />
        <Tube
          style={getStyles(SITE_TEST, 4)}
          index={2}
          handleOnClick={handleOnClick}
          handlePosition={handlePosition}
        />
      </div> */}
      {/* {COLORS_BALL.map((color, index) => (
        <Ball
          key={index}
          colors={color}
          size={SITE_TEST}
          x={40 * index}
          y={300}
        />
      ))} */}
    </GameWrapper>
  );
};

export default Game;
