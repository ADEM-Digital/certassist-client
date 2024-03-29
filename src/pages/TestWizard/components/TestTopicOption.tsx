import { FormikContextType, useFormikContext } from "formik";
import { TestWizardValuesProps } from "../hooks";
import { classNames, sentenceToCaps } from "../../../utils/utils";
import { TopicDataType } from "./TestQuestionSettings";

type TesttopicOptionProps = {
  topic: TopicDataType;
  questionCount: number;
  disabled: boolean;
};

const TestTopicOption = ({
  topic,
  questionCount,
  disabled,
}: TesttopicOptionProps) => {
  const formik: FormikContextType<TestWizardValuesProps> = useFormikContext();

  const handleChange = (checked: boolean) => {
    if (topic._id === 0 && checked) return formik.setFieldValue("selectedTopics", [0]);

    let newTopics = formik.values.selectedTopics;
    if (checked) {
      newTopics.push(topic._id);
    } else {
      let foundIndex = newTopics.findIndex((topicId) => topicId === topic._id);
      if (foundIndex > -1) newTopics.splice(foundIndex, 1);
    }
    formik.setFieldValue("selectedTopics", newTopics);
  };


  return (
    <div className="flex justify-between items-center w-[30vw] font-body font-light">
      <div className="flex items-center gap-5">
        <input
          className=" w-4 rounded border-button-100 text-button-100 focus:ring-button-100 disabled:border-border-200 disabled:bg-border-200 disabled:bg-opacity-30"
          disabled={disabled}
          onChange={(e) => handleChange(e.target.checked)}
          type="checkbox"
          name={`topics-${topic.name}`}
          value={topic._id}
          checked={formik.values.selectedTopics.findIndex((topicId) => topicId === topic._id) > -1}
        />
        <label
          htmlFor={`topics-${topic.name}`}
          className={classNames(
            disabled ? "text-gray-400" : "text-gray-900",
            formik.values.selectedTopics.findIndex(
              (topicId) => topicId === topic._id
            ) > -1
              ? "font-bold"
              : ""
          )}
        >
          {" "}
          {sentenceToCaps(topic.name)}
        </label>
      </div>
      <p className={classNames(disabled ? "text-gray-400" : "text-gray-900")}>
        ({questionCount})
      </p>
    </div>
  );
};

export default TestTopicOption;
