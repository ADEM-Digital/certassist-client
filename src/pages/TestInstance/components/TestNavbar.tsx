import { Context, useContext } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import MarkFlagIcon from "../../../components/icons/MarkFlagIcon";
// import LabsIcon from "../../../components/icons/LabsIcon";
// import NoteIcon from "../../../components/icons/NoteIcon";
// import CalcIcon from "../../../components/icons/CalcIcon";
import InvertIcon from "../../../components/icons/InvertIcon";
import { classNames } from "../../../utils/utils";
import TestButton from "./TestButton";
import TestZoom from "./TestZoom";

const TestNavbar = () => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    testQuery,
    selectedAnswer,
    setSelectedAnswer,
    updateAnswerMutation,
    updateMarkedStatus,
    // setTestLabValuesOpen,
    // testLabValuesOpen,
    setSelectedColor,
    selectedColor
  } = useContext(TestInstanceContext as Context<TestInstanceContextType>);
  return (
    <div className={classNames(selectedColor === "main" ? "bg-testnav-100" : "bg-testnav-300","absolute top-0 left-0 w-[94vw] flex items-center justify-between ml-[6vw] h-[6.5vh]  text-white px-2.5 pt-[3px] pb-1")}>
      {/* Left UI */}
      <div className="flex gap-2.5">
        {/* Current Question component */}
        <div className="flex flex-col justify-center py-[3px] px-[5px] whitespace-nowrap border-t border-l border-[#5872C4]">
          <p className=" text-sm text-center select-none">{`Item: ${
            currentQuestionIndex + 1
          } of ${testQuery.data?.questionCount}`}</p>
          <p className="text-xs text-center select-none">Block 1 of 1</p>
        </div>
        {/* Mark Question Input */}
        <div className="flex items-center">
          <input
            onChange={(e) => {
              updateMarkedStatus.mutate(e.currentTarget.checked);
            }}
            type="checkbox"
            name="mark-input"
            id="mark-input"
            checked={testQuery.data?.questions[currentQuestionIndex].marked}
          />
          <MarkFlagIcon />
          <span>Mark</span>
        </div>
      </div>

      {/* Navigation */}
      <div className=" flex h-full">
        {/* Navigate Left */}
        <div className="w-[60px] flex flex-col items-center mx-[6.5px] justify-around h-full">
          <button
            onClick={() => {
              if (selectedAnswer) {
                updateAnswerMutation.mutate(selectedAnswer);
                setSelectedAnswer(undefined);
              }
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              }
            }}
          >
            <img src="/images/test-ui/NavLeft.png" alt="" className="h-[2vh]" />
          </button>

          <p className=" text-sm font-sans">Previous</p>
        </div>
        {/* Navigate Right */}
        <div className=" w-[60px] flex flex-col items-center mx-[6.5px] justify-around h-full">
          <button
            onClick={() => {
              if (selectedAnswer) {
                updateAnswerMutation.mutate(selectedAnswer);
                setSelectedAnswer(undefined);
              }
              if (
                !!testQuery.data &&
                currentQuestionIndex < testQuery.data?.questions.length - 1
              ) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }
            }}
          >
            <img
              src="/images/test-ui/NavRight.png"
              alt=""
              className="h-[2vh]"
            />
          </button>

          <p className=" text-sm font-sans">Next</p>
        </div>
      </div>

      {/* Right UI */}
      <div className="flex justify-center">
        {/* Labs */}
        {/* <TestButton onClick={() => setTestLabValuesOpen(!testLabValuesOpen)} icon={<LabsIcon />} buttonText="Lab Values"/> */}
        
        {/* Notes */}
        {/* <TestButton icon={<NoteIcon />} buttonText="Notes"/> */}
        
        {/* Calculator */}
        {/* <TestButton icon={<CalcIcon />} buttonText="Calculator"/> */}
        
        {/* Invert */}
        <TestButton onClick={() => setSelectedColor(selectedColor === "main" ? "reversed" : "main")} icon={<InvertIcon />} buttonText="Reverse Color"/>
        
        {/* Zoom */}
        <TestZoom />
      </div>
    </div>
  );
};

export default TestNavbar;
