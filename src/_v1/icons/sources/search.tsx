import React from "react";

export default function searchIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 19 19"
      fill="none"
    >
      <path
        d="M8.429 14.56a6.13 6.13 0 1 0 0-12.261 6.13 6.13 0 0 0 0 12.26Zm7.663 1.532-3.295-3.295"
        stroke="currentColor"
        strokeWidth="1.533"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
