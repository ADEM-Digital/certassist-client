import React from "react";
import { IconType } from "../../types/IconTypes";

const TrashIcon = ({ width, height, strokeColor }: IconType) => {
  return (
    <div className="flex flex-col items-center gap-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ? Number(width) * 0.375 : "6"}
        height={height ? Number(width) * 0.2 : "3"}
        viewBox={`0 0 ${width ? Number(width) * 0.375 : 6} ${height ? Number(width) * 0.2 : "3"}`}
        fill="none"
      >
        <path
          d="M1.06815 1.37059C1.1821 1.26427 1.43319 1.17033 1.78248 1.10332C2.13177 1.03632 2.55973 1 3 1C3.44027 1 3.86823 1.03632 4.21752 1.10332C4.56681 1.17033 4.8179 1.26427 4.93185 1.37059"
          stroke={strokeColor ?? "#333333"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "18"}
        height={height ?? "15"}
        viewBox={`0 0 ${width ?? 18} ${height ?? 15}`}
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.0001 0H6.10352e-05V3C1.10463 3 2.00006 3.89543 2.00006 5V9C2.00006 11.8284 2.00006 13.2426 2.87874 14.1213C3.75742 15 5.17163 15 8.00006 15H10.0001C12.8285 15 14.2427 15 15.1214 14.1213C16.0001 13.2426 16.0001 11.8284 16.0001 9V5C16.0001 3.89543 16.8955 3 18.0001 3V0ZM7.50006 5C7.50006 4.44772 7.05235 4 6.50006 4C5.94778 4 5.50006 4.44772 5.50006 5V10C5.50006 10.5523 5.94778 11 6.50006 11C7.05235 11 7.50006 10.5523 7.50006 10V5ZM12.5001 5C12.5001 4.44772 12.0523 4 11.5001 4C10.9478 4 10.5001 4.44772 10.5001 5V10C10.5001 10.5523 10.9478 11 11.5001 11C12.0523 11 12.5001 10.5523 12.5001 10V5Z"
          fill={strokeColor ?? "#333333"}
        />
      </svg>
    </div>
  );
};

export default TrashIcon;
