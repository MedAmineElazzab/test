import * as yup from "yup";
const schema = yup.object({
  rate: yup.number().min(1).max(5).required("firstName is required"),
  name: yup.string().required("name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  text: yup.string()
});

export const CommentReviewFormResolver = schema;
