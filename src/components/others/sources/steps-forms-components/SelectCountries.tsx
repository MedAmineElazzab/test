import { useGetCountries } from "@/api";
import { EarthIcon, Select, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";
import { forwardRef, useEffect, useState } from "react";
interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  name: string;
}
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, name, ...others }: ItemProps, ref) => (
    <div className="" ref={ref} {...others}>
      <div className="flex items-center gap-2">
        <img src={image} className="w-[25px] h-[15px] object-cover " alt="" />
        <span className="text-sm">{label || ""}</span>
      </div>
    </div>
  )
);
SelectItem.displayName = "SelectItem";
interface SelectCountriesProps {
  getInputProps?: GetInputProps<{}>;
  onChange: (val: string | null) => void;
}

export function SelectCountries({ ...props }: SelectCountriesProps) {
  const [selected, setSelected] = useState<ItemProps | undefined>();

  const {
    data: countries,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
  } = useGetCountries({
    sortBy: "name_fr",
    sortOrder: "asc",
  });

  useEffect(() => {
    if (props.getInputProps?.("countryId")?.value) {
      let selected = countries?.find(
        (el) => el.id === Number(props.getInputProps?.("countryId")?.value)
      );
      if (selected) {
        setSelected({
          image: selected?.flag,
          label: selected?.name_fr,
          name: selected?.name_fr,
        });
      }
    }
  }, [countries]);

  return isLoadingCountries ? (
    <div>
      <Skeleton height={35} mb={"xs"} />
      <Skeleton height={35} />
    </div>
  ) : isErrorCountries ? (
    <div>
      <p className="text-red-500">Error loading data</p>
    </div>
  ) : (
    <Select
      label={"Pays *"}
      placeholder="choisir un pays..."
      clearable
      searchable
      itemComponent={SelectItem}
      icon={
        selected ? (
          <img alt="" className="w-[22px] h-auto" src={selected?.image} />
        ) : (
          <EarthIcon color="#667085" />
        )
      }
      data={
        countries?.map((country) => ({
          value: String(country?.id),
          image: country.flag,
          label: country?.name_fr,
        })) || []
      }
      {...props?.getInputProps?.("countryId")}
      onChange={(val) => {
        let selected = countries?.find((el) => el.id === Number(val));
        if (selected) {
          setSelected({
            image: selected?.flag,
            label: selected?.name_fr,
            name: selected?.name_fr,
          });
        }
        props?.getInputProps?.("countryId")?.onChange(val);
        props?.onChange(val);
      }}
      size="sm"
      color="#484f59"
    />
  );
}
