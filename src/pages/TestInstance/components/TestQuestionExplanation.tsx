import { Context, useContext, useEffect, useState } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";
import { classNames } from "../../../utils/utils";
import {
  LanguageContext,
  LanguageContextType,
} from "../../../context/LanguageContext";

const TestQuestionExplanation = () => {
  const { selectedAnswer, questionQuery } = useContext(
    TestInstanceContext as Context<TestInstanceContextType>
  );

  const { selectedLanguage } = useContext(
    LanguageContext as Context<LanguageContextType>
  );

  const [optionText, setOptionText] = useState<{
    correct: string;
    incorrect: string;
    noAnswer: string;
  }>({
    correct: "You correctly chose",
    incorrect: "You incorrectly chose",
    noAnswer: "You didn't choose an answer.",
  });

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

  useEffect(() => {
    if (selectedLanguage === "en") {
      setOptionText({
        correct: "You correctly chose",
        incorrect: "You incorrectly chose",
        noAnswer: "You didn't choose an answer.",
      });
    } else if (selectedLanguage === "es") {
      setOptionText({
        correct: "Elegiste correctamente la opción ",
        incorrect: "Elegiste incorrectamente la opción ",
        noAnswer: "No elegiste ninguna opción.",
      });
    }
  }, [selectedLanguage]);

  return (
    <div className="flex flex-col gap-2 mt-2 select-none">
      <h1>
        {!!questionQuery.data
          ? selectedAnswer === questionQuery.data?.correct_answer
            ? `${optionText.correct} ${
                optionLetters[
                  questionQuery.data?.options?.findIndex(
                    (option) => option === selectedAnswer
                  )
                ]
              }`
            : selectedAnswer !== undefined
            ? `${optionText.incorrect} ${
                optionLetters[
                  questionQuery.data?.options?.findIndex(
                    (option) => option === selectedAnswer
                  )
                ]
              }.`
            : optionText.noAnswer
          : ""}
      </h1>
      <div className={classNames(" border-grades-good", "pl-2 border-l-4")}>
        {selectedLanguage === "en"
          ? questionQuery.data?.explanation
          : questionQuery.data?.internationalization[selectedLanguage]
              .explanation}
      </div>
      {selectedLanguage === "en" &&
        questionQuery.data?.incorrect_explanations &&
        questionQuery.data?.incorrect_explanations.map((explanation) => (
          <div className={classNames(" border-grades-low", "pl-2 border-l-4")}>
            <span dangerouslySetInnerHTML={{ __html: explanation }}></span>
          </div>
        ))}

      {selectedLanguage !== "en" &&
        questionQuery.data?.internationalization[selectedLanguage].incorrect_explanations &&
        questionQuery.data?.internationalization[selectedLanguage].incorrect_explanations?.map((explanation) => (
          <div className={classNames(" border-grades-low", "pl-2 border-l-4")}>
            <span dangerouslySetInnerHTML={{ __html: explanation }}></span>
          </div>
        ))}
    </div>
  );
};

export default TestQuestionExplanation;
