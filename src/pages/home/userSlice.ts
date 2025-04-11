import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ユーザー情報の型
interface UserState {
  sub: string | null;
  email?: string | null;
  name?: string | null;
  [key: string]: any | null; // その他の項目も許容
}

const initialState: UserState = {
    sub: null,
    email: null,
    name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ログイン時に呼び出してユーザー情報を保存
    setUserProfile: (state, action: PayloadAction<UserState>) => {
      state.profile = action.payload;
    },
    // ログアウト時に呼び出してユーザー情報をクリア
    clearUserProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
