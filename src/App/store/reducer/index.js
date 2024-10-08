import { combineReducers } from "@reduxjs/toolkit";
import clientContext from "./client";
import transactionsContext from "./transactions";

const reducer = combineReducers({ clientContext, transactionsContext });

export default reducer;
