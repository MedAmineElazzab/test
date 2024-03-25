import * as React from "react";
import { SVGProps } from "react";
const SelectArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m1 1.5 5 5 5-5"
      stroke="#98A2B3"
      strokeWidth="1.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SelectArrow;
