import axios, { AxiosResponse } from "axios";
import { TestDataType } from "../pages/tests/hooks";

export const getTest = async (testId: string | undefined) => {
  if (testId) {
    try {
      let response: AxiosResponse<TestDataType> = await axios.get(
        `${import.meta.env.VITE_API_URL}/tests/${testId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateTestAnalysis = async (testId: string | undefined) => {
  if (testId) {
    try {
      let response: AxiosResponse<TestDataType> = await axios.put(
        `${import.meta.env.VITE_API_URL}/tests/update-analysis/${testId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
