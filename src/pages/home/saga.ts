import { call, takeLatest } from "redux-saga/effects";
import { selectMyle } from "./homeSlice";
import axios, { AxiosResponse } from "axios";

// メッセージ送信の非同期処理
function* handleSendSelectedMyle(action: ReturnType<typeof selectMyle>) {
  try {
    // サーバーへのPOSTリクエスト
    const response: AxiosResponse<any> = yield call(
      axios.post,
      "http://aaa.com/save", // ここをAPIGatewayのURLに設定
      {
        data: action.payload, // メッセージの内容を送信
      }
    );

    // リクエスト成功時の処理
    console.log("Message saved:", response.data);
    // 必要に応じて、処理結果を別のアクションで Redux に格納する
  } catch (error) {
    // エラーハンドリング
    console.error("Error sending message:", error);
  }
}

// Sagaでactionを監視
function* watchSendMessage() {
  yield takeLatest(selectMyle.type, handleSendSelectedMyle);
}

export default watchSendMessage;
