import { UserPatched } from "@/@types";
import Button from "@/_v1/components/Buttons/Button";
import { Badge, Certificat, ExpertS, XPpoint } from "@/_v1/icons";
import Award from "./components/profile/Award";
import Realisation from "./components/profile/Realisation";

export default function Profile({ user }: { user: UserPatched }) {
  return (
    <div className="relative py-7 px-5 bg-white w-full h-full border rounded-md border-[#E2E8F0]">
      <div className="flex gap-[15px] items-center">
        <img
          src={"/assets/images/emptyuser.png"}
          alt=""
          className="w-[100px] border-4 h-[100px] rounded-full object-cover "
        />
        <div className="flex flex-col gap-[7px] ">
          <h1 className="text-[18px] font-[600] text-[#1E293B]">
            Bienvenue {user?.firstName + " " + user?.lastName}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Award />
              <Award />
              <Award />
            </div>
          </div>
          <div className="sattus w-fit  bg-yellow-200 text-yellow-600 font-[600] text-[13px] px-3 py-[4px] rounded-[40px] ">
            50% Completed
          </div>
        </div>
      </div>
      <div className="realisation mt-5 px-3">
        <h2 className="text-[18px] mt-[30px] font-[600] text-[#000]">
          Réalisations
        </h2>
        <div className="flex flex-col mt-5 gap-7 ">
          <Realisation
            icon={<Certificat />}
            description={
              <>
                <b className="font-[500] text-[17px]">16</b>
                <span>Certificats</span>
              </>
            }
          />
          <Realisation
            icon={<ExpertS />}
            description={
              <>
                <b className="font-[500] text-[17px]">24</b>
                <span>Experts suivis</span>
              </>
            }
          />
          <Realisation
            icon={<XPpoint />}
            description={
              <>
                <b className="font-[500] text-[17px]">81</b>
                <span>Points d&apos;XP</span>
              </>
            }
          />
          <Realisation
            icon={<Badge />}
            description={
              <>
                <b className="font-[500] text-[17px]">12</b>
                <span>Badges obtenus</span>
              </>
            }
          />
        </div>
      </div>
      <Button className="mt-6 bg-primary-normal text-white w-[100%]  hover:bg-primary-normal/70">
        Complétez votre profil
      </Button>
      {/* <Button
        disabled
        className="mt-6  bg-primary-normal text-white w-[100%]  hover:bg-primary-normal/70"
      >
        <div className="flex items-center gap-2 justify-center">
          <span>Profile complited</span>
          <IconCheck className="w-[15px]" />
        </div>
      </Button> */}
    </div>
  );
}
