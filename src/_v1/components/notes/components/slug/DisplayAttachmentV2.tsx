import { Menu, Text } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconDotsVertical,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
interface AttachmentProps {
  type:
    | "IMAGE"
    | "VIDEO"
    | "AUDIO"
    | "PDF"
    | "WORD"
    | "EXCEL"
    | "POWERPOINT"
    | "OTHER";
  name: string;
  size: string;
  href: string;
}
export default function DisplayAttachmentV2({
  type,
  name,
  size,
}: AttachmentProps) {
  return (
    <div className="relarive flex flex-col justify-between h-[250px] bg-[#F2F6FC] w-[250px] rounded-lg">
      <div className="header h-[50px]  w-full gap-3 justify-between py-[8px] px-4 flex items-center">
        <img
          className="rounded-md"
          src="https://drive-thirdparty.googleusercontent.com/16/type/image/jpeg"
        />
        <span className="truncate">Critical Informatn.png</span>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            {/* <ActionIcon radius={"lg"}> */}
            <IconDotsVertical className="w-[20px] cursor-pointer text-gray-700 " />
            {/* </ActionIcon> */}
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item icon={<IconMessageCircle size={14} />}>
              Messages
            </Menu.Item>
            <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
            <Menu.Item
              icon={<IconSearch size={14} />}
              rightSection={
                <Text size="xs" color="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />
            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
              Transfer my data
            </Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="image px-3 h-full flex justify-center items-center ">
        <img
          className="rounded-md object-cover w-full h-[95%]"
          src="https://s3-alpha-sig.figma.com/img/3444/ee75/abf1975429572766d7d99caadaf79915?Expires=1701043200&Signature=qXIfnuS9mvWz4VAfvTSjzt0EQyL~FQCg1on9yMiM-XipIXukW7oPbjFpgKjRblnEgK3ZDQC1Zxf-2WgKhddqc9rFlAgbSGN54NoRN~bYujSRuhuGNxHsmjEIE4RJOqhruPKJursG0iXuty9tPqSmog7YWNPKwvfOStun6F4tgOr11wTVqvyS6X0JnQckkw6b9d16yrQPiHu1h87XAwIJsUp5kLJzqJvaiCsqLQBJEI~YBClIinYSHKsIpOt19ifpjMB60QuMOd8RL3ue~B2IuOWO4fs1QIWaunsFVx-LRQrBTecvAML0Q1j2qvb7uA9F~hZOEZxo52Vb0s02Ern7dQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt=""
        />
      </div>
    </div>
  );
}
