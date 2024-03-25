import { useGetCategories } from "@/_v1/api/category";
import { useGetPathologies } from "@/_v1/api/pathology";
import { useGetProfessions } from "@/_v1/api/professions";
import { useGetSpecialities } from "@/_v1/api/speciality";
import Button from "@/_v1/components/Buttons/Button";
import { Input, Select } from "@/_v1/components/Inputs";
import {
  CategoriesIcon,
  DateIcon,
  LampIcon,
  PathologyIcon,
  SpecialityIcon,
} from "@/_v1/icons";
import ProfileIcon from "@/_v1/icons/sources/ProfileIcon";
import { Skeleton } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import DateRange from "../date-range";
import { useGetCountries } from "@/_v1/api/countries";
import { useGetOrganizations } from "@/_v1/api/organization";
import { useGetExperts } from "@/_v1/api/expert";
import LoopIcon from "@/_v1/icons/sources/LoopIcon";

interface FilterOption {
  value: string;
  label: string;
}

interface SelectedOptions {
  category?: string | boolean;
  pathology?: string | boolean;
  speciality?: string | boolean;
  date?: string | boolean;
  keyWords?: string | boolean;
  profil?: string | boolean;
  dateStart?: string | boolean;
  dateEnd?: string | boolean;
  country?: string | boolean;
  institution?: string | boolean;
  expert?: string | boolean;
}

interface FilterProps {
  placeholder: string;
  icon: React.ReactNode;
  data: FilterOption[] | undefined;
  isLoading: boolean;
  defaultValue: string | undefined;
  onChange: (val: string) => void;
}

