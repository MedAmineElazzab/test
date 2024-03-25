import { Text } from "@/components";
interface ModuleDescriptionProps {
  description: string;
}
export function ModuleDescription({ ...props }: ModuleDescriptionProps) {
  return (
    <div className="relarive flex flex-col gap-4 p-8 bg-[#F3F4F8] h-full ">
      <Text className="font-semibold text-base text-black">
        Description de module
      </Text>
      <div className="flex flex-col gap-4">
        <p className="text-gray-500 text-sm leading-relaxed">
          {props.description}
        </p>
      </div>
    </div>
  );
}
