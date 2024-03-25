import * as React from "react";
import { SVGProps } from "react";
const CheckmarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M21.582 5.543a1 1 0 0 1 0 1.414l-11.33 11.33a1 1 0 0 1-1.407.006l-6.546-6.429a1 1 0 1 1 1.402-1.427l5.838 5.735 10.629-10.63a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default CheckmarkIcon;
