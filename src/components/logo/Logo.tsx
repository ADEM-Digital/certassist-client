import { IconType } from "../../types/IconTypes";

const Logo = ({ width, height, strokeColor }: IconType) => {
  // Default dimensions of the SVG
  const defaultWidth = 70.00000000000001;
  const defaultHeight = 78.29966229082856;
  const aspectRatio = defaultHeight / defaultWidth;

  // Calculate width and height
  const finalWidth = width ?? defaultWidth;
  const finalHeight = height ?? Number(finalWidth) * aspectRatio;

  // Define viewBox based on the original SVG dimensions
  const viewBox = `0 0 ${defaultWidth} ${defaultHeight}`;

  return (
    <>
      <svg
        className="css-ze2te4 css-qd6ojx"
        width={finalWidth}
        height={finalHeight}
        viewBox={viewBox}
      >
        <g transform={"translate(-11.665679444266775, -12.345057837383075) "} className="css-id738c" fill={strokeColor ?? "#47abff"}>
          {/* SVG Path Here */}
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M75,22.2c0,0-7.7-2-15.4-5.1C52.7,14.3,47,10.8,47,10.8s-5.6,3.6-12.6,6.3c-7.6,3.1-15.3,5-15.4,5.1  c-0.6,3.4-0.9,7-0.9,10.6c0,0.8,0,1.2,0.1,2c0.4,4.3,8,2.2,10.7,1.2c0.3-0.1,0.7-0.3,1-0.4c1-0.4,2-0.8,3.1-1.3  c2.1-0.9,4.3-2,6.6-3.2c3.3-1.8,6.7-3.8,9.6-6.1c-4.3,5.8-13.5,12.7-23.8,17.1c-2.6,1.1-6.2,2.5-8.7,2.4c-3-0.1-2,0.4-1.8,0.5  c3.2,1.6,5,3.9,5.9,6c0.6,1.4,2.7,3.6,14-2.2c6.4-3.3,14.6-8,22.9-14.6c0.3-0.2,0.6-0.5,0.9-0.7c1.8-1.5,3.7-3,5.5-4.6  c-4.3,8.7-16.4,18.8-31,26.3c-4.6,2.4-5.8,2.7-7.8,3.4c-2.7,0.9-5.3,0.5-5.3,1c-0.1,0.7,3.4,1.4,7,5c3.3,3.3,11.6-0.5,15.1-2.4  C46,60,53,55.6,57.7,51.5c0.9-0.8,1.7-1.6,2.5-2.4c-3.5,8.3-11,14.3-20.9,19.9c-2.5,1.4-6.7,2.6-8.5,3.1c-0.5,0.2-1.2,0.2-1.2,0.5  c0,0.6,4,1,6.6,2.4c3.6,1.9,6.1,2.9,7,3.2c1.2,0.5,2.5,0.8,3.8,1.1c17.2-3.8,28.8-23.5,28.8-46.6C75.9,29.2,75.6,25.6,75,22.2z"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default Logo;
