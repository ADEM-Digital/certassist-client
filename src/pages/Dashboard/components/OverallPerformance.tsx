import { useEffect, useRef, useState } from "react";
import SectionHeader from "../../../components/headers/SectionHeader";
import { Doughnut } from "react-chartjs-2";
import Chart, { CategoryScale } from "chart.js/auto";
import { parseUserDataToStats } from "../../../utils/utils";
import { UseQueryResult } from "react-query";
import { DashboardDataType } from "../hooks";
import NoDataOverlay from "./NoDataOverlay";

Chart.register(CategoryScale);

type OverallPerformanceProps = {
  DashboardDataQuery: UseQueryResult<DashboardDataType>;
};
const OverallPerformance = ({
  DashboardDataQuery,
}: OverallPerformanceProps) => {
  const chart = useRef();
  const [parsedUserData, setParsedUserData] = useState<
    | {
        totalQuestions: number;
        percentageCorrect: string;
        percentageIncorrect: string;
        correctCount: number;
        incorrectCount: number;
      }
    | undefined
  >();

  useEffect(() => {
    setParsedUserData(parseUserDataToStats(DashboardDataQuery.data?.userData));
  }, [DashboardDataQuery.data]);

  return (
    <div className="overall-performance relative bg-white rounded p-10 flex flex-col gap-5 shadow-card w-full md:w-[40vw] z-[1]">
      <SectionHeader text="Overall Performance" size="text-2xl" />
      {/* Insert overlay div when user has no test data */}
      {parsedUserData?.percentageCorrect === "NaN" &&
        parsedUserData.percentageIncorrect === "NaN" && (
          <NoDataOverlay />
        )}

      <div className="flex gap-4 lg:gap-32">
        <div className="h-[30vw] md:h-[15vw]">
          {parsedUserData && (
            <Doughnut
              ref={chart}
              data={{
                labels: ["Correct", "Incorrect"],
                datasets: [
                  {
                    label: "Test Performance",
                    data: [
                      parsedUserData.percentageCorrect !== "NaN"
                        ? parsedUserData?.percentageCorrect
                        : "0",
                      parsedUserData.percentageIncorrect !== "NaN"
                        ? parsedUserData?.percentageIncorrect
                        : "100",
                    ],
                    backgroundColor: ["#00a670", "#CC3F4B"],
                    hoverOffset: 4,
                  },
                ],
              }}
              options={{
                cutout: "65%",
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false, position: "right" },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || "";

                        if (label) {
                          label = " "; // Set label to an empty string to hide it
                        }
                        if (context.parsed !== null) {
                          label += context.parsed;
                        }
                        return label;
                      },
                    },
                  },
                },
              }}
              plugins={[
                {
                  id: "centerText",
                  afterDraw: (chart: Chart<"doughnut", number[], unknown>) => {
                    let width = chart.width,
                      height = chart.height,
                      ctx = chart.ctx;

                    ctx.restore();
                    let fontSize = (height / 114).toFixed(2);
                    ctx.font = `800 ${fontSize}em Roboto`;
                    ctx.textBaseline = "middle";

                    let text = `${
                        parsedUserData?.percentageCorrect !== "NaN"
                          ? parsedUserData.percentageCorrect
                          : "0"
                      }%`, // Your dynamic value goes here
                      textX = Math.round(
                        (width - ctx.measureText(text).width) / 2
                      ),
                      textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                  },
                },
              ]}
              height={"100%"}
            />
          )}
        </div>
        <div className="md:flex-1 h-full flex flex-col justify-around">
          <div className=" font-body text-xs flex gap-1 items-center text-center justify-between">
            <div className="font-body flex gap-1 items-center text-center">
              <div className=" w-4 h-4 bg-grades-good rounded-sm"></div>
              <p className=" font-normal leading-normal">
                {parsedUserData?.correctCount}
                <span className=" font-light"> answered correctly.</span>
              </p>
            </div>
            {/* <p className=" font-extrabold leading-normal">
              {50}%
            </p> */}
          </div>
          <div className=" font-body text-xs flex gap-1 items-center text-center justify-between">
            <div className="font-body flex gap-1 items-center text-center">
              <div className=" w-4 h-4 bg-grades-low rounded-sm"></div>
              <p className=" font-normal leading-normal">
                {parsedUserData?.incorrectCount}
                <span className=" font-light"> answered incorrectly.</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <SectionHeader text="USMLE Step 1" size={"text-lg"} />
            <p className="font-body font-light text-sm">
              You have used{" "}
              <span className=" font-extrabold">
                {parsedUserData?.totalQuestions}
              </span>{" "}
              of{" "}
              <span className=" font-extrabold">
                {DashboardDataQuery.data?.questionCount.toLocaleString()}
              </span>{" "}
              questions from the QBank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallPerformance;
