import {
  LampIcon
} from "@/_v1/icons";
import LoopIcon from "@/_v1/icons/sources/LoopIcon";
import {
  useGetCategories,
  useGetPathologies,
  useGetProfessions,
  useGetSpecialities,
} from "@/api";
import { Skeleton } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { FormEvent, useEffect, useState } from "react";
import { Button, Input, NewDateIcon, Select } from "..";

interface FilterOption {
  value: string;
  label: string;
}

interface SelectedOptions {
  category?: string | boolean | null;
  disease?: string | boolean | null;
  speciality?: string | boolean | null;
  date?: string | boolean | null;
  keyWords?: string | boolean | null;
  profil?: string | boolean | null;
}

interface FilterProps {
  placeholder: string;
  // icon: React.ReactNode;
  data: FilterOption[] | undefined;
  isLoading: boolean;
  defaultValue: string | undefined;
  onChange: (val: string) => void;
}

const FilterSelect: React.FC<FilterProps> = ({
  placeholder,
  data,
  defaultValue,
  onChange,
}) => (
  <Select
    styles={{
      input: {
        fontSize: "15px",
        padding: "0px",
      },
      icon: {
        width: "2.8rem",
      },
    }}
    clearable
    searchable
    className="text-[19px]"
    placeholder={placeholder}
    data={data || []}
    onChange={(val) => onChange(val as string)}
    defaultValue={defaultValue}
  />
);
interface FiltersHeaderProps {
  withKeywords?: boolean;
  withCategories?: boolean;
  withSpecialities?: boolean;
  withPathologies?: boolean;
  withDate?: boolean;
  withProfile?: boolean;
  num?: number;
}
export default function FiltersHeader({
  withCategories,
  withDate,
  withKeywords,
  withPathologies,
  withProfile,
  withSpecialities,
  num,
}: FiltersHeaderProps) {
  const { data: pathologies, isLoading: isLoadingPathologies } =
    useGetPathologies();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();
  const { data: professions, isLoading: isLoadingProfessions } =
    useGetProfessions();
  const { data: specialities, isLoading: isLoadingSpecialities } =
    useGetSpecialities({ isAll: true });
  const { query, push } = useRouter();
  const [previousQuery, setPreviousQuery] = useState<ParsedUrlQuery>(query);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSelectChange = (field: keyof SelectedOptions, value: string) => {
    console.log(field ,value);
    setSelectedOptions((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilters = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push({
      query: {
        ...query,
        ...selectedOptions,
        page: 1,
      },
    });
  };

  const [defaultValues, setDefaultValues] = useState<SelectedOptions>({
    ...query,
  });
  useEffect(() => {
    if (JSON.stringify(previousQuery) !== JSON.stringify(query)) {
      setIsLoading(true);
      setDefaultValues({ ...query });
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
    setPreviousQuery(query);
  }, [
    query?.profil,
    query?.disease,
    query?.category,
    query?.speciality,
    query?.date,
  ]);

  return (
    <header
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}
      className="w-full p-[16px] bg-white w1100:py-[30px] rounded-[8px] w1100:h-[auto] "
    >
      <form
        className="flex items-center gap-[8px] h-[44px] justify-between w-full w1100:flex-col w1100:h-[auto] w1100:justify-center"
        onSubmit={handleFilters}
      >
        <div
          style={{
            gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))`,
          }}
          className={`grid w1100:!grid-cols-2  w800:!grid-cols-1  w1100:h-[auto]  h-[46px] gap-[8px] w-[calc(100%-50px)]`}
        >
          {withKeywords && (
            <Input
              styles={{
                input: {
                  fontSize: "15px",
                  color: "#484f59 !important",
                  height: "44px",
                  paddingLeft: "2.8rem !important",
                },
                icon: {
                  width: "2.8rem",
                },
              }}
              placeholder="Keywords"
              icon={<LampIcon className="w-[21px] h-[21px]" />}
              onChange={(val: any) => {
                handleSelectChange("keyWords", String(val.currentTarget.value));
              }}
              value={defaultValues?.keyWords as string}
            />
          )}
          {withProfile &&
            (isLoadingProfessions || isLoading ? (
              <Skeleton height={"46px"} />
            ) : (
              <FilterSelect
                placeholder="Profil"
                // icon={<ProfileIcon className="w-[24px] h-[24px]" />}
                data={
                  professions?.map((el) => ({
                    value: String(el.id),
                    label: el.name,
                  })) || []
                }
                isLoading={isLoadingProfessions || isLoading}
                defaultValue={defaultValues.profil as string}
                onChange={(val) => handleSelectChange("profil", val)}
              />
            ))}
          {withCategories &&
            (isLoadingCategories || isLoading ? (
              <Skeleton height={"44px"} />
            ) : (
              <FilterSelect
                placeholder="Categories"
                // icon={<CategoriesIcon className="w-[21px] h-[21px]" />}
                data={
                  categories?.map((el) => ({
                    value: String(el.id),
                    label: el.name,
                  })) || []
                }
                isLoading={isLoadingCategories || isLoading}
                defaultValue={defaultValues.category as string}
                onChange={(val) => handleSelectChange("category", val)}
              />
            ))}

          {withSpecialities &&
            (isLoadingSpecialities || isLoading ? (
              <Skeleton height={"46px"} />
            ) : (
              <FilterSelect
                placeholder="Specialities"
                // icon={<SpecialityIcon className="w-[23px] h-[23px]" />}
                data={
                  specialities?.map((el) => ({
                    value: String(el.id),
                    label: el.name,
                  })) || []
                }
                isLoading={isLoadingSpecialities || isLoading}
                defaultValue={defaultValues.speciality as string}
                onChange={(val) => handleSelectChange("speciality", val)}
              />
            ))}
          {withPathologies &&
            (isLoadingPathologies || isLoading ? (
              <Skeleton height={"46px"} />
            ) : (
              <FilterSelect
                placeholder="Maladies"
                // icon={<PathologyIcon className="w-[32px] h-[32px]" />}
                data={
                  pathologies?.map((el) => ({
                    value: String(el.id),
                    label: el.name,
                  })) || []
                }
                isLoading={isLoadingPathologies || isLoading}
                defaultValue={defaultValues.disease as string}
                onChange={(val) => handleSelectChange("disease", val)}
              />
            ))}

          {withDate && (
            <DateInput
              clearable
              onChange={(val) => {
                if (val != null) {
                  const originalDate = new Date(String(val));
                  const dayBefore = new Date(originalDate);
                  dayBefore?.setDate(originalDate?.getDate() + 1);
                  const formattedDayBefore = dayBefore
                    ?.toISOString()
                    ?.split("T")[0];
                  handleSelectChange("date", formattedDayBefore);
                } else {
                  handleSelectChange("date", "");
                }
              }}
              sx={{
                input: {
                  padding: "22px 10px",
                  color: "#484f59",
                  fontSize: "15px",
                  paddingLeft: "2.8rem !important",
                  paddingRight: "36px!important",
                },
                ["input[data-invalid='true']"]: {
                  background: "#ffe0e0",
                },
                [".mantine-Input-rightSection button svg"]: {
                  transition: ".2s",
                  width: "23px !important",
                  height: "23px !important",
                },
                ["input:focus"]: {
                  borderColor: "#0049e0",
                },
                label: {
                  color: "currentcolor",
                  marginBottom: "5px",
                },
                [".mantine-9nozta[data-selected]"]: {
                  background: "#0049e0",
                  fontWeight: 600,
                },
                [".mantine-9nozta[data-selected]:hover"]: {
                  background: "#004be0d3",
                },
                [".mantine-9nozta"]: {
                  borderRadius: "50%",
                },
              }}
              styles={{
                icon: {
                  width: "2.8rem",
                },
              }}
              defaultValue={
                defaultValues?.date
                  ? new Date(defaultValues?.date as string)
                  : null
              }
              placeholder="Enter a date"
              icon={<NewDateIcon />}
            />
          )}
        </div>
        <div className="w1100:w-full h-[44px]  rounded-[4px] w1100:flex w1100:justify-center">
          <Button
            type="submit"
            color="primary"
            className="px-3"
            h={46}
            variant="filled"
            size="md"
          >
            <LoopIcon />
          </Button>
        </div>
      </form>
    </header>
  );
}
