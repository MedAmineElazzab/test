import { Progress } from "@mantine/core";
import React, { HTMLProps, ReactNode } from "react";

interface StepperProps extends HTMLProps<HTMLDivElement> {
  active: number;
  children: ReactNode;
  previous?: any;
}

interface StepProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  paragraph?: string;
  previous?: any;
}

export default function Stepper({
  children,
  active,
  ...divprops
}: StepperProps) {
  const steps = React.Children.toArray(children);
  const stepsLength = steps.length;
  const activeStep = active;
  const activeStepElement = steps[active - 1] as React.ReactElement<StepProps>;

  return (
    <div
      className="stepper flex flex-col justify-start  items-start"
      {...divprops}
    >
      <h1 className="title text-[30px] mb-[10px] text-inherit  w1300:text-[28px] w1100:text-[24px] font-[600] ">
        {activeStepElement?.props?.title}
      </h1>
      <p className="w1300:text-[15px] text-[15px] text-[#414143] w1100:text-[14px] ">
        {activeStepElement?.props?.paragraph}
      </p>
      <div className="progress-bar-section mt-7 flex-col flex items-end">
        {/* <div className="counter text-[#83898C] text-[14px]">
          <span className="text-primary-normal font-[600]">Step {active} </span>{" "}
          of {stepsLength}
        </div> */}
        <Progress
          className="w-full mt-2"
          label={`Step ${active} of ${stepsLength}`}
          styles={{
            root: {
              // backgroundColor: "#e6edfc",
              backgroundColor: "transparent",

              borderRadius: "30px",
              height: "12px",
            },
            bar: {
              backgroundColor: "#0049E0",
            },
            label  : {
              position :"absolute",
              top : "-19%",
              color :"#83898C"
            }
          }}
          value={(activeStep / stepsLength) * 100}
        />
      </div>
      {activeStepElement}
    </div>
  );
}

Stepper.Step = ({ paragraph, title, children, ...divprops }: StepProps) => {
  return (
    <div className={`step ${divprops?.className || ""}`}>
      <div className="step-form-container">{children}</div>
    </div>
  );
};
//@ts-ignore
Stepper.Step.displayName = "Step"; // Set the display name for Step
