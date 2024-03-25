import * as React from "react"
import { SVGProps } from "react"
const FlagBlueOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="#0049E0"
      d="M13.667 2.75c-2.75 0-5.5-1.833-8.25-1.833s-4.584.917-4.584.917v18.333a.917.917 0 0 0 1.834 0v-6.106c.902-.207 1.824-.311 2.75-.31 2.75 0 5.5 1.833 8.25 1.833s4.583-.917 4.583-.917V1.834s-1.833.916-4.583.916Zm2.75 10.632c-.894.248-1.824.368-2.75.368-1.34 0-2.649-.526-3.902-.94-1.408-.466-2.853-.893-4.348-.893-.924 0-1.845.09-2.75.27V3.118a10.301 10.301 0 0 1 2.75-.369c1.34 0 2.648.527 3.901.941 1.408.466 2.853.893 4.349.893.923 0 1.844-.09 2.75-.27v9.068Z"
    />
  </svg>
)
export default FlagBlueOutline
