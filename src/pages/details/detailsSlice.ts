import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailsState {
  texts: string[];
}

const initialState: DetailsState = {
  texts: [],
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addText: (state, action: PayloadAction<string>) => {
      state.texts.push(action.payload);
    },
  },
});

export const { addText } = detailsSlice.actions;
export default detailsSlice.reducer;
