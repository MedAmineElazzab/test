import { api } from "@/api";
import {
  AccountVerficationFormResolver,
  ArrowLeft,
  ArrowRight,
  Button,
  CurrentFileDropZone,
  Divider,
  Dropzone,
  NumberInput,
  Select,
  Switch,
  Text,
} from "@/components";
import { FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
export type AccountVerficationFormtype = {
  registrationNumber: string | undefined;
  categoryDocs: string | undefined;
  DOCUMENTS: File | undefined;
};
interface AccountVerficationFormProps {
  onSubmit: (
    data: AccountVerficationFormtype,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => {};
  previous: () => void;
}
export function AccountVerficationForm(props: AccountVerficationFormProps) {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [currentFile, setFile] = useState<File | undefined>(undefined);
  const [currentFileLength, setcurrentFileLength] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getInputProps, onSubmit, isValid, setFieldValue } =
    useForm<AccountVerficationFormtype>({
      validate: yupResolver(AccountVerficationFormResolver),
      validateInputOnChange: true,
      initialValues: {
        registrationNumber: undefined,
        categoryDocs: undefined,
        DOCUMENTS: undefined,
      },
    });

  const handleAddFile = (files: FileWithPath[]) => {
    setFieldValue("DOCUMENTS", files?.[0]);
    setFile(files?.[0]);
  };
  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setSwitchState(true);
      setFieldValue("registrationNumber", undefined);
    } else {
      setSwitchState(false);
      setFieldValue("registrationNumber", undefined);
      setFieldValue("categoryDocs", undefined);
      setFieldValue("DOCUMENTS", undefined);
      setcurrentFileLength(0);
      setFile(undefined);
    }
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (currentFile) {
      intervalId = setInterval(() => {
        setcurrentFileLength((prevLength) => prevLength + 5);
      }, 10);
    }
    if (currentFileLength === 100) {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentFile, currentFileLength]);

  return (
    <form
      onSubmit={onSubmit((data) => props.onSubmit(data, setIsLoading))}
      className="flex flex-col gap-6"
    >
      <NumberInput
        type="number"
        label={"Numéro d’ordre"}
        placeholder="Entrer le numéro d'ordre"
        min={0}
        {...getInputProps("registrationNumber")}
        disabled={switchState}
        className="text-gray-700"
      />
      <Switch
        label="Je n'ai pas mon numéro d’ordre!"
        onChange={handleSwitchChange}
      />
      <Select
        disabled={!switchState}
        label={"Type de document"}
        placeholder="Spécifier le type de votre document"
        {...getInputProps("categoryDocs")}
        data={[
          { value: "certificat", label: "certificat" },
          { value: "Attestation", label: "Attestation" },
        ]}
      />
      {!currentFile && (
        <Dropzone
          label="Joindre un document."
          disabled={!switchState}
          multiple={false}
          onDrop={handleAddFile}
          maxSize={1000000}
          accept={[
            MIME_TYPES.png,
            MIME_TYPES.pdf,
            MIME_TYPES.docx,
            MIME_TYPES.jpeg,
          ]}
          onReject={(e) => {
            notifications.show({
              message:
                "la taille autorisée est dépassée, ou le type du fichier importé est invalide",
              color: "red",
            });
          }}
        >
          <div className="text-gray-600">
            <Text size={"sm"}>
              <span className="text-primary-normal underline font-[500]">
                Cliquez pour télécharger
              </span>
              &nbsp; ou faites glisser et déposer
              <br />
              PDF, DOCX, JPEG or PNG {"(max. 800x400px)"}
            </Text>
          </div>
        </Dropzone>
      )}
      {currentFile && (
        <CurrentFileDropZone
          onClick={() => {
            setFieldValue("DOCUMENTS", undefined);
            setcurrentFileLength(0);
            setFile(undefined);
          }}
          name={currentFile.name}
          size={currentFile.size}
          currentFileLength={currentFileLength}
        />
      )}
      <Divider h={1} w={"100%"} opacity={0.3} />

      <div className="grid grid-cols-2 gap-3">
        <Button
          size="md"
          color="white"
          variant="outline"
          leftIcon={<ArrowLeft />}
          onClick={async () => {
            await api.post("/users/signup/init", {
              signupStep: "INTERESTS",
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
