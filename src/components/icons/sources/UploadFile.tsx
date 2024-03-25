import * as React from "react"
import { SVGProps } from "react"
const UploadFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <rect width={32} height={32} x={2} y={2} fill="#E6EDFC" rx={16} />
    <rect
      width={32}
      height={32}
      x={2}
      y={2}
      stroke="#F9FAFB"
      strokeWidth={4}
      rx={16}
    />
    <path
      stroke="#0049E0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M18.666 11.334h-4.667a1.334 1.334 0 0 0-1.333 1.333v10.667a1.333 1.333 0 0 0 1.333 1.333h8a1.333 1.333 0 0 0 1.334-1.334V16m-4.667-4.666L23.333 16m-4.667-4.666V16h4.667"
    />
  </svg>
)
export default UploadFile
