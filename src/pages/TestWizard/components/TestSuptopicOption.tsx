import { FormikContextType, useFormikContext } from "formik";
import { TestWizardValuesProps } from "../hooks";
import { classNames, sentenceToCaps } from "../../../utils/utils";
import { SubtopicDataType } from "./TestQuestionSettings";


type TestSubtopicOptionProps = {
  subtopic: SubtopicDataType;
  questionCount: number;
  disabled: boolean;
};

const TestSuptopicOption = ({
  subtopic,
  questionCount,
  disabled,
}: TestSubtopicOptionProps) => {
  const formik: FormikContextType<TestWizardValuesProps> = useFormikContext();

  const handleChange = (checked: boolean) => {
    if (subtopic._id === 0 && checked) return formik.setFieldValue("selectedSubtopics", [0]);
    let newSubtopics = formik.values.selectedSubtopics;
    if (checked) {
      newSubtopics.push(subtopic._id);
    } else {
      let foundIndex = newSubtopics.findIndex((subtopicId) => subtopicId === subtopic._id);
      if (foundIndex > -1) newSubtopics.splice(foundIndex, 1);
    }
    formik.setFieldValue("selectedSubtopics", newSubtopics);
  };

  return (
    <div className="flex justify-between items-center w-[30vw] h-[7vh] font-body font-light">
      <div className="flex items-center gap-5">
        <input
          className="h-4 w-4 rounded border-button-100 text-button-100 focus:ring-button-100 disabled:border-border-200 disabled:bg-border-200 disabled:bg-opacity-30"
          disabled={disabled}
          onChange={(e) => handleChange(e.target.checked)}
          type="checkbox"
          name={`subtopics-${subtopic.name}`}
          value={subtopic._id}
          checked={formik.values.selectedSubtopics.findIndex((subtopicId) => subtopicId === subtopic._id) > -1}
        />
        <label
          htmlFor={`subtopics-${subtopic.name}-${subtopic._id}`}
          className={classNames(
            disabled ? "text-gray-400" : "text-gray-900",
            formik.values.selectedSubtopics.findIndex(
              (subtopicName) => subtopicName === subtopic.name
            ) > -1
              ? "font-bold"
              : ""
          )}
        >
          {" "}
          {sentenceToCaps(subtopic.name)}
        </label>
      </div>
      <p className={classNames(disabled ? "text-gray-400" : "text-gray-900")}>
        ({questionCount})
      </p>
    </div>
  );
};

export default TestSuptopicOption;
