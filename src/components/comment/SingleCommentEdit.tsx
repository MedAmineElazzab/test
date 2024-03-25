import { Comment } from "@/api";
import {
  Avatar,
  Box,
  EditCommentForm,
  EditCommentFormType,
  Flex,
  Link,
} from "@/components";

export interface SingleCommentEditProps extends Comment {
  name: string;
  onSubmit: (data: EditCommentFormType) => void;
  onCancel: () => void;
}

export const SingleCommentEdit = ({
  user,
  onCancel,
  name,
  onSubmit,
  text,
}: SingleCommentEditProps) => {
  const handleCancel = () => {
    onCancel();
  };
  const handleSubmit = (data: EditCommentFormType) => {
    onSubmit(data);
  };
  const FirstName = user ? user.firstName : "";
  const LastName = user ? user.lastName : "";
  return (
    <Flex className="w-full" direction="column">
      <Box className="relative bg-white rounded-lg">
        <div className="w-full flex items-start gap-4 p-4">
          <Flex className="w-full gap-4" direction="row">
            <Avatar radius="50%" src={user.imagePath} color="primary" size="md">
              {FirstName && FirstName != "" && LastName && LastName != ""
                ? FirstName?.[0] + LastName?.[0]
                : ""}
            </Avatar>
            <div className="w-full">
              <Flex className="gap-3" align="center">
                <Link
                  href="/"
                  className="text-gray-700 font-semibold text-sm capitalize"
                >
                  {name}
                </Link>
              </Flex>
              <EditCommentForm
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                initialValues={{ text }}
              />
            </div>
          </Flex>
        </div>
      </Box>
    </Flex>
  );
};
