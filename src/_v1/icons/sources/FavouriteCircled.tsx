import { SVGProps } from "react";

export default function FavouriteCircledIcon({
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="14.246" cy="14.246" r="14.246" fill="#0049E0" />
      <path
        d="M17.78 5.24a.437.437 0 0 1 .874 0v2.187h2.187a.437.437 0 1 1 0 .875h-2.187v2.187a.437.437 0 0 1-.875 0V8.302h-2.186a.437.437 0 1 1 0-.875h2.186V5.241ZM8.157 9.178a.875.875 0 0 1 .875-.875h3.061a.437.437 0 1 0 0-.875h-3.06a1.75 1.75 0 0 0-1.75 1.75v12.245a.437.437 0 0 0 .7.35l4.986-3.849 4.985 3.849a.436.436 0 0 0 .7-.35v-7.435a.437.437 0 0 0-.875 0v6.543l-4.548-3.499a.437.437 0 0 0-.525 0L8.158 20.53V9.177Z"
        fill="#fff"
      />
    </svg>
  );
}
