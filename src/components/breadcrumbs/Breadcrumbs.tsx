import { HomeIcon, Link, RightArrowIcon } from "@/components";
import { ROUTES } from "@/enum";
import { Breadcrumbs as BreadcrumbsMantine } from "@mantine/core";
export type BreadcrumbsItem = {
  title: string;
  href: string;
};

interface BreadcrumbProps {
  items: BreadcrumbsItem[];
}

export function Breadcrumbs(props: BreadcrumbProps) {
  return (
    <div className="text-sm">
      <BreadcrumbsMantine
        {...props}
        className="text-gray-900 font-semibold"
        classNames={{
          breadcrumb: "text-inherit opacity-50",
          separator: "m-0",
        }}
        styles={{
          breadcrumb: {
            ["&:last-of-type"]: {
              opacity: 1,
            },
          },
        }}
        separator={<RightArrowIcon className="text-gray-500 mx-2 " />}
      >
        <Link href={ROUTES.INDEX} className="hover:underline">
          <HomeIcon className="w-5 h-w-5" />
        </Link>
        {props.items.map((breadcrumbItem, index) => {
          return (
            <Link href={breadcrumbItem.href} key={breadcrumbItem.title + index}>
              {breadcrumbItem.title}
            </Link>
          );
        })}
      </BreadcrumbsMantine>
    </div>
  );
}
