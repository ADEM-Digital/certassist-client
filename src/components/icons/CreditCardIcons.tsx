import { IconType } from "../../types/IconTypes";

const CreditCardIcons = ({width = 24, height = 25, strokeColor = "#333333"} : IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M3 11.5H21V15.5C21 17.3856 21 18.3284 20.4142 18.9142C19.8284 19.5 18.8856 19.5 17 19.5H7C5.11438 19.5 4.17157 19.5 3.58579 18.9142C3 18.3284 3 17.3856 3 15.5V11.5Z"
        fill={strokeColor}
      />
      <rect
        x="3"
        y="6.5"
        width="18"
        height="13"
        rx="2"
        stroke={strokeColor}
        stroke-width="1.2"
      />
      <path
        d="M7 15.5H7.01"
        stroke={strokeColor}
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <path
        d="M3 11.5L21 11.5"
        stroke={strokeColor}
        stroke-width="1.2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default CreditCardIcons;
