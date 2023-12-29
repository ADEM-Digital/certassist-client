import { useAuth0 } from "@auth0/auth0-react";
import { UseQueryResult, useQuery } from "react-query";
import { getDashboardData } from "../../queries/dashboardQueries";
import { UserDataType } from "../../types/UserDataType";

export type DifficultyPerformanceType = {
    _id: "easy" | "medium" | "hard",
    totalQuestions: number;
    correctAnswers: number;
    difficulty: "easy" | "medium" | "hard";
    performance: number
}
export type DashboardDataType = {
    userData: UserDataType,
    questionCount: number,
    difficultyPerformanceResult: DifficultyPerformanceType[]
} 
export const useDashboard = () => {
  const { user } = useAuth0();

  const DashboardDataQuery: UseQueryResult<DashboardDataType> = useQuery(`DashboardData-${user?.sub}`, () => getDashboardData(user?.sub), {
    enabled: user?.sub !== undefined
  })

  return {
    DashboardDataQuery
  }
};
