
import * as React from "react"
import { SVGProps } from "react"
export const UserFollowed = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11.667 11.877v1.74A5 5 0 0 0 5 18.334H3.333a6.667 6.667 0 0 1 8.334-6.456ZM10 10.833c-2.762 0-5-2.237-5-5 0-2.762 2.238-5 5-5 2.763 0 5 2.238 5 5 0 2.763-2.237 5-5 5Zm0-1.666A3.332 3.332 0 1 0 10 2.5a3.332 3.332 0 1 0 0 6.667Zm4.828 7.428 2.946-2.946 1.178 1.179-4.124 4.124-2.947-2.946 1.179-1.178 1.768 1.767Z"
    />
  </svg>
)