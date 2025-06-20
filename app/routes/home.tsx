import Game from "~/components/game";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const level = {
  size: 35,
  distribution: [5, 4],
  capacity: 4,
  level: 30,
  isSpecialLevel: false,
  tubes: {
    "0": {
      balls: [
        { value: 1, incognito: false },
        { value: 8, incognito: false },
        { value: 1, incognito: false },
        { value: 6, incognito: false },
      ],
    },
    "1": {
      balls: [
        { value: 4, incognito: false },
        { value: 8, incognito: false },
        { value: 1, incognito: false },
        { value: 4, incognito: false },
      ],
    },
    "2": {
      balls: [
        { value: 5, incognito: false },
        { value: 5, incognito: false },
        { value: 9, incognito: false },
        { value: 6, incognito: false },
      ],
    },
    "3": {
      balls: [
        { value: 1, incognito: false },
        { value: 9, incognito: false },
        { value: 9, incognito: false },
        { value: 8, incognito: false },
      ],
    },
    "4": {
      balls: [
        { value: 5, incognito: false },
        { value: 5, incognito: false },
        { value: 6, incognito: false },
        { value: 4, incognito: false },
      ],
    },
    "6": {
      balls: [
        { value: 4, incognito: false },
        { value: 7, incognito: false },
        { value: 6, incognito: false },
        { value: 8, incognito: false },
      ],
    },
    "8": {
      balls: [
        { value: 7, incognito: false },
        { value: 7, incognito: false },
        { value: 7, incognito: false },
        { value: 9, incognito: false },
      ],
    },
  },
  levelCompleted: false,
};

// const level = {
//   size: 80,
//   distribution: [3],
//   capacity: 4,
//   level: 1,
//   isSpecialLevel: false,
//   tubes: {
//     "0": {
//       balls: [{ value: 5, incognito: false }],
//     },
//     "1": {
//       balls: [
//         { value: 5, incognito: false },
//         { value: 5, incognito: false },
//         { value: 5, incognito: false },
//       ],
//     },
//   },
//   levelCompleted: false,
// };

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
