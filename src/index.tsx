import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BoxCodenamePayload, BoxCodenameState } from "./types";

const boxCodenameSliceInitialState: BoxCodenameState = {
  partOne: undefined,
  partTwo: undefined,
  partThree: undefined,
};

const boxCodenameSlice = createSlice({
  name: "counter",
  initialState: boxCodenameSliceInitialState,
  reducers: {
    setBoxCodename: (state, { payload }: { payload: BoxCodenamePayload }) => {
      state.partOne = payload.partOne;
      state.partTwo = payload.partTwo;
      state.partThree = payload.partThree;
    },
  },
});

export const { setBoxCodename } = boxCodenameSlice.actions;

export const store = configureStore({
  reducer: { boxCodename: boxCodenameSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
