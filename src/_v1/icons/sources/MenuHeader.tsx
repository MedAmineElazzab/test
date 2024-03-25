import * as React from "react"
import { SVGProps } from "react"
const MenuHeader = (props: {current:string} & SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill={props.current}
      d="M5 9.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm10-10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9ZM5 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm10-10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </svg>
)
export default MenuHeader
