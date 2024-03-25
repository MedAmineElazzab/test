import api from "./api";

export interface Comment {
  id: number;
  text: string;
  isEdited: boolean;
  userId: number;
  newText: string | null;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  user: {
    id: number;
    email: string;
    lastName: string;
    firstName: string;
    imagePath: string;
  };
}
export interface currentUserComment {}

export const AddComment = async (text: string, pathname: string) => {
  const { data } = await api.post<Comment>(pathname, { text });
  return data;
};

export const EditComment = async (text: string, pathname: string) => {
  const { data } = await api.post<Comment>(pathname, { text });
  return data;
};

export const DeleteComment = async (id: number) => {
  const { data } = await api.delete<Comment>("/review/" + id);
  return data;
};
