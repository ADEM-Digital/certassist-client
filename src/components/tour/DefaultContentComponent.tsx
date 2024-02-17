import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { PopoverContentProps } from "@reactour/tour";
import { ComponentType } from "react";
import TourNavigation from "./components/TourNavigation";
const steps = [
  { name: "Step 1", href: "#", status: "complete" },
  { name: "Step 2", href: "#", status: "current" },
  { name: "Step 3", href: "#", status: "upcoming" },
  { name: "Step 4", href: "#", status: "upcoming" },
];

const DefaultContentComponent:
  | React.ComponentType<PopoverContentProps>
  | undefined = (props) => {
  const isLastStep = props.currentStep === props.steps.length - 1;
  const content = props.steps[props.currentStep].content;
  return (
    <div className=" transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all  sm:p-6">
      <div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <QuestionMarkCircleIcon
              className="h-6 w-6 text-green-600"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Tutorial
          </h3>
        </div>

        <div className="mt-3 text-center sm:mt-5">
          <div className="mt-2">
            <p className="text-md text-gray-500">{typeof content === 'function'
        ? content({ ...props})
        : content}</p>
          </div>
        </div>
      </div>

      <TourNavigation {...props}/>
    </div>

    // <div>

    //   {content as string}
    //   <button
    //     onClick={() => {
    //       if (isLastStep) {
    //         props.setIsOpen(false);
    //       } else {
    //         props.setCurrentStep((s) => s + 1);
    //       }
    //     }}
    //   >
    //     {isLastStep ? "x" : ">"}
    //   </button>
    //   {props.nextButton}
    // </div>
  );
};

export default DefaultContentComponent;
