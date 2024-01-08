export type QuestionDataType = {
  id: string;
  question: string;
  options: string[];
  correct_answer?: string;
  explanation?: string;
  topic?: string;
  subtopic?: string;
  incorrect_explanations?: string[];
};
