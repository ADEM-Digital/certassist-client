import { Context, useContext } from "react";
import LockIcon from "../../../components/icons/LockIcon";
import StopIcon from "../../../components/icons/StopIcon";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import { classNames } from "../../../utils/utils";
import TestBottomNavbarBlockTime from "./TestBottomNavbarBlockTime";
import TestButton from "./TestButton";
import EndTestModal from "../../../components/modals/EndTestModal";
import TestBottomNavbarQuestionId from "./TestBottomNavbarQuestionId";
import ColoredSupportIcon from "../../../components/icons/ColoredSupportIcon";

const TestBottomNavbar = () => {
  const {
    selectedColor,
    testQuery,
    setIsSupportSidebarOpen,
    setEndTestModalOpen,
    endTestModalOpen,
    selectedAnswer,
    updateAnswerMutation,
  } = useContext(TestInstanceContext as Context<TestInstanceContextType>);

  return (
    <div
      className={classNames(
        selectedColor === "main" ? "bg-testnav-100" : "bg-testnav-300",
        "absolute bottom-0 left-0 w-full md:w-[94vw] bg-testnav-100 min-h-[35px] h-[6vh] ml-0 md:ml-[6vw] flex items-center justify-between text-white px-2.5 pt-[5px] pb-[3px] z-0"
      )}
    >
      <div className="flex gap-2">
        {testQuery.data?.testStatus !== "completed" && (
          <TestBottomNavbarBlockTime />
        )}
        <TestBottomNavbarQuestionId />
      </div>
      {/* Block time */}

      {/* Lock */}
      {testQuery.data?.testStatus !== "completed" && (
        <TestButton icon={<LockIcon />} buttonText="Lock" classes="opacity-0"/>
      )}

      {/* Right section */}
      <div className="flex">
        {/* Support */}
        {testQuery.data?.testStatus === "completed" && (
          <TestButton
            onClick={() => {
              console.log("clicked");
              setIsSupportSidebarOpen(true);
            }}
            icon={<ColoredSupportIcon width={28} height={28} />}
            buttonText="Support"
          />
        )}

        {/* Stop */}
        <TestButton
          onClick={() => {
            if (selectedAnswer) {
              updateAnswerMutation.mutate(selectedAnswer);
            }

            setEndTestModalOpen(true);
          }}
          icon={<StopIcon />}
          buttonText="End Block"
        />
      </div>

      <EndTestModal
        open={endTestModalOpen}
        setOpen={setEndTestModalOpen}
        title="Are you sere you want to end the test?"
        text="You won't be able to modify the test after clicking 'End Block'."
      />
    </div>
  );
};

export default TestBottomNavbar;
