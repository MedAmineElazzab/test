import { SVGProps } from "react";

export function FileIconDropZone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="32" height="32" rx="16" fill="#E6EDFC" />
      <rect
        x="2"
        y="2"
        width="32"
        height="32"
        rx="16"
        stroke="#F9FAFB"
        stroke-width="4"
      />
      <path
        d="M18.666 11.3335H13.9993C13.6457 11.3335 13.3066 11.474 13.0565 11.724C12.8065 11.9741 12.666 12.3132 12.666 12.6668V23.3335C12.666 23.6871 12.8065 24.0263 13.0565 24.2763C13.3066 24.5264 13.6457 24.6668 13.9993 24.6668H21.9993C22.353 24.6668 22.6921 24.5264 22.9422 24.2763C23.1922 24.0263 23.3327 23.6871 23.3327 23.3335V16.0002M18.666 11.3335L23.3327 16.0002M18.666 11.3335V16.0002H23.3327"
        stroke="#0049E0"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
