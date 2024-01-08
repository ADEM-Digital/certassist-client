import { FormikContextType, useFormikContext } from "formik";
import { TestWizardValuesProps } from "../hooks";
import CreatableSelect from "react-select/creatable";
import { OptionType } from "../../../types/FormTypes";
import { QuestionDataType } from "../../../types/QuestionTypes";
import { availableQuestionOnSelectedTopicsSubtopic } from "../../../utils/utils";
const questionOptions: OptionType[] = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50" },
  { value: "60", label: "60" },
  { value: "70", label: "70" },
  { value: "80", label: "80" },
  { value: "90", label: "90" },
  { value: "100", label: "100" },
];

type TestModeSettingsProps = {
  availableQuestions: QuestionDataType[];
  setAvailableQuestions: React.Dispatch<
    React.SetStateAction<QuestionDataType[]>
  >;
};

const TestModeSetttings = ({
  availableQuestions,
}: TestModeSettingsProps) => {
  const formik: FormikContextType<TestWizardValuesProps> = useFormikContext();
  return (
    <div className="flex flex-col gap-10">
      {/* Test Mode */}
      <div className="flex flex-col gap-10 items-center">
        <label
          htmlFor="test-mode"
          className="font-tables text-3xl font-extrabold"
        >
          Test Mode
        </label>
        <div className="flex justify-between items-center gap-5">
          <div className="flex gap-1.5 items-center">
            <input
              type="radio"
              name="test-mode"
              id="test-mode-tutor"
              value="tutor"
              onChange={(e) =>
                formik.setFieldValue("testMode", e.currentTarget.value, false)
              }
              checked={formik.values.testMode === "tutor"}
            />
            <label
              htmlFor="test-mode-tutor"
              className="font-body text-[16px] font-semibold"
            >
              Tutor
            </label>
          </div>
          <div className="flex gap-1.5 items-center">
            <input
              type="radio"
              name="test-mode"
              id="test-mode-timed"
              value="timed"
              onChange={(e) =>
                formik.setFieldValue("testMode", e.currentTarget.value, false)
              }
              checked={formik.values.testMode === "timed"}
            />
            <label
              htmlFor="test-mode-timed"
              className="font-body text-[16px] font-semibold"
            >
              Timed
            </label>
          </div>
          <div className="flex gap-1.5 items-center">
            <input
              type="radio"
              name="test-mode"
              id="test-mode-untimed"
              value="untimed"
              onChange={(e) =>
                formik.setFieldValue("testMode", e.currentTarget.value, false)
              }
              checked={formik.values.testMode === "untimed"}
            />
            <label
              htmlFor="test-mode-untimed"
              className="font-body text-[16px] font-semibold"
            >
              Untimed
            </label>
          </div>
        </div>
      </div>

      {/* Test Name */}
      <div className="flex flex-col gap-10 items-center">
        <label
          htmlFor="test-name"
          className="font-tables text-3xl font-extrabold"
        >
          Test Name
        </label>
        <input
          type="text"
          placeholder="Enter a name for the test"
          className="bg-transparent border-0 border-b border-border-300  w-[30vw] focus:ring-0"
          value={formik.values.testName}
          onChange={(e) =>
            formik.setFieldValue("testName", e.currentTarget.value)
          }
        />
      </div>

      {/* Test questions*/}
      <div className="flex flex-col gap-10 items-center">
        <label
          htmlFor="test-questions"
          className="font-tables text-3xl font-extrabold"
        >
          Number of Questions
        </label>
        <div className="flex flex-col gap-5">
          <CreatableSelect
            value={
              formik.values.questionCount && Number(formik.values.questionCount.value) >
              availableQuestionOnSelectedTopicsSubtopic(
                availableQuestions,
                formik.values.selectedTopics,
                formik.values.selectedSubtopics
              )
                ? {
                    label: availableQuestionOnSelectedTopicsSubtopic(
                      availableQuestions,
                      formik.values.selectedTopics,
                      formik.values.selectedSubtopics
                    ),
                    value: availableQuestionOnSelectedTopicsSubtopic(
                      availableQuestions,
                      formik.values.selectedTopics,
                      formik.values.selectedSubtopics
                    ),
                  }
                : formik.values.questionCount
            }
            onChange={(e) => formik.setFieldValue("questionCount", e)}
            isClearable
            options={questionOptions}
            defaultValue={questionOptions[0]}
            placeholder={"Select an amount"}
            classNames={{
              container: () => "w-[10vw]",
              placeholder: () => " text-sm font-tables",
              menuList: () => "text-sm font-tables h-[20vh]",
            }}
          />
          <p className="font-semibold font-tables text-sm">
            *Max 100 questions per test
          </p>
          <p className="font-light font-tables text-sm">
            Total available questions:{" "}
            <span className="font-extrabold">
              {availableQuestionOnSelectedTopicsSubtopic(
                availableQuestions,
                formik.values.selectedTopics,
                formik.values.selectedSubtopics
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestModeSetttings;
