import { api } from "@/api";
import {
  ArrowLeft,
  ArrowRight,
  Button,
  Divider,
  InterestsSectionFomResolver,
  MultiSelectCategory,
  MultiSelectSpeciality,
} from "@/components";
import { MultiSelectMaladie } from "@/components/others/sources/steps-forms-components/MultiSelectMaladie";
import { useForm, yupResolver } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
export type InterestsSectionsFormForm = {
  diseaseIds: string[];
  categorieIds: string[];
  specialityIds: string[];
};
interface InterestsSectionsFormProps {
  onSubmit: (
    data: InterestsSectionsFormForm,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  defaultValues?: {
    specialityIds?: string[];
    diseaseIds?: string[];
    categorieIds?: string[];
  };
  previous: () => void;
}
export function InterestsSectionsForm(props: InterestsSectionsFormProps) {
  const { defaultValues } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getInputProps, onSubmit, values, isValid } =
    useForm<InterestsSectionsFormForm>({
      validate: yupResolver(InterestsSectionFomResolver),
      validateInputOnChange: true,
      initialValues: {
        categorieIds: defaultValues?.categorieIds || [],
        diseaseIds: defaultValues?.diseaseIds || [],
        specialityIds: defaultValues?.specialityIds || [],
      },
    });
  return (
    <form
      onSubmit={onSubmit((data) => props.onSubmit(data, setIsLoading))}
      className="flex flex-col gap-8"
    >
      <MultiSelectSpeciality getInputProps={getInputProps} />
      <MultiSelectMaladie getInputProps={getInputProps} />
      <MultiSelectCategory getInputProps={getInputProps} />
      <Divider h={1} w={"100%"} opacity={0.3} />

      <div className="grid grid-cols-2 gap-3 ">
        <Button
          size="md"
          color="white"
          variant="outline"
          leftIcon={<ArrowLeft />}
          onClick={async () => {
            await api.post("/users/signup/init", {
              signupStep: "INFORMATION",
            });
            props.previous();
          }}
        >
          Précédent
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="filled"
          rightIcon={<ArrowRight />}
          size="md"
          disabled={!isValid()}
          loading={isLoading}
        >
          Continuer
        </Button>
      </div>
    </form>
  );
}
