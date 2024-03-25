import React from "react";

export default function Badge({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      {...props}
    >
      <path
        d="M12.463 16.235v1.976h4.792v1.917h-11.5V18.21h4.792v-1.977a7.668 7.668 0 0 1-6.709-7.607v-5.75h15.334v5.75a7.668 7.668 0 0 1-6.709 7.608ZM.963 4.795H2.88v3.833H.963V4.795Zm19.167 0h1.917v3.833H20.13V4.795Z"
        fill="#FAA515"
      />
    </svg>
  );
}
