import {
  useGetCategories,
  useGetEventTypes,
  useGetPathologies,
  useGetSpecialities,
} from "@/api";
import { WORDS } from "@/common/constants";
import {
  Button,
  DateInput,
  DateInputRange,
  Input,
  LoopSearchIcon,
  Select,
} from "@/components";
import { FILTER_OPTION, NoteType } from "@/enum";
import { formatDateMMDDYYYHHMM } from "@/lib";
import { Skeleton } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { FormEvent, useEffect, useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface SelectedOptions {
  category?: string;
  disease?: string;
  speciality?: string;
  date?: Date;
  keyWords?: string;
  profil?: string;
  eventType?: string;
  startDate?: Date;
  endDate?: Date;
}

interface FilterProps {
  placeholder: string;
  data: FilterOption[] | undefined;
  isLoading: boolean;
  defaultValue: string | undefined;
  onChange: (val: string | null) => void;
}

const FilterSelect: React.FC<FilterProps> = ({
  placeholder,
  data,
  defaultValue,
  onChange,
}) => (
  <Select
    clearable
    searchable
    placeholder={placeholder}
    data={data || []}
    onChange={(val) => onChange(val)}
    defaultValue={defaultValue}
    size="md"
  />
);

export interface FiltersHeaderProps {
  withKeywords?: boolean;
  withCategories?: boolean;
  withSpecialities?: boolean;
  withPathologies?: boolean;
  withDate?: boolean;
  withProfile?: boolean;
  withEventsTypes?: boolean;
  withDateRange?: boolean;
  num?: number;
}

export function HeaderFilters({
  withCategories,
  withDate,
  withKeywords,
  withPathologies,
  withProfile,
  withSpecialities,
  num,
  withEventsTypes,
  withDateRange,
}: FiltersHeaderProps) {
  const { query, push } = useRouter();
  const { data: pathologies, isLoading: isLoadingPathologies } =
    useGetPathologies();
  const { data: eventTypes, isLoading: isLoadingEventTypes } =
    useGetEventTypes();
  const { data: specialities, isLoading: isLoadingSpecialities } =
    useGetSpecialities({ isAll: true });

  const [previousQuery, setPreviousQuery] = useState<ParsedUrlQuery>(query);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<SelectedOptions>({
    ...query,
  });
  const handleSelectChange = (
    field: keyof SelectedOptions,
    value: string | null
  ) => {
    if (value === null || value === "null") {
      const existingQuery = query;
      if (existingQuery?.[field]) {
        delete existingQuery[field];
        push({
          query: {
            ...existingQuery,
            page: 1,
          },
        });
      }
    }
    setSelectedOptions((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilters = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredObject = Object.fromEntries(
      Object.entries(selectedOptions).filter(
        ([key, value]) => value !== null && value !== "null"
      )
    );

    push({
      query: {
        ...query,
        ...filteredObject,
        page: 1,
      },
    });
  };

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
    <div className="bg-gray-100">
      <header className="relative w-full p-4 bg-white w1100:py-8 rounded-lg w1100:h-auto shadow">
        <form
          className="flex items-center gap-2 relative justify-between w-full"
          onSubmit={handleFilters}
        >
          <div
            style={{ gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))` }}
            className={`grid h-11 gap-2 w-f-50p`}
          >
            {withKeywords && (
              <Input
                placeholder={WORDS.SEARCH}
                icon={<LoopSearchIcon className="w-5 h-5" />}
                onChange={(val) => {
                  handleSelectChange(
                    FILTER_OPTION.KEYWORDS,
                    val.currentTarget.value
                  );
                }}
                size="md"
                value={defaultValues.keyWords}
              />
            )}

            {withCategories &&
              (isLoading ? (
                <Skeleton className="h-11" />
              ) : (
                <FilterSelect
                  placeholder={WORDS.CATEGORIES}
                  data={
                    Object.entries(NoteType).map(([value, label]) => ({
                      value,
                      label,
                    })) || []
                  }
                  isLoading={isLoading}
                  defaultValue={defaultValues.category}
                  onChange={(val) =>
                    handleSelectChange(FILTER_OPTION.CATEGORY, val)
                  }
                />
              ))}
            {withSpecialities &&
              (isLoadingSpecialities || isLoading ? (
                <Skeleton className="h-11" />
              ) : (
                <FilterSelect
                  placeholder={WORDS.SPECIALITIES}
                  data={
                    specialities?.map((el) => ({
                      value: String(el.id),
                      label: el.name,
                    })) || []
                  }
                  isLoading={isLoadingSpecialities || isLoading}
                  defaultValue={defaultValues.speciality}
                  onChange={(val) =>
                    handleSelectChange(FILTER_OPTION.SPECIALITY, val)
                  }
                />
              ))}
            {withPathologies &&
              (isLoadingPathologies || isLoading ? (
                <Skeleton className="h-11" />
              ) : (
                <FilterSelect
                  placeholder={WORDS.DISEASES}
                  data={
                    pathologies?.map((el) => ({
                      value: String(el.id),
                      label: el.name,
                    })) || []
                  }
                  isLoading={isLoadingPathologies || isLoading}
                  defaultValue={defaultValues.disease}
                  onChange={(val) =>
                    handleSelectChange(FILTER_OPTION.DISEASE, val)
                  }
                />
              ))}
            {withEventsTypes &&
              (isLoadingEventTypes || isLoading ? (
                <Skeleton className="h-11" />
              ) : (
                <FilterSelect
                  placeholder={WORDS.EVENT_TYPE}
                  data={
                    eventTypes?.map((el) => ({
                      value: String(el.id),
                      label: el.name,
                    })) || []
                  }
                  isLoading={isLoadingEventTypes || isLoading}
                  defaultValue={defaultValues.eventType}
                  onChange={(val) =>
                    handleSelectChange(FILTER_OPTION.EVENT_TYPE, val)
                  }
                />
              ))}
            {withDate && (
              <DateInput
                valueFormat="DD/MM/YYYY"
                size="md"
                clearable
                defaultValue={defaultValues?.date}
                onChange={(val) =>
                  handleSelectChange(
                    FILTER_OPTION.DATE,
                    val ? formatDateMMDDYYYHHMM(val) : "null"
                  )
                }
                placeholder="Entrer une date"
              />
            )}
            {withDateRange && (
              <DateInputRange
                type="range"
                valueFormat="DD/MM/YYYY"
                placeholder="Entrer une date"
                clearable
                onChange={(start, end) => {
                  handleSelectChange(FILTER_OPTION.START_DATE, start);
                  handleSelectChange(FILTER_OPTION.END_DATE, end);
                }}
                defaultValue={
                  defaultValues.startDate != null &&
                  defaultValues.endDate != null &&
                  dayjs(defaultValues.startDate).isValid() &&
                  dayjs(defaultValues.endDate).isValid()
                    ? [
                        new Date(defaultValues.startDate),
                        new Date(defaultValues.endDate),
                      ]
                    : undefined
                }
              />
            )}
          </div>
          <div className="rounded">
            <Button
              type="submit"
              color="primary"
              className="px-3 h-11"
              variant="filled"
              size="md"
            >
              <LoopSearchIcon />
            </Button>
          </div>
        </form>
      </header>
    </div>
  );
}