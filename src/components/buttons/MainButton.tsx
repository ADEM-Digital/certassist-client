type MainButtonProps = {
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconDirection?: "left" | "right";
  buttonText: string;
  onClick?: (e: React.SyntheticEvent) => void;
};

const MainButton = ({ icon, iconDirection, buttonText, onClick, type }: MainButtonProps) => {
  return (
    <button
      type={type ?? "button"}
      onClick={(e) => onClick ? onClick(e) : null}
      className="flex items-center justify-center gap-2 p-2 bg-button-100 hover:bg-button-100 hover:bg-opacity-90 text-white font-body font-semibold text-sm rounded"
    >
      {iconDirection === "left" && icon}
      <span>{buttonText}</span>
      {iconDirection === "right" && icon}
    </button>
  );
};

export default MainButton;
