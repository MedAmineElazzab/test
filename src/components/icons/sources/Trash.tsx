import * as React from "react"
import { SVGProps } from "react"
export const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#667085"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M2.5 5h1.667m0 0H17.5M4.167 5v11.666a1.667 1.667 0 0 0 1.666 1.667h8.334a1.667 1.667 0 0 0 1.666-1.666V5H4.167Zm2.5 0V3.333a1.667 1.667 0 0 1 1.666-1.667h3.334a1.667 1.667 0 0 1 1.666 1.667V5m-5 4.166v5m3.334-5v5"
    />
  </svg>
)
