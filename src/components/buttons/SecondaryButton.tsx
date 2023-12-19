type MainButtonProps = {
  icon?: React.ReactNode;
  iconDirection: "left" | "right";
  buttonText: string;
  onClick?: (e: React.SyntheticEvent) => void;
};

const SecondaryButton = ({
  icon,
  iconDirection,
  buttonText,
  onClick,
}: MainButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => (onClick ? onClick(e) : null)}
      className="flex items-center justify-center gap-2 p-2 bg-transparent text-button-100 font-body font-semibold text-sm rounded border-2 border-button-100"
    >
      {iconDirection === "left" && icon}
      <span>{buttonText}</span>
      {iconDirection === "right" && icon}
    </button>
  );
};

export default SecondaryButton;
