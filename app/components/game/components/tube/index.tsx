import React, { useEffect, useRef } from "react";
import type { Coordinate } from "~/interfaces";
import Confetti from "react-confetti";

import "./style.css";

interface TubeProps {
  style: React.CSSProperties;
  index: number;
  isComplete?: boolean;
  showConfetti?: boolean;
  handleOnClick: (index: number) => void;
  handlePosition: (index: number, data: Coordinate) => void;
}

const Tube = ({
  style = {},
  index = 0,
  isComplete = false,
  showConfetti = false,
  handleOnClick,
  handlePosition,
}: TubeProps) => {
  console.log(style, index);

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current;
      handlePosition(index, { x: rect.offsetLeft, y: rect.offsetTop });
    }
  }, [handlePosition, index]);
  return (
    <button
      ref={ref}
      className="tube"
      aria-label={`Tube ${index + 1}`}
      style={style}
      onClick={() => handleOnClick(index)}
    >
      <Confetti recycle={false} width={200} height={300} />
    </button>
  );
};

export default Tube;
