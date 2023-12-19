import { Context, useContext } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import { classNames } from "../../../utils/utils";
import MarkFlagIcon from "../../../components/icons/MarkFlagIcon";

const TestSidebar = () => {
  const {
    testQuery,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedAnswer,
    setSelectedAnswer,
    updateAnswerMutation,
    selectedColor
  } = useContext(TestInstanceContext as Context<TestInstanceContextType>);
  return (
    <div className={classNames(selectedColor === "main" ? "bg-white": "bg-testbg-200 text-inverted-100", "w-[6vw] h-[100vh] absolute top-0 left-0 py-1.5 z-30 ")}>
      <ul className={classNames(selectedColor === "reversed" ? "reversed" : "", "list-disc custom-bullets")}>
        {testQuery.data &&
          testQuery.data.questions.map((question, index) => (
            <li
              key={`question-option-${index}`}
              onClick={() => {
                if (selectedAnswer) {
                  updateAnswerMutation.mutate(selectedAnswer);
                  setSelectedAnswer(undefined)
                }

                setCurrentQuestionIndex(index);
              }}
              className={classNames(
                index === currentQuestionIndex
                  ? selectedColor === "main" ? "!bg-testnav-100 text-white" : "text-gray-900 !bg-testnav-200"
                  : "",
                "flex justify-between pl-5 relative before:absolute before:left-1.5 before:top-0 select-none cursor-pointer"
              )}
            >
              {index + 1} <span>{question.marked && <MarkFlagIcon />}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TestSidebar;
