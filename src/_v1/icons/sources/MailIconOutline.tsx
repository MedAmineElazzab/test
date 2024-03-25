import * as React from "react"
import { SVGProps } from "react"
const MailIconOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#0049E0"
      d="M1 0h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1Zm17 4.238-7.928 7.1L2 4.216V16h16V4.238ZM2.511 2l7.55 6.662L17.502 2H2.511Z"
    />
  </svg>
)
export default MailIconOutline
