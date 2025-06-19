import React from "react";
import type { Coordinate, CoordinateTube, TestTubes } from "~/interfaces";
import Tube from "../tube";

interface TubesProps {
  distribution: number[];
  size: number;
  testTubes: TestTubes[];
  handleOnClick: (index: number) => void;
  handlePosition: (index: number, data: CoordinateTube) => void;
}

const Tubes = ({
  distribution,
  size,
  testTubes,
  handleOnClick,
  handlePosition,
}: TubesProps) => {
  return (
    <React.Fragment>
      {distribution.map((total, row) => (
        <div
          key={row}
          className="flex items-center justify-evenly w-full border"
          style={{ marginTop: row !== 0 ? size * 1.5 : "unset" }}
        >
          {new Array(total).fill(null).map((_, i) => {
            const indexBase = distribution
              .slice(0, row)
              .reduce((a, s) => a + s, 0);

            const { isComplete, index, style, capacity, showConfetti } =
              testTubes[indexBase + i];
            return (
              <Tube
                key={index}
                {...{ isComplete, index, style, showConfetti }}
                handleOnClick={handleOnClick}
                handlePosition={(index, coordinates) =>
                  handlePosition(index, { ...coordinates, capacity })
                }
              />
            );
          })}
        </div>
      ))}
    </React.Fragment>
  );
};

export default Tubes;
