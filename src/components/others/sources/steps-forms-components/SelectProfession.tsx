import { useGetProfessions } from "@/api";
import { Select, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface SelectProfessionProps {
  getInputProps?: GetInputProps<{}>;
  defaultValues?: {
    professionId: number | undefined;
  };
}

export function SelectProfession({ ...props }: SelectProfessionProps) {
  const { data: professions, isLoading, isError } = useGetProfessions();
  return isLoading ? (
    <div>
      <Skeleton height={35} mb={"xs"} />
      <Skeleton height={35} />
    </div>
  ) : isError ? (
    <div>
      <p className="text-red-500">Error loading data</p>
    </div>
  ) : (
    <Select
      label={"Profession*"}
      placeholder="choisir une option..."
      clearable
      searchable
      data={
        professions?.map((profession) => ({
          value: String(profession?.id),
          label: profession?.name,
        })) || []
      }
      {...props?.getInputProps?.("professionId")}
      value={String(props.defaultValues?.professionId)}
      size="sm"
      color="#484f59"
    />
  );
}
