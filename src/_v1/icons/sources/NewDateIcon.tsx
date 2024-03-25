import * as React from "react"
const NewDateIcon = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#94A3B8"
      d="M13.317 3.248v2.874H.674V3.248a.575.575 0 0 1 .574-.574h11.494a.574.574 0 0 1 .575.574Z"
      opacity={0.2}
    />
    <path
      fill="#94A3B8"
      d="M12.742 2.099h-1.724v-.575a.575.575 0 1 0-1.15 0V2.1H4.123v-.575a.575.575 0 0 0-1.15 0V2.1H1.248a1.15 1.15 0 0 0-1.15 1.15v11.493a1.15 1.15 0 0 0 1.15 1.15h11.494a1.15 1.15 0 0 0 1.15-1.15V3.248a1.15 1.15 0 0 0-1.15-1.15Zm-9.77 1.15v.574a.575.575 0 1 0 1.15 0v-.575h5.747v.575a.575.575 0 0 0 1.15 0v-.575h1.723v2.3H1.248v-2.3h1.724Zm9.77 11.493H1.248V6.697h11.494v8.045Z"
    />
  </svg>
)
export default NewDateIcon