import { Steps, UserTypes } from "@/@types";
import { User } from "@/api/user";
import { SignupStep, SignupStepNumbered } from "@/enum";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CompleteContextType {
  user?: User;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  professionId: number | undefined;
  setProfessionId: React.Dispatch<React.SetStateAction<number | undefined>>;
  userType: UserTypes | undefined;
  setUserType: React.Dispatch<React.SetStateAction<UserTypes | undefined>>;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const CompleteContext = createContext<CompleteContextType | undefined>(
  undefined
);

export const useCompleteContext = () => {
  const context = useContext(CompleteContext);
  if (!context) {
    throw new Error(
      "useCompleteContext must be used within a CompleteProvider"
    );
  }
  return context;
};

interface CompleteProviderProps {
  children: ReactNode;
  user: User;
}
export const CompleteProvider: React.FC<CompleteProviderProps> = ({
  children,
  user,
}) => {
  const { push } = useRouter();
  const [activeStep, setActiveStep] = useState<number>(
    SignupStepNumbered[user?.signupStep as Steps]
  );
  const [professionId, setProfessionId] = useState<number | undefined>(
    undefined
  );
  const [userType, setUserType] = useState<UserTypes | undefined>(
    user?.profession?.type
  );
  const stepsLength = 4;
  const nextStep = () =>
    setActiveStep((currentStep) => Math.min(currentStep + 1, stepsLength));
  const prevStep = () =>
    setActiveStep((currentStep) => Math.max(currentStep - 1, 1));
  useEffect(() => {
    if (user?.signupStep === SignupStep.DONE) {
      push("/v2/auth/welcome");
    }
  }, [activeStep, user?.signupStep]);
  return (
    <CompleteContext.Provider
      value={{
        user,
        activeStep,
        setActiveStep,
        professionId,
        setProfessionId,
        setUserType,
        userType,
        stepsLength,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </CompleteContext.Provider>
  );
};
