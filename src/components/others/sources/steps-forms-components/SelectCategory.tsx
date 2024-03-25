import { useGetCategories, useGetEnvironment, useGetPathologies } from "@/api";
import { Select, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface SelectCategoryProps {
  getInputProps?: GetInputProps<{}>;
  defaultValue?: number;
}

export function SelectCategory({ ...props }: SelectCategoryProps) {
  const { data: categories, isLoading, isError } = useGetCategories();

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
      label={"Catégories *"}
      placeholder="Chosie une option"
      clearable
      searchable
      data={
        categories?.map((category) => ({
          value: String(category?.id),
          label: category?.name,
        })) || []
      }
      {...props?.getInputProps?.("categoryId")}
      value={props?.defaultValue ? String(props?.defaultValue) : undefined}
      size="sm"
      color="#484f59"
    />
  );
}
