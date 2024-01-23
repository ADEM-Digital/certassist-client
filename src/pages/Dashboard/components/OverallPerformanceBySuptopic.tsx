import { UseQueryResult } from "react-query";
import SectionHeader from "../../../components/headers/SectionHeader";
import { DashboardDataType } from "../hooks";
import { classNames, sentenceToCaps } from "../../../utils/utils";

type OverallPerformanceBySubTopicProps = {
    DashboardDataQuery: UseQueryResult<DashboardDataType>;
  };

const OverallPerformanceBySuptopic = ({DashboardDataQuery} : OverallPerformanceBySubTopicProps) => {
    const subtopicsPerformance = DashboardDataQuery.data?.subtopicPerformanceResult

  return (
    <div className="bg-white rounded p-10 flex flex-col gap-5 shadow-card flex-1">
      <SectionHeader text="Overall Performance by Difficulty" size="text-2xl" />
      <div>
        {subtopicsPerformance && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-[12.5%]">Topic</th>
                <th className="w-[12.5%] text-center">Percentage</th>
                <th className="hidden lg:table-cell text-left">Performance</th>
              </tr>
            </thead>
            <tbody>
              {subtopicsPerformance &&
                subtopicsPerformance.map((subtopic) => (
                  <tr key={`performance-topic-${subtopic?.subtopic}`}>
                    <td className="font-tables text-button-100 font-extrabold">
                      {subtopic && <span>{sentenceToCaps(subtopic?.subtopic)}</span>}
                    </td>
                    <td className="flex justify-center">
                      {subtopic && (
                        <div
                          className={classNames(
                            subtopic.performance < 0.7
                              ? "bg-grades-low text-white"
                              : "",
                            subtopic.performance >= 0.7 && subtopic.performance < 0.8
                              ? "bg-grades-average text-gray-900"
                              : "",
                            subtopic.performance >= 0.8
                              ? "bg-grades-good text-white"
                              : "",
                            subtopic.performance === undefined
                              ? " bg-button-100 text-white"
                              : "",
                            "py-1.5 px-2.5 font-extrabold rounded-[3px] w-[67px]"
                          )}
                        >
                          {`${(subtopic.performance * 100)
                            .toFixed(0)
                            .toString()
                            .padEnd(3, " ")}%`}
                        </div>
                      )}
                    </td>
                    <td className="hidden lg:table-cell">
                      {subtopic && (
                        <progress
                          className={classNames(
                            subtopic.performance < 0.7 ? "progress-red" : "",
                            subtopic.performance >= 0.7 && subtopic.performance < 0.8
                              ? "progress-yellow"
                              : "",
                            subtopic.performance && subtopic.performance >= 0.8
                              ? "progress-green"
                              : "",

                            "w-full h-[30.87px]"
                          )}
                          value={subtopic.performance}
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

export default OverallPerformanceBySuptopic;
