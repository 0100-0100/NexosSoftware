import React from 'react'

interface SvgProps {
  strokeColor: string
  hoverColor: string
}

const ProfileIconSVG: React.FC<SvgProps> = ({ strokeColor, hoverColor }) => {

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
      <g clip-path="url(#clip0_15_19)">
        <circle
          cx="64"
          cy="128"
          r="61.5"
          stroke-width="5"
          stroke={strokeColor}
          className="transition-colors duration-200 group-hover:stroke-[var(--accent-500)]"
        />
        <circle
          cx="64"
          cy="27"
          r="24.5"
          stroke-width="5"
          stroke={strokeColor}
          className="transition-colors duration-200 group-hover:stroke-[var(--accent-500)]"
        />
      </g>
      <defs>
        <clipPath id="clip0_15_19">
          <rect width="128" height="128" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default ProfileIconSVG;
