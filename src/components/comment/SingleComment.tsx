import { Comment } from "@/api";
import { Avatar, Box, Flex, IconCheck, Link, Text } from "@/components";
import { ModulesPathnames } from "@/enum";
import { clsx } from "@mantine/core";
import { formatRelative, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import React from "react";

export interface SingleCommentProps extends Comment {
  name: string;
}

export const SingleComment: React.FC<SingleCommentProps> = React.memo(
  (props) => {
    const FirstName = props.user ? props.user.firstName : "";
    const LastName = props.user ? props.user.lastName : "";
    const parsedDate = parseISO(props.updatedAt);
    const formattedRelativeTime = formatRelative(parsedDate, new Date(), {
      locale: fr,
    });
    const classNames = clsx("w-full flex items-start gap-4 p-4", {
      "blur-sm opacity-40 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-black/5":
        !props.isVerified,
    });

    return (
      <Flex className="w-full" direction={"column"}>
        <Box className="relative bg-white rounded-lg">
          <div className={classNames}>
            <Avatar
              radius={"50%"}
              src={props.user.imagePath}
              color="primary"
              size="md"
            >
              {FirstName && FirstName != "" && LastName && LastName != ""
                ? FirstName?.[0] + LastName?.[0]
                : ""}
            </Avatar>
            <Flex className="w-full gap-2" direction={"column"}>
              <Flex justify={"space-between"} align={"center"}>
                <Link
                  href={ModulesPathnames.EXPERT + "/" + props.userId}
                  className="text-gray-700 font-semibold text-sm capitalize"
                >
                  {props.name}
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs capitalize">
                    {formattedRelativeTime}
                  </span>
                  {props.isEdited && (
                    <Text className="text-gray-500 text-xs flex items-center gap-1">
                      Modifié <IconCheck className="w-3 h-3" />
                    </Text>
                  )}
                </div>
              </Flex>
              <div className="bg-gray-100 py-2 px-4 flex flex-col gap-3 items-end rounded">
                <div
                  className="relative text-gray-900 leading-6 w-full text-sm break-words"
                  dangerouslySetInnerHTML={{
                    __html: props.text,
                  }}
                />
              </div>
            </Flex>
          </div>
        </Box>
      </Flex>
    );
  }
);

SingleComment.displayName = "SingleComment";

export default SingleComment;
