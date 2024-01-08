import { useEffect, useState } from "react";
import { StepsType } from "./components/TestWizardNav";
import { OptionType } from "../../types/FormTypes";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import { UseQueryResult, useQuery } from "react-query";
import { deepCopyObjectArray } from "../../utils/utils";
import { UserDataType } from "../../types/UserDataType";
import { QuestionDataType } from "../../types/QuestionTypes";

export type TestWizardValuesProps = {
  selectedDifficulties: OptionType[];
  selectedQuestionStatus: "all" | "used" | "unused" | undefined;
  selectedAnswerStatus: "all" | "incorrect" | "correct" | undefined;
  selectedMarkStatus: "marked" | "all" | "unmarked" | undefined;
  selectedTopics: (string | 0)[];
  selectedSubtopics: (string | 0)[];
  testMode: "tutor" | "timed" | "untimed";
  questionCount: OptionType;
  testName: string | undefined;
};

const initialSteps: StepsType = [
  { stepNumber: 1, stepText: "Test Settings", status: "active" },
  { stepNumber: 2, stepText: "Choose Questions", status: "inactive" },
  { stepNumber: 3, stepText: "Finalize Test", status: "inactive" },
];

export const useTestWizard = () => {
  const { user } = useAuth0();
  // @ts-ignore
  const [wizardSteps, setWizardSteps] = useState<StepsType | undefined>(deepCopyObjectArray(initialSteps));
  const [isCreatingTest, setIsCreatingTest] = useState<boolean>(false);
  const [availableQuestions, setAvailableQuestions] = useState<
    QuestionDataType[]
  >([]);

  const initialValues: TestWizardValuesProps = {
    selectedDifficulties: [],
    selectedQuestionStatus: "all",
    selectedAnswerStatus: "all",
    selectedMarkStatus: "all",
    selectedTopics: [0],
    selectedSubtopics: [0],
    testMode: "timed",
    questionCount: { value: "10", label: "10" },
    testName: undefined,
  };

  const getQuestions = async (testValues: TestWizardValuesProps) => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/questions/ids`,
        {
          ...testValues,
          
          questionCount: Number(testValues.questionCount.value),
          userId: user?.sub
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
      setIsCreatingTest(true);
      let questionIds = await getQuestions(testValues);
      let response = await axios.post(`${import.meta.env.VITE_API_URL}/tests`, {
        ...testValues,
        questionCount: Number(testValues.questionCount.value),
        questions: questionIds.map((questionId: string) => ({
          id: questionId,
          answer: null,
          correct: null,
          marked: null,
        })),
        createdAt: moment().format("MM/DD/YYYY"),
        updatedAt: moment().format("MM/DD/YYYY"),
        testStatus: "pending",
        testTime: Number(testValues.questionCount.value) * 1.5,
        userId: user?.sub,
      });

      if (userDataQuery.data) {
        let usedQuestions = userDataQuery.data.usedQuestions
          ? userDataQuery.data.usedQuestions
          : [];
        let updateUserData = await axios.put(
          `${import.meta.env.VITE_API_URL}/usersData`,
          {
            userDataId: userDataQuery.data._id,
            usedQuestions: [...usedQuestions, ...questionIds],
          }
        );
        console.log(updateUserData);
      }

      console.log(response.data);
      setIsCreatingTest(false);
      navigate("/tests");
    } catch (error) {
      setIsCreatingTest(false);
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      if (user?.sub) {
        let response = await axios.get(
          `${import.meta.env.VITE_API_URL}/usersData`,
          {
            params: {
              userId: user.sub,
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userDataQuery: UseQueryResult<UserDataType> = useQuery(
    "testWizardUserData",
    getUserData,
    {
      enabled: user?.sub !== undefined,
    }
  );

  useEffect(() => {
    return () => {
      // @ts-ignore
      setWizardSteps(deepCopyObjectArray(initialSteps));
    };
  }, []);

  return {
    wizardSteps,
    setWizardSteps,
    initialValues,
    getQuestions,
    submitTests,
    userDataQuery,
    isCreatingTest,
    setIsCreatingTest,
    availableQuestions,
    setAvailableQuestions
  };
};
