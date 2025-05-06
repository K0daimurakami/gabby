import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ユーザー情報の型
interface UserState {
  // ユーザ情報
  sub: string | null; //現状DBに入れるユーザID、直す必要あり
  email: string; //認証処理で使うメアド //ログイン時にRedux投入はできてる
  password: string; //ユーザのパスワード入力
  interestedCategory: string; //ユーザの興味あるカテゴリ入力
  personalIssue: string; //ユーザの課題自由入力
  isAuthenticated: boolean; //ユーザの認証可否、App.tsxでの分岐用
  
  // 切り出す必要あるかも
  name: string | null; //どこで使ってるのかいまいちわからん
  authError: string | null; //どこで使ってるのかいまいちわからん //PW入力画面で使ってそう
  isProcessing: boolean; //画面の処理状況、App.tsxでの分岐用
}

const initialState: UserState = {
  sub: null,
  email: "",
  name: null,
  password: "",
  interestedCategory: "",
  personalIssue: "",
  isAuthenticated: false,
  authError: null,
  // 切り出す必要あるかも
  isProcessing: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ユーザ情報登録
    setUserField: (
      state,
      action: PayloadAction<{
        key: keyof UserState;
        value: UserState[keyof UserState];
      }>
    ) => {
      (state[action.payload.key] as typeof action.payload.value) = action.payload.value;
    },
    // ログイン処理
    loginStart: (state) => {
      state.isProcessing = true;
      state.authError = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isProcessing = false;
      state.isAuthenticated = true;
      state.email = action.payload;
      state.authError = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isProcessing = false;
      state.authError = action.payload;
    },
    // サインアップ処理
    signupStart: (state) => {
      state.isProcessing = true;
      state.authError = null;
    },
    signupSuccess: (state) => {
      state.isProcessing = false;
    },
    signupFailure: (state, action: PayloadAction<string | null>) => {
      state.isProcessing = false;
      state.authError = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = "";
      state.authError = null;
    },
  },
});

export const {
  setUserField,
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
