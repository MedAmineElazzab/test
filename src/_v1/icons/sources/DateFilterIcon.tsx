import * as React from "react"
import { SVGProps } from "react"
const DateFilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#94A3B8"
      d="M13.317 3.248V6.12H.674V3.248a.575.575 0 0 1 .574-.575h11.494a.574.574 0 0 1 .575.575Z"
      opacity={0.2}
    />
    <path
      fill="#94A3B8"
      d="M12.742 2.099h-1.724v-.575a.575.575 0 1 0-1.15 0v.575H4.123v-.575a.575.575 0 1 0-1.15 0v.575H1.248a1.15 1.15 0 0 0-1.15 1.149v11.494a1.15 1.15 0 0 0 1.15 1.15h11.494a1.15 1.15 0 0 0 1.15-1.15V3.248a1.15 1.15 0 0 0-1.15-1.15Zm-9.77 1.149v.575a.575.575 0 0 0 1.15 0v-.575h5.747v.575a.575.575 0 0 0 1.15 0v-.575h1.723v2.299H1.248V3.248h1.724Zm9.77 11.494H1.248V6.696h11.494v8.046Z"
    />
  </svg>
)
export default DateFilterIcon