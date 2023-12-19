import moment from "moment";
import { Context, useContext, useEffect, useState } from "react";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";

const TestBottomNavbarBlockTime = () => {
  const { testEndTime } = useContext(
    TestInstanceContext as Context<TestInstanceContextType>
  );
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(moment(testEndTime).diff(moment.now(), "seconds"));
  }, [testEndTime]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);
  return (
    <div className="flex flex-col justify-center py-[3px] px-[5px] whitespace-nowrap border-t border-l border-[#5872C4] h-full">
      <p className=" text-sm text-center select-none">
        Block Time Remaining:{" "}
        {`${String(moment.duration(timeLeft, "seconds").minutes()).padStart(
          2,
          "0"
        )}:${String(moment.duration(timeLeft, "seconds").seconds()).padStart(
          2,
          "0"
        )}`}
      </p>
    </div>
  );
};

export default TestBottomNavbarBlockTime;
