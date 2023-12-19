import React from "react";
import { IconType } from "../../types/IconTypes";

const CalcIcon = ({ width = 32, height = 28 }: IconType) => {
  return (
    <svg viewBox="2 2 32 28" height={height} width={width}>
      <rect
        fill="#FFF"
        stroke="#000"
        strokeWidth="0.5"
        style={{ fill: "#999" }}
        width="28"
        height="24"
        x="3.5"
        y="3.5"
        rx="3.5"
      ></rect>
      <path
        fill="#FFF"
        stroke="#000"
        strokeWidth="0.5"
        style={{ fill: "#999" }}
        d="M3.5,22.5 l 0,5 l 28,0 l 0,-5"
      ></path>
      <rect
        fill="#FFF"
        stroke="#000"
        strokeWidth="0.5"
        width="24"
        height="10"
        x="5.5"
        y="7.5"
      ></rect>
      <text style={{ fontSize: "8px", fontFamily: "Tahoma" }}>
        <tspan x="9" y="15">
          0.25
        </tspan>
      </text>
      <rect
        fill="#FFF"
        stroke="#000"
        strokeWidth="0.5"
        width="4"
        height="3"
        x="5.5"
        y="21.5"
      ></rect>
      <rect
        fill="#FFF"
        stroke="#000"
        strokeWidth="0.5"
        width="4"
        height="3"
        x="11.5"
        y="21.5"
      ></rect>
      <rect
        fill="#FFF"
        stroke="#000"
        strokeWidth="0.5"
        width="4"
        height="3"
        x="18.5"
        y="21.5"
      ></rect>
      <rect
        fill="#FFF"
        stroke="#000"
        strokeWidth="0.5"
        width="4"
        height="3"
        x="24.5"
        y="21.5"
      ></rect>
    </svg>
  );
};

export default CalcIcon;
