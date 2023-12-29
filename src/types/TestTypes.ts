export type TestAnalysisDataType =
  | {
      topicsAnalysis: ({
        topic: string;
        correctCount: number;
        incorrectCount: number;
        score: number
      } | undefined)[] ;
      subtopicsAnalysis: ({
        topic: string | undefined;
        subtopic: string;
        correctCount: number;
        incorrectCount: number;
        score: number
      } | undefined)[] ;
    }
  | undefined
  | null;