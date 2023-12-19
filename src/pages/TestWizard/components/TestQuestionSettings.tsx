import { FormikContextType, useFormikContext } from "formik";
import TestTopicOption from "./TestTopicOption";
import { TestWizardValuesProps } from "../hooks";
import { useEffect, useState } from "react";
import TestSuptopicOption from "./TestSuptopicOption";

const topics = [
  { id: 1, name: "Anatomy" },
  { id: 2, name: "Behavioral Sciences" },
  { id: 3, name: "Biochemistry" },
  { id: 4, name: "Microbiology" },
  { id: 5, name: "Immunology" },
];

type SubtopicDataType = { id: number; topicId: number; name: string };
const subtopics: SubtopicDataType[] = [
  { id: 1, topicId: 1, name: "Embryology" },
  { id: 2, topicId: 1, name: "Histology" },
  { id: 3, topicId: 1, name: "Neuroanatomy" },
  { id: 4, topicId: 1, name: "Head and Neck" },
  { id: 5, topicId: 1, name: "Upper Limb" },
  { id: 6, topicId: 1, name: "Back" },
  { id: 7, topicId: 1, name: "Thorax" },
  { id: 8, topicId: 1, name: "Abdomen" },
  { id: 9, topicId: 1, name: "Pelvis and Perineum" },
  { id: 10, topicId: 1, name: "Lower Limb" },
  { id: 11, topicId: 1, name: "Ethics and Professionalism" },
  { id: 12, topicId: 2, name: "Psychology" },
  { id: 13, topicId: 2, name: "Sociology" },
  { id: 14, topicId: 2, name: "Ethics and Professionalism" },
  { id: 15, topicId: 3, name: "Bacteria" },
  { id: 16, topicId: 3, name: "Fungi" },
  { id: 17, topicId: 3, name: "Viruses" },
  { id: 18, topicId: 3, name: "Parasites" },
  { id: 19, topicId: 3, name: "Antimicrobials" },
  { id: 2, topicId: 4, name: "Cells and Organs of the Immune System" },
  { id: 2, topicId: 4, name: "Innate Immunity" },
  { id: 2, topicId: 4, name: "Antigen presentation and processing" },
  { id: 2, topicId: 4, name: "Humoral Immunity" },
];

const TestQuestionSettings = () => {
  const [subtopicsFilter, setSuptopicsFilter] = useState<SubtopicDataType[]>(
    []
  );

  const formik: FormikContextType<TestWizardValuesProps> = useFormikContext();

  useEffect(() => {
    // set state to all subtopics if all topics is selected
    if (
      formik.values.selectedTopics.findIndex((topicId) => topicId === 0) > -1 ||
      formik.values.selectedTopics.length === 0
    ) {
      return setSuptopicsFilter(subtopics);
    }

    let newSelectedSubtopicsFilter = subtopics.filter(
      (subtopic) =>
        formik.values.selectedTopics.findIndex(
          (topicId) => topicId === subtopic.topicId
        ) > -1
    );

    setSuptopicsFilter(newSelectedSubtopicsFilter);
  }, [formik]);

  useEffect(() => {
    // Check selectedSubtopics to see if any of them do no apply to the current selection

    let newSelectedSubtopics = formik.values.selectedSubtopics.filter(
      (subtopicName) =>
        subtopicsFilter.findIndex(
          (subtopic) => subtopic.name === subtopicName
        ) > -1
    );

    if (newSelectedSubtopics.length != formik.values.selectedSubtopics.length) {
      formik.setFieldValue("selectedSubtopics", newSelectedSubtopics);
    }
  }, [subtopicsFilter]);

  return (
    <div className="flex gap-5">
      {/* Topic Container */}
      <div className="bg-white border-2 border-border-200">
        <div className="flex items-center border-b border-border-200 py-5 px-4">
          <h1 className=" font-tables font-extrabold text-xl">Topics</h1>
        </div>
        <div className="px-4 py-1">
          <TestTopicOption
            topic={{ id: 0, name: "All topics" }}
            questionCount={806}
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
                key={`question-settings-topic-option-${topic.name}-${topic.id}`}
                topic={topic}
                questionCount={Math.floor(Math.random() * 806)}
              />
            ))}
        </div>
      </div>
      {/* Subtopic Container */}
      <div className="bg-white border-2 border-border-200">
        <div className="flex items-center border-b border-border-200 py-5 px-4">
          <h1 className=" font-tables font-extrabold text-xl">Subtopics</h1>
        </div>
        <div className="px-4 py-1">
          <TestSuptopicOption
            subtopic={{ id: 0, topicId: 0, name: "All Questions" }}
            questionCount={806}
            disabled={false}
          />
          {subtopicsFilter.length > 0 &&
            subtopicsFilter.map((subtopic) => (
              <TestSuptopicOption
                key={`test-subtopics-option-${subtopic.name}-${subtopic.id}`}
                subtopic={subtopic}
                questionCount={Math.floor(Math.random() * 806)}
                disabled={
                  formik.values.selectedSubtopics.findIndex(
                    (subtopicName) => subtopicName === ""
                  ) > -1
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TestQuestionSettings;
