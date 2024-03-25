import { updateUser } from "@/_v1/store/user";
import { User } from "@/api/user";
import { ArrowRight, Button } from "@/components";
import { handleInitSave } from "@/services";
import store from "@/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function StartPage() {
  const { user } = useSelector((state: any) => state.user);
  const { push } = useRouter();
  console.log(user);
  return (
    <div className="w-[510px] flex flex-col  items-center gap-16">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-[#101828] font-[500] text-[2rem] text-center ">
          Bienvenue chez Meducate, <br /> {user?.firstName} !
        </h1>
        <p className="text-[#667085] text-base text-center font-[400] leading-6">
          Vous disposez désormais de l&apos;une des meilleures plateformes pour
          vous aider à faire fructifier votre savoir.
        </p>
      </div>
      <Button
        variant="filled"
        w={300}
        size="md"
        rightIcon={<ArrowRight />}
        color="primary"
        onClick={async () => {
          try {
            const { data } = await handleInitSave();
            store.dispatch(updateUser(data as User & void));
            push("/v2/auth/complete");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Commençons
      </Button>
    </div>
  );
}
