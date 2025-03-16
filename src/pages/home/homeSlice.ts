import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  categoryA: string[];
  categoryB: string[];
}

const initialState: HomeState = {
  categoryA: ["Item 1", "Item 2"],
  categoryB: ["Item 3", "Item 4"],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addCategoryA: (state, action: PayloadAction<string>) => {
      state.categoryA.push(action.payload);
    },
    addCategoryB: (state, action: PayloadAction<string>) => {
      state.categoryB.push(action.payload);
    },
  },
});

export const { addCategoryA, addCategoryB } = homeSlice.actions;
export default homeSlice.reducer;
