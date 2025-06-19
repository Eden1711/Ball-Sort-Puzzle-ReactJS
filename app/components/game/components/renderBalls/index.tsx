import React from "react";
import type { Balls } from "~/interfaces";
import Ball from "../ball";

interface RenderBallsProps {
  balls: Balls[];
  size: number;
}

const RenderBalls = ({ balls, size }: RenderBallsProps) => {
  return (
    <React.Fragment>
      {balls.map(
        ({ colors, x, y, bounce, incognito, index, animate, positionTube }) => {
          return (
            x &&
            y && (
              <Ball
                key={index}
                {...{
                  colors,
                  bounce,
                  incognito,
                  animate,
                  index,
                  x,
                  y,
                  positionTube,
                }}
                size={size}
              />
            )
          );
        }
      )}
    </React.Fragment>
  );
};

export default RenderBalls;
