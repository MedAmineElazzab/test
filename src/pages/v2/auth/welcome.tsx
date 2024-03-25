import { Button, RightArrow } from "@/components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Welcome() {
  const { push } = useRouter();
  const { user } = useSelector((state: any) => state.user);
  return (
    <div className="w-[510px] flex flex-col  items-center gap-16">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-[#101828] font-[500] text-[2rem] text-center ">
          Bravo ! Vous êtes désormais membre de Meducate.
        </h1>
        <p className="text-[#667085] text-base text-center font-[400] leading-6">
          Vous disposez désormais de l&apos;une des meilleures plateformes pour vous
          aider à fructifier votre savoir.
        </p>
      </div>
      <Button
        onClick={() => (window.location.href = "/v2")}
        type="submit"
        variant="filled"
        size="md"
        rightIcon={<RightArrow />}
        color="primary"
      >
        Commençons maintenant
      </Button>
    </div>
  );
}
