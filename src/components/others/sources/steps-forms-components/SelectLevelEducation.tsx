import { useGetEducationLevels } from "@/api";
import { Select, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface SelectLevelEducationProps {
  getInputProps?: GetInputProps<{}>;
  defaultValue ?: number;
}

export function SelectLevelEducation({ ...props }: SelectLevelEducationProps) {
  const { data: educationLevels, isLoading, isError } = useGetEducationLevels();
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
      label={"Niveau des études *"}
      placeholder="Choisir une option"
      clearable
      searchable
      data={
        educationLevels?.map((educationLevel) => ({
          value: String(educationLevel?.id),
          label: educationLevel?.name,
        })) || []
      }
      {...props?.getInputProps?.("educationLevelId")}
      value={props?.defaultValue ? String(props?.defaultValue) : undefined}

      size="sm"
      color="#484f59"
    />
  );
}
