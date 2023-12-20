import { useEffect, useState } from "react";
import { StepsType } from "./components/TestWizardNav";
import { OptionType } from "../../types/FormTypes";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";

export type TestWizardValuesProps = {
  selectedDifficulties: OptionType[];
  selectedQuestionStatus: "all" | "used" | "unused" | undefined;
  selectedAnswerStatus: "all" | "incorrect" | "correct" | undefined;
  selectedMarkStatus: "marked" | "all" | "unmarked" | undefined;
  selectedTopics: number[];
  selectedSubtopics: string[];
  testMode: "tutor" | "timed" | "untimed";
  questionCount: OptionType;
  testName: string | undefined;
};

const steps: StepsType = [
  { stepNumber: 1, stepText: "Test Settings", status: "active" },
  { stepNumber: 2, stepText: "Choose Questions", status: "inactive" },
  { stepNumber: 3, stepText: "Finalize Test", status: "inactive" },
];

export const useTestWizard = () => {
  const { user } = useAuth0();

  const [wizardSteps, setWizardSteps] = useState(() => steps);
  const initialValues: TestWizardValuesProps = {
    selectedDifficulties: [],
    selectedQuestionStatus: "all",
    selectedAnswerStatus: "all",
    selectedMarkStatus: "all",
    selectedTopics: [],
    selectedSubtopics: [],
    testMode: "timed",
    questionCount: { value: "10", label: "10" },
    testName: undefined,
  };

  const getQuestions = async (testValues: TestWizardValuesProps) => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/questions/ids`,
        {
          params: {
            ...testValues,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const submitTests = async (
    testValues: TestWizardValuesProps,
    navigate: NavigateFunction
  ) => {
    try {
      let questionIds = await getQuestions(testValues);
      let response = await axios.post(`${import.meta.env.VITE_API_URL}/tests`, {
        id: uuidv4(),
        ...testValues,
        questionCount: Number(testValues.questionCount.value),
        questions: questionIds.map((questionId: string) => ({
          id: questionId,
          answer: null,
          correct: null,
        })),
        createdAt: moment().format("MM/DD/YYYY"),
        updatedAt: moment().format("MM/DD/YYYY"),
        testStatus: "pending",
        testTime: Number(testValues.questionCount.value) * 1.5,
        user_id: user?.sub,
      });
      if (user?.sub) {
        let updateUserData = await axios.post(
          `${import.meta.env.VITE_API_URL}/usersData/${encodeURIComponent(user?.sub)}`,
          {
            ...userDataQuery.data,
            usedQuestions: [...userDataQuery.data.usedQuestions, ...questionIds]
          }
        );
        console.log(updateUserData)
      }

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      if (user?.sub) {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/usersData/${encodeURIComponent(
            user?.sub
          )}`
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userDataQuery = useQuery("testWizardUserData", getUserData, {
    enabled: user?.sub !== undefined,
  });

  useEffect(() => {
    return () => {
      setWizardSteps(steps);
    };
  }, []);

  return {
    wizardSteps,
    setWizardSteps,
    initialValues,
    getQuestions,
    submitTests,
    userDataQuery,
  };
};
