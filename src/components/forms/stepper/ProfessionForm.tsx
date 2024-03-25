import {
  ArrowRight,
  Button,
  SelectProfession,
  professionFormResolver,
} from "@/components";
import { useForm, yupResolver } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
export type ProfessionForm = {
  professionId: number;
};
interface ProfessionFormProps {
  onSubmit: (
    data: ProfessionForm,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  defaultValues?: {
    professionId: number | undefined;
  };
}
export function ProfessionForm(props: ProfessionFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues = props.defaultValues?.professionId
    ? { professionId: props.defaultValues.professionId }
    : undefined;

  const { getInputProps, onSubmit, isValid } = useForm<ProfessionForm>({
    validate: yupResolver(professionFormResolver),
    validateInputOnChange: true,
    initialValues,
  });

  return (
    <form
      onSubmit={onSubmit((data) => props.onSubmit(data, setIsLoading))}
      className="flex flex-col gap-8"
    >
      <SelectProfession
        defaultValues={props.defaultValues}
        getInputProps={getInputProps}
      />
      <Button
        type="submit"
        variant="filled"
        fullWidth
        size="md"
        rightIcon={<ArrowRight />}
        color="primary"
        loading={isLoading}
        disabled={!isValid()}
      >
        Continuer
      </Button>
    </form>
  );
}
