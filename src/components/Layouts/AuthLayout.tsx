import { AuthRightSectionSlides } from "../others";
export function AuthLayoutV2({ children }: { children: JSX.Element }) {
  return (
    <main className="w-screen h-screen overflow-hidden  flex items-center justify-between ">
      <div className="h-full w-[55%] overflow-y-auto">{children}</div>
      <div className="h-full w-[45%] p-4">
        <AuthRightSectionSlides />
      </div>
    </main>
  );
}

