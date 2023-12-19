import React from "react";
import { IconType } from "../../types/IconTypes";

const EmptyClockIcon = ({width, height, strokeColor} : IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "24"}
      height={height ?? "24"}
      viewBox={`0 0 ${width ?? 24} ${height ?? 24}`}
      fill="none"
    >
      <circle cx="12" cy="13" r="8" fill={strokeColor ?? "#333333"} />
      <path d="M5.5 4.5L3.5 6.5" stroke={strokeColor ?? "#333333"} strokeLinecap="round" />
      <path d="M18.5 4.5L20.5 6.5" stroke={strokeColor ?? "#333333"} strokeLinecap="round" />
      <path
        d="M12 8V12.9243C12 12.9737 12.0146 13.0219 12.042 13.063L14 16"
        stroke={strokeColor ?? "#333333"}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EmptyClockIcon;
