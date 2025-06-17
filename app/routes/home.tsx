import Game from "~/components/game";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="bg-gray-800 relative w-full lg:w-[500px] overflow-hidden flex items-center justify-center h-screen">
      <Game />
    </div>
  );
}
