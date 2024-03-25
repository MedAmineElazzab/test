import {
  Box,
  Button,
  CommentsFormResolver,
  Flex,
  Text,
  TextArea,
} from "@/components";
import { useForm, yupResolver } from "@mantine/form";
export type CommentFormType = {
  text: string;
};
interface CommentFormProps {
  onSubmit: (data: CommentFormType) => void;
  isDisabled: boolean;
}
export function CommentsForm(props: CommentFormProps) {
  const { onSubmit, getInputProps, isValid, reset, setFieldValue } =
    useForm<CommentFormType>({
      validate: yupResolver(CommentsFormResolver),
    });
  return (
    <form
      onSubmit={onSubmit((data) => {
        props.onSubmit(data);
        reset();
        setFieldValue("text", "");
      })}
    >
      <Box className="flex flex-col gap-3 w-full ">
        <Text className="text-base font-semibold text-gray-900">
          Commentaires
        </Text>
        <Flex direction="column" gap={"sm"} align={"end"}>
          <TextArea
            placeholder="Laissez un commentaire"
            disabled={props.isDisabled}
            className="bg-white w-full"
            minRows={6}
            {...getInputProps("text")}
          />
          <Button
            disabled={props.isDisabled ? true : !isValid()}
            type="submit"
            w={120}
            variant="filled"
            color="primary"
          >
            Publier
          </Button>
        </Flex>
      </Box>
    </form>
  );
}
