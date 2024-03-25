import { UserTypes } from "@/@types";
import { useGetOrganizations } from "@/api";
import { MultiSelect, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";
import { useEffect, useState } from "react";

interface MultiSelectInstProps {
  getInputProps?: GetInputProps<{}>;
  customOrgs: string[];
  userType: UserTypes;
  //   onCreate: (val: { value: string; label: string }) => void;
}

export function MultiSelectInst({ ...props }: MultiSelectInstProps) {
  const {
    data: institutions,
    isLoading: isLoadingInstitutions,
    isError: isErrorInstitutions,
  } = useGetOrganizations({ isAll: true });

  const [globalOrganizations, setGlobalOrganizations] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    if (institutions) {
      const organizations = institutions
        .map((org) => ({
          label: org.name,
          value: org.id.toString(),
        }))
        .concat(
          props.customOrgs.map((el) => ({
            label: el,
            value: el,
          }))
        );

      setGlobalOrganizations(organizations);
    }
  }, [institutions]);

  return isLoadingInstitutions ? (
    <div>
      <Skeleton height={35} mb={"xs"} />
      <Skeleton height={35} />
    </div>
  ) : isErrorInstitutions ? (
    <div>
      <p className="text-red-500">Error loading data</p>
    </div>
  ) : (
    <MultiSelect
      className="!text-gray-700"
      label={props.userType === "STUDENT" ? "Institution *" : "Institutions *"}
      data={globalOrganizations}
      placeholder={
        props.userType === "STUDENT"
          ? "choisir une option"
          : "choisir une ou plusiers options"
      }
      maxSelectedValues={props.userType === "STUDENT" ? 1 : undefined}
      searchable
      creatable
      getCreateLabel={(query) => (
        <>
          + Ajouter <span className="font-semibold">{query}</span>
        </>
      )}
      onCreate={(query) => {
        const item = { value: query, label: query };
        // props?.onCreate(item);
        setGlobalOrganizations((prev) => [...prev, item]);

        return item;
      }}
      {...props?.getInputProps?.("institutions")}
    />
  );
}
