import { UseQueryResult } from "react-query";
import { TestDataType } from "../../tests/hooks";
import SectionHeader from "../../../components/headers/SectionHeader";
import { classNames, sentenceToCaps } from "../../../utils/utils";

type PerformanceByTopicProps = {
  testQuery: UseQueryResult<TestDataType>;
};

const PerformanceByTopic = ({ testQuery }: PerformanceByTopicProps) => {
  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5 shadow-card">
      <SectionHeader text="Performance by Topic" size="text-2xl" />
      <div>
        {!!testQuery.data && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-[12.5%]">Topic</th>
                <th className="w-[12.5%] text-center">Percentage</th>
                <th className="text-left">Performance</th>
                <th className="w-[12.5%]">Questions</th>
              </tr>
            </thead>
            <tbody>
              {testQuery.data.analysis &&
                testQuery.data.analysis.topicsAnalysis.map((topic) => (
                  <tr key={`performance-topic-${topic?.topic}`}>
                    <td className="font-tables text-button-100 font-extrabold">
                        {topic && (<span>{sentenceToCaps(topic?.topic)}</span>)}
                      
                    </td>
                    <td className="flex justify-center">
                      {topic && (
                        <div
                          className={classNames(
                            topic.score < 0.7 ? "bg-grades-low text-white" : "",
                            topic.score >= 0.7 && topic.score < 0.8
                              ? "bg-grades-average text-gray-900"
                              : "",
                            topic.score >= 0.8
                              ? "bg-grades-good text-white"
                              : "",
                            testQuery.data.grade === undefined
                              ? " bg-button-100 text-white"
                              : "",
                            "py-1.5 px-2.5 font-extrabold rounded-[3px] w-[67px]"
                          )}
                        >
                          {`${(topic.score * 100).toFixed(0).toString().padEnd(3, " ")}%`}
                        </div>
                      )}
                    </td>
                    <td className="">
                      {topic && (
                        <progress
                          className={classNames(
                            topic.score < 0.7 ? "progress-red" : "",
                            topic.score >= 0.7 && topic.score < 0.8
                              ? "progress-yellow"
                              : "",
                            topic.score && topic.score >= 0.8
                              ? "progress-green"
                              : "",

                            "w-full h-[30.87px]"
                          )}
                          value={topic.score}
                        />
                      )}
                    </td>
                    <td>
                      {topic && (
                        <span>
                          {topic?.correctCount}/
                          {topic?.correctCount + topic?.incorrectCount}
                        </span>
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

export default PerformanceByTopic;
