import { call, takeLatest } from "redux-saga/effects";
import { sendMessageByHelpButton } from "./detailsSlice";
import axios, { AxiosResponse } from "axios";

// APIのURL設定
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

// API呼び出しを行うSaga
function* handleSendHelpMessage(action: ReturnType<typeof sendMessageByHelpButton>) {
  try {
    // 直接API呼び出しを行う
    const response: AxiosResponse = yield call(async (message: string) => {
      const res = await axios.post("http://example.com/help", { message });
      return res;
    }, action.payload);

    console.log("API呼び出し成功:", response.data);
    // 必要ならここでさらにReduxの状態を更新するactionをdispatch
  } catch (error) {
    console.error("API呼び出し失敗:", error);
  }
}

// actionを監視して適切なSagaを呼び出す
function* watchHelpButton() {
  yield takeLatest(sendMessageByHelpButton.type, handleSendHelpMessage);
}

export default watchHelpButton;
