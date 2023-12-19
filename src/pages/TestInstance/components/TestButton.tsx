type TestButtonProps = {
    icon: React.ReactElement,
    buttonText: string
    onClick?: () => void
}

const TestButton = ({icon, buttonText, onClick}: TestButtonProps) => {
  return (
    <button 
    onClick={onClick}
    className="px-[8px] mx-[6.5px] flex flex-col items-center text-shadow justify-center text-sm">
      {icon}
      {buttonText}
    </button>
  );
};

export default TestButton;
