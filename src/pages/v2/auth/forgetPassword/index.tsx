import { api } from "@/api";
import { ForgetPasswordForm } from "@/components";

const ForgetPassword = () => {
  return (
    <ForgetPasswordForm
      onSubmit={async (data, setisLoading, setType, setStatus) => {
        try {
          setisLoading(true);
          await api.post("/auth/forgot-password", {
            ...data,
          });
          setType("success");
          setStatus("shown");
          setisLoading(false);
        } catch (error) {
          setisLoading(false);
          setType("danger");
          setStatus("shown");
        }
      }}
    />
  );
};

export default ForgetPassword;
