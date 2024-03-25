import { SVGProps } from "react";

export  function EarthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_6456_2914)">
        <path
          d="M18.3327 9.99984C18.3327 14.6022 14.6017 18.3332 9.99935 18.3332M18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665M18.3327 9.99984H1.66602M9.99935 18.3332C5.39698 18.3332 1.66602 14.6022 1.66602 9.99984M9.99935 18.3332C12.0837 16.0512 13.2683 13.0898 13.3327 9.99984C13.2683 6.90987 12.0837 3.94846 9.99935 1.6665M9.99935 18.3332C7.91495 16.0512 6.73039 13.0898 6.66602 9.99984C6.73039 6.90987 7.91495 3.94846 9.99935 1.6665M1.66602 9.99984C1.66602 5.39746 5.39698 1.6665 9.99935 1.6665"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6456_2914">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
