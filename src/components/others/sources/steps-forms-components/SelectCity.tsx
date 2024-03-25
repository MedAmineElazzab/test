import { fetchCities } from "@/api";
import { Select, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";
import { useQuery } from "@tanstack/react-query";

interface SelectCityProps {
  getInputProps?: GetInputProps<{}>;
  currentCountry: number | undefined;
}

export function SelectCity({ ...props }: SelectCityProps) {
  const {
    isLoading,
    error,
    data: cities,
  } = useQuery(["cities", props.currentCountry], () =>
    fetchCities(props.currentCountry)
  );
  return isLoading ? (
    <div>
      <Skeleton height={35} mb={"xs"} />
      <Skeleton height={35} />
    </div>
  ) : error ? (
    <div>
      <p className="text-red-500">Error loading data</p>
    </div>
  ) : (
    <Select
      placeholder="choisir une ville"
      label={"Ville *"}
      data={
        cities?.map((city) => {
          return {
            value: String(city.id),
            label: city.name,
          };
        }) || []
      }
      maxDropdownHeight={400}
      {...props?.getInputProps?.("cityId")}
      error={
        !props?.currentCountry
          ? undefined
          : props?.getInputProps?.("cityId").error
      }
      disabled={!props?.currentCountry}
      searchable
      clearable
    />
  );
}
