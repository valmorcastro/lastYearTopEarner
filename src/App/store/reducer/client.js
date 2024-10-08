import { createSlice } from "@reduxjs/toolkit";
import { notificationsSelector } from "../selectors";

const initialState = {
  notifications: [],
  loading: false,
};

const clientSlice = createSlice({
  name: "clientContext",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
    createNotification: (state, { payload }) => {
      state.notifications = [...(state.notifications || []), payload];
    },
    removeNotification: (state, { payload }) => {
      const notifications = [
        ...(state.notifications || []).filter(({ id }) => id !== payload),
      ];
      state.notifications = notifications;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  clearNotifications,
  createNotification,
  removeNotification,
  startLoading,
  stopLoading,
} = clientSlice.actions;

export default clientSlice.reducer;
