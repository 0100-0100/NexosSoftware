import React from 'react';

interface SvgProps {
  strokeColor: string;
  hoverColor: string;
}

// onMouseEnter={() => setIsHovered(true)}
// onMouseLeave={() => setIsHovered(false)}
// stroke={isHovered ? hoverColor : strokeColor}


const LogoutIconSVG: React.FC<SvgProps> = ({ strokeColor, hoverColor }) => {
  return (
    <svg
      className="group-hover:stroke-current"
      width="24"
      height="24"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M78.6783 18.8248C89.4347 22.3198 98.591 29.538 104.5 39.1813C110.41 48.8246 112.684 60.26 110.915 71.4306C109.146 82.6013 103.449 92.7741 94.8488 100.119C86.2487 107.464 75.3099 111.5 64 111.5C52.6901 111.5 41.7513 107.464 33.1512 100.119C24.5511 92.7741 18.8541 82.6013 17.0848 71.4306C15.3155 60.26 17.5902 48.8246 23.4996 39.1813C29.409 29.538 38.5653 22.3198 49.3217 18.8248"
        className="transition-colors duration-200 group-hover:stroke-[#FF0000]"
        stroke={strokeColor}
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M64 64V3"
        className="transition-colors duration-200 group-hover:stroke-[#FF0000]"
        stroke={strokeColor}
        stroke-width="5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default LogoutIconSVG;
