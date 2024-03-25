import { SVGProps } from "react";

export default function DislikeFilled({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      {...props}
    >
      <path
        opacity=".2"
        d="M7.813 14.844V4.688H3.125a.781.781 0 0 0-.781.78v8.595a.781.781 0 0 0 .781.78h4.688Z"
        fill="currentColor"
      />
      <path
        d="M22.852 17.176a2.34 2.34 0 0 1-1.758.793h-5.469v1.562a3.906 3.906 0 0 1-3.906 3.907.782.782 0 0 1-.7-.432L7.33 15.625H3.125a1.563 1.563 0 0 1-1.563-1.563V5.47a1.562 1.562 0 0 1 1.563-1.563h16.797a2.344 2.344 0 0 1 2.326 2.051l1.172 9.375a2.343 2.343 0 0 1-.569 1.844ZM3.125 14.063h3.906V5.469H3.125v8.593Zm18.744 1.464-1.172-9.375a.78.78 0 0 0-.775-.683H8.594v9.19l3.585 7.171a2.344 2.344 0 0 0 1.883-2.299v-2.343a.78.78 0 0 1 .782-.782h6.25a.78.78 0 0 0 .775-.879Z"
        fill="currentColor"
      />
      <path
        d="M8.5 14.5v-9h12l1.5 11h-7.5v.5l-.5 3.5-.5 1-1.5.5-3.5-7.5Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}
