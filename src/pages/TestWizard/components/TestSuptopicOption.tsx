import { FormikContextType, useFormikContext } from "formik";
import { TestWizardValuesProps } from "../hooks";
import { classNames } from "../../../utils/utils";

type TestSubtopicOptionProps = {
  subtopic: { id: number; topicId: number; name: string };
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
    if (subtopic.id === 0 && checked) return formik.setFieldValue("selectedSubtopics", ['']);
    console.log(formik.values.selectedSubtopics)
    let newSubtopics = formik.values.selectedSubtopics;
    if (checked) {
      newSubtopics.push(subtopic.name);
    } else {
      let foundIndex = newSubtopics.findIndex((subtopicName) => subtopicName === subtopic.name);
      if (foundIndex > -1) newSubtopics.splice(foundIndex, 1);
    }
    console.log(formik.values)
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
          value={subtopic.id}
          checked={formik.values.selectedSubtopics.findIndex((subtopicName) => subtopicName === subtopic.name) > -1}
        />
        <label
          htmlFor={`subtopics-${subtopic.name}`}
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
          {subtopic.name}
        </label>
      </div>
      <p className={classNames(disabled ? "text-gray-400" : "text-gray-900")}>
        ({questionCount})
      </p>
    </div>
  );
};

export default TestSuptopicOption;
