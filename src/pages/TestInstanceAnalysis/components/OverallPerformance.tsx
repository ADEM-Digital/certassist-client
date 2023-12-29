import { UseQueryResult } from "react-query";
import SectionHeader from "../../../components/headers/SectionHeader";
import { TestDataType } from "../../tests/hooks";
import { testCorrectIncorrectCount } from "../../../utils/utils";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import Chart, { CategoryScale } from "chart.js/auto";

type OverallPerformanceProps = {
  testQuery: UseQueryResult<TestDataType>;
};

Chart.register(CategoryScale);

const OverallPerformance = ({ testQuery }: OverallPerformanceProps) => {
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      chartInstance.current.clear(); // where chartInstance is your chart instance
      chartInstance.current.resize(
        window.innerWidth * 0.15,
        window.innerWidth * 0.15
      ); // where chartInstance is your chart instance
      chartInstance.current.render(); // where chartInstance is your chart instance
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chartInstance]);

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5 shadow-card w-[50vw]">
      <SectionHeader text="Overall Performance" size="text-2xl" />
      <div className="flex-1 flex items-center justify-center gap-16">
        {/* Number stats */}
        <div className="flex flex-col gap-16 w-[10vw]">
          {/* Correct stats */}
          <div className=" font-body text-[0.8vw] flex gap-1 items-center text-center justify-between">
            <div className="font-body flex gap-1 items-center text-center">
              <div className=" w-4 h-4 bg-grades-good rounded-sm"></div>
              <p className=" font-normal leading-normal">Correct</p>
            </div>
            <p className=" font-extrabold leading-normal">
              {testQuery.data
                ? testCorrectIncorrectCount(testQuery.data).correct
                : "NaN"}
            </p>
          </div>
          {/* Incorrect stats */}
          <div className=" font-body text-[0.8vw] flex gap-1 items-center text-center justify-between">
            <div className="font-body flex gap-1 items-center text-center">
              <div className=" w-4 h-4 bg-grades-low rounded-sm"></div>
              <p className=" font-normal leading-normal">Incorrect</p>
            </div>
            <p className=" font-extrabold leading-normal">
              {testQuery.data
                ? testCorrectIncorrectCount(testQuery.data).incorrect
                : "NaN"}
            </p>
          </div>
        </div>
        {/* Graph */}
        <div className="h-[15vw]">
          {!!testQuery.data && (
            <Doughnut
              ref={chartInstance}
              data={{
                labels: ["Correct", "Incorrect"],
                datasets: [
                  {
                    label: "Test Performance",
                    data: [
                      testCorrectIncorrectCount(testQuery.data).correct,
                      testCorrectIncorrectCount(testQuery.data).incorrect,
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
                  legend: { display: false },
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

                    let text = `${testQuery.data.grade?.toFixed(0)}%`, // Your dynamic value goes here
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
      </div>
    </div>
  );
};

export default OverallPerformance;
