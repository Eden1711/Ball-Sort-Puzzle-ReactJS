import type React from "react";
import "./styles.css";
import { SPEED_ANIMATION } from "~/utils/constants";
import { INCOGNITO_COLOR } from "~/utils/colors";

interface BallProps {
  colors: [string, string];
  size: number;
  animate?: boolean;
  bounce?: boolean;
  incognito?: boolean;
  x?: number;
  y?: number;
}

const Ball = ({
  colors,
  size = 0,
  animate = false,
  bounce = false,
  incognito = false,
  x = 0,
  y = 0,
}: BallProps) => {
  const style = {
    left: x,
    top: y,
    width: size,
    height: size,
    transition: animate ? `all ${SPEED_ANIMATION}ms ease` : "unset",
    "--ball-primary": !incognito ? colors[1] : INCOGNITO_COLOR,
    "--ball-secondary": !incognito ? colors[0] : INCOGNITO_COLOR,
  } as React.CSSProperties;

  const classNames = `ball ${bounce ? "bounce" : ""} ${
    incognito ? "incognito" : ""
  }`;
  return (
    <div className={classNames} style={style}>
      {incognito && "?"}
    </div>
  );
};

export default Ball;
