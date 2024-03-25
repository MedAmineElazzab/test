export default function QuizzIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <g clip-path="url(#a)">
        <path
          d="m14 3.5-12.834 7 4.667 2.543v7L14 24.5l8.166-4.457v-7l2.334-1.271v8.061h2.333V10.5L14 3.5Zm7.956 7L14 14.84 6.043 10.5 14 6.16l7.956 4.34Zm-2.123 8.155L14 21.84l-5.834-3.185v-4.34L14 17.5l5.833-3.185v4.34Z"
          fill="currentColor"
          fillOpacity=".89"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d="M0 0h28v28H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
