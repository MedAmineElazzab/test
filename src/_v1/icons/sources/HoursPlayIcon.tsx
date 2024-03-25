import * as React from "react"
import { SVGProps } from "react"

const HoursPlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 13"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.92 4.995 6.732 2.87a.531.531 0 0 0-.826.442v4.25a.531.531 0 0 0 .826.443L9.92 5.88a.531.531 0 0 0 0-.885ZM6.969 6.57V4.309l1.698 1.128L6.97 6.57ZM13.344.656H1.656A1.063 1.063 0 0 0 .594 1.72v7.437a1.063 1.063 0 0 0 1.062 1.063h11.688a1.063 1.063 0 0 0 1.062-1.063V1.72A1.063 1.063 0 0 0 13.344.656Zm0 8.5H1.656V1.72h11.688v7.437Zm1.062 2.656a.532.532 0 0 1-.531.532H1.125a.531.531 0 0 1 0-1.063h12.75a.532.532 0 0 1 .531.531Z"
    />
  </svg>
)
export default HoursPlayIcon