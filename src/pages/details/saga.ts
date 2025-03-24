import { call, takeLatest } from "redux-saga/effects";
import { sendMessageByHelpButton } from "./detailsSlice";
import axios, { AxiosResponse } from "axios";

// APIのURL設定
const API_URL = "https://2sva6a36r5.execute-api.ap-northeast-1.amazonaws.com";

// API呼び出しを行うSaga
function* handleSendHelpMessage(action: ReturnType<typeof sendMessageByHelpButton>) {
  try {
    console.log("APIリクエスト開始");
    // 直接API呼び出しを行う
    const response: AxiosResponse<any> = yield call(
      axios.post,
      `${API_URL}/api/v1/users/test0323/activities`, // ここをAPIGatewayのURLに設定
      {
        elementId: action.payload, // メッセージの内容を送信
        actionType: "selectTemplateMessage",
      }
    );
    console.log("Message saved:", response.data);
    // 必要ならここでさらにReduxの状態を更新するactionをdispatch
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// actionを監視して適切なSagaを呼び出す
function* watchHelpButton() {
  yield takeLatest(sendMessageByHelpButton.type, handleSendHelpMessage);
}

export default watchHelpButton;
