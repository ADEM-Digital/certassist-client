type ClockIconProps = {
    width?: number | string;
    height?: number | string;
    strokeColor?: string;
}

const ClockIcon = ({width = 24, height = 25, strokeColor}: ClockIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "24"}
      height={height ?? "25"}
      viewBox={`0 0 ${ width ?? 24} ${height ?? 25}`}
      fill="none"
    >
      <path
        d="M5 4.5L3 6.5"
        stroke={strokeColor ?? "#E76870"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 4.5L21 6.5"
        stroke={strokeColor ?? "#E76870"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20.5C16.4183 20.5 20 16.9183 20 12.5C20 8.08172 16.4183 4.5 12 4.5C7.58172 4.5 4 8.08172 4 12.5C4 16.9183 7.58172 20.5 12 20.5ZM14.7809 10.6247C15.1259 10.1934 15.056 9.56414 14.6247 9.21913C14.1934 8.87412 13.5641 8.94404 13.2191 9.37531L11.7919 11.1594L9.5547 9.66795C9.09517 9.3616 8.4743 9.48577 8.16795 9.9453C7.8616 10.4048 7.98577 11.0257 8.4453 11.3321L11.2546 13.2049C11.7941 13.5646 12.519 13.452 12.9241 12.9457L14.7809 10.6247Z"
        fill={strokeColor ?? "#E76870"}
      />
    </svg>
  );
};

export default ClockIcon;
