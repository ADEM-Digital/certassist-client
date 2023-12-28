import { FormikContextType, useFormikContext } from "formik";
import TestTopicOption from "./TestTopicOption";
import { TestWizardValuesProps } from "../hooks";
import { useEffect, useState } from "react";
import TestSuptopicOption from "./TestSuptopicOption";
import { QuestionDataType } from "../../../types/QuestionTypes";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { classNames } from "../../../utils/utils";
import { useAuth0 } from "@auth0/auth0-react";

export type SubtopicDataType = {
  _id: string | 0;
  topic: string;
  name: string;
  totalQuestions: number;
};
export type TopicDataType = {
  _id: string | 0;
  name: string;
  totalQuestions: number;
};

const TestQuestionSettings = () => {
  const { user } = useAuth0();
  const [subtopicsFilter, setSuptopicsFilter] = useState<SubtopicDataType[]>();
  const [topics, setTopics] = useState<TopicDataType[]>([]);
  const [subtopics, setSubtopics] = useState<SubtopicDataType[]>();
  const [availableQuestions, setAvailableQuestions] = useState<
    QuestionDataType[]
  >([]);

  const formik: FormikContextType<TestWizardValuesProps> = useFormikContext();

  const getAvailableQuestions = async (testValues: TestWizardValuesProps) => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/availablequestions`,
        {
          params: {
            selectedDifficulties: testValues.selectedDifficulties,
            selectedQuestionStatus: testValues.selectedQuestionStatus,
            selectedAnswerStatus: testValues.selectedAnswerStatus,
            selectedMarkStatus: testValues.selectedMarkStatus,
            userId: user?.sub,
          },
        }
      );
      return setAvailableQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAvailableOptions = async (
    availableTopics: (string | undefined)[],
    availableSubtopics: (string | undefined)[]
  ) => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/availableQuestionOptions`,
        {
          availableTopics,
          availableSubtopics,
          selectedDifficulties: formik.values.selectedDifficulties,
          selectedQuestionStatus: formik.values.selectedQuestionStatus,
          userId: user?.sub,
        }
      );
      setTopics(response.data.topicsQuery);
      setSubtopics(response.data.subtopicsQuery);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // set state to all subtopics if all topics is selected
    if (
      formik.values.selectedTopics.findIndex((topicId) => topicId === 0) > -1 ||
      formik.values.selectedTopics.length === 0
    ) {
      return setSuptopicsFilter(subtopics);
    }

    if (subtopics !== undefined) {
      let newSelectedSubtopicsFilter = subtopics.filter(
        (subtopic) =>
          formik.values.selectedTopics.findIndex(
            (topicId) => topicId === subtopic.topic
          ) > -1
      );

      setSuptopicsFilter(newSelectedSubtopicsFilter);
    }
  }, [formik, topics, subtopics]);

  useEffect(() => {
    // Check selectedSubtopics to see if any of them do no apply to the current selection
    if (subtopicsFilter !== undefined) {
      let newSelectedSubtopics = formik.values.selectedSubtopics.filter(
        (subtopicName) =>
          subtopicsFilter.findIndex((subtopic) => {
            return subtopic._id === subtopicName;
          }) > -1
      );

      if (
        newSelectedSubtopics.length != formik.values.selectedSubtopics.length
      ) {
        formik.setFieldValue("selectedSubtopics", newSelectedSubtopics);
      }
    }
  }, [subtopicsFilter]);

  useEffect(() => {
    getAvailableQuestions(formik.values);
  }, []);

  useEffect(() => {
    if (availableQuestions) {
      let availableTopics = [
        ...new Set(availableQuestions.map((question) => question.topic)),
      ];
      let availableSubtopics = [
        ...new Set(availableQuestions.map((question) => question.subtopic)),
      ];
      if (availableTopics.length > 0 && availableSubtopics.length > 0) {
        getAvailableOptions(availableTopics, availableSubtopics);
      }
    }
  }, [availableQuestions]);

  useEffect(() => {}, [topics, subtopics]);

  return (
    <div className="flex gap-5">
      {/* Topic Container */}
      <div
        className={classNames(
          topics.length === 0 ? "flex flex-col w-[32vw] min-h-[50vh]" : "",
          "bg-white border-2 border-border-200"
        )}
      >
        <div className="flex items-center border-b border-border-200 py-5 px-4">
          <h1 className=" font-tables font-extrabold text-xl">Topics</h1>
        </div>
        <div
          className={classNames(
            topics.length === 0
              ? "flex-1 flex items-center justify-center"
              : "",
            "px-4 py-1"
          )}
        >
          {topics.length === 0 && (
            <ScaleLoader
              color="#3B77BF"
              loading={topics.length === 0}
              aria-label="Loading topics"
              width={10}
            />
          )}
          {topics.length > 0 && (
            <>
              <TestTopicOption
                topic={{
                  _id: 0,
                  name: "All topics",
                  totalQuestions: availableQuestions.length,
                }}
                questionCount={availableQuestions.length}
                disabled={false}
              />
              {topics &&
                topics.map((topic) => (
                  <TestTopicOption
                    disabled={
                      formik.values.selectedTopics.findIndex(
                        (topicId) => topicId === 0
                      ) > -1
                    }
                    key={`question-settings-topic-option-${topic.name}-${topic._id}`}
                    topic={topic}
                    questionCount={topic.totalQuestions}
                  />
                ))}
            </>
          )}
        </div>
      </div>
      {/* Subtopic Container */}
      <div
        className={classNames(
          topics.length === 0 ? "flex flex-col w-[32vw] min-h-[50vh]" : "",
          "bg-white border-2 border-border-200"
        )}
      >
        <div className="flex items-center border-b border-border-200 py-5 px-4">
          <h1 className=" font-tables font-extrabold text-xl">Subtopics</h1>
        </div>
        <div
          className={classNames(
            topics.length === 0
              ? "flex-1 flex items-center justify-center"
              : "",
            "px-4 py-1"
          )}
        >
          {!subtopics && (
            <ScaleLoader
              color="#3B77BF"
              loading={!subtopics}
              aria-label="Loading topics"
              width={10}
            />
          )}
          {subtopics && subtopics.length > 0 && (
            <>
              <TestSuptopicOption
                subtopic={{
                  _id: 0,
                  topic: "",
                  name: "All Questions",
                  totalQuestions: availableQuestions.length,
                }}
                questionCount={availableQuestions.length}
                disabled={false}
              />
              {subtopicsFilter &&
                subtopicsFilter.length > 0 &&
                subtopicsFilter.map((subtopic) => (
                  <TestSuptopicOption
                    key={`test-subtopics-option-${subtopic.name}-${subtopic._id}`}
                    subtopic={subtopic}
                    questionCount={subtopic.totalQuestions}
                    disabled={
                      formik.values.selectedSubtopics.findIndex(
                        (subtopicName) => subtopicName === ""
                      ) > -1
                    }
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestQuestionSettings;
