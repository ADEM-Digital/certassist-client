import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { UseQueryResult, useQuery } from "react-query";

export type TestDataType = {
  _id: string;
  selectedDifficulties: Array<"easy" | "medium" | "hard">;
  selectedQuestionStatus: "all" | "used" | "unused";
  selectedAnswerStatus: "all" | "incorrect" | "correct";
  selectedMarkStatus: "all" | "marked" | "unmarked";
  selectedTopics: string[];
  selectedSubtopics: string[];
  testMode: "timed" | "tutor" | "untimed";
  questionCount: number;
  questions: {
    id: string;
    answer: string | null;
    correct: boolean | null;
    marked: boolean;
  }[];
  grade?: number;
  createdAt: string;
  updatedAt: string;
  testName?: string;
  testStatus: "pending" | "completed" | "in progress";
  startedAt: Date | null;
  testTime: number | null;
  remainingTime: number | null;
};

export const useTests = () => {
  const { user } = useAuth0();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTest, setSelectedTest] = useState<TestDataType>();

  const getTests = async () => {
    try {
      let response = await axios.get(`${import.meta.env.VITE_API_URL}/tests`, {
        params: {
          userId: user?.sub,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const testList: UseQueryResult<TestDataType[]> = useQuery(
    "testList",
    getTests,
    {
      enabled: user?.sub !== undefined,
    }
  );

  return { testList, open, setOpen, selectedTest, setSelectedTest };
};
