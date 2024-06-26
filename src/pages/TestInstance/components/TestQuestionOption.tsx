import { Context, useContext } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

type TestQuestionOptionProps = {
  optionLetter: string;
  optionText: string;
  value: string;
  answerState: {
    selectedAnswer: string | undefined;
    setSelectedAnswer: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
};

const TestQuestionOption = ({
  optionLetter,
  optionText,
  value,
  answerState,
}: TestQuestionOptionProps) => {
  const { questionQuery, testQuery, selectedAnswer } = useContext(
    TestInstanceContext as Context<TestInstanceContextType>
  );
  return (
    <div className="flex items-center gap-2">
      <input
        onChange={(e) => answerState.setSelectedAnswer(e.currentTarget.value)}
        type="radio"
        name="answer"
        id={`answer-${optionText}`}
        value={value}
        checked={value === answerState.selectedAnswer}
        disabled={testQuery.data?.testStatus === "completed"}
      />
      <label
        className="flex items-center gap-2 justify-between select-none"
        htmlFor={`answer-${optionText}`}
      >
        {`${optionLetter} ${optionText}`}{" "}
        {value === questionQuery.data?.correct_answer &&
        testQuery.data?.testStatus === "completed" ? (
          <CheckIcon className="h-6 w-6 stroke-2 text-grades-good" />
        ) : (
          ""
        )}
        {value !== questionQuery.data?.correct_answer &&
        value === selectedAnswer  && testQuery.data?.testStatus === "completed" && <XMarkIcon className="w-6 h-6 text-grades-low"/>}
      </label>
    </div>
  );
};

export default TestQuestionOption;
