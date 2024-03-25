import * as React from "react"
import { SVGProps } from "react"
const RightArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill="#98A2B3"
      d="m3.781 5-3.3-3.3.943-.942L5.667 5 1.424 9.243.481 8.3l3.3-3.3Z"
    />
  </svg>
)
export default RightArrow