import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserClickInfo {
  id: string;
  title: string;
}

interface HomeState {
  categoryA: string[];
  categoryB: string[];
  selectedMyle: UserClickInfo;
}

const initialState: HomeState = {
  categoryA: ["Item 1", "Item 2"],
  categoryB: ["Item 3", "Item 4"],
  selectedMyle: { id: "", title: "" },
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
    selectMyle: (state, action: PayloadAction<UserClickInfo>) => {
      state.selectedMyle = action.payload;
    },
  },
});

export const { addCategoryA, addCategoryB, selectMyle } = homeSlice.actions;
export default homeSlice.reducer;
