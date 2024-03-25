import { useGetPathologies } from "@/api";
import { MultiSelect, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface MultiSelectMaladieProps {
  getInputProps?: GetInputProps<{}>;
  defaultValue?: number[];
}

export function MultiSelectMaladie({ ...props }: MultiSelectMaladieProps) {
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
    <MultiSelect
      label={"Maladies *"}
      placeholder="Chosir une option ou plus"
      searchable
      data={
        diseases?.map((disease) => ({
          value: String(disease?.id),
          label: disease?.name,
        })) || []
      }
      {...props?.getInputProps?.("diseaseIds")}
      size="sm"
      color="#484f59"
    />
  );
}
