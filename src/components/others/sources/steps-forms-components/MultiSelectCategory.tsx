import { useGetCategories } from "@/api";
import { MultiSelect, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface MultiSelectCategoryProps {
  getInputProps?: GetInputProps<{}>;
  defaultValue?: number[];
}

export function MultiSelectCategory({ ...props }: MultiSelectCategoryProps) {
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
    <MultiSelect
      label={"Catégories *"}
      placeholder="Chosir une option ou plus"
      searchable
      data={
        categories?.map((category) => ({
          value: String(category?.id),
          label: category?.name,
        })) || []
      }
      {...props?.getInputProps?.("categorieIds")}
      size="sm"
      color="#484f59"
    />
  );
}
