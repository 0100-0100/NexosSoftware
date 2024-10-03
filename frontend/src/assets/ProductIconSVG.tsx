import React from 'react';

interface SvgProps {
  strokeColor: string;
  hoverColor: string;
}

const MySvgComponent: React.FC<SvgProps> = ({ strokeColor, hoverColor }) => {

  return (
    <svg
      className="group-hover:stroke-current"
      width="24"
      height="24"
      viewBox="0 0 116 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M58 123L111 89.5V38.5M58 123L5 89.5V38.5M58 123V72M58 72L5 38.5M58 72L84.5 55.25M111 38.5L58 5L31.5 21.75M111 38.5L84.5 55.25M5 38.5L31.5 21.75M84.5 55.25L31.5 21.75"
        className="transition-colors duration-200 group-hover:stroke-[var(--accent-500)]"
        stroke={strokeColor}
        strokeWidth="5"
        strokeMiterlimit="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MySvgComponent;
