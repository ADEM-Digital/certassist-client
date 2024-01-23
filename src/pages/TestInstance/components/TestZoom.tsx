import { Context, useContext } from "react";
import { classNames } from "../../../utils/utils";
import { TestInstanceContext, TestInstanceContextType } from "../hooks";

const TestZoom = () => {
  const { selectedZoom, setSelectedZoom } = useContext(
    TestInstanceContext as Context<TestInstanceContextType>
  );
  return (
    <div className="px-[8px] mx-[6.5px] flex flex-col items-center text-shadow justify-center text-sm">
      <div className="flex items-stretch justify-center mt-[2px] mx-0 mb-[1px] h-[28px]">
        <button
          onClick={() => setSelectedZoom("zoom1")}
          className={classNames(
            selectedZoom === "zoom1" ? "bg-[#D7DCED] text-gray-900" : "",
            " rounded-tl-[6px] rounded-bl-[6px] border border-[#FCFCFC] text-[11px] w-[22px] font-extrabold"
          )}
        >
          A
        </button>
        <button
          onClick={() => setSelectedZoom("zoom2")}
          className={classNames(
            selectedZoom === "zoom2" ? "bg-[#D7DCED] text-gray-900" : "",
            "border-t border-b [#FCFCFC] text-[18px] w-[22px] font-semibold"
          )}
        >
          A
        </button>
        <button
          onClick={() => setSelectedZoom("zoom3")}
          className={classNames(
            selectedZoom === "zoom3" ? "bg-[#D7DCED] text-gray-900" : "",
            " rounded-tr-[6px] rounded-br-[6px] border border-[#FCFCFC] text-[26px] w-[22px] font-bold"
          )}
        >
          A
        </button>
      </div>
      <span className="hidden lg:block">Text Zoom</span>
    </div>
  );
};

export default TestZoom;
