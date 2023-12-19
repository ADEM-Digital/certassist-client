import React from "react";
import { IconType } from "../../types/IconTypes";

const NoteIcon = ({ width = 32, height = 28 }: IconType) => {
  return (
    <svg id="noteIcon" viewBox="0 0 160 160" width={width} height={height}>
      <rect
        stroke="#000"
        strokeWidth="2"
        x="0"
        y="20"
        width="130"
        height="80"
        fill="#FCFCFC"
      ></rect>
      <text
        x="20"
        y="70"
        style={{
          fontFamily: "Chalkboard SE Segoe Print cursive",
          fontSize: "40px",
        }}
      >
        ABC
      </text>

      <g id="pencil" transform="rotate(25) translate(100,-20)">
        <rect
          stroke="#000"
          strokeWidth="2"
          transform="rotate(-60,90,48)"
          width="90"
          height="30"
          style={{ fill: "#F7971D" }}
        ></rect>
        <polyline
          points="3,102 5,127 30,117"
          style={{ fill: "#FFF" }}
        ></polyline>
        <polyline points="4.5,117 5,127 14.5,123"></polyline>
        <rect
          stroke="#000"
          strokeWidth="2"
          transform="rotate(-60,45,-30)"
          width="25"
          height="30"
          style={{ fill: "#F06567" }}
        ></rect>
      </g>
    </svg>
  );
};

export default NoteIcon;
