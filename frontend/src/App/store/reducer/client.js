import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
};

const clientSlice = createSlice({
  name: "clientContext",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { clearError, setErrorMessage, startLoading, stopLoading } =
  clientSlice.actions;

export default clientSlice.reducer;
