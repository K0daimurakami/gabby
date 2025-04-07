import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import categoriesData from "../../constants/agent_organization.json";

interface AgentItem {
  elementId: string;
  title: string;
  description: string;
  image: string;
  detailPage: string; // 遷移先ページのパス（必須）
}

interface UserClickInfo {
  elementId: string;
  id: string;
  categoryName: string;
  myleName: string;
  description: string;
}

interface HomeState {
  categoryA: string[];
  categoryB: string[];
  selectedMyle: UserClickInfo;
  categories: {
    [key: string]: AgentItem[];
  }
}

const initialState: HomeState = {
  categoryA: ["Item 1", "Item 2"],
  categoryB: ["Item 3", "Item 4"],
  selectedMyle: { elementId: "", id: "", categoryName: "", myleName: "", description: "",},
  categories: categoriesData.categories,
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
