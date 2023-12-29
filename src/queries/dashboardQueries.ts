import axios from "axios";

export const getDashboardData = async (userId: string | undefined) => {
  if (!userId) return;
  try {
    let response = await axios.post(`${import.meta.env.VITE_API_URL}/dashboardData`, {
      userId,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
