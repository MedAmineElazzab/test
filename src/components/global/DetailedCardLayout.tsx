import { Avatar, Flex } from "@/components";
import { ReactNode } from "react";

export interface DetailedCardLayoutProps {
  imagePath: string;
  abrv: string;
  children : ReactNode;
}
export function DetailedCardLayout({
  abrv,
  imagePath,
  children
}: DetailedCardLayoutProps) {
  return (
    <Flex direction={"row"} className="bg-white p-4 flex gap-4 items-start w-600 max-w-full rounded-lg shadow-data-area">
      <Avatar
        size="5xl"
        radius="full"
        color="primary"
        withBorder
        withShadow
        src={imagePath}
      >
        {abrv}
      </Avatar>
      <Flex direction={"column"} className="gap-4 pt-2">
        {children}
      </Flex>
    </Flex>
  );
}