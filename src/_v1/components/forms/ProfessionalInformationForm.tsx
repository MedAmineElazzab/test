import { UserPatched } from "@/@types";
import { useGetCountryCities } from "@/_v1/api/cities";
import { useGetCountries } from "@/_v1/api/countries";
import { useGetEducationLevels } from "@/_v1/api/educationLevel";
import { useGetEnvironment } from "@/_v1/api/environment";
import { useGetInstitutions } from "@/_v1/api/institution";
import { useGetProfessions } from "@/_v1/api/professions";
import {
  CountriesIcon,
  HomeIcon,
  InstitutionIcon,
  ProfessionIcon,
} from "@/_v1/icons";
import { YearPickerInput } from "@mantine/dates";
import { useForm, yupResolver } from "@mantine/form";
import { IconCalendarEvent } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Button from "../Buttons/Button";
import { Select } from "../Inputs";
import { ProfessionalInformationForm as ProfessionalInformationFormType } from "../Resolvers/@types";
import { ProfessionalInformationFormResolver } from "../Resolvers/steps";

interface ProfessionalInformationFormProps {
  onSubmit: (data: ProfessionalInformationFormType, setIsloading?: any) => void;
  user: UserPatched | undefined;
}
export default function ProfessionalInformationForm({
  onSubmit,
  user,
}: ProfessionalInformationFormProps) {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const {
    onSubmit: onSubmitt,
    getInputProps,
    errors,
    values,
    setValues,
  } = useForm<ProfessionalInformationFormType>({
    initialValues: {
      city: "",
      country: "",
      educationLevel: "",
      environment: "",
      institution: "",
      profession: "",
      yearOfExercise: "",
    },
    validate: yupResolver(ProfessionalInformationFormResolver),
  });
  const {
    data: countries,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
  } = useGetCountries({});
  const {
    data: cities,
    isLoading: isLoadingCities,
    isError: isErrorCities,
  } = useGetCountryCities(values?.country);
  const {
    data: professions,
    isLoading: isLoadingProfessions,
    isError: isErrorProfessions,
  } = useGetProfessions();
  const {
    data: educationLevels,
    isLoading: isLoadingEducationLevels,
    isError: isErrorEducationLevels,
  } = useGetEducationLevels();
  const {
    data: environments,
    isLoading: isLoadingEnvironments,
    isError: isErrorEnvironments,
  } = useGetEnvironment();
  const {
    data: institutions,
    isLoading: isLoadingInstitutions,
    isError: isErrorInstitutions,
  } = useGetInstitutions();
  useEffect(() => {
    if (user) {
      setValues({
        city: user?.city?.id,
        country: user?.city?.countryId,
        educationLevel: user?.educationLevelId as number,
        environment: user?.environmentId as number,
        institution: user?.institutionId as number,
        profession: user?.professionId as number,
        yearOfExercise: user?.yearOfExercise
          ? (new Date(user?.yearOfExercise as string) as any)
          : new Date(),
      });
    }
  }, [user]);
  return (
    <form
      onSubmit={onSubmitt((val) => onSubmit(val, setIsloading))}
      className="w-full flex flex-col gap-5"
    >
      {isLoadingProfessions || !user ? (
        <Skeleton height={"45px"} count={2} />
      ) : (
        <Select
          withAsterisk
          placeholder="Choose your Profession"
          icon={<ProfessionIcon className="text-[#333] w-[24px] h-[24px]" />}
          label={"Profession"}
          {...getInputProps("profession")}
          defaultValue={String(user?.professionId)}
          data={
            professions?.map((el) => {
              return {
                value: String(el?.id),
                label: el?.name,
              };
            }) || []
          }
        />
      )}
      {isLoadingEducationLevels || !user ? (
        <Skeleton height={"45px"} count={2} />
      ) : (
        <Select
          className=""
          withAsterisk
          placeholder="Choose your Level of education "
          icon={<ProfessionIcon className="text-[#333] w-[24px] h-[24px]" />}
          label={"Level of education "}
          {...getInputProps("educationLevel")}
          defaultValue={String(user?.educationLevel?.id)}
          data={
            educationLevels?.map((el) => {
              return {
                value: String(el?.id),
                label: el?.name,
              };
            }) || []
          }
        />
      )}
      {isLoadingCountries || !user ? (
        <Skeleton height={"45px"} count={2} />
      ) : (
        <Select
          searchable
          nothingFound={<div>No match.</div>}
          withAsterisk
          placeholder="Enter your country"
          icon={<CountriesIcon className="text-[#333] w-[24px] h-[24px]" />}
          label={"Country"}
          // itemComponent={SelectItem}
          defaultValue={String(user?.city?.countryId)}
          {...getInputProps("country")}
          data={
            countries?.map((el) => {
              return {
                value: String(el?.id),
                label: el?.name_en,
              };
            }) || []
          }
        />
      )}
      {isLoadingCities || !user || isLoadingCountries ? (
        <Skeleton height={"45px"} count={2} />
      ) : (
        <Select
          searchable
          nothingFound={<div>No match.</div>}
          withAsterisk
          placeholder="Enter your city"
          icon={<HomeIcon className="text-[#333] w-[24px] h-[24px]" />}
          label={"City"}
          defaultValue={String(user?.cityId)}
          {...getInputProps("city")}
          data={
            cities?.map((el) => {
              return {
                value: String(el?.id),
                label: el?.name,
              };
            }) || []
          }
        />
      )}
      {/* ) : (
        ""
      )} */}
      {isLoadingEnvironments || !user ? (
        <Skeleton height={"45px"} count={2} />
      ) : (
        <Select
          searchable
          nothingFound={<div>No match.</div>}
          withAsterisk
          placeholder="Enter your exercise of environment"
          label={"Exercise environment"}
          defaultValue={String(user?.environmentId)}
          {...getInputProps("environment")}
          icon={<CountriesIcon className="text-[#333] w-[24px] h-[24px]" />}
          data={
            environments?.map((el) => {
              return {
                value: String(el?.id),
                label: el?.name,
              };
            }) || []
          }
        />
      )}
      {isLoadingInstitutions || !user ? (
        <Skeleton height={"25px"} count={2} />
      ) : (
        <Select
          searchable
          nothingFound={<div>No match.</div>}
          withAsterisk
          placeholder="Enter your institution"
          icon={<InstitutionIcon className="text-[#333] w-[24px] h-[24px]" />}
          label={"Institution"}
          defaultValue={String(user?.institutionId)}
          {...getInputProps("institution")}
          data={
            institutions?.map((el) => {
              return {
                value: String(el?.id),
                label: el?.name,
              };
            }) || []
          }
        />
      )}

      <YearPickerInput
        // value={value}
        // onChange={setValue}
        className={` w-full ${
          errors?.yearOfExercise !== undefined ? "Input-errored" : ""
        }`}
        icon={<IconCalendarEvent className="text-[#333] w-[24px] h-[24px]" />}
        withAsterisk
        styles={{
          root: {
            maxWidth: "100% !important",
          },

          input: {
            padding: "10px",
            background: "white",
          },

          label: {
            color: "currentcolor",
            marginBottom: "5px",
          },
        }}
        sx={{
          ["input:focus"]: {
            borderColor: "currentcolor",
          },
          ["input[data-invalid='true']"]: {
            background: "#ffe0e0",
          },
          [".mantine-Input-wrapper"]: {
            background: "white",
          },
          [".mantine-PickerControl-pickerControl[data-selected=true]"]: {
            backgroundColor: "#0049e0",
          },
          [".mantine-PickerControl-pickerControl:hover"]: {
            backgroundColor: "#e6edfc",
          },
        }}
        label="Year of exercise"
        // placeholder="Enter your year of practice"
        maw={400}
        mx="auto"
        {...getInputProps("yearOfExercise")}
        // defaultValue={new Date()}
      />
      <Button
        loading={isLoading}
        type="submit"
        className="bg-primary-normal hover:bg-primary-normal/80 transi text-white "
      >
        Continue
      </Button>
      <style>
        {`
          .Input-errored .mantine-Input-icon svg {
            color: #fa5252 !important;
          }
          .Input-errored label {
            color: #fa5252 !important;
          }
        `}
      </style>
    </form>
  );
}