const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://interview.adpeai.com/api/v2",
});

const getTransactions = async () => {
  const response = await axiosInstance.get("/get-task");
  return response;
};

module.exports = { getTransactions };
