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
import LanguageIcon from "../../../components/icons/LanguageIcon";

const TestBottomNavbar = () => {
  const {
    selectedColor,
    testQuery,
    setIsSupportSidebarOpen,
    setIsLanguageSidebarOpen,
    setEndTestModalOpen,
    endTestModalOpen,
    selectedAnswer,
    updateAnswerMutation,
  } = useContext(TestInstanceContext as Context<TestInstanceContextType>);

  return (
    <div
      className={classNames(
        selectedColor === "main" ? "bg-testnav-100" : "bg-testnav-300",
        "fixed bottom-0 left-0 w-full md:w-[94vw] bg-testnav-100 min-h-[35px] h-[6vh] ml-0 md:ml-[6vw] flex items-center justify-between text-white px-2.5 pt-[5px] pb-[3px] z-0"
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
        <TestButton icon={<LockIcon />} buttonText="Lock" classes="opacity-0" />
      )}

      {/* Right section */}
      <div className="flex">
        {/* Language */}
        <TestButton
          onClick={() => setIsLanguageSidebarOpen(true)}
          icon={<LanguageIcon width={28} height={28} />}
          buttonText="Language"
        />
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
        title={
          testQuery.data?.testStatus !== "completed"
            ? "Are you sure you want to end the test?"
            : "Are you sure you want to end the review?"
        }
        text={
          testQuery.data?.testStatus !== "completed"
            ? "You won't be able to modify the test after clicking 'End Block'."
            : "The test review interface will close and redirect you to the test results summary."
        }
      />
    </div>
  );
};

export default TestBottomNavbar;
