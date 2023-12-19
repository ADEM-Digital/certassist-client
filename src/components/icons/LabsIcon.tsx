import { IconType } from "../../types/IconTypes";

interface LabsIconProps extends IconType {
  width?: string;
  height?: string;
}

const LabsIcon = ({ width = "32", height = "28" }: LabsIconProps) => {
  return (
    <svg
      viewBox="0 0 260 340"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="yellowBeaker" x2="0" y2="1">
          <stop offset="15%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="17%" stopColor="yellow" />
        </linearGradient>
        <linearGradient id="pinkBeaker" x2="0" y2="1">
          <stop offset="30%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="35%" stopColor="pink" />
        </linearGradient>
        <linearGradient id="tealBeaker" x2="0" y2="1">
          <stop offset="40%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="42%" stopColor="skyblue" />
        </linearGradient>
      </defs>
      <rect
        stroke="#000"
        strokeWidth="10"
        x="59"
        y="30"
        width="140"
        height="200"
        rx="20"
        ry="20"
        fill="url(#yellowBeaker)"
      />
      <rect
        stroke="#000"
        strokeWidth="10"
        x="175"
        y="14"
        width="55"
        height="290"
        rx="10"
        ry="10"
        fill="url(#pinkBeaker)"
      />
      <path
        stroke="#000"
        strokeWidth="10"
        d="M50,90 l-35,130 t-1,30 0,30 t48,20 130,-20 v-60 l-35-130 z"
        fill="url(#tealBeaker)"
      />
    </svg>
  );
};

export default LabsIcon;
