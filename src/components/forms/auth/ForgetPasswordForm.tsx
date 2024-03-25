import { Alert, Button, ForgetPasswordResolver, Link } from "@/components";
import { Wording } from "@/lib";
import { useForm, yupResolver } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../Input";

interface ForgetPasswordFormProps {
  onSubmit: (
    data: ForgetPasswordFormType,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setType: Dispatch<SetStateAction<"success" | "danger">>,
    setStatus: Dispatch<SetStateAction<"hidden" | "shown">>
  ) => {};
}

type ForgetPasswordFormType = {
  email: string;
};

export function ForgetPasswordForm(props: ForgetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<"success" | "danger">("danger");
  const [status, setStatus] = useState<"shown" | "hidden">("hidden");
  const message =
    status && type === "success"
      ? Wording.forgetPasswordSuccessed
      : Wording.forgetPasswordFailed;

  const { getInputProps, onSubmit, errors } = useForm<ForgetPasswordFormType>({
    validateInputOnChange: true,
    validate: yupResolver(ForgetPasswordResolver),
  });

  const handleCloseAlert = () => {
    setStatus("hidden");
  };

  return (
    <>
      <form
        onSubmit={onSubmit((data) =>
          props.onSubmit(data, setIsLoading, setType, setStatus)
        )}
        className="w-[410px] flex flex-col gap-8 "
      >
        <div className="w-100 flex flex-col gap-3 ">
          <h1 className="text-[#101828] text-[2.125rem] font-[500]">
            Mot de passe oublié.
          </h1>
          <p className="text-[#667085] text-base leading-6 ">
            Entrez l&apos;adresse e-mail de votre compte afin que nous puissions vous
            envoyer des instructions de réinitialisation.
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 ">
          <Alert
            message={message}
            type={type}
            withCloseBtn
            onClose={handleCloseAlert}
            status={status}
          />
          <Input
            placeholder="email@adresse.com"
            label={"Votre adresse e-mail *"}
            name="email"
            error={errors?.email}
            {...getInputProps("email")}
          />
        </div>
        <Button
          type="submit"
          variant="filled"
          fullWidth
          size="md"
          color="primary"
          loading={isLoading}
        >
          Envoyer
        </Button>
        <p className="text-sm text-[#667085] font-[400] leading-5">
          Attends, je me souviens de mon mot de passe. &nbsp;
          <Link className="text-primary-normal font-semibold  " href="/v2/auth">
            Retour
          </Link>
        </p>
      </form>
    </>
  );
}
