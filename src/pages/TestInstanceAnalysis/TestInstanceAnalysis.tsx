import { useNavigate, useParams } from "react-router-dom";
import SectionHeader from "../../components/headers/SectionHeader";
import { useTestInstanceAnalysis } from "./hooks";
import OverallPerformance from "./components/OverallPerformance";
import TestInformation from "./components/TestInformation";
import PerformanceByTopic from "./components/PerformanceByTopic";
import PerformanceBySubtopic from "./components/PerformanceBySubtopic";
import MainButton from "../../components/buttons/MainButton";
import DoubleCheckIcon from "../../components/icons/DoubleCheckIcon";

const TestInstanceAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { testQuery } = useTestInstanceAnalysis(id);

  return (
    <div className="py-5 px-10 flex h-full flex-col gap-2.5 overflow-y-auto">
      <header className="flex justify-between">
        <div>
          <SectionHeader text="Test performance" />
          <h2 className=" font-light">
            <strong className=" font-bold">Test ID:</strong> {`${id}`}
          </h2>
        </div>
        <div>
          <MainButton onClick={() => navigate(`/test/${id}`)} icon={<DoubleCheckIcon strokeColor="#FFF"/>} iconDirection={"left"} buttonText="Review" />
        </div>
      </header>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {/* Overall Performance */}
          <OverallPerformance testQuery={testQuery} />

          {/* Test Information */}
          <TestInformation testQuery={testQuery} />
        </div>

        {/* Performance by Topic */}
        <PerformanceByTopic testQuery={testQuery} />
        {/* Performance by Subtopic */}
        <PerformanceBySubtopic testQuery={testQuery} />
      </div>
    </div>
  );
};

export default TestInstanceAnalysis;
