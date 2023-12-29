import { UseQueryResult } from "react-query";
import SectionHeader from "../../../components/headers/SectionHeader";
import TestInformationLine from "./TestInformationLine";
import { TestDataType } from "../../tests/hooks";
import { sentenceToCaps, stringToCaps } from "../../../utils/utils";
import moment from "moment";

type TestInformationProps = {
  testQuery: UseQueryResult<TestDataType>;
};

const TestInformation = ({ testQuery }: TestInformationProps) => {
  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5 shadow-card flex-1">
      <SectionHeader text="Test Information" size="text-2xl" />
      {!!testQuery.data && (
        <div className="[&>*]:border-b">
        {/* Line */}
        <TestInformationLine
          description="Selected difficulties"
          value={testQuery.data?.selectedDifficulties.map((difficulty) => difficulty.label).join(", ")}
        />
        <TestInformationLine
          description="Selected question status"
          value={stringToCaps(testQuery.data.selectedQuestionStatus)}
        />
        <TestInformationLine
          description="Selected answer status"
          value={stringToCaps(testQuery.data.selectedAnswerStatus)}
        />
        <TestInformationLine description="Selected mark status" value={stringToCaps(testQuery.data.selectedMarkStatus)} />
        <TestInformationLine description="Selected topics" value={testQuery.data.selectedTopics.map((topic) => stringToCaps(topic)).join(", ")} />
        <TestInformationLine
          description="Selected subtopics"
          value={testQuery.data.selectedSubtopics.map((subtopic) => sentenceToCaps(subtopic)).join(", ")}
        />
        <TestInformationLine description="Test mode" value={stringToCaps(testQuery.data.testMode)} />
        <TestInformationLine description="Questions quantity" value={testQuery.data.questionCount.toString()} />
        <TestInformationLine description="Test time" value={testQuery.data.testTime ? `${testQuery.data.testTime?.toString()} minutes` : "undefined"} />
        <TestInformationLine description="Created at" value={moment(testQuery.data.createdAt).format("MM/DD/YYYY")} />
        <TestInformationLine description="Completed at" value={moment(testQuery.data.updatedAt).format("MM/DD/YYYY")} />
      </div>
      )}
      
    </div>
  );
};

export default TestInformation;
