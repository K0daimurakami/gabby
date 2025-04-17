import { call, takeLatest, select, put } from "redux-saga/effects";
import { sendMessage, sendMessageByHelpButton } from "./detailsSlice";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../../redux/store";

// APIのURL設定
const API_URL = "https://2sva6a36r5.execute-api.ap-northeast-1.amazonaws.com";

// API呼び出しを行うSaga
function* handleSendMessage(action: ReturnType<typeof sendMessage>) {
  try {

    // 認証情報を取得
    const userProfile: RootState["user"] = yield select((state) => state.user.profile);
  
    // ホーム画面からstateを取得
    const previousState: RootState["home"] = yield select((state) => state.home);
    const uniqueIdentifier = `${previousState.selectedMyle.elementId}_${Date.now()}`;

    console.log("APIリクエスト開始");
    console.log("action.payload: ", action.payload);
    console.log("ユーザ情報: ", userProfile.email);

    // 直接API呼び出しを行う
    const response: AxiosResponse<any> = yield call(
      axios.post,
      `${API_URL}/api/v1/users/test0323/activities`, // ここをAPIGatewayのURLに設定
      {
        elementId: uniqueIdentifier, // メッセージの内容を送信
        userId: userProfile.sub,
        userMailAddress: userProfile.email,
        actionType: "InputMessage",
        categoryName: previousState.selectedMyle.categoryName, // Myleのカテゴリ
        myleId: previousState.selectedMyle.id, // カテゴリ内のMyleのID
        myleName: previousState.selectedMyle.myleName, /// Myleの名前
        inputText: action.payload.chatText, // ユーザが入力したテキスト
      }
    );
    console.log("Message saved:", response.data);
    // 必要ならここでさらにReduxの状態を更新するactionをdispatch
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

function* handleSendMessageByHelpButton(action: ReturnType<typeof sendMessageByHelpButton>) {
  const chatText = action.payload;

  // ✅ sendMessageアクションをdispatch
  yield put(sendMessage({
    id: new Date().getTime().toString(),
    sender: "me",
    userName: "User",
    chatText,
  }));
}

// actionを監視して適切なSagaを呼び出す
function* watchSendMessage() {
  yield takeLatest(sendMessage.type, handleSendMessage);
  yield takeLatest(sendMessageByHelpButton.type, handleSendMessageByHelpButton);
}
export default watchSendMessage;
