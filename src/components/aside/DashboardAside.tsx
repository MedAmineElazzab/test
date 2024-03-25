import { Aside, AsideItem } from "@/components";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface DashboardAsideProps {
  data: { href: string; name: string; icon: ReactNode }[];
}
export function DashboardAside({ data = [] }: DashboardAsideProps) {
  const { route } = useRouter();

  return (
    <Aside>
      {data.map((asideItem, index) => {
        return (
          <AsideItem
            key={index}
            active={route.includes(asideItem.href)}
            {...asideItem}
          />
        );
      })}
    </Aside>
  );
}
