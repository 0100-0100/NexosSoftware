import React from 'react';

interface SvgProps {
  strokeColor: string;
  hoverColor: string;
}

const HomeIconSVG: React.FC<SvgProps> = ({ strokeColor, hoverColor }) => {

  return (
    <svg
      className="group-hover:stroke-current"
      width="24"
      height="24"
      viewBox="0 0 116 122"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <g id="Home">
        <path
          className="transition-colors duration-200 group-hover:stroke-[var(--accent-500)] group-hover:fill-[var(--accent-500)]"
          stroke={strokeColor}
          fill={strokeColor}
          d="M82.5224 73.2547V101.5L94 94.2453V66L82.5224 73.2547Z"
        />
        <path
          d="M58 117L5 83.5V50M58 117C58 117 58 96.8755 58 83.5M58 117L82.5224 101.5M58 83.5L84.5 39M58 83.5C40.3333 72.3333 22.6667 61.1667 5 50M111 50L58 16.5L31.5 5.5M111 50V83.5L94 94.2453M111 50L84.5 39M5 50L31.5 5.5M84.5 39L31.5 5.5M82.5224 101.5V73.2547L94 66V94.2453M82.5224 101.5L94 94.2453"
          className="transition-colors duration-200 group-hover:stroke-[var(--accent-500)]"
          stroke={strokeColor}
          stroke-width="5"
          stroke-miterlimit="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
};

export default HomeIconSVG;
