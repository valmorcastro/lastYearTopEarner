import axios from "axios";

export const getTransactions = async () => {
  try {
    const response = await axios.get("/api/v2/get-task");

    return response;
  } catch (e) {
    return { data: null };
  }
};

export const postTransactions = async (data) => {
  try {
    const response = await axios.post("/api/v2/submit-task", data);

    return response;
  } catch (e) {

    return {
      data: e?.response?.data || null,
      status: e?.status || 500,
    };
  }
};
