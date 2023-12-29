import SectionHeader from "../../components/headers/SectionHeader";

import { useDashboard } from "./hooks";

import OverallPerformance from "./components/OverallPerformance";
import OverallPerformanceByDifficulty from "./components/OverallPerformanceByDifficulty";

const Dashboard = () => {
  const { DashboardDataQuery } = useDashboard();
  return (
    <>
      {DashboardDataQuery && (
        <div className="py-5 px-10 flex h-full flex-col gap-2.5 overflow-y-auto">
          <SectionHeader text="Dashboard" />
          <div className="flex gap-2.5">
            <OverallPerformance DashboardDataQuery={DashboardDataQuery} />
            <OverallPerformanceByDifficulty DashboardDataQuery={DashboardDataQuery}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
