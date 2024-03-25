import { AuthForm } from "@/components/forms";
import { Logo, MailIcon } from "@/components/icons";
import { ErrorNotification } from "@/hooks";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function LoginIndex() {
  const { push } = useRouter();
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="header-section p-8 w-full">
        <Link className="relative flex w-fit" href="/v2/auth">
          <Logo />
        </Link>
      </div>
      <div className="form-section w-full flex flex-col text-xs px-8 py-24 items-center">
        <AuthForm
          onSubmit={async (email, password, remember, setIsLoading) => {
            const response = await signIn("credentials", {
              email,
              password,
              redirect: false,
              remember,
            });
            if (response?.ok) {
              setIsLoading(false);
              push("/v2/auth/check");
            } else {
              ErrorNotification({
                message: response?.error,
              });

              setIsLoading(false);
            }
          }}
        />
      </div>

      <div className="footer-section p-8 flex text-gray-500 items-center justify-between">
        <span className="text-sm">© Meducate {new Date().getFullYear()} </span>
        <Link
          href="mailto:help@meducate.com"
          className="flex items-center gap-2 hover:underline"
        >
          <MailIcon className="h-4 w-4 text-current" />
          <span className="text-sm">help@meducate.com</span>
        </Link>
      </div>
    </div>
  );
}