const FilterSelect: React.FC<FilterProps> = ({
  placeholder,
  icon,
  data,
  defaultValue,
  onChange,
}) => (
  <Select
    styles={{
      input: {
        fontSize: "15px",
        paddingLeft: "2.8rem !important",
      },
      icon: {
        width: "2.8rem",
      },
    }}
    clearable
    searchable
    className="text-[19px]"
    placeholder={placeholder}
    icon={icon}
    data={data || []}
    onChange={(val) => onChange(val as string)}
    defaultValue={defaultValue}
  />
);
interface FiltersHeaderProps {
  withKeywords?: boolean;
  withContries?: boolean;
  withCategories?: boolean;
  withSpecialities?: boolean;
  withPathologies?: boolean;
  withProfile?: boolean;
  withDateRange?: boolean;
  num?: number;
  withInstitution?: boolean;
  withProfileExpert?: boolean;
}
export default function FiltersHeader({
  withKeywords,
  withCategories,
  withContries,
  withPathologies,
  withProfile,
  withDateRange,
  withSpecialities,
  num,
  withInstitution,
  withProfileExpert,
}: FiltersHeaderProps) {
  const { data: pathologies, isLoading: isLoadingPathologies } =
    useGetPathologies();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();
  const { data: professions, isLoading: isLoadingProfessions } =
    useGetProfessions();
  const { data: specialities, isLoading: isLoadingSpecialities } =
    useGetSpecialities({ isAll: true });
  const { data: institutions, isLoading: isLoadingInstitutions } =
    useGetOrganizations();
  const { data: experts, isLoading: isLoadingExperts } = useGetExperts();

  const {
    data: countries,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
  } = useGetCountries({});

  const { query, push } = useRouter();
  const [previousQuery, setPreviousQuery] = useState<ParsedUrlQuery>(query);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSelectChange = (field: keyof SelectedOptions, value: string) => {
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
  }, [query]);

  // to handle organization because data it's like this data:{items , meta}
  const [organization, setOrganization] = useState<any>(undefined);
  const [allExperts, setAllExperts] = useState<any>(undefined);

  useEffect(() => {
    setOrganization(institutions);
    setAllExperts(experts);
  }, [institutions, experts]);

  console.log("experts", experts);

  return (
    <header className="w-full py-3 px-3 bg-white w1100:py-[30px] rounded-[5px]  shadow ">
      <form
        className="flex items-center gap-[8px] justify-between w-full w1100:flex-col w1100:justify-center"
        onSubmit={handleFilters}
      >
        <div
          style={{
            gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))`,
          }}
          className={`  grid w1100:!grid-cols-1 gap-2 w-[calc(100%-50px)]`}
        >
          {withContries &&
            (isLoadingCountries || isLoading ? (
              <Skeleton height={"46px"} />
            ) : (
              <FilterSelect
                placeholder="Countries"
                icon={<LampIcon className="w-[21px] h-[21px]" />}
                data={
                  countries?.map((el) => ({
                    value: String(el?.id),
                    label: el?.name_fr,
                  })) || []
                }
                isLoading={isLoadingCategories || isLoading}
                defaultValue={defaultValues.country as string}
                onChange={(val) => handleSelectChange("country", val)}
              />
            ))}
          {withKeywords && (
            <Input
              styles={{
                input: {
                  fontSize: "15px",
                  color: "#484f59 !important",
                  paddingLeft: "2.8rem !important",
                },
                icon: {
                  width: "2.8rem",
                },
              }}
              placeholder="Keywords"
              icon={<LampIcon className="w-[21px] h-[21px]" />}
              onChange={(val) => {
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
                icon={<ProfileIcon className="w-[24px] h-[24px]" />}
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
          {withInstitution &&
            (isLoadingProfessions || isLoading ? (
              <Skeleton height={"46px"} />
            ) : (
              <FilterSelect
                placeholder="Institution"
                icon={<ProfileIcon className="w-[24px] h-[24px]" />}
                data={
                  organization?.items?.map((el: any) => ({
                    value: String(el.name),
                    label: el.name,
                  })) || []
                }
                isLoading={isLoadingInstitutions || isLoading}
                defaultValue={defaultValues.institution as string}
                onChange={(val) => handleSelectChange("institution", val)}
              />
            ))}
          {withProfileExpert &&
            (isLoadingProfessions || isLoading ? (
              <Skeleton height={"46px"} />
            ) : (
              <FilterSelect
                placeholder="Profile"
                icon={<ProfileIcon className="w-[24px] h-[24px]" />}
                data={
                  allExperts?.items.map((el: any) => ({
                    value: String(el.firstName + " " + el.lastName),
                    label: el.firstName + " " + el.lastName,
                  })) || []
                }
                isLoading={isLoadingExperts || isLoading}
                defaultValue={defaultValues.expert as string}
                onChange={(val) => handleSelectChange("expert", val)}
              />
            ))}
          {withCategories &&
            (isLoadingCategories || isLoading ? (
              <Skeleton height={"46px"} />
            ) : (
              <FilterSelect
                placeholder="Categories"
                icon={<CategoriesIcon className="w-[21px] h-[21px]" />}
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
                icon={<SpecialityIcon className="w-[23px] h-[23px]" />}
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
                placeholder="Pathologies"
                icon={<PathologyIcon className="w-[32px] h-[32px]" />}
                data={
                  pathologies?.map((el) => ({
                    value: String(el.id),
                    label: el.name,
                  })) || []
                }
                isLoading={isLoadingPathologies || isLoading}
                defaultValue={defaultValues.pathology as string}
                onChange={(val) => handleSelectChange("pathology", val)}
              />
            ))}

          {withDateRange && <DateRange handleRange={handleSelectChange} />}
        </div>
        <div className="w1100:w-full w1100:flex w1100:justify-center">
          <Button
            type="submit"
            className=" focusButton rounded-[4px]  w-[44px] w1100:w-[calc(100%-50px)]   text-[16px]  hover:bg-[#00349F] focus:bg-[#0042CC] "
          >
            <LoopIcon />
          </Button>
        </div>
      </form>
    </header>
  );
}
