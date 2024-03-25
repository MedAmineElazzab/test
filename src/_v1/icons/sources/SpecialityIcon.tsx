import React from "react";

export default function SpecialityIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M16.125 6.164H3.865c-.846 0-1.532.686-1.532 1.533v7.662c0 .847.686 1.533 1.532 1.533h12.26c.847 0 1.533-.686 1.533-1.533V7.697c0-.847-.686-1.533-1.533-1.533Z"
        stroke={"currentColor"}
        strokeWidth="1.533"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.06 16.892V4.632a1.533 1.533 0 0 0-1.532-1.533H8.463A1.533 1.533 0 0 0 6.93 4.63v12.26"
        stroke={"currentColor"}
        strokeWidth="1.533"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
