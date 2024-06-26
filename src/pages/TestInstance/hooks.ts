import axios, { AxiosResponse } from "axios";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { TestDataType } from "../tests/hooks";
import { Context, createContext, useContext, useEffect, useState } from "react";
import { QuestionDataType } from "../../types/QuestionTypes";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  LanguageContext,
  LanguageContextType,
} from "../../context/LanguageContext";

export type TestInstanceContextType = {
  testQuery: UseQueryResult<TestDataType | undefined, unknown>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  questionQuery: UseQueryResult<QuestionDataType>;
  updateAnswerMutation: UseMutationResult<void, unknown, string, unknown>;
  selectedAnswer: string | undefined;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateMarkedStatus: UseMutationResult<void, unknown, boolean, unknown>;
  testEndTime: number | undefined;
  setTestEndTime: React.Dispatch<React.SetStateAction<number | undefined>>;
  testLabValuesOpen: boolean;
  setTestLabValuesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedZoom: "zoom1" | "zoom2" | "zoom3";
  setSelectedZoom: React.Dispatch<
    React.SetStateAction<"zoom1" | "zoom2" | "zoom3">
  >;
  selectedColor: "main" | "reversed";
  setSelectedColor: React.Dispatch<React.SetStateAction<"main" | "reversed">>;
  endTestMutation: UseMutationResult<void, unknown, void, unknown>;
  endTestModalOpen: boolean;
  setEndTestModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSupportSidebarOpen: boolean;
  setIsSupportSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLanguageSidebarOpen: boolean;
  setIsLanguageSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isScreenActive: boolean;
  setIsScreenActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TestInstanceContext = createContext<
  TestInstanceContextType | undefined
>(undefined);

export const useTestInstance = (testId: string | undefined) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useContext(
    LanguageContext as Context<LanguageContextType>
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [testEndTime, setTestEndTime] = useState<number>();
  const [testLabValuesOpen, setTestLabValuesOpen] = useState(false);
  const [isSupportSidebarOpen, setIsSupportSidebarOpen] = useState(false);
  const [isLanguageSidebarOpen, setIsLanguageSidebarOpen] = useState(false);
  const [selectedZoom, setSelectedZoom] = useState<"zoom1" | "zoom2" | "zoom3">(
    "zoom1"
  );
  const [selectedColor, setSelectedColor] = useState<"main" | "reversed">(
    "main"
  );
  const [endTestModalOpen, setEndTestModalOpen] = useState<boolean>(false);
  const [isScreenActive, setIsScreenActive] = useState(true);

  const getTest = async () => {
    try {
      let response: AxiosResponse<TestDataType> = await axios.get(
        `${import.meta.env.VITE_API_URL}/tests/${testId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getQuestions = async () => {
    try {
      if (
        !!testQuery.data &&
        currentQuestionIndex !== undefined &&
        currentQuestionIndex !== null
      ) {
        let response: AxiosResponse<QuestionDataType> = await axios.get(
          `${import.meta.env.VITE_API_URL}/questions/${
            testQuery.data?.questions[currentQuestionIndex].id
          }`,
          {
            params: {
              testStatus: testQuery.data.testStatus,
              selectedLanguage,
            },
          }
        );

        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateTestAnswer = async (answer: string) => {
    try {
      let newTestData = { ...testQuery.data };
      if (
        newTestData.questions &&
        newTestData.questions[currentQuestionIndex]
      ) {
        newTestData.questions[currentQuestionIndex].answer = answer;
        let response = await axios.put(
          `${import.meta.env.VITE_API_URL}/tests/${testId}`,
          newTestData
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateMarkQuestion = async (checked: boolean) => {
    try {
      let newTestData = { ...testQuery.data };
      console.log(newTestData);
      if (
        newTestData.questions &&
        newTestData.questions[currentQuestionIndex]
      ) {
        newTestData.questions[currentQuestionIndex].marked = checked;
        console.log(newTestData);
        let response = await axios.put(
          `${import.meta.env.VITE_API_URL}/tests/${testId}`,
          newTestData
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateTestStatus = async () => {
    try {
      if (!!testQuery.data) {
        let response = await axios.put(
          `${import.meta.env.VITE_API_URL}/tests/${testId}`,
          {
            ...testQuery.data,
            testStatus: "in progress",
          }
        );

        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEndTest = async () => {
    try {
      let response = await axios.put(
        `${import.meta.env.VITE_API_URL}/gradetests/${testId}`,
        {
          ...testQuery.data,
        }
      );

      navigate(`/tests/analysis/${testId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const testQuery: UseQueryResult<TestDataType> = useQuery("testData", getTest);

  const questionQuery: UseQueryResult<QuestionDataType> = useQuery(
    "testActiveQuestion",
    getQuestions,
    {
      enabled: !!testQuery.data,
    }
  );

  const updateAnswerMutation = useMutation((selectedAnswer: string) =>
    updateTestAnswer(selectedAnswer)
  );

  const updateMarkedStatus = useMutation((checked: boolean) =>
    updateMarkQuestion(checked)
  );

  const updateTestStatusMutation = useMutation(updateTestStatus);

  const endTestMutation = useMutation(handleEndTest);

  useEffect(() => {
    if (testQuery.isSuccess && testQuery.data) {
      if (
        testQuery.data.testStatus !== "in progress" &&
        testQuery.data.testStatus !== "completed"
      ) {
        updateTestStatusMutation.mutate();
      }
    }
  }, []);

  useEffect(() => {
    const onFocus = () => setIsScreenActive(true);
    const onBlur = () => setIsScreenActive(false);
    const onMacScreenshot = (event: KeyboardEvent) => {
      console.log(event)
      if ((event.metaKey && event.shiftKey) || event.keyCode == 44 || (event.keyCode == 44)) {
        console.log("Cmd+Shift+4 pressed");

        // Attempt to close the window
        // Note: This will most likely not work in tabs/windows not opened via script
        setIsScreenActive(false);
        const timer = setTimeout(() => {
          setIsScreenActive(true);
        }, 30000);

        return () => clearTimeout(timer)

      }
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    document.addEventListener("keydown", onMacScreenshot);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("keydown", onMacScreenshot);
      
    };
  }, []);

  useEffect(() => {
    questionQuery.refetch();
  }, [currentQuestionIndex]);

  useEffect(() => {
    const updateStartTime = async () => {
      if (
        !!testQuery.data &&
        (testQuery.data?.startedAt === null ||
          testQuery.data?.startedAt === undefined)
      ) {
        let timeNow = moment.now();
        try {
          let response = await axios.put(
            `${import.meta.env.VITE_API_URL}/tests/${testId}`,
            {
              ...testQuery.data,
              startedAt: timeNow,
            }
          );
          testQuery.refetch();
          return response.data;
        } catch (error) {
          console.log(error);
        }
      }

      if (!testEndTime && testQuery.data?.startedAt) {
        let endTime = moment(testQuery.data.startedAt).add(
          testQuery.data?.testTime,
          "minutes"
        );

        setTestEndTime(endTime.valueOf());
      }
    };
    updateStartTime();
  }, [testQuery.data, testQuery.isSuccess]);

  useEffect(() => {
    return () => testQuery.remove();
  }, []);

  useEffect(() => {
    questionQuery.remove();
    questionQuery.refetch();
  }, [selectedLanguage]);

  return {
    testQuery,
    questionQuery,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    updateAnswerMutation,
    selectedAnswer,
    setSelectedAnswer,
    updateMarkedStatus,
    testEndTime,
    setTestEndTime,
    testLabValuesOpen,
    setTestLabValuesOpen,
    selectedZoom,
    setSelectedZoom,
    selectedColor,
    setSelectedColor,
    endTestMutation,
    endTestModalOpen,
    setEndTestModalOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSupportSidebarOpen,
    setIsSupportSidebarOpen,
    isLanguageSidebarOpen,
    setIsLanguageSidebarOpen,
    isScreenActive,
    setIsScreenActive,
  };
};

export const useSupportForm = () => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFilename, setSelectedFilename] = useState<string>("");
  const initialFormValues = {
    problemType: "",
    description: "",
    image: null,
  };

  return {
    initialFormValues,
    isFileSelected,
    setIsFileSelected,
    selectedFilename,
    setSelectedFilename,
  };
};
