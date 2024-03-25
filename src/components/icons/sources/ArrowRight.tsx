import * as React from "react";
import { SVGProps } from "react";
export const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.67}
      d="M4.666 10h11.667m0 0-5.834-5.833M16.333 10l-5.834 5.833"
    />
  </svg>
);
