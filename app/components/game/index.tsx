import type { HeaderAction } from "~/interfaces";
import { GameWrapper, Header } from "./components";

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
      Game
    </GameWrapper>
  );
};

export default Game;
