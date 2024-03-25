import * as React from "react"
import { SVGProps } from "react"
const NotificationHeader = (props: {current:string} & SVGProps<SVGSVGElement>) => (
    
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <path
      fill={props.current}
      d="M18 15h2v2H0v-2h2V8a8 8 0 1 1 16 0v7Zm-2 0V8A6 6 0 0 0 4 8v7h12Zm-9 4h6v2H7v-2Z"
    />
  </svg>
)
export default NotificationHeader
