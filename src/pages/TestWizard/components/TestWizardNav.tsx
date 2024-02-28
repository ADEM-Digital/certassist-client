import React from "react";
import { classNames } from "../../../utils/utils";

export type StepsType = {
  stepNumber: number;
  stepText: string;
  status: "active" | "inactive";
}[];
type TestWizardNavProps = {
  steps: StepsType | undefined;
  setWizardSteps: React.Dispatch<React.SetStateAction<StepsType | undefined>>;
};

const TestWizardNav = ({ steps, setWizardSteps }: TestWizardNavProps) => {
  const handleStepsUpdate = (stepNumber: number) => {
    if (steps !== undefined) {
      let newSteps = [...steps];

      let currentStepIndex = newSteps.findIndex(
        (step) => step.status === "active"
      );
      newSteps[currentStepIndex].status = "inactive";
      let newStepIndex = newSteps.findIndex(
        (step) => step.stepNumber === stepNumber
      );
      newSteps[newStepIndex].status = "active";

      setWizardSteps(newSteps);
    }
  };
  return (
    <div className="flex gap-2.5">
      {steps &&
        steps.map((step, index, array) => (
          <div
            key={`test-wizard-nav-step-${step.stepText}`}
            className="flex items-center justify-center gap-2.5"
          >
            <button
              onClick={() => handleStepsUpdate(step.stepNumber)}
              className={classNames(step.status === "active" ? "bg-button-100 text-white" : "bg-[#D9D9D9]", "flex gap-2.5 items-center  px-2.5 py-1.5 rounded ")}
            >
              <span
                className={classNames(
                  step.status === "active"
                    ? "bg-white text-button-100"
                    : "bg-black/10 text-gray-900",
                  "flex justify-center items-center rounded-full w-[41px] h-[41px]  p-0 "
                )}
              >
                {step.stepNumber }
              </span>
              <span className="hidden md:block font-tables text-lg font-extrabold">
                {step.stepText}
              </span>
            </button>

            {index + 1 < array.length && (
              <div className="py-0.5 w-[9vw] bg-[#D9D9D9]"></div>
            )}
          </div>
        ))}
    </div>
  );
};

export default TestWizardNav;
