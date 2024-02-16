import { Context, useContext, useEffect } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import TestQuestionOption from "./TestQuestionOption";
import TestLabValuesSlideOver from "./TestLabValuesSlideOver";
import { classNames } from "../../../utils/utils";
import TestQuestionExplanation from "./TestQuestionExplanation";
import { ScaleLoader } from "react-spinners";

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

  useEffect(() => {
    console.log(questionQuery.isFetching);
  }, [questionQuery.isFetching]);
  return (
    <div
      className={classNames(
        selectedZoom === "zoom1" ? "text-[16px]" : "",
        selectedZoom === "zoom2" ? "text-[24px]" : "",
        selectedZoom === "zoom3" ? "text-[35px]" : "",
        selectedColor === "main"
          ? "bg-testbg-100"
          : "bg-testbg-200 text-inverted-100",
        "flex flex-col my-[6vh] ml-0 md:ml-[6vw] w-full md:w-[94vw] h-[88vh]  border-l border-border-300 pt-5 px-8 pb-4 font-sans overflow-y-auto"
      )}
    >
      <div
        className={classNames(
          questionQuery.isFetching ? "items-center justify-center h-full" : "",
          selectedZoom === "zoom3" ? "flex-col" : "",
          "flex flex-col md:flex-row md:gap-8"
        )}
      >
        {questionQuery.isFetching && (
          <ScaleLoader
            color="#3B77BF"
            loading={questionQuery.isFetching}
            aria-label="Loading topics"
            width={10}
          />
        )}
        {!questionQuery.isFetching && (
          <>
            {/* Question Content */}
            <div
              className={classNames(
                selectedZoom === "zoom3" ? "w-full" : "w-full md:w-1/2"
              )}
            >
              {/* Question text */}
              <p>{questionQuery.data?.question}</p>

              {/* Mobile image media */}
              {questionQuery.data?.imageUrl && (
                <div
                  className={classNames(
                    selectedZoom === "zoom3" ? "w-full " : "flex-1 ",
                    "flex md:hidden justify-center my-6"
                  )}
                >
                  <img
                    src={questionQuery.data.imageUrl}
                    className="w-auto h-auto max-h-full max-w-full object-contain"
                    alt=""
                  />
                </div>
              )}
              {/* Question Answers */}
              <div className="border border-testnav-100 border-b-[5px] p-2 w-fit my-4">
                {!!questionQuery.data &&
                  questionQuery.data?.options?.map((option, index) => {
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
                selectedZoom === "zoom3"
                  ? "w-full"
                  : "hidden md:flex-1  md:flex justify-center items-start"
              )}
            >
              <img
                src={questionQuery.data?.imageUrl}
                className="w-auto h-auto max-h-full max-w-full object-contain"
                alt=""
              />
            </div>
          </>
        )}
      </div>

      {/* Explanation */}
      {testQuery.data?.testStatus === "completed" && !!questionQuery.data && (
        <TestQuestionExplanation />
      )}
      <TestLabValuesSlideOver />
    </div>
  );
};

export default TestQuestion;
