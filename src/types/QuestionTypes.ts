export type QuestionDataType = {
  _id?: string;
  id: string;
  question: string;
  options: string[];
  correct_answer?: string;
  explanation?: string;
  topic?: string;
  subtopic?: string;
  incorrect_explanations?: string[];
  imageUrl?: string;
  internationalization: {
    es: {
      question: string;
      options: string[];
      correct_answer?: string;
      explanation?: string;
      topic?: string;
      subtopic?: string;
      incorrect_explanations?: string[];
    };
  };
};
