import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PopoverContentProps } from "@reactour/tour";

const TourNavigation: React.FC<PopoverContentProps> = (props) => {
  return (
    <>
      <nav
        className="mt-6 flex items-center justify-center gap-4"
        aria-label="Progress"
      >
        <button
          onClick={() => {
            if (props.currentStep > 0) {
              props.setCurrentStep(props.currentStep - 1);
            }
          }}
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-400" />
        </button>

        <ol role="list" className="flex items-center space-x-5">
          {props.steps.map((step, index) => (
            <li key={`tutorial-step-${index}`}>
              {props.currentStep > index ? (
                <button
                  onClick={() => props.setCurrentStep(index)}
                  className="block h-2.5 w-2.5 rounded-full bg-blue-600 hover:bg-blue-900"
                >
                  <span className="sr-only">{step.selector as string}</span>
                </button>
              ) : props.currentStep === index ? (
                <button
                  onClick={() => props.setCurrentStep(index)}
                  className="relative flex items-center justify-center"
                  aria-current="step"
                >
                  <span
                    className="absolute flex h-5 w-5 p-px"
                    aria-hidden="true"
                  >
                    <span className="h-full w-full rounded-full bg-blue-200" />
                  </span>
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full bg-blue-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.selector as string}</span>
                </button>
              ) : (
                <button
                  onClick={() => props.setCurrentStep(index)}
                  className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
                >
                  <span className="sr-only">{step.selector as string}</span>
                </button>
              )}
            </li>
          ))}
        </ol>
        <button
          onClick={() => {
            if (props.currentStep < props.steps.length - 1) {
              props.setCurrentStep(props.currentStep + 1);
            } else {
                props.setIsOpen(false)
                // @ts-ignore
                props.onClickClose(props)
            }
          }}
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        </button>
      </nav>
      <p className="text-sm font-medium mt-2 text-center">
        Step {props.currentStep + 1} of {props.steps.length}
      </p>
    </>
  );
};

export default TourNavigation;
