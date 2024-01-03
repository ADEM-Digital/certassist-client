import { TestDataType } from "../pages/tests/hooks";
import { OptionType } from "../types/FormTypes";
import { QuestionDataType } from "../types/QuestionTypes";
import { UserDataType } from "../types/UserDataType";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function stringToCaps(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function sentenceToCaps(text: string) {
  let excludedWords = ["and", "of", "the", "for"];
  return text
    .split(" ")
    .map((word) =>
      excludedWords.findIndex((excludedWord) => word === excludedWord) > -1
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export function parseOptionTypes(options: OptionType[]) {
  return options.map((option) => option.value);
}

export function deepCopyObjectArray(array: Array<Object>) {
  return array.map((item) => ({ ...item }));
}

export function testCorrectIncorrectCount(test: TestDataType) {
  let correctCount = test.questions.reduce(
    (acc, currVal) =>
      currVal.correct !== null ? acc + currVal.correct : acc + 0,
    0
  );
  let incorrectCount = test.questionCount
    ? test.questionCount -
      test.questions.reduce(
        (acc, currVal) =>
          currVal.correct !== null ? acc + currVal.correct : acc + 0,
        0
      )
    : 0;

  return {
    correct: correctCount,
    incorrect: incorrectCount,
  };
}

export function availableQuestionOnSelectedTopicsSubtopic(
  availableQuestions: QuestionDataType[],
  selectedSubTopics: (string | 0)[]
) {
  // Filter only by subtopics. Available subtopics are already filtered by selected topics so theres no need to filter by topic again.
  if (selectedSubTopics.findIndex((subtopic) => subtopic === 0) > -1)
    return availableQuestions.length;

  return availableQuestions.filter(
    (question) =>
      selectedSubTopics.findIndex(
        (subtopic) => subtopic === question.subtopic
      ) > -1
  ).length;
}

export function parseUserDataToStats(userData: UserDataType | undefined) {
  if (!userData) return;

  let totalQuestions =
    userData.correctQuestions.length + userData.incorrectQuestions.length;
  let percentageCorrect = (
    (userData.correctQuestions.length / totalQuestions) *
    100
  ).toFixed(0);

  let percentageIncorrect = (
    (userData.incorrectQuestions.length / totalQuestions) *
    100
  ).toFixed(0);

  let correctCount = userData.correctQuestions.length;
  let incorrectCount = userData.incorrectQuestions.length;

  return {
    totalQuestions,
    percentageCorrect,
    percentageIncorrect,
    correctCount,
    incorrectCount
  }
}
