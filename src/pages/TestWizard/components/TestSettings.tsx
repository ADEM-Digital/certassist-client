import { FormikProps, useFormikContext } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { OptionType } from "../../../types/FormTypes";
import { TestWizardValuesProps } from "../hooks";
import { UseQueryResult } from "react-query";
import { useEffect } from "react";

type TestSettingsProps = {
  userDataQuery: UseQueryResult<any, unknown>;
};

const animatedComponents = makeAnimated();

const TestSettings = ({ userDataQuery }: TestSettingsProps) => {
  const formik: FormikProps<TestWizardValuesProps> = useFormikContext();

  useEffect(() => {
    console.log(formik.values.selectedDifficulties)
    if (formik.values.selectedDifficulties.length === 0) {
      formik.setFieldValue("selectedDifficulties", [
        { value: "all", label: "All" },
      ]);
    } else if (
      formik.values.selectedDifficulties.length > 1 &&
      formik.values.selectedDifficulties.findIndex(
        (diff) => diff.value === "all"
      ) > -1
    ) {
      formik.setFieldValue(
        "selectedDifficulties",
        formik.values.selectedDifficulties.filter(
          (diff) => diff.value !== "all"
        )
      );
    }
  }, [formik]);

 
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
              container: () => "w-full md:w-[20vw]",
              placeholder: () => " text-sm font-tables",
              menuList: () => "text-sm font-tables",
            }}
            onChange={(value, meta) => {
          
              if (meta.option?.value === "all") {
                return formik.setFieldValue("selectedDifficulties", [{label: "All", value: "all"}])
              }

              formik.setFieldValue(
                "selectedDifficulties",
                value as OptionType[],
                false
              );
            }}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={[
              { value: "all", label: "All" },
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
                disabled={
                  userDataQuery.data && userDataQuery.data[0].usedQuestions
                    ? userDataQuery.data[0].usedQuestions.length === 0
                    : false
                }
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
                onChange={(e) => {
                  formik.setFieldValue("selectedAnswerStatus", "all");
                  formik.setFieldValue("selectedMarkStatus", "all");
                  formik.setFieldValue(
                    "selectedQuestionStatus",
                    e.currentTarget.value,
                    false
                  );
                }}
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
                  disabled={
                    formik.values?.selectedQuestionStatus === "unused" ||
                    (userDataQuery.data &&
                    userDataQuery?.data[0]?.incorrectQuestions
                      ? userDataQuery?.data[0]?.incorrectQuestions.length === 0
                      : false)
                  }
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
                  disabled={
                    formik.values?.selectedQuestionStatus === "unused" ||
                    (userDataQuery.data &&
                    userDataQuery.data[0]?.correctQuestions
                      ? userDataQuery.data[0].correctQuestions.length === 0
                      : false)
                  }
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
                  disabled={
                    formik.values?.selectedQuestionStatus === "unused" ||
                    (userDataQuery.data &&
                    userDataQuery.data[0]?.markedQuestions
                      ? userDataQuery.data[0].markedQuestions.length === 0
                      : false)
                  }
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
                  disabled={
                    formik.values?.selectedQuestionStatus === "unused" ||
                    (userDataQuery.data &&
                    userDataQuery.data[0]?.markedQuestions
                      ? userDataQuery.data[0].markedQuestions.length === 0
                      : false)
                  }
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
