import { SVGProps } from "react";

export default function LikeIconFilled({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      { ...props }
    >
      <path
        opacity=".2"
        d="M7.813 10.156v10.156H3.125a.78.78 0 0 1-.781-.78v-8.595a.781.781 0 0 1 .781-.78h4.688Z"
        fill="currentColor"
      />
      <path
        d="M22.852 7.824a2.343 2.343 0 0 0-1.758-.793h-5.469V5.47a3.906 3.906 0 0 0-3.906-3.907.781.781 0 0 0-.7.432L7.33 9.375H3.125a1.562 1.562 0 0 0-1.563 1.563v8.593a1.563 1.563 0 0 0 1.563 1.563h16.797a2.344 2.344 0 0 0 2.326-2.051l1.172-9.375a2.343 2.343 0 0 0-.569-1.844ZM3.125 10.938h3.906v8.593H3.125v-8.593Zm18.744-1.465-1.172 9.375a.78.78 0 0 1-.775.683H8.594v-9.19l3.585-7.171a2.344 2.344 0 0 1 1.883 2.299v2.343a.78.78 0 0 0 .782.782h6.25a.781.781 0 0 1 .775.879Z"
        fill="currentColor"
      />
      <path
        d="M8.5 10 12 3l.5-.5 1.5 2 .5 3.5H22v1l-1.5 10.5h-12V10Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}
