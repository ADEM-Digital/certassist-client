import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

type SettingStateType = "Billing";

export const useSettings = () => {
  const { user } = useAuth0();
  const [selectedSetting, setSelectedSetting] =
    useState<SettingStateType>("Billing");

  const handleManageSubscription = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-customer-portal-session`,
        {
            email: user?.email,
            return_url: window.location.origin
        }
      );

      if (response.status === 200) {
        window.location = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    selectedSetting,
    setSelectedSetting,
    handleManageSubscription,
  };
};
