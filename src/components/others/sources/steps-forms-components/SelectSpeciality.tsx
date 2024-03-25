import { useGetSpecialities } from "@/api";
import { Select, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface SelectSpecialityProps {
  getInputProps?: GetInputProps<{}>;
  professionId?: number;
  defaultValue?: number;
}

export function SelectSpeciality({ ...props }: SelectSpecialityProps) {
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
    <Select
      label={"Spécialité *"}
      placeholder="Choisir une option"
      clearable
      multiple
      searchable
      data={
        specialities?.map((specialitie) => ({
          value: String(specialitie?.id),
          label: specialitie?.name,
        })) || []
      }
      {...props?.getInputProps?.("specialityId")}
      size="sm"
      value={props?.defaultValue ? String(props?.defaultValue) : undefined}
      color="#484f59"
    />
  );
}
