import { Divider, Text } from "@/components";
import { ReactNode } from "react";

interface SectionCardLayoutProps {
    children : ReactNode;
    title : string;
}
export  function SectionCardLayout(props : SectionCardLayoutProps) {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-white shadow-expert-card">
    <div className="header flex gap-4 flex-col">
      <div className="flex gap-4 flex-col">
        <Text tt={"uppercase"} size={"xs"} fw={600} className="text-gray-500">
          {props.title}
        </Text>
        <Divider
          color="gray"
          orientation="horizontal"
          fullwidth={"true"}
          opacity={0.1}
          h={1}
        />
      </div>
      <div className="flex flex-col gap-4">
        {props.children}
      </div>
    </div>
  </div>
  )
}
