import * as React from "react";
import { SVGProps } from "react";
const StarBadgeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13 12"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.345 4.62a.718.718 0 0 0-.664-.31H8.49L7.412.98a.78.78 0 0 0-.38-.426.744.744 0 0 0-.568 0 .753.753 0 0 0-.451.46L4.949 4.31H1.724a.788.788 0 0 0-.531.204.726.726 0 0 0 .053 1.107l2.737 2.1-1.054 3.33a.735.735 0 0 0 .505.886.726.726 0 0 0 .629-.098L6.72 9.784l2.658 2.029a.69.69 0 0 0 .46.168h.08a.78.78 0 0 0 .496-.274.754.754 0 0 0 .124-.691L9.475 7.703l2.728-2.09a.735.735 0 0 0 .142-.993Z"
    />
  </svg>
);
export default StarBadgeIcon;
