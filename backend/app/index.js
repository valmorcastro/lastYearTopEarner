const express = require("express");
const transactions = require("./transactions");

const appRouter = express.Router();

appRouter.get("/getTasks", transactions.fetchTransactions);

module.exports = appRouter;