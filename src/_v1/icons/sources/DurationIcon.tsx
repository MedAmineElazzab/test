import * as React from "react";
import { SVGProps } from "react";
const DurationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M20.75 11a9.75 9.75 0 1 1-19.499 0 9.75 9.75 0 0 1 19.499 0Z"
      opacity={0.2}
    />
    <path
      fill="currentColor"
      d="M11 .438A10.563 10.563 0 1 0 21.563 11 10.574 10.574 0 0 0 11 .437Zm0 19.5A8.938 8.938 0 1 1 19.938 11 8.948 8.948 0 0 1 11 19.938ZM17.5 11a.812.812 0 0 1-.813.813H11a.812.812 0 0 1-.813-.813V5.312a.812.812 0 1 1 1.626 0v4.875h4.874A.812.812 0 0 1 17.5 11Z"
    />
  </svg>
);
export default DurationIcon;
