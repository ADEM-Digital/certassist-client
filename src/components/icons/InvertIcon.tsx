import React from "react";
import { IconType } from "../../types/IconTypes";

const InvertIcon = ({ width = 32, height = 28 }: IconType) => {
  return (
    <svg viewBox="4 2 28 32" height={height} width={width}>
      <defs>
        <linearGradient x1="8" y1="19" x2="31" y2="19" id="lg1">
          <stop style={{stopColor:"#666"}} offset="0"></stop>
          <stop style={{stopColor:"#CCC"}} offset="1"></stop>
        </linearGradient>
      </defs>
      <path
        style={{ fill: "#F8F8F8", stroke: "#333", strokeWidth: "1" }}
        d="m 31,17.5 a 13,13 0 1 1 -26,0 13,13 0 1 1 26,0"
      ></path>
      <path
        style={{ fill: "url(#lg1)", stroke: "#111", strokeWidth: "1" }}
        d="m 29,11 a 12,12 0 0 1 -22,13 z"
      ></path>
      <path
        style={{ fill: "#111" }}
        d="m 28,11 a 11,11 0 0 1 -21.5,12.5 z"
      ></path>
    </svg>
  );
};

export default InvertIcon;
