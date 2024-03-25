import * as React from "react"
import { SVGProps } from "react"
const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={11}
    fill="none"
    {...props}
  >
    <path
      stroke="#0049E0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="m14.667 1-9.166 9.167L1.334 6"
    />
  </svg>
)
export default CheckIcon
