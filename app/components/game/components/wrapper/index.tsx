interface GameWrapperProps {
  disableUI: boolean;
  children: React.ReactNode;
}

const GameWrapper = ({ disableUI = false, children }: GameWrapperProps) => {
  return (
    <div className="flex-col h-full w-full flex items-center justify-center">
      {disableUI && <div className="h-full absolute w-full z-10"></div>}
      {children}
    </div>
  );
};

export default GameWrapper;
