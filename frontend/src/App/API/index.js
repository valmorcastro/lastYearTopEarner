import axios from "axios";

//in case of an external provider, axios instance can be configured with baseURL and required headers
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/proxy",
});

export const getTransactions = async () => {
  try {
    const response = await axios.get("/proxy/getTasks");
    return response;
  } catch (e) {
    return { data: null };
  }
};
