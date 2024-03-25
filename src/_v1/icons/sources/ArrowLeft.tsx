import React from "react";

export default function ArrowLeftIcon({
    ...props
  }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_953_149992)">
        <path
          d="M4.56641 7.58332L7.69542 10.7123L6.87058 11.5372L2.33342 6.99999L6.87058 2.46282L7.69541 3.28766L4.56641 6.41666L11.6667 6.41666L11.6667 7.58332L4.56641 7.58332Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_953_149992">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(14 14) rotate(180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
