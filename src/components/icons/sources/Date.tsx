import * as React from "react";
import { SVGProps } from "react";
export function Date(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <g
        stroke="#667085"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        clipPath="url(#a)"
      >
        <path d="M15.833 3.334H4.167c-.92 0-1.667.746-1.667 1.667v11.666c0 .92.746 1.667 1.667 1.667h11.666c.920 0 1.667-.746 1.667-1.667V5.001c0-.92-.746-1.667-1.667-1.667ZM13.336 1.667V5M6.664 1.667V5M2.5 8.334h15" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M1.664.834h16.667v18.333H1.664z" />
        </clipPath>
      </defs>
    </svg>
  );
}
