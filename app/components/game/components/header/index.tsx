import React from "react";
import { Link } from "react-router";
import Icon from "~/components/icon";
import type { HeaderAction } from "~/interfaces";
import { HEADER_ACTIONS } from "~/utils/constants";

interface HeaderProps {
  level: number;
  isSpecialLevel: boolean;
  totalUndo: number;
  tubeHelpEnabled: boolean;
  handleAction: (type: HeaderAction) => void;
}

const Header = ({
  level,
  isSpecialLevel,
  totalUndo,
  tubeHelpEnabled,
  handleAction,
}: HeaderProps) => {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-evenly items-center px-8 py-2">
      <Link to={"/"} className="btn-header-game" title="Home">
        <Icon type="home" />
      </Link>
      <button
        className="btn-header-game"
        onClick={() => handleAction(HEADER_ACTIONS.RESTART)}
      >
        <Icon type="restart" />
      </button>
      <div className="bg-gray-500 flex items-center text-purple-900 rounded-lg flex-col font-bold uppercase justify-center p-2 w-[30%] drop-shadow-2xl">
        {isSpecialLevel ? (
          <React.Fragment>
            <div className="text-gray-700">Level</div>
            <div className="text-lg">{level}</div>
          </React.Fragment>
        ) : (
          "Special Level"
        )}
      </div>
      <button
        className="btn-header-game"
        title="Undo"
        disabled={totalUndo === 0}
        onClick={() => handleAction(HEADER_ACTIONS.RESTART)}
      >
        <Icon type="undo" />
      </button>
      <button
        className="btn-header-game"
        title="Tube"
        disabled={tubeHelpEnabled}
        onClick={() => handleAction(HEADER_ACTIONS.RESTART)}
      >
        <span>+</span>
        <Icon type="tube" />
      </button>
    </div>
  );
};

export default Header;
