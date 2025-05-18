import { call, takeLatest, select } from "redux-saga/effects";
import { selectMyle } from "./homeSlice";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../../redux/store";

// APIのURL設定
const API_URL = "https://2sva6a36r5.execute-api.ap-northeast-1.amazonaws.com";

// メッセージ送信の非同期処理
function* handleSendSelectedMyle(action: ReturnType<typeof selectMyle>) {
  try {

    // 認証情報を取得
    const userProfile: RootState["user"] = yield select((state) => state.user);
      
    console.log("APIリクエスト開始");
    console.log("API URL:", `${API_URL}/api/v1/users/test0323/activities`);
    console.log("action.payload: ", { payload: action.payload });
    console.log("ユーザデータ：", userProfile);
    // サーバーへのPOSTリクエスト
    const response: AxiosResponse<any> = yield call(
      axios.post,
      `${API_URL}/api/v1/users/test0323/activities`, // ここをAPIGatewayのURLに設定
      {
        elementId: action.payload.elementId, // 操作データを識別する一意な文字列
        userMailAddress: userProfile.email,
        actionType: "selectMyle", // 操作種別：Myle選択
        categoryName: action.payload.categoryName, // Myleのカテゴリ
        //myleId: action.payload.id, // カテゴリ内のMyleのID
        myleName: action.payload.myleName, /// Myleの名前
      }
    );

    // リクエスト成功時の処理
    console.log("Selected Myle saved:", response.data);
    // TODO 必要に応じて、処理結果を別のアクションで Redux に格納する
  } catch (error) {
    // エラーハンドリング
    console.error("Error sending message:", error);
  }
}

// Sagaでactionを監視
function* watchSelectMyle() {
  yield takeLatest(selectMyle.type, handleSendSelectedMyle);
}

export default watchSelectMyle;
