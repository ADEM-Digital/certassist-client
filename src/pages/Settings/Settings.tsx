import SectionHeader from "../../components/headers/SectionHeader"
import CreditCardIcons from "../../components/icons/CreditCardIcons";
import { classNames } from "../../utils/utils";
import Billing from "./components/Billing";
import { useSettings } from "./hooks";

const sidebarMenu = [
    {
      menuName: "Billing",
      icon: <CreditCardIcons />,
    },
  ];


const Settings = () => {
    const {selectedSetting, setSelectedSetting, handleManageSubscription} = useSettings();
  return (
    <div className="py-5 px-5 md:px-10 flex h-full flex-col gap-2.5 overflow-y-auto">
        <SectionHeader text="Settings"/>
        <div className="flex-1 flex">
            {/* Sidebar */}
            <div className="w-[15%] h-full px-2 py-1">
                {sidebarMenu.map((menu) => (
                    <button className={classNames(selectedSetting === menu.menuName ? "bg-gray-200": "", "flex gap-2 w-full py-1 px-4 rounded-md")}>{menu.icon}{menu.menuName}</button>
                ))}
            </div>
            {/* Content */}
            {selectedSetting === "Billing" && (<Billing  handleManageSubscription={handleManageSubscription}/>)}
        </div>
    </div>
  )
}

export default Settings