import TestWizardNav from "./components/TestWizardNav";
import TestSettings from "./components/TestSettings";
import { Form, Formik } from "formik";
import { useTestWizard } from "./hooks";
import TestQuestionSettings from "./components/TestQuestionSettings";
import TestModeSetttings from "./components/TestModeSetttings";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import MainButton from "../../components/buttons/MainButton";
import { useNavigate } from "react-router-dom";

const TestWizard = () => {
  const { wizardSteps, setWizardSteps, initialValues, submitTests } = useTestWizard();
  const navigate = useNavigate();

  const handleStepChange = (action: "prev" | "next") => {
    let currentStep = wizardSteps.findIndex((step) => step.status === "active");
    // Stop logic if current idex is 0 and action is prev
    if (currentStep === 0 && action === "prev") return;
    if (currentStep === wizardSteps.length - 1 && action === "next") return;

    let newWizardSteps = [...wizardSteps];
    newWizardSteps[currentStep].status = "inactive";
    newWizardSteps[
      action === "prev" ? currentStep - 1 : currentStep + 1
    ].status = "active";
    setWizardSteps(newWizardSteps);
  };

  return (
    <div className="bg-mainbg-100 w-full h-full overflow-y-auto px-10 pt-20 pb-5">
      <div className="flex flex-col items-center gap-10">
        <TestWizardNav steps={wizardSteps} setWizardSteps={setWizardSteps} />
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitTests(values, navigate)}
        >
          <Form className="flex flex-col items-center gap-10">
            {wizardSteps.find((step) => step.status === "active")
              ?.stepNumber === 1 && <TestSettings />}
            {wizardSteps.find((step) => step.status === "active")
              ?.stepNumber === 2 && <TestQuestionSettings />}
            {wizardSteps.find((step) => step.status === "active")
              ?.stepNumber === 3 && <TestModeSetttings />}

            <div className="flex gap-2.5">
              <SecondaryButton
                icon={<ChevronLeftIcon className="w-4 h-4 text-button-100" />}
          
                iconDirection="left"
                buttonText="PREVIOUS STEP"
                onClick={() => handleStepChange("prev")}
              />
              {wizardSteps.findIndex((step) => step.status === "active") !=
                wizardSteps.length - 1 && (
                <MainButton
                  icon={<ChevronRightIcon className="w-4 h-4 text-white" />}
                  iconDirection="right"
                  buttonText="NEXT STEP"
                  onClick={() => handleStepChange("next")}
                />
              )}
              {wizardSteps.findIndex((step) => step.status === "active") ===
                wizardSteps.length - 1 && (
                <MainButton
                  type="submit"
                  buttonText="CREATE TEST"
                 
                />
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default TestWizard;
