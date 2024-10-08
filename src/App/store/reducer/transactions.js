import {
  GENERIC_ERROR_MESSAGE,
  getTotal,
  isAlpha,
  isLastYear,
  getErrorMessage,
  SYSTEM_NOTIFICATION,
} from "../../utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNotification, startLoading, stopLoading } from "./client";
import { getTransactions, postTransactions } from "../../API";
import { v4 } from "uuid";

const initialState = {
  id: null,
  details: null,
  transactions: [],
  employees: [],
  locations: [],
  winner: null,
};

const sortByLastYearTotal = (
  { lastYearTotal: totalA },
  { lastYearTotal: totalB }
) => (totalB > totalA ? 1 : -1);

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (_, { dispatch }) => {
    try {
      dispatch(startLoading());
      const { data: { id = null, transactions = [] } = {} } =
        await getTransactions();

      const locations = [
        ...new Set(transactions.map(({ location: { id } }) => id)),
      ]
        .map(
          (curLocationId) =>
            transactions.find(
              ({ location: { id: locationId = null } = {} }) =>
                locationId === curLocationId
            )?.location || null
        )
        .filter(Boolean);

      const employees = [
        ...new Set(transactions.map(({ employee: { id } }) => id)),
      ].map((id) => {
        const employeeTransactions = transactions.filter(
          ({ employee: { id: employeeId } }) => employeeId === id
        );
        const employeeData = employeeTransactions[0].employee;
        const total = getTotal(employeeTransactions);
        const lastYear = employeeTransactions.filter(({ timeStamp }) =>
          isLastYear(timeStamp)
        );
        const lastYearTotal = lastYear.reduce(
          (acc, { amount = 0 }) => (acc += amount),
          0
        );
        const alphaTransactions = employeeTransactions.filter(({ type }) =>
          isAlpha(type)
        );
        const totalAlpha = getTotal(alphaTransactions);
        const lastYearAlphaTransactions = employeeTransactions.filter(
          ({ timeStamp, type }) => isAlpha(type) && isLastYear(timeStamp)
        );
        const lastYearAlphaTotal = getTotal(lastYearAlphaTransactions);
        return {
          id,
          ...employeeData,
          alphaTransactions,
          lastYear,
          lastYearAlphaTransactions,
          lastYearAlphaTotal,
          lastYearTotal,
          transactions: employeeTransactions,
          total,
          totalAlpha,
        };
      });

      const alphaTransactions = transactions.filter(({ type }) =>
        isAlpha(type)
      );
      const lastYearTransactions = transactions.filter(({ timeStamp }) =>
        isLastYear(timeStamp)
      );
      const lastYearAlphaTransactions = transactions.filter(
        ({ timeStamp, type }) => isAlpha(type) && isLastYear(timeStamp)
      );

      const details = {
        alphaCount: alphaTransactions?.length,
        alphaValue: getTotal(alphaTransactions),
        totalCount: transactions?.length,
        totalValue: getTotal(transactions),
        lastYearTotalCount: lastYearTransactions?.length,
        lastYearTotalValue: getTotal(lastYearTransactions),
        lastYearAlphaCount: lastYearAlphaTransactions?.length,
        lastYearAlphaValue: getTotal(lastYearAlphaTransactions),
      };

      const winner = [...employees].sort(sortByLastYearTotal).shift() || null;

      dispatch(stopLoading());

      dispatch(
        createNotification({
          id: v4(),
          title: SYSTEM_NOTIFICATION,
          text: "Transactions data succesffully loaded!",
          timeStamp: new Date().getTime(),
          variant: "success",
        })
      );
      return { id, details, employees, locations, transactions, winner };
    } catch (e) {
      dispatch(stopLoading());
      dispatch(
        createNotification({
          id: v4(),
          timeStamp: new Date().getTime(),
          title: SYSTEM_NOTIFICATION,
          text: GENERIC_ERROR_MESSAGE,
          variant: "danger",
        })
      );
      return null;
    }
  }
);

export const sendTransactions = createAsyncThunk(
  "transactions/send",
  async (data, { dispatch }) => {
    try {
      dispatch(startLoading());

      const { data: message = null, status = 500 } =
        await postTransactions(data);

      const {
        title = SYSTEM_NOTIFICATION,
        text = GENERIC_ERROR_MESSAGE,
        variant = "danger",
      } = getErrorMessage(status, message);

      dispatch(stopLoading());

      dispatch(
        createNotification({
          id: v4(),
          timeStamp: new Date().getTime(),
          title: title ?? SYSTEM_NOTIFICATION,
          text: text ?? GENERIC_ERROR_MESSAGE,
          variant: variant ?? "danger",
        })
      );
    } catch (e) {
      dispatch(stopLoading());
      dispatch(
        createNotification({
          id: v4(),
          timeStamp: new Date().getTime(),
          title: SYSTEM_NOTIFICATION,
          text: GENERIC_ERROR_MESSAGE,
          variant: "danger",
        })
      );
    }
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
            details = null,
            employees = [],
            id = null,
            locations = [],
            transactions = [],
            winner = null,
          } = {},
        }
      ) => {
        state.employees = employees;
        state.details = details;
        state.id = id;
        state.locations = locations;
        state.transactions = transactions;
        state.winner = winner;
      }
    );
  },
});

export default transactionSlice.reducer;
