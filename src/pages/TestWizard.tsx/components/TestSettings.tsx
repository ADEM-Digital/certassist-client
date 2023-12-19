import { FormikProps, useFormikContext } from "formik";
import { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { OptionType } from "../../../types/FormTypes";
import { TestWizardValuesProps } from "../hooks";

const animatedComponents = makeAnimated();

const TestSettings = () => {
  const formik: FormikProps<TestWizardValuesProps> = useFormikContext();
  useEffect(() => console.log(formik), [formik]);
  return (
    <div>
      <div className="flex flex-col gap-10">
        {/* Question Difficulty */}
        <div className="flex flex-col gap-10 items-center">
          <label
            htmlFor="difficulty"
            className="font-tables text-3xl font-extrabold"
          >
            Question Difficulty
          </label>
          <Select
            name="selectedDifficulties"
            classNames={{
              container: (state) => "w-[20vw]",
              placeholder: (state) => " text-sm font-tables",
              menuList: (state) => "text-sm font-tables",
            }}
            onChange={(e) =>
              formik.setFieldValue(
                "selectedDifficulties",
                e as OptionType[],
                false
              )
            }
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={null}
            isMulti
            options={[
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            placeholder={"Select a difficulty"}
            value={formik.values.selectedDifficulties}
          />
        </div>
        {/* Question Status */}
        <div className="flex flex-col gap-10 items-center">
          <label
            htmlFor="status"
            className="font-tables text-3xl font-extrabold"
          >
            Question Status
          </label>
          <div className="flex justify-between items-center gap-5">
            <div className="flex gap-1.5 items-center">
              <input
                type="radio"
                name="status"
                id="status-all"
                value="all"
                onChange={(e) =>
                  formik.setFieldValue(
                    "selectedQuestionStatus",
                    e.currentTarget.value,
                    false
                  )
                }
                checked={formik.values.selectedQuestionStatus === "all"}
              />
              <label
                htmlFor="status-all"
                className="font-body text-[16px] font-semibold"
              >
                All
              </label>
            </div>
            <div className="flex gap-1.5 items-center">
              <input
                type="radio"
                name="status"
                id="status-used"
                value="used"
                onChange={(e) =>
                  formik.setFieldValue(
                    "selectedQuestionStatus",
                    e.currentTarget.value,
                    false
                  )
                }
                checked={formik.values.selectedQuestionStatus === "used"}
              />
              <label
                htmlFor="status-used"
                className="font-body text-[16px] font-semibold"
              >
                Used Only
              </label>
            </div>
            <div className="flex gap-1.5 items-center">
              <input
                type="radio"
                name="status"
                id="status-unused"
                value="unused"
                onChange={(e) =>
                  formik.setFieldValue(
                    "selectedQuestionStatus",
                    e.currentTarget.value,
                    false
                  )
                }
                checked={formik.values.selectedQuestionStatus === "unused"}
              />
              <label
                htmlFor="status-unused"
                className="font-body text-[16px] font-semibold"
              >
                Unused Only
              </label>
            </div>
          </div>
        </div>
        {/* Answer Status */}
        <div className="flex flex-col gap-10 items-center">
          <label
            htmlFor="answer-status"
            className="font-tables text-3xl font-extrabold"
          >
            Answer Status
          </label>
          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center gap-5">
              <div className="flex gap-1.5 items-center">
                <input
                  disabled={formik.values?.selectedQuestionStatus === "unused"}
                  type="radio"
                  name="answer-status"
                  id="answer-status-all"
                  value="all"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "selectedAnswerStatus",
                      e.currentTarget.value,
                      false
                    )
                  }
                  checked={formik.values.selectedAnswerStatus === "all"}
                />
                <label
                  htmlFor="answer-status-all"
                  className="font-body text-[16px] font-semibold"
                >
                  All
                </label>
              </div>
              <div className="flex gap-1.5 items-center">
                <input
                  disabled={formik.values?.selectedQuestionStatus === "unused"}
                  type="radio"
                  name="answer-status"
                  id="answer-status-incorrect"
                  value="incorrect"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "selectedAnswerStatus",
                      e.currentTarget.value,
                      false
                    )
                  }
                  checked={formik.values.selectedAnswerStatus === "incorrect"}
                />
                <label
                  htmlFor="answer-status-incorrect"
                  className="font-body text-[16px] font-semibold"
                >
                  Incorrect Only
                </label>
              </div>
              <div className="flex gap-1.5 items-center">
                <input
                  disabled={formik.values?.selectedQuestionStatus === "unused"}
                  type="radio"
                  name="answer-status"
                  id="answer-status-correct"
                  value="correct"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "selectedAnswerStatus",
                      e.currentTarget.value,
                      false
                    )
                  }
                  checked={formik.values.selectedAnswerStatus === "correct"}
                />
                <label
                  htmlFor="answer-status-correct"
                  className="font-body text-[16px] font-semibold"
                >
                  Correct Only
                </label>
              </div>
            </div>
            <p className="text-disabled-100 font-tables text-xs font-light">
              *This setting does not apply to unused questions
            </p>
          </div>
        </div>
        {/* Mark Status */}
        <div className="flex flex-col gap-10 items-center">
          <label
            htmlFor="mark-status"
            className="font-tables text-3xl font-extrabold"
          >
            Mark Status
          </label>
          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center gap-5">
              <div className="flex gap-1.5 items-center">
                <input
                  disabled={formik.values?.selectedQuestionStatus === "unused"}
                  type="radio"
                  name="mark-status"
                  id="mark-status-all"
                  value="all"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "selectedMarkStatus",
                      e.currentTarget.value,
                      false
                    )
                  }
                  checked={formik.values.selectedMarkStatus === "all"}
                />
                <label
                  htmlFor="mark-status-all"
                  className="font-body text-[16px] font-semibold"
                >
                  All
                </label>
              </div>
              <div className="flex gap-1.5 items-center">
                <input
                  disabled={formik.values?.selectedQuestionStatus === "unused"}
                  type="radio"
                  name="mark-status"
                  id="mark-status-marked"
                  value="marked"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "selectedMarkStatus",
                      e.currentTarget.value,
                      false
                    )
                  }
                  checked={formik.values.selectedMarkStatus === "marked"}
                />
                <label
                  htmlFor="mark-status-marked"
                  className="font-body text-[16px] font-semibold"
                >
                  Marked Only
                </label>
              </div>
              <div className="flex gap-1.5 items-center">
                <input
                  disabled={formik.values?.selectedQuestionStatus === "unused"}
                  type="radio"
                  name="mark-status"
                  id="mark-status-unmarked"
                  value="unmarked"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "selectedMarkStatus",
                      e.currentTarget.value,
                      false
                    )
                  }
                  checked={formik.values.selectedMarkStatus === "unmarked"}
                />
                <label
                  htmlFor="mark-status-unmarked"
                  className="font-body text-[16px] font-semibold"
                >
                  Unmarked Only
                </label>
              </div>
            </div>
            <p className="text-disabled-100 font-tables text-xs font-light">
              *This setting does not apply to unused questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSettings;
