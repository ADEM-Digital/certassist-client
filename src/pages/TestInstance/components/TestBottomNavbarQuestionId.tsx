import { Context, useContext } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";

const TestBottomNavbarQuestionId = () => {
  const { questionQuery } = useContext(
    TestInstanceContext as Context<TestInstanceContextType>
  );
  return (
    <div className="hidden md:flex flex-col justify-center py-[3px] px-[5px] whitespace-nowrap border-t border-l border-[#5872C4] h-full">
      <p className=" text-sm text-center select-none">Question ID: {questionQuery.data?._id}</p>
    </div>
  );
};

export default TestBottomNavbarQuestionId;
