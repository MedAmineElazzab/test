import { useGetEnvironment, useGetPathologies } from "@/api";
import { Select, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface SelectMaladieProps {
  getInputProps?: GetInputProps<{}>;
  defaultValue?: number;
}

export function SelectMaladie({ ...props }: SelectMaladieProps) {
  const { data: diseases, isLoading, isError } = useGetPathologies();

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
      label={"Maladies *"}
      placeholder="Chosie une option"
      clearable
      searchable
      data={
        diseases?.map((disease) => ({
          value: String(disease?.id),
          label: disease?.name,
        })) || []
      }
      {...props?.getInputProps?.("diseaseIds")}
      value={props?.defaultValue ? String(props?.defaultValue) : undefined}
      size="sm"
      color="#484f59"
    />
  );
}
