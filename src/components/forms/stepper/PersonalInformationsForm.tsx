import { UserTypes } from "@/@types";
import { api } from "@/api";
import {
  ArrowLeft,
  ArrowRight,
  Button,
  DateIcon,
  Divider,
  MultiSelectInst,
  PersonalInformationsResolver,
  SelectCity,
  SelectCountries,
  SelectExerciceEnv,
  SelectLevelEducation,
  SelectSpeciality,
  YearPickerInput,
} from "@/components";
import { useForm, yupResolver } from "@mantine/form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface PersonalInformationsFormProps {
  onSubmit: (
    data: PersonalInformationsFormData,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  professionId: number;
  userType: UserTypes | undefined;
  customOrgs: string[];
  previous: () => void;
  defaultValues?: {
    specialityId?: number;
    educationLevelId?: number;
    environmentId?: number;
    yearOfExercise?: string;
    cityId?: number;
    institutions?: string[];
    countryId?: number;
  };
}

export type PersonalInformationsFormData = {
  institutions: (string | number)[];
  yearOfExercise?: Date | undefined;
  educationLevelId?: number | undefined;
  environmentId?: number | undefined;
  specialityId?: number | undefined;
  cityId?: string | undefined;
};

export function PersonalInformationsForm(props: PersonalInformationsFormProps) {
  const [currentCountry, setCurrentCountry] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const defaultValues = props.defaultValues || {};
  const initialValues = {
    cityId: defaultValues?.cityId?.toString() || "",
    countryId: defaultValues?.countryId?.toString() || "",
    institutions: (defaultValues.institutions || []).map((el) => String(el)),
    specialityId: defaultValues.specialityId,
    environmentId: defaultValues.environmentId,
    yearOfExercise: defaultValues?.yearOfExercise
      ? new Date(defaultValues.yearOfExercise)
      : undefined,
    educationLevelId: defaultValues.educationLevelId,
  };

  const { getInputProps, onSubmit, isValid, values } =
    useForm<PersonalInformationsFormData>({
      validate: yupResolver(
        PersonalInformationsResolver({ type: props.userType as UserTypes })
      ),
      validateInputOnChange: true,
      initialValues,
    });

  useEffect(() => {
    if (defaultValues.countryId) {
      setCurrentCountry(defaultValues.countryId);
    }
  }, []);
  return (
    <form
      onSubmit={onSubmit((data) => props.onSubmit(data, setIsLoading))}
      className="flex flex-col gap-3"
    >
      <SelectSpeciality
        defaultValue={defaultValues?.specialityId}
        professionId={props.professionId}
        getInputProps={getInputProps}
      />
      {props.userType == "STUDENT" && (
        <SelectLevelEducation
          getInputProps={getInputProps}
          defaultValue={defaultValues?.educationLevelId}
        />
      )}
      {props.userType == "EXPERT" && (
        <>
          <SelectExerciceEnv
            getInputProps={getInputProps}
            defaultValue={defaultValues?.environmentId}
          />
          <YearPickerInput
            icon={<DateIcon className="w-5 h-5" />}
            label={"Date de début d’exercise *"}
            placeholder="Séléctionner une date "
            clearable
            className="text-gray-700"
            maxDate={new Date()}
            valueFormat="YYYY"
            {...getInputProps("yearOfExercise")}
          />
        </>
      )}
      <MultiSelectInst
        userType={props.userType as UserTypes}
        getInputProps={getInputProps}
        customOrgs={props.customOrgs}
      />
      <div className="grid grid-cols-2 gap-3 ">
        <SelectCountries
          getInputProps={getInputProps}
          onChange={(val) => {
            if (val) setCurrentCountry(Number(val));
          }}
        />
        <SelectCity
          currentCountry={currentCountry}
          getInputProps={getInputProps}
        />
      </div>
      <Divider h={1} w={"100%"} className="my-2" opacity={0.3} />
      <div className="grid grid-cols-2 gap-3 ">
        <Button
          size="md"
          color="white"
          variant="outline"
          leftIcon={<ArrowLeft />}
          onClick={async () => {
            try {
              await api.post("/users/signup/init", {
                signupStep: "SIGNUP",
              });
              props.previous();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Précédent
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="filled"
          loading={isLoading}
          rightIcon={<ArrowRight />}
          size="md"
          disabled={!isValid()}
        >
          Continuer
        </Button>
      </div>
    </form>
  );
}
