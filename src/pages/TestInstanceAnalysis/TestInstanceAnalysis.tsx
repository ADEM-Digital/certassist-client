import Chart from "chart.js/auto";
import { useParams } from "react-router-dom";
import SectionHeader from "../../components/headers/SectionHeader";
import { CategoryScale, Plugin } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import TestInformationLine from "./components/TestInformationLine";
import { classNames } from "../../utils/utils";

const data = {
  labels: ["Correct", "Incorrect"],
  datasets: [
    {
      label: "Test Performance",
      data: [300, 50],
      backgroundColor: ["#00a670", "#CC3F4B"],
      hoverOffset: 4,
    },
  ],
};

Chart.register(CategoryScale);

const centerTextPlugin: Plugin<"doughnut", Object> = {
  id: "centerText",
  afterDraw: (chart: Chart<"doughnut", number[], unknown>) => {
    let width = chart.width,
      height = chart.height,
      ctx = chart.ctx;

    ctx.restore();
    let fontSize = (height / 114).toFixed(2);
    ctx.font = `800 ${fontSize}em Roboto`;
    ctx.textBaseline = "middle";

    let text = "75%", // Your dynamic value goes here
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};
let test = {
  grade: 38,
};
const TestInstanceAnalysis = () => {
  const { id } = useParams();
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      console.log(chartInstance.current.resize);
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
    <div className="py-5 px-10 flex h-full flex-col gap-2.5 overflow-y-auto">
      <header>
        <SectionHeader text="Test performance" />
        <h2 className=" font-light">
          <strong className=" font-bold">Test ID:</strong> {`${id}`}
        </h2>
      </header>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* Overall Performance */}
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
                  <p className=" font-extrabold leading-normal">344</p>
                </div>
                {/* Incorrect stats */}
                <div className=" font-body text-[0.8vw] flex gap-1 items-center text-center justify-between">
                  <div className="font-body flex gap-1 items-center text-center">
                    <div className=" w-4 h-4 bg-grades-low rounded-sm"></div>
                    <p className=" font-normal leading-normal">Incorrect</p>
                  </div>
                  <p className=" font-extrabold leading-normal">344</p>
                </div>
              </div>
              {/* Graph */}
              <div className="h-[15vw]">
                <Doughnut
                  ref={chartInstance}
                  data={data}
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
                  plugins={[centerTextPlugin]}
                  height={"100%"}
                />
              </div>
            </div>
          </div>

          {/* Test Information */}
          <div className="bg-white rounded p-5 flex flex-col gap-5 shadow-card flex-1">
            <SectionHeader text="Test Information" size="text-2xl" />
            <div className="[&>*]:border-b">
              {/* Line */}
              <TestInformationLine
                description="Selected difficulties"
                value={"Hard, Medium"}
              />
              <TestInformationLine
                description="Selected question status"
                value={"All"}
              />
              <TestInformationLine
                description="Selected answer status"
                value={"All"}
              />
              <TestInformationLine
                description="Selected mark status"
                value={"All"}
              />
              <TestInformationLine
                description="Selected topics"
                value={"Anatomy"}
              />
              <TestInformationLine
                description="Selected topics"
                value={"Histology, Neck"}
              />
              <TestInformationLine description="Test mode" value={"Timed"} />
              <TestInformationLine
                description="Questions quantity"
                value={"10"}
              />
              <TestInformationLine description="Test time" value={"15"} />
              <TestInformationLine
                description="Created at"
                value={"12/28/2023"}
              />
              <TestInformationLine
                description="Completed at"
                value={"12/28/2023"}
              />
            </div>
          </div>
        </div>

        {/* Performance by Topic */}
        <div className="bg-white rounded p-5 flex flex-col gap-5 shadow-card">
          <SectionHeader text="Performance by Topic" size="text-2xl" />
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[12.5%]">Topic</th>
                  <th className="w-[12.5%]">Percentage</th>
                  <th className="text-left">Performance</th>
                  <th className="w-[12.5%]">Questions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-tables text-button-100 font-extrabold">
                    Surgery
                  </td>
                  <td className="">
                    <span
                      className={classNames(
                        test.grade && test.grade < 70
                          ? "bg-grades-low text-white"
                          : "",
                        test.grade && test.grade >= 70 && test.grade < 80
                          ? "bg-grades-average text-gray-900"
                          : "",
                        test.grade && test.grade >= 80
                          ? "bg-grades-good text-white"
                          : "",
                        test.grade === undefined
                          ? " bg-button-100 text-white"
                          : "",
                        "py-1.5 px-2.5 font-extrabold rounded-[3px]"
                      )}
                    >
                      {test.grade ? `${test.grade}%` : "-"}
                    </span>
                  </td>
                  <td className="flex it">
                    <progress
                      className={classNames(
                        test.grade && test.grade < 70 ? "progress-red" : "",
                        test.grade && test.grade >= 70 && test.grade < 80
                          ? "progress-yellow"
                          : "",
                        test.grade && test.grade >= 80 ? "progress-green" : "",
                        test.grade === undefined ? "progress-blue" : "",
                        "w-full h-[30.87px]"
                      )}
                      value={0.38}
                    />
                  </td>
                  <td>2/3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Performance by Subtopic */}
      </div>
    </div>
  );
};

export default TestInstanceAnalysis;
