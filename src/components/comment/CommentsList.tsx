import { Comment } from "@/api";
import {
  Box,
  Flex,
  LoadMoreComments,
  Mycomment,
  SingleComment,
} from "@/components";
import { useEffect, useState } from "react";

interface CommentsListProps {
  data: Comment[];
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  userComment: Comment | null;
  onLoadMore: () => void;
  showLoadMore?: boolean;
  pathname: string | null;
  setUserComment: React.Dispatch<React.SetStateAction<Comment | null>>;
}

export function CommentsList({
  userComment,
  setUserComment,
  data,
  showLoadMore = false,
  onLoadMore,
  total,
  setTotal,
  pathname,
}: CommentsListProps) {
  const [userCurrentComment, setUserCurrentComment] = useState<Comment | null>(
    userComment
  );

  useEffect(() => {
    setUserCurrentComment(userComment);
  }, [userComment]);

  const handleStateEditing = (editedComment: Comment) => {
    setUserComment({ ...editedComment });
  };
  const handleStateDeleting = () => {
    setUserComment(null);
    setTotal((prev) => prev - 1);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="text-gray-500 text-sm font-semibold">
        Tous les commentaires {`(${total})`}:
      </div>
      <Box>
        <Flex className="gap-3" direction="column">
          {userCurrentComment && (
            <Mycomment
              {...userCurrentComment}
              onDeleted={handleStateDeleting}
              onEdited={handleStateEditing}
              name="(Vous)"
              pathname={pathname}
            />
          )}
          {data.map((comment) => {
            let fullName = comment.user
              ? comment.user.firstName + " " + comment.user.lastName
              : "";
            return (
              <SingleComment key={comment.id} name={fullName} {...comment} />
            );
          })}
        </Flex>
      </Box>
      {showLoadMore && <LoadMoreComments onClick={onLoadMore} />}
    </div>
  );
}
