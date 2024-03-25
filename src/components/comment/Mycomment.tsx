import { Comment, DeleteComment, EditComment, User } from "@/api";
import {
  CommentActions,
  EditCommentFormType,
  SingleComment,
  SingleCommentEdit,
  SingleCommentProps,
} from "@/components";
import { ErrorNotification } from "@/hooks";
import { Wording } from "@/lib";
import { useState } from "react";
import { useSelector } from "react-redux";
interface SingleCommentEditProps extends SingleCommentProps {
  onEdited: (data: Comment) => void;
  onDeleted: () => void;
  pathname: string | null;
}
export function Mycomment(props: SingleCommentEditProps) {
  const { user } = useSelector((state: { user: { user: User } }) => state.user);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditAction = () => {
    setIsEditing(!isEditing);
  };
  
  const handleDeleteAction = async () => {
    try {
      await DeleteComment(props.id);
      props.onDeleted();
    } catch (error) {
      ErrorNotification({
        message: Wording.error,
      });
    }
  };
  const handleSubmit = async (data: EditCommentFormType) => {
    if (props.pathname) {
      try {
        const editedComment = await EditComment(data.text, props.pathname);
        setIsEditing(false);
        props.onEdited(editedComment);
      } catch (error) {
        ErrorNotification({
          message: Wording.error,
        });
      }
    }
  };
  if (isEditing) {
    return (
      <div className="group">
        <SingleCommentEdit
          onCancel={handleEditAction}
          onSubmit={handleSubmit}
          {...props}
          user={user}
        />
      </div>
    );
  }
  return (
    <div className="relative group">
      <CommentActions
        isVerified={props.isVerified}
        OnDelete={handleDeleteAction}
        OnEdit={handleEditAction}
      />
      <SingleComment {...props} user={user} />
    </div>
  );
}
