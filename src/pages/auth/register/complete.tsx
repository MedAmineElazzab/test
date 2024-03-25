//@ts-nocheck
import { UserPatched } from "@/@types";
import api from "@/_v1/api/api";
import AccountVerificationForm from "@/_v1/components/forms/AccountVerificationForm";
import ProfessionalInformationForm from "@/_v1/components/forms/ProfessionalInformationForm";
import SectionForm from "@/_v1/components/forms/SectionForm";
import Stepper from "@/_v1/components/stepper";
import { Me, UpdateUser } from "@/_v1/services/user";
import { User } from "@/api/user";
import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Complete() {
  const { push } = useRouter();
  const [user, setUser] = useState<User>();
  const [firstTime, setFirstTime] = useState(false);
  const length = 3;
  const [active, setActive] = useState(Number(user?.currentStep) + 1 || 1);
  const nextStep = () =>
    setActive((current) => (current < length ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 1 ? current - 1 : current));
  async function fetchData() {
    try {
      const { data } = await Me();
      if (data) {
        setUser(data);
      }
      if (!firstTime) {
        setFirstTime(true);
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setActive(Number(user?.currentStep) + 1);
    }
  }, [firstTime]);
  return (
    <div className="h-full flex justify-center py-[30px] tall:items-start w-phone:items-start w-phone:overflow-auto tall:overflow-auto overflow-y-auto items-start">
      <div
        onClick={() => {
          deleteCookie("token");
          signOut();
        }}
        className="sign-out absolute right-[35px] text-red-500 font-bold w-phone:top-[50px] px-2 py-1 rounded-md text-xs bg-red-200 hover:underline cursor-pointer"
      >
        Sign out
      </div>
      <div className="flex justify-center  w-[700px]  items-center flex-col w1300:px-[15px] tall:px-[20px] tall:w-[80%] w1100:bg-white w1100:rounded-[4px] w1100:py-[30px]  w1100:w-[60%] w-phone:w-[calc(100%-30px)] ">
        <Stepper previous={prevStep} className="w-full mt-5" active={active}>
          <Stepper.Step
            title="Professional information"
            paragraph="Empower your experience, sign up for a free account today"
          >
            <div className="w-full mt-7">
              <ProfessionalInformationForm
                onSubmit={async (data, setIsloading) => {
                  setIsloading(true);
                  try {
                    const res = await UpdateUser(
                      user?.id as number,
                      {
                        professionId: data.profession as number,
                        cityId: data?.city as number,
                        educationLevelId: data?.educationLevel as number,
                        environmentId: data?.environment as number,
                        institutionId: data?.institution as number,
                        yearOfExercise: data?.yearOfExercise,
                      },
                      1
                    );
                    nextStep();
                    setIsloading(false);
                    setUser(res);
                  } catch (error) {
                    console.log(error);
                  }
                  //send data
                }}
                user={user ? user : undefined}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step
            title="The sections that interest you"
            paragraph="Check the ones that excite you the most"
          >
            <SectionForm
              previous={prevStep}
              onSubmit={async (sections, setIsloading) => {
                setIsloading(true);
                try {
                  const res = await UpdateUser(
                    user?.id as number,
                    {
                      sectionIds: sections,
                    },
                    2
                  );
                  nextStep();
                  setUser(res);
                  setIsloading(false);
                } catch (error) {
                  console.log(error);
                }
              }}
              user={user as UserPatched}
            />
          </Stepper.Step>
          <Stepper.Step
            title="Account verification"
            paragraph="Meducate is intended exclusively for healthcare professionals. To access the full functionality and content of the platform, please verify your identity"
          >
            <AccountVerificationForm
              onSubmit={async (data, setIsloading) => {
                setIsloading(false);
                let formData = new FormData();
                formData.append("DOCUMENTS", data.Attachement as File);
                formData.append("currentStep", "3");
                if (
                  data.registrationNumber !== "null" &&
                  data.registrationNumber !== ""
                ) {
                  formData.append(
                    "registrationNumber",
                    data.registrationNumber
                  );
                }
                try {
                  const { data: updatedUser } = await api.patch<UserPatched>(
                    `/users/${user?.id}`,
                    formData
                  );
                  setUser(updatedUser);
                  typeof window != "undefined"
                    ? (window.location.href = "/")
                    : push("/");
                } catch (error) {
                  throw error;
                }
              }}
              previous={prevStep}
              user={user as UserPatched}
            />
          </Stepper.Step>
        </Stepper>
      </div>
    </div>
  );
}
