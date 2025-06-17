import type { Coordinate, HeaderAction } from "~/interfaces";
import { COLORS_BALL } from "~/utils/colors";
import { Ball, GameWrapper, Header, Tube } from "./components";
import { getStyles } from "./helpers";

const SITE_TEST = 30;

const Game = () => {
  const handleAction = (type: HeaderAction) => {
    console.log(type);
  };

  const handleOnClick = (indexSelectedTube: number) => {
    console.log(indexSelectedTube);
  };

  const handlePosition = (index: number, data: Coordinate) => {
    console.log(index, data, "----");
  };
  return (
    <GameWrapper disableUI={false}>
      <Header
        level={1}
        isSpecialLevel={true}
        totalUndo={0}
        tubeHelpEnabled={false}
        handleAction={handleAction}
      />
      <Ball colors={COLORS_BALL[0]} size={SITE_TEST} x={235} y={445} />
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
      </div>
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
