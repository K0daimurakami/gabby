import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ユーザー情報の型
interface UserState {
  sub: string | null;
  email?: string | null;
  name?: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  [key: string]: any | null; // その他の項目も許容
}

const initialState: UserState = {
    sub: null,
    email: null,
    name: null,
    isAuthenticated: false,
    isLoading: false,
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
    // ログイン系
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.email = action.payload;
      state.error = null;
      
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // サインアップ系
    signupStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state) => {
      state.isLoading = false;
    },
    signupFailure: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.error = null;
    },
  },
});

export const { setUserProfile, clearUserProfile, loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure, logout} = userSlice.actions;
export default userSlice.reducer;
