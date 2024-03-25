import * as React from "react"
import { SVGProps } from "react"
    const ChevDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={6}
    fill="none"
    {...props}
  >
    <path
      fill="#667085"
      d="M5 3.878 8.711.166l1.06 1.06L5 6 .227 1.227 1.287.166 5 3.878Z"
    />
  </svg>
)
export default ChevDown
