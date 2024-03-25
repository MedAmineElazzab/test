import BellIcon from "@/_v1/icons/sources/BellIcon";
import MoonIcon from "@/_v1/icons/sources/MoonIcon";
import SearchBoxIcon from "@/_v1/icons/sources/SearchBoxIcon";
import { Autocomplete, Divider, Menu, Text } from "@mantine/core";
import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { UserMenu } from "../UserMenu/UserMenu";

interface Props {
  dark: boolean;
}

export default function Header({ dark }: Props) {
  return (
    <div
      className={`
          fixed w-[calc(100%-105px)] z-[100] top-[0] right-[5px]
          flex flex-col md:flex-row px-4 py-3 md:py-0 items-center justify-between
          ${dark ? "bg-[#1E1F25]" : "bg-white"}
        `}
    >
      <Text
        size="xl"
        color="dark"
        fw={600}
        className="text-2xl md:w-1/3 text-center md:text-left mb-3 md:mb-0"
      >
        Dashboard
      </Text>
      <div className="md:w-1/3 flex items-center">
        <Autocomplete
          className="w-full md:w-[482px] md:mx-auto"
          size="md"
          radius="md"
          variant="filled"
          placeholder="Recherche globale"
          icon={<SearchBoxIcon />}
          data={["Notes", "Séries", "Modules"]}
        />
      </div>
      <div className="md:w-1/3 flex items-center justify-end">
        <Divider
          size="md"
          orientation="vertical"
          className="h-[20px] mt-4 pr-4 opacity-50 hidden 2xl:block"
        />
        <div className="my-4 hover:cursor-pointer">
          <BellIcon />
        </div>
        <div className="m-4 hover:cursor-pointer">
          <MoonIcon />
        </div>
        <Divider
          size="md"
          orientation="vertical"
          className="h-[20px] mt-4 pr-4 opacity-50 hidden 2xl:block"
        />
        <Menu withArrow>
          <Menu.Target>
            <UserMenu
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              name="Jane Doe"
              job="Doctoresse"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                deleteCookie("token");
                signOut();
              }}
              color="red"
              className="h-[30px]"
            >
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
}
