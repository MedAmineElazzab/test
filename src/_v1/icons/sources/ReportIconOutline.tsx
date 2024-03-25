import * as React from "react"
import { SVGProps } from "react"

const ReportIconOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#FDA29B"
      d="M8.318.5c.316 0 .604.178.746.46l.603 1.207h5c.46 0 .833.373.833.833v9.167c0 .46-.373.833-.833.833H9.348a.833.833 0 0 1-.745-.46L8 11.332H2.167v5H.5V.5h7.818Zm-.515 1.667H2.167v7.5H9.03l.833 1.666h3.97v-7.5H8.637l-.834-1.666Z"
    />
  </svg>
)
export default ReportIconOutline