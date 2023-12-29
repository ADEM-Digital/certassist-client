import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import SectionHeader from "../../../components/headers/SectionHeader";
import { UseQueryResult } from "react-query";
import { DashboardDataType, DifficultyPerformanceType } from "../hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(CategoryScale, BarElement, LinearScale);

type OverallPerformanceByDifficultyProps = {
  DashboardDataQuery: UseQueryResult<DashboardDataType>;
};

const OverallPerformanceByDifficulty = ({
  DashboardDataQuery,
}: OverallPerformanceByDifficultyProps) => {
  // const chart = useRef();

  const [difficultyPerformaceEasy, setDifficultyPerformanceEasy] =
    useState<DifficultyPerformanceType>();
  const [difficultyPerformaceMedium, setDifficultyPerformanceMedium] =
    useState<DifficultyPerformanceType>();
  const [difficultyPerformaceHard, setDifficultyPerformanceHard] =
    useState<DifficultyPerformanceType>();

  useEffect(() => {
    if (DashboardDataQuery.data) {
      DashboardDataQuery.data.difficultyPerformanceResult.forEach((perf) => {
        if (perf.difficulty === "easy") {
          setDifficultyPerformanceEasy(perf);
        } else if (perf.difficulty === "medium") {
          setDifficultyPerformanceMedium(perf);
        } else if (perf.difficulty === "hard") {
          setDifficultyPerformanceHard(perf);
        }
      });
    }
  }, [DashboardDataQuery.data]);
  return (
    <div className="bg-white rounded p-10 flex flex-col gap-5 shadow-card flex-1">
      <SectionHeader text="Overall Performance by Difficulty" size="text-2xl" />
      {difficultyPerformaceEasy &&
        difficultyPerformaceMedium &&
        difficultyPerformaceHard && (
          <Bar
            data={{
              datasets: [
                {
                  data: [
                    (difficultyPerformaceEasy.performance * 100).toFixed(0),
                    (difficultyPerformaceMedium.performance * 100).toFixed(0),
                    (difficultyPerformaceHard.performance * 100).toFixed(0),
                  ],
                  label: "Correct",
                  backgroundColor: "#00a670",
                },
                {
                  data: [
                    ((1 - difficultyPerformaceEasy.performance) * 100).toFixed(0),
                    ((1 - difficultyPerformaceMedium.performance) * 100).toFixed(0),
                    ((1 - difficultyPerformaceHard.performance) * 100).toFixed(0)],
                  label: "Incorrect",
                  backgroundColor: "#CC3F4B",
                },
              ],
              labels: ["Easy", "Medium", "Hard"],
            }}
            height={"100"}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                y: {
                  type: "linear",
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    stepSize: 10,
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                title: {
                  display: false,
                  text: "Chart.js Bar Chart",
                },
              },
            }}
          />
        )}
    </div>
  );
};

export default OverallPerformanceByDifficulty;
