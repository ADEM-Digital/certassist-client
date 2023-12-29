import { IconType } from "../../types/IconTypes";


const DashboardIcon = ({width = 40, height = 41, strokeColor = "#979797"}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 41"
      fill="none"
    >
      <rect
        x="6.66675"
        y="7.16663"
        width="10"
        height="11.6667"
        rx="0.640625"
        stroke={strokeColor}
        strokeWidth="2.5625"
        strokeLinejoin="round"
      />
      <rect
        x="6.66675"
        y="25.5"
        width="10"
        height="8.33333"
        rx="0.640625"
        stroke={strokeColor}
        strokeWidth="2.5625"
        strokeLinejoin="round"
      />
      <rect
        x="23.3333"
        y="7.16663"
        width="10"
        height="8.33333"
        rx="0.640625"
        stroke={strokeColor}
        strokeWidth="2.5625"
        strokeLinejoin="round"
      />
      <rect
        x="23.3333"
        y="22.1666"
        width="10"
        height="11.6667"
        rx="0.640625"
        stroke={strokeColor}
        strokeWidth="2.5625"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;
