import { SVGProps } from "react"
export const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16.333 10H4.666m0 0 5.833 5.833M4.666 10l5.833-5.833"
    />
  </svg>
)