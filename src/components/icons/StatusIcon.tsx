import { IconType } from "../../types/IconTypes";

const StatusIcon = ({width, height, strokeColor}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "13"}
      height={height ?? "13"}
      viewBox={`0 0 ${width ?? 13} ${height ?? 13}`}
      fill="none"
    >
      <circle cx="6.5" cy="6.5" r="4" fill={strokeColor ?? "#4AA374"} />
    </svg>
  );
};

export default StatusIcon;
