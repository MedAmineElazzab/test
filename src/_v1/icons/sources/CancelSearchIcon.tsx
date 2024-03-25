import * as React from "react";
import { SVGProps } from "react";
const CancelSearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
    fill="none"
    {...props}
  >
    <path
      fill="#37352F"
      fillOpacity={0.35}
      d="M8.5 0a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm3.967 11.673-.794.794L8.5 9.293l-3.173 3.174-.794-.794L7.707 8.5 4.533 5.327l.794-.794L8.5 7.707l3.173-3.174.794.794L9.293 8.5l3.174 3.173Z"
    />
  </svg>
);
export default CancelSearchIcon;
