import moment from "moment";
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
  selectedTopics: (string | 0)[],
  selectedSubTopics: (string | 0)[]
) {
  let newAvailableQuestions = availableQuestions;
  // Filter by topics
  if (!selectedTopics.includes(0)) {
    newAvailableQuestions = newAvailableQuestions.filter((question) =>
      question.topic ? selectedTopics.includes(question.topic) : false
    );
  }

  // Filter only by subtopics. Available subtopics are already filtered by selected topics so theres no need to filter by topic again.
  if (selectedSubTopics.findIndex((subtopic) => subtopic === 0) > -1)
    return newAvailableQuestions.length;

  return newAvailableQuestions.filter(
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
    incorrectCount,
  };
}

export function availableQuestionsOnSelectedTopic(
  questions: QuestionDataType[],
  selectedTopics: (string | 0)[]
) {
  if (selectedTopics.length === 0 || selectedTopics.includes(0)) {
    return questions.length;
  } else {
    return questions.filter((question) =>
      question.topic ? selectedTopics.includes(question.topic) : false
    ).length;
  }
}

export function getDaysToDateString(dateString: string) {
  const targetDate = moment(dateString);
  const currentDate = moment();
  const daysDifference = targetDate.diff(currentDate, "days");

  const daysDifferenceString = daysDifference.toString();

  return daysDifferenceString;
}
