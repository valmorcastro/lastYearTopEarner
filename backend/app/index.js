const express = require("express");
const transactions = require("./transactions");

const appRouter = express.Router();

appRouter.get("/getTasks", transactions.fetchTransactions);

appRouter.post("/sendTasks", transactions.sendTransactions);

module.exports = appRouter;
