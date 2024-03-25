import * as React from "react";
import { SVGProps } from "react";
const MoroccoFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23 16"
    fill="none"
    {...props}
  >
    <path fill="#D80027" d="M0 .361v14.987h22.475V.36H0Z" />
    <path
      fill="#6DA544"
      d="M15.452 6.56h-3.218l-.996-3.064-.997 3.06H7.023l2.604 1.892-.997 3.06 2.603-1.893 2.603 1.892-.996-3.06 2.612-1.887Zm-5.097 1.655.338-1.036h1.089l.338 1.036-.882.64-.883-.64ZM11.58 6.56h-.685l.343-1.053.342 1.053Zm1.067 1.273-.211-.654h1.11l-.9.654Zm-2.608-.654-.21.654-.896-.654h1.106Zm-.228 2.713.342-1.054.553.404-.895.65Zm1.953-.654.553-.404.343 1.053-.896-.65Z"
    />
  </svg>
);
export default MoroccoFlag;
