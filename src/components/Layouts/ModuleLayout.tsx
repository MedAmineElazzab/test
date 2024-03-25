import React from "react";
import { Breadcrumbs } from "..";

interface ModuleLayoutProps {
  slug: string;
  children: React.ReactNode;
}

export function ModuleLayout(props: ModuleLayoutProps) {
  let contentSection: React.ReactNode = null;
  let RightSectionContent: React.ReactNode = null;
  const items = [
    { title: "Modules", href: "/v2/modules/" },
    { title: props.slug, href: "/v2/modules/" + props.slug },
  ];

  React.Children.forEach(props.children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === ModuleLayout.ContentSection) {
        contentSection = child.props.children;
      } else if (child.type === ModuleLayout.RightSection) {
        RightSectionContent = child.props.children;
      }
    }
  });

  return (
    <>
      <div className="sticky z-10 top-0 bg-gray-100 px-6 py-4 flex flex-col gap-4">
        <Breadcrumbs items={items} />
      </div>
      <div className="relative w-full max-w-[1310px]  left-1/2 -translate-x-1/2">
        <div className="relative px-6 flex items-start justify-between gap-4">
          <div className="ContentSection-area-content w-[calc(100%-315px)] flex flex-col gap-4">
            <div className="top-section flex flex-col gap-4">
              {contentSection}
            </div>
          </div>
          <div className="RightSection-area-content w-[315px] flex flex-col gap-4">
            {RightSectionContent}
          </div>
        </div>
      </div>
    </>
  );
}

const ContentSectionComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <>{children}</>;
ContentSectionComponent.displayName = "ContentSection";
ModuleLayout.ContentSection = ContentSectionComponent;

const RightSectionComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <>{children}</>;
RightSectionComponent.displayName = "RightSection";
ModuleLayout.RightSection = RightSectionComponent;
