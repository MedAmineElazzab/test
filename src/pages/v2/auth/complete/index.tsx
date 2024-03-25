import { User } from "@/api/user";
import {
  AccountVerficationForm,
  AccountVerficationFormtype,
  InterestsSectionsForm,
  InterestsSectionsFormForm,
  PersonalInformationsForm,
  PersonalInformationsFormData,
  ProfessionForm,
  Progress,
  Stepper,
} from "@/components";
import { useCompleteContext } from "@/contexts/CompleteContext";
import { SignupStepNumbered } from "@/enum";
import {
  handleAccountVerifSave,
  handleInterestsSave,
  handlePersonalInformationsSave,
  handleProfessionStepSave,
} from "@/services";
import store from "@/store";
import { updateUser } from "@/store/user";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function CompletePage() {
  const {
    activeStep,
    professionId,
    setProfessionId,
    stepsLength,
    userType,
    nextStep,
    prevStep,
    setUserType,
    setActiveStep,
    user,
  } = useCompleteContext();
  const [orgs, setOrgs] = useState<string[]>([]);
  const [customOrgs, setcustomOrgs] = useState<string[]>([]);
  const { push } = useRouter();
  useEffect(() => {
    if (user) {
      const { signupStep, profession } = user;
      setActiveStep(SignupStepNumbered[signupStep]);
      setProfessionId(user.professionId);
      setUserType(profession?.type);
      let orgs = user?.Organizations?.map((org) => org.id.toString()) || [];
      let customOrgs = user?.UserCustomeOrganization
        ? JSON.parse(user?.UserCustomeOrganization?.name)
        : [];
      setOrgs(orgs.concat(customOrgs));
      setcustomOrgs(customOrgs);
    }
  }, [user]);

  const handleProfessionFormSubmit = async (
    data: ProfessionForm,
    setLoadingStatus: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoadingStatus(true);
    try {
      const updatedUser = await handleProfessionStepSave({
        professionId: data.professionId,
        step: "INFORMATION",
      });
      setProfessionId(updatedUser?.profession?.id);
      setUserType(updatedUser?.profession.type);
      store.dispatch(updateUser(updatedUser as User & void));
      setLoadingStatus(false);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const handlePersonalInfoSubmit = async (
    data: PersonalInformationsFormData,
    setLoadingStatus: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoadingStatus(true);
    if (!userType) return;
    try {
      const updatedUser = await handlePersonalInformationsSave({
        data,
        userType,
      });
      store.dispatch(updateUser(updatedUser as User & void));
      setLoadingStatus(false);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const handleInterestsSubmit = async (
    data: InterestsSectionsFormForm,
    setLoadingStatus: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoadingStatus(true);
    try {
      const { data: updatedUser } = await handleInterestsSave(data);
      store.dispatch(updateUser(updatedUser as User & void));
      setLoadingStatus(false);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const handleAccountVerificationSubmit = async (
    data: AccountVerficationFormtype,
    setLoadingStatus: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoadingStatus(true);
    try {
      const newUser = await handleAccountVerifSave(data);
      console.log(user?.signupStep)
      store.dispatch(updateUser(newUser as User & void));

      console.log(newUser.signupStep)
      console.log(data)
      setLoadingStatus(false);
      // console.log(user)
      // push("/v2/auth/welcome");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <>
      <Progress
        className="fixed w-full z-20 top-[92px] bg-transparent"
        color="primary"
        h={4}
        radius={0}
        value={(activeStep / stepsLength) * 100}
      />
      <Stepper className="w-[510px]" active={activeStep}>
        <Stepper.Step
          title="Choisissez votre statut."
          paragraph="Meducate est destiné exclusivement aux professionnels de santé. 
          Pour accéder à toutes les fonctionnalités et au contenu de la plateforme,
           veuillez compléter votre inscription."
        >
          <ProfessionForm
            defaultValues={{ professionId }}
            onSubmit={handleProfessionFormSubmit}
          />
        </Stepper.Step>
        <Stepper.Step title="Informations professionnelles.">
          {professionId && (
            <PersonalInformationsForm
              defaultValues={{
                specialityId: user?.specialityId,
                educationLevelId: user?.educationLevelId,
                environmentId: user?.environmentId,
                yearOfExercise: user?.yearOfExercise,
                cityId: user?.cityId,
                countryId: user?.city?.countryId,
                institutions: orgs,
              }}
              customOrgs={customOrgs}
              userType={userType}
              professionId={professionId}
              previous={prevStep}
              onSubmit={handlePersonalInfoSubmit}
            />
          )}
        </Stepper.Step>
        <Stepper.Step title="Les rubriques qui vous intéressent.">
          <InterestsSectionsForm
            defaultValues={{
              categorieIds: user?.userIntrestsId?.UserCategoryIntrests?.map(
                (ctg) => String(ctg.categoryId)
              ),
              diseaseIds: user?.userIntrestsId?.UserDiseaseIntrests?.map(
                (dis) => String(dis.diseaseId)
              ),
              specialityIds: user?.userIntrestsId?.UserSpecialityIntrests?.map(
                (spec) => String(spec.specialityId)
              ),
            }}
            previous={prevStep}
            onSubmit={handleInterestsSubmit}
          />
        </Stepper.Step>
        <Stepper.Step
          title="Validation du compte."
          paragraph="Meducate est destiné exclusivement aux professionnels de santé.
           Pour accéder à toutes les fonctionnalités et au contenu de la plateforme, 
           veuillez compléter votre inscription."
        >
          <AccountVerficationForm
            previous={prevStep}
            onSubmit={handleAccountVerificationSubmit}
          />
        </Stepper.Step>
        <Stepper.Step>
          <div className="w-full flex justify-center items-center h-[500px]">
            <Loader color="#0049e0" />
          </div>
        </Stepper.Step>
      </Stepper>
    </>
  );
}
