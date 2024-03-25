import { CSSProperties, ReactNode, Ref, forwardRef } from "react";

const Badge = forwardRef(
  (
    {
      className,
      children,
      onClick,
      style,
    }: {
      className?: string;
      children: ReactNode;
      onClick?: () => void;
      style?: CSSProperties;
    },
    ref?: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        onClick={onClick}
        ref={ref}
        className={"speciality w-fit  cursor-pointer group text-sm  gap-2 flex items-center py-1 border hover:shadow transition-all px-2 rounded-[5px]  font-[600] !border-opacity-5".concat(
          " ",
          String(className || "")
        )}
        style={style}
      >
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";
export default Badge;
