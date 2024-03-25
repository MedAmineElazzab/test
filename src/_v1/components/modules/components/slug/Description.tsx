import { Module } from "@/_v1/api/module";
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
export default function Description(Module: Module) {
  const [opened, { open }] = useDisclosure(false);
  useEffect(() => {
    open();
  }, []);
  return (
    <div className="w-full h-[400px]">
      <div className="flex w-full">
        <Text className="leading-[29px] text-justify p-[1rem]">
          {Module.description}
        </Text>
      </div>
      {/* <div className="border-l border-primary-normal/10 p-[1rem]">
       <span className="font-[600] border-b border-primary-normal">Note</span>
       {Module.note && (
         <p className="leading-[29px] text-justify p-[1rem] bg-primary-normal/20 rounded-md text-[#344154] mt-3">
           {Module.note}
         </p>
       )}
     </div> */}
    </div>
  );
}
