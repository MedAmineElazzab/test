import { useGetSpecialities } from "@/api";
import { MultiSelect, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface MultiSelectSpecialityProps {
  getInputProps?: GetInputProps<{}>;
  professionId?: number;
  defaultValue?: string[];
}

export function MultiSelectSpeciality({ ...props }: MultiSelectSpecialityProps) {
  const {
    data: specialities,
    isLoading,
    isError,
  } = useGetSpecialities({
    isAll: true,
    professionId: props.professionId ? props.professionId : null,
  });
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
      label={"Spécialité *"}
      placeholder="Chosir une option ou plus"
      multiple
      searchable
      data={
        specialities?.map((specialitie) => ({
          value: String(specialitie?.id),
          label: specialitie?.name,
        })) || []
      }
      {...props?.getInputProps?.("specialityIds")}
      size="sm"
      color="#484f59"
    />
  );
}
