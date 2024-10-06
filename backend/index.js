const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const appRouter = require("./app");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/proxy', appRouter);

app.listen(3001);
