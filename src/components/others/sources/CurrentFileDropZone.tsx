import { FileIconDropZone, Progress, Text } from "@/components";
import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
interface CurrentFileProps {
  name: string;
  size: number;
  currentFileLength: number;
  onClick?: () => void;
}
export function CurrentFileDropZone({
  name,
  size,
  currentFileLength,
  onClick,
}: CurrentFileProps) {
  return (
    <div className="w-full p-4 flex items-start rounded-lg gap-3 border border-gray-200">
      <div className="w-12">
        <FileIconDropZone className="w-12 h-12" />
      </div>
      <div className="w-[calc(100%-32px)] flex flex-col gap-3">
        <div>
          <Text size={"sm"} fw={500} className="truncate max-w-full">
            {name}
          </Text>
          <Text size={"sm"} className="text-gray-500">
            {(size * 0.000001).toFixed(2)} MB
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <Progress
            color="primary"
            h={5}
            w={"100%"}
            value={currentFileLength}
          />
          <Text fw={500} size={"xs"}>
            {currentFileLength}%
          </Text>
        </div>
      </div>
      <ActionIcon onClick={() => onClick?.()}>
        <IconTrash />
      </ActionIcon>
    </div>
  );
}
