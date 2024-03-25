import { Button, EditCommentFormResolver, Flex, TextArea } from "@/components";
import { useForm, yupResolver } from "@mantine/form";
export type EditCommentFormType = {
  text: string;
};
interface EditCommentFormProps {
  onSubmit: (data: EditCommentFormType) => void;
  onCancel: () => void;
  initialValues: EditCommentFormType;
}
export function EditCommentForm(props: EditCommentFormProps) {
  const { onSubmit, getInputProps, isValid } = useForm<EditCommentFormType>({
    validate: yupResolver(EditCommentFormResolver),
    initialValues: props.initialValues,
  });
  const handleCancel = () => {
    props.onCancel();
  };
  return (
    <form
      onSubmit={onSubmit((data) => {
        props.onSubmit(data);
      })}
      className="py-2 flex flex-col gap-3 items-end rounded"
    >
      <TextArea
        minRows={4}
        className="relative bg-gray-100 bg-transparent outline-none leading-6 w-full text-sm break-words"
        {...getInputProps("text")}
      />
      <Flex className="gap-2">
        <Button onClick={handleCancel} color="white" variant="outline">
          Annuler
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="filled"
          disabled={!isValid()}
        >
          Confirmer
        </Button>
      </Flex>
    </form>
  );
}
