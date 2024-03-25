import { clsx } from "@mantine/core";
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

export function Stepper({
  children,
  active,
  className,
  ...divprops
}: StepperProps) {
  const steps = React.Children.toArray(children);
  const activeStepElement = steps[active - 1] as React.ReactElement<StepProps>;
  const classNames = clsx("stepper flex flex-col gap-8", className);
  return (
    <div className={classNames} {...divprops}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-medium text-gray-900">
          {activeStepElement?.props?.title}
        </h1>
        {activeStepElement?.props?.paragraph && (
          <p className=" text-gray-500 text-base leading-6 font-normal ">
            {activeStepElement?.props?.paragraph}
          </p>
        )}
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
