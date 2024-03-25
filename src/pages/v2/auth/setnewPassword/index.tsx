import { api } from "@/api";
import { NewPasswordForm } from "@/components";
import { GetServerSideProps } from "next";

export default function SentNewPassword({ token }: { token: string }) {
  return (
    <NewPasswordForm
      onSubmit={async (data, setIsLoading, setIsSuccess) => {
        setIsLoading(false);
        try {
          await api.post("/auth/reset-password", {
            ...data,
            token,
          });
          setIsSuccess(true);
        } catch (error) {
          setIsSuccess(false);
          console.log(error);
        }
      }}
      token={token || null}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  if (query?.token) {
    return {
      props: {
        token: query?.token,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/v2/auth/forgetPassword",
      },
    };
  }
};
