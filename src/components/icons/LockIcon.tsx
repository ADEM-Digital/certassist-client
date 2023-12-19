import { IconType } from "../../types/IconTypes";

const LockIcon = ({ height = 28, width = 32 }: IconType) => {
  return (
    <svg viewBox="0 0 32 30" height={height} width={width}>
      <circle
        fill="none"
        stroke="#EE0"
        style={{ strokeWidth: "3" }}
        cx="16"
        cy="15"
        r="12"
      ></circle>
      <circle
        fill="none"
        stroke="#EE0"
        style={{ strokeWidth: "2" }}
        cx="16"
        cy="12"
        r="3"
      ></circle>
      <rect
        fill="none"
        stroke="#EE0"
        style={{ fill: "#EE0" }}
        x="11"
        y="13"
        width="10"
        height="9"
        rx="1"
      ></rect>
      <path
        style={{ fill: "#457" }}
        d="M 15,21 l 0,-2 a 1.75,1.75 0 1 1 2,0 l 0,2 z"
      ></path>
    </svg>
  );
};

export default LockIcon;
