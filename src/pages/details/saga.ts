import { call, takeLatest } from "redux-saga/effects";
import { sendMessage } from "./detailsSlice";
import axios, { AxiosResponse } from "axios";

// APIのURL設定
const API_URL = "https://2sva6a36r5.execute-api.ap-northeast-1.amazonaws.com";

// API呼び出しを行うSaga
function* handleSendMessage(action: ReturnType<typeof sendMessage>) {
  try {
    console.log("APIリクエスト開始");
    console.log("action.payload", action.payload);
    // 直接API呼び出しを行う
    const response: AxiosResponse<any> = yield call(
      axios.post,
      `${API_URL}/api/v1/users/test0323/activities`, // ここをAPIGatewayのURLに設定
      {
        elementId: action.payload.text, // メッセージの内容を送信
        actionType: "selectInputMessage",
        
      }
    );
    console.log("Message saved:", response.data);
    // 必要ならここでさらにReduxの状態を更新するactionをdispatch
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// actionを監視して適切なSagaを呼び出す
function* watchSendMessage() {
  yield takeLatest(sendMessage.type, handleSendMessage);
}

export default watchSendMessage;
