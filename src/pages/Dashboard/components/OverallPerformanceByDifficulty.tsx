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
import NoDataOverlay from "./NoDataOverlay";

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

// dummy data
const dummy_easy = {
  _id: "easy",
  totalQuestions: 8,
  correctAnswers: 2,
  difficulty: "easy",
  performance: 0.25,
};

const dummy_medium = {
  _id: "medium",
  totalQuestions: 23,
  correctAnswers: 7,
  difficulty: "medium",
  performance: 0.30434782608695654,
};

const dummy_hard = {
  _id: "hard",
  totalQuestions: 16,
  correctAnswers: 2,
  difficulty: "hard",
  performance: 0.125,
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
    <div className="performance-difficulty relative bg-white rounded p-10 flex flex-col gap-5 shadow-card md:flex-1 h-[40vh] md:h-full">
      <SectionHeader text="Overall Performance by Difficulty" size="text-2xl" />
      {!difficultyPerformaceEasy &&
        !difficultyPerformaceMedium &&
        !difficultyPerformaceHard && (
          <NoDataOverlay />
        )}
      <Bar
        data={{
          datasets: [
            {
              data: [
                (difficultyPerformaceEasy
                  ? difficultyPerformaceEasy.performance * 100
                  : dummy_easy.performance * 100
                ).toFixed(0),
                (difficultyPerformaceMedium
                  ? difficultyPerformaceMedium.performance * 100
                  : dummy_medium.performance * 100
                ).toFixed(0),
                (difficultyPerformaceHard
                  ? difficultyPerformaceHard.performance * 100
                  : dummy_hard.performance * 100
                ).toFixed(0),
              ],
              label: "Correct",
              backgroundColor: "#00a670",
            },
            {
              data: [
                (difficultyPerformaceEasy
                  ? (1 - difficultyPerformaceEasy.performance) * 100
                  : (1 - dummy_easy.performance) * 100
                ).toFixed(0),
                (difficultyPerformaceMedium
                  ? (1 - difficultyPerformaceMedium.performance) * 100
                  : (1 - dummy_medium.performance) * 100
                ).toFixed(0),
                (difficultyPerformaceHard
                  ? (1 - difficultyPerformaceHard.performance) * 100
                  : (1 - dummy_hard.performance) * 100
                ).toFixed(0),
              ],
              label: "Incorrect",
              backgroundColor: "#CC3F4B",
            },
          ],
          labels: ["Easy", "Medium", "Hard"],
        }}
        height={window.innerWidth < 1024 ? "200" : "100"}
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
    </div>
  );
};

export default OverallPerformanceByDifficulty;
