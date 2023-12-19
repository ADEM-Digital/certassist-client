import { Context, useContext } from "react";
import LockIcon from "../../../components/icons/LockIcon";
import StopIcon from "../../../components/icons/StopIcon";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import { classNames } from "../../../utils/utils";
import TestBottomNavbarBlockTime from "./TestBottomNavbarBlockTime";
import TestButton from "./TestButton";
import EndTestModal from "../../../components/modals/EndTestModal";

const TestBottomNavbar = () => {
  const { selectedColor, testQuery, setEndTestModalOpen, endTestModalOpen } = useContext(
    TestInstanceContext as Context<TestInstanceContextType>
  );

  return (
    <div
      className={classNames(
        selectedColor === "main" ? "bg-testnav-100" : "bg-testnav-300",
        "absolute bottom-0 left-0 w-[94vw] bg-testnav-100 h-[6vh] ml-[6vw] flex items-center justify-between text-white px-2.5 pt-[5px] pb-[3px] z-0"
      )}
    >
      {/* Block time */}
      {testQuery.data?.testStatus !== "completed" && (
        <TestBottomNavbarBlockTime />
      )}

      {/* Lock */}
      {testQuery.data?.testStatus !== "completed" && (
        <TestButton icon={<LockIcon />} buttonText="Lock" />
      )}

      {/* Stop */}
      <TestButton
        onClick={() => {setEndTestModalOpen(true)}}
        icon={<StopIcon />}
        buttonText="End Block"
      />

      <EndTestModal open={endTestModalOpen} setOpen={setEndTestModalOpen} title="Are you sere you want to end the test?" text="You won't be able to modify the test after clicking 'End Block'."/>
    </div>
  );
};

export default TestBottomNavbar;
