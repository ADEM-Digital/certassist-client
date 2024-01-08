import { Context, useContext } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import { classNames } from "../../../utils/utils";

const TestQuestionExplanation = () => {
  const { selectedAnswer, questionQuery } = useContext(
    TestInstanceContext as Context<TestInstanceContextType>
  );
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
    <div className="flex flex-col gap-2 mt-2">
      <h1>
        {!!questionQuery.data
          ? selectedAnswer === questionQuery.data?.correct_answer
            ? `You correctly chose ${
                optionLetters[
                  questionQuery.data?.options?.findIndex(
                    (option) => option === selectedAnswer
                  )
                ]
              }`
            : selectedAnswer !== undefined
            ? `You incorrectly chose ${
                optionLetters[
                  questionQuery.data?.options?.findIndex(
                    (option) => option === selectedAnswer
                  )
                ]
              }.`
            : "You didn't choose an answer."
          : ""}
      </h1>
      <div
        className={classNames(
          " border-grades-good",
          "pl-2 border-l-4"
        )}
      >
        {questionQuery.data?.explanation}
      </div>
      {questionQuery.data?.incorrect_explanations &&
        questionQuery.data?.incorrect_explanations.map((explanation) => (
          <div className={classNames(" border-grades-low", "pl-2 border-l-4")}>
            <span dangerouslySetInnerHTML={{__html: explanation}}></span>
          </div>
        ))}
    </div>
  );
};

export default TestQuestionExplanation;
