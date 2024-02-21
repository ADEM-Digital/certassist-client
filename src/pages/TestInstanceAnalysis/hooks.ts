import { UseQueryResult, useMutation, useQuery } from "react-query";
import { getTest, updateTestAnalysis } from "../../queries/testQueries";
import { TestDataType } from "../tests/hooks";
import { useEffect } from "react";

export const useTestInstanceAnalysis = (testId: string | undefined) => {
  const testQuery: UseQueryResult<TestDataType> = useQuery(
    "testAnalysisData",
    () => getTest(testId)
  );

  const updateTestAnalysisMutation = useMutation({
    mutationFn: () => updateTestAnalysis(testId),
    onSuccess: () => {
      testQuery.refetch()
    },
  });

  useEffect(() => {
    if (
      testQuery.data?.analysis === null ||
      testQuery.data?.analysis === undefined
    ) {
      updateTestAnalysisMutation.mutate();
    }
  }, [testQuery.data]);

  useEffect(() => {
    return () => testQuery.remove();
  }, [])

  return {
    testQuery,
  };
};
