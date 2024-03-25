import { MenuItem } from "@/@types";
import {
  Menu as MenuMantine,
  MenuProps as MenuMantineProps,
  clsx,
} from "@mantine/core";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";


interface MenuProps extends Omit<MenuMantineProps, "children"> {
  target: ReactNode | string;
  label: ReactNode | string;
  items: MenuItem[][];
}

export function Menu({ label, items, target, ...rest }: MenuProps) {
  const classNamesDropDown = clsx({
    "!top-16": rest.position === "bottom",
  });
  const { push } = useRouter();
  const handlePushingEvent = (props: MenuItem) => {
    if (props.action) {
      props.action();
    } else if (props.href) {
      push(props.href);
    } else {
      push("#");
    }
  };
  return (
    <MenuMantine {...rest}>
      <MenuMantine.Target>
        <div className="cursor-pointer">{target}</div>
      </MenuMantine.Target>
      <MenuMantine.Dropdown className={classNamesDropDown}>
        {label && (
          <MenuMantine.Label className="text-gray-600 text-sm font-bold mb-1 p-11 border-b border-gray-200">
            {label}
          </MenuMantine.Label>
        )}
        {items.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {section.map((sectionItem, index) => (
              <MenuMantine.Item
                className="text-sm font-medium text-gray-800"
                key={index}
                icon={sectionItem.icon}
                onClick={handlePushingEvent.bind(null, sectionItem)}
              >
                {sectionItem.name}
              </MenuMantine.Item>
            ))}
            {sectionIndex !== items.length - 1 && <MenuMantine.Divider />}
          </React.Fragment>
        ))}
      </MenuMantine.Dropdown>
    </MenuMantine>
  );
}
