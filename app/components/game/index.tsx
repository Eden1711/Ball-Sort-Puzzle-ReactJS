import type { HeaderAction } from "~/interfaces";
import { Ball, GameWrapper, Header } from "./components";
import { COLORS_BALL } from "~/utils/colors";
import { lightenDarkenColor } from "~/utils/helpers";

const Game = () => {
  const handleAction = (type: HeaderAction) => {
    console.log(type);
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
      {COLORS_BALL.map((color, index) => (
        <Ball
          key={index}
          colors={[color, lightenDarkenColor(color, 100)]}
          size={20}
          x={40 * index}
          y={300}
        />
      ))}

      <Ball
        colors={[COLORS_BALL[4], lightenDarkenColor(COLORS_BALL[4], 10)]}
        size={50}
        incognito
        x={200}
        y={400}
      />
    </GameWrapper>
  );
};

export default Game;
