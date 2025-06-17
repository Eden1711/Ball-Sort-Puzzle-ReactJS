import Game from "~/components/game";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const level = {
  size: 35,
  distribution: [2],
  capacity: 4,
  level: 1,
  isSpecialLevel: false,
  tubes: {
    "0": { balls: [{ value: 5 }] },
    "1": { balls: [{ value: 5 }, { value: 5 }, { value: 5 }] },
  },
  levelCompleted: false,
};

export default function Home() {
  const handleNextLevel = (isNextLevel = false) => {
    console.log("handleNextLevel", isNextLevel);
  };
  return (
    <div className="bg-gray-800 relative w-full lg:w-[500px] overflow-hidden flex items-center justify-center h-screen">
      <Game {...level} handleNextLevel={handleNextLevel} />
    </div>
  );
}
