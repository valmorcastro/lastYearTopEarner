import { ALPHA_TYPE, amountOrZero, LAST_YEAR } from "../../utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "./client";
import { getTransactions } from "../../API";

const initialState = {
  id: null,
  transactions: {
    alphaCount: 0,
    alphaValue: 0,
    totalCount: 0,
    totalValue: 0,
    lastYearAlphaValue: 0,
    lastYearAlphaCount: 0,
    lastYearTotalValue: 0,
    lastYearTotalCount: 0,
    list: [],
  },
  employees: {
    winner: null,
    list: {},
  },
  locations: {
    list: {},
  },
};

const sortByLastYearTotal = (
  { lastYearTotal: totalA },
  { lastYearTotal: totalB }
) => (totalB > totalA ? 1 : -1);

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (_, { dispatch }) => {
    dispatch(startLoading());
    const { data: { id = null, transactions: transactionsList = [] } = {} } =
      await getTransactions();
    const employeesList = {};
    const locationsList = {};

    let alphaValue = 0;
    let alphaCount = 0;
    let totalValue = 0;
    let lastYearAlphaValue = 0;
    let lastYearAlphaCount = 0;
    let lastYearTotalValue = 0;
    let lastYearTotalCount = 0;

    (
      (Array.isArray(transactionsList) &&
        transactionsList?.length &&
        transactionsList) ||
      []
    ).forEach(
      ({
        transactionID,
        amount,
        type,
        employee = null,
        location = null,
        timeStamp,
      }) => {
        const isAlpha = type?.toLowerCase() === ALPHA_TYPE;
        const isLastYear =
          timeStamp && new Date(timeStamp).getFullYear() === LAST_YEAR;

        if (employee?.id) {
          employeesList[employee.id] = {
            ...(employeesList[employee.id] || {}),
            ...employee,
          };
        }
        if (location?.id) {
          locationsList[location.id] = location;
        }
        if (isAlpha) {
          alphaValue += amountOrZero(amount);
          alphaCount++;
          employeesList[employee.id].totalAlpha =
            amountOrZero(employeesList[employee?.id]?.totalAlpha) +
            amountOrZero(amount);
          if (isLastYear) {
            lastYearAlphaValue += amountOrZero(amount);
            lastYearAlphaCount++;
            employeesList[employee.id].lastYearAlpha =
              amountOrZero(employeesList[employee?.id]?.lastYearAlpha) +
              amountOrZero(amount);
            employeesList[employee.id].lastYearAlphaTransactions = [
              ...(employeesList[employee.id].lastYearAlphaTransactions || []),
              transactionID,
            ];
          }
        }
        if (isLastYear) {
          lastYearTotalValue += amountOrZero(amount);
          lastYearTotalCount++;
          employeesList[employee.id].lastYearTotal =
            amountOrZero(employeesList[employee?.id]?.lastYearTotal) +
            amountOrZero(amount);
        }
        totalValue += amountOrZero(amount);
        employeesList[employee.id].total =
          amountOrZero(employeesList[employee?.id]?.total) +
          amountOrZero(amount);
        employeesList[employee.id].transactions = [
          ...(employeesList[employee.id]?.transactions || []),
          {
            transactionID,
            timeStamp,
            amount,
            type,
          },
        ];
      }
    );

    const transactions = {
      alphaCount,
      alphaValue,
      totalCount: transactionsList?.length,
      totalValue,
      lastYearAlphaCount,
      lastYearAlphaValue,
      lastYearTotalCount,
      lastYearTotalValue,
      list: transactionsList,
    };

    const winner =
      Object.values(employeesList).sort(sortByLastYearTotal).shift() || null;

    const employees = {
      winner,
      list: employeesList,
    };

    const locations = {
      list: locationsList,
    };

    dispatch(stopLoading());

    return { id, transactions, employees, locations };
  }
);

export const transactionSlice = createSlice({
  name: "transactionsContext",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTransactions.fulfilled,
      (
        state,
        {
          payload: {
            id = null,
            transactions = {},
            employees = {},
            locations = {},
          } = {},
        }
      ) => {
        state.id = id;
        state.transactions = transactions;
        state.employees = employees;
        state.locations = locations;
      }
    );
  },
});

export default transactionSlice.reducer;
