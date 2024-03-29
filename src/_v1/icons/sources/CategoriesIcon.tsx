import React from "react";

export default function CategoriesIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 19"
      fill="none"
      {...props}
    >
      <path
        d="M16.625 1.781h-9.5a1.781 1.781 0 0 0 0 3.563h9.5a1.781 1.781 0 1 0 0-3.563Zm0 2.375h-9.5a.594.594 0 0 1 0-1.187h9.5a.594.594 0 1 1 0 1.187ZM2.375 1.781a1.781 1.781 0 1 0 0 3.563 1.781 1.781 0 0 0 0-3.563Zm0 2.375a.594.594 0 1 1 0-1.187.594.594 0 0 1 0 1.187Zm14.25 3.563h-9.5a1.781 1.781 0 0 0 0 3.562h9.5a1.78 1.78 0 1 0 0-3.562Zm0 2.375h-9.5a.594.594 0 0 1 0-1.188h9.5a.594.594 0 1 1 0 1.188ZM2.375 7.719a1.781 1.781 0 1 0 0 3.562 1.781 1.781 0 0 0 0-3.562Zm0 2.375a.594.594 0 1 1 0-1.188.594.594 0 0 1 0 1.188Zm14.25 3.562h-9.5a1.781 1.781 0 0 0 0 3.563h9.5a1.781 1.781 0 0 0 0-3.563Zm0 2.375h-9.5a.594.594 0 1 1 0-1.187h9.5a.593.593 0 1 1 0 1.187Zm-14.25-2.375a1.781 1.781 0 1 0 0 3.563 1.781 1.781 0 0 0 0-3.563Zm0 2.375a.594.594 0 1 1 0-1.188.594.594 0 0 1 0 1.188Z"
        fill="currentColor"
      />
    </svg>
  );
}
