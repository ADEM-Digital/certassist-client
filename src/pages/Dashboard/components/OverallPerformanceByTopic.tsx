import { UseQueryResult } from "react-query";
import SectionHeader from "../../../components/headers/SectionHeader";
import { classNames, sentenceToCaps } from "../../../utils/utils";
import { DashboardDataType } from "../hooks";
import { useEffect } from "react";
import NoDataOverlay from "./NoDataOverlay";
type OverallPerformanceByTopicProps = {
  DashboardDataQuery: UseQueryResult<DashboardDataType>;
};

const dummyPerformance = [
  {
    _id: "anatomy",
    totalQuestions: 27,
    correctAnswers: 6,
    topic: "anatomy",
    performance: 0.2222222222222222,
  },
  {
    _id: "pharmacology",
    totalQuestions: 10,
    correctAnswers: 4,
    topic: "pharmacology",
    performance: 0.4,
  },
  {
    _id: "pathology",
    totalQuestions: 10,
    correctAnswers: 1,
    topic: "pathology",
    performance: 0.1,
  },
];

const OverallPerformanceByTopic = ({
  DashboardDataQuery,
}: OverallPerformanceByTopicProps) => {
  const topicsPerformance = DashboardDataQuery.data?.topicPerformanceResult;
  useEffect(() => {
    console.log(topicsPerformance);
  }, [topicsPerformance]);
  return (
    <div className="relative bg-white rounded p-10 flex flex-col gap-5 shadow-card w-full md:w-[40vw]">
      <div className="performance-topic">
        <SectionHeader text="Overall Performance by Topic" size="text-2xl" />
      </div>

      {topicsPerformance && topicsPerformance.length < 1 && <NoDataOverlay />}
      <div>
        {topicsPerformance && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-[12.5%]">Topic</th>
                <th className="w-[12.5%] text-center">Percentage</th>
                <th className="hidden lg:table-cell text-left">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topicsPerformance &&
                topicsPerformance.map((topic) => (
                  <tr key={`performance-topic-${topic?.topic}`}>
                    <td className="font-tables text-button-100 font-extrabold">
                      {topic.topic && (
                        <span>{sentenceToCaps(topic?.topic)}</span>
                      )}
                    </td>
                    <td className="flex justify-center">
                      {topic && (
                        <div
                          className={classNames(
                            topic.performance < 0.7
                              ? "bg-grades-low text-white"
                              : "",
                            topic.performance >= 0.7 && topic.performance < 0.8
                              ? "bg-grades-average text-gray-900"
                              : "",
                            topic.performance >= 0.8
                              ? "bg-grades-good text-white"
                              : "",
                            topic.performance === undefined
                              ? " bg-button-100 text-white"
                              : "",
                            "py-1.5 px-2.5 font-extrabold rounded-[3px] w-[67px]"
                          )}
                        >
                          {`${(topic.performance * 100)
                            .toFixed(0)
                            .toString()
                            .padEnd(3, " ")}%`}
                        </div>
                      )}
                    </td>
                    <td className="hidden lg:table-cell">
                      {topic && (
                        <progress
                          className={classNames(
                            topic.performance < 0.7 ? "progress-red" : "",
                            topic.performance >= 0.7 && topic.performance < 0.8
                              ? "progress-yellow"
                              : "",
                            topic.performance && topic.performance >= 0.8
                              ? "progress-green"
                              : "",

                            "w-full h-[30.87px]"
                          )}
                          value={topic.performance}
                        />
                      )}
                    </td>
                  </tr>
                ))}

              {topicsPerformance &&
                topicsPerformance.length < 1 &&
                dummyPerformance.map((topic) => (
                  <tr key={`performance-topic-${topic?.topic}`}>
                    <td className="font-tables text-button-100 font-extrabold">
                      {topic.topic && (
                        <span>{sentenceToCaps(topic?.topic)}</span>
                      )}
                    </td>
                    <td className="flex justify-center">
                      {topic && (
                        <div
                          className={classNames(
                            topic.performance < 0.7
                              ? "bg-grades-low text-white"
                              : "",
                            topic.performance >= 0.7 && topic.performance < 0.8
                              ? "bg-grades-average text-gray-900"
                              : "",
                            topic.performance >= 0.8
                              ? "bg-grades-good text-white"
                              : "",
                            topic.performance === undefined
                              ? " bg-button-100 text-white"
                              : "",
                            "py-1.5 px-2.5 font-extrabold rounded-[3px] w-[67px]"
                          )}
                        >
                          {`${(topic.performance * 100)
                            .toFixed(0)
                            .toString()
                            .padEnd(3, " ")}%`}
                        </div>
                      )}
                    </td>
                    <td className="hidden lg:table-cell">
                      {topic && (
                        <progress
                          className={classNames(
                            topic.performance < 0.7 ? "progress-red" : "",
                            topic.performance >= 0.7 && topic.performance < 0.8
                              ? "progress-yellow"
                              : "",
                            topic.performance && topic.performance >= 0.8
                              ? "progress-green"
                              : "",

                            "w-full h-[30.87px]"
                          )}
                          value={topic.performance}
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OverallPerformanceByTopic;
