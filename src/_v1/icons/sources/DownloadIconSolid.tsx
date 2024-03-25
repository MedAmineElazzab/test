import * as React from "react"
import { SVGProps } from "react"
const DownloadIconSolid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <rect
        width={24.667}
        height={24.667}
        x={2}
        y={0.667}
        fill="#0049E0"
        rx={2.667}
      />
      <path
        fill="#fff"
        d="M14.916 13h1.75l-2.334 2.334L12 13h1.75v-2.333h1.167V13Zm1.166-4.666H10.25v9.333h8.167v-7h-2.334V8.334Zm-7-.589a.58.58 0 0 1 .583-.578h7l2.917 2.917v8.162c0 .324-.259.588-.579.588H9.662a.583.583 0 0 1-.58-.579V7.745Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={27.333}
        height={27.333}
        x={0.667}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={0.667} />
        <feGaussianBlur stdDeviation={0.667} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4277_4462"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_4277_4462"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default DownloadIconSolid
