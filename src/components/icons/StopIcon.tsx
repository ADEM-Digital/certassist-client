import { IconType } from "../../types/IconTypes";

const StopIcon = ({height = 28, width = 32} : IconType) => {
  return (
    <svg viewBox="0 0 32 32" height={height} width={width}>
      <path
        style={{ fill: "#A00", stroke: "#A00" }}
        d="M 3,11 3,21 11,29 21,29 29,21 29,11 21,3 11,3 z"
      ></path>
      <path
        style={{ fill: "#F00", stroke: "#FFF", strokeWidth: "2" }}
        d="M 5,12 5,20 12,27 20,27 27,20 27,12 20,5 12,5 z"
      ></path>
    </svg>
  );
};

export default StopIcon;
