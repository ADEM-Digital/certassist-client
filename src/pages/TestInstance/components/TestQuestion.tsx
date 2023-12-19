import { Context, useContext, useEffect } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import TestQuestionOption from "./TestQuestionOption";
import TestLabValuesSlideOver from "./TestLabValuesSlideOver";
import { classNames } from "../../../utils/utils";
import TestQuestionExplanation from "./TestQuestionExplanation";

const TestQuestion = () => {
  const {
    testQuery,
    currentQuestionIndex,
    questionQuery,
    selectedAnswer,
    setSelectedAnswer,
    selectedZoom,
    selectedColor,
  } = useContext(TestInstanceContext as Context<TestInstanceContextType>);

  useEffect(() => {
    if (
      !!testQuery.data &&
      testQuery.data?.questions[currentQuestionIndex].answer !== null &&
      testQuery.data?.questions[currentQuestionIndex].answer !== undefined &&
      selectedAnswer === undefined
    ) {
      setSelectedAnswer(
        testQuery.data.questions[currentQuestionIndex].answer as string
      );
    }
  }, [testQuery]);

  return (
    <div
      className={classNames(
        selectedZoom === "zoom1" ? "text-[16px]" : "",
        selectedZoom === "zoom2" ? "text-[24px]" : "",
        selectedZoom === "zoom3" ? "text-[35px]" : "",
        selectedColor === "main"
          ? "bg-testbg-100"
          : "bg-testbg-200 text-inverted-100",
        "flex flex-col my-[6vh] ml-[6vw] w-[94vw] h-[88vh]  border-l border-border-300 pt-5 px-8 pb-4 font-sans overflow-y-auto"
      )}
    >
      <div className={classNames(selectedZoom === "zoom3" ? "flex-col" : "", "flex")}>
        {/* Question Content */}
        <div
          className={classNames(selectedZoom === "zoom3" ? "w-full" : "w-1/2")}
        >
          {/* Question text */}
          <p>{questionQuery.data?.question}</p>
          {/* Question Answers */}
          <div className="border border-testnav-100 border-b-[5px] p-2 w-fit my-4">
            {questionQuery &&
              questionQuery.data?.options.map((option, index) => {
                let optionLetters = [
                  "A.",
                  "B.",
                  "C.",
                  "D.",
                  "E.",
                  "F.",
                  "G.",
                  "H.",
                  "I.",
                  "J.",
                  "K.",
                  "L.",
                ];
                return (
                  <TestQuestionOption
                    answerState={{ selectedAnswer, setSelectedAnswer }}
                    key={`question-option-${index}`}
                    optionLetter={optionLetters[index]}
                    optionText={option}
                  />
                );
              })}
          </div>
        </div>
        {/* Question Media */}
        <div
          className={classNames(
            selectedZoom === "zoom3" ? "w-full" : " flex-1"
          )}
        ></div>
      </div>

      {/* Explanation */}
      {testQuery.data?.testStatus === "completed" && (
        <TestQuestionExplanation />
      )}
      <TestLabValuesSlideOver />
    </div>
  );
};

export default TestQuestion;
