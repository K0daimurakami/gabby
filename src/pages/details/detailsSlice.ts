import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import messagesData from "../../constants/detail_messages.json";
import { useLocation } from "react-router-dom";

/**
 * 詳細画面に関わるRedux
 * 1. 画面上の情報
 * 2. 画面裏の情報
*/

// 1. 画面上の情報
// チャット内のメッセージ情報
interface ChatMessage {
  id: string;
  sender: "me" | "other"; // ユーザ側メッセージか、Myle側メッセージか
  userName: string;
  chatText: string; // メッセージ内容
}
// 各処理プロセスの情報
interface ProcessMessage {
  id: string;
  state: "pending" | "processing" | "success";
  isLoading: boolean;
  processText: string;
}
// 画面上の情報
interface DetailsState {
  chatMessages: ChatMessage[];　// チャット内のメッセージ情報
  onProcessing: boolean; // いる？
  isActiveSendButton: boolean; //いる？
  processMessages: ProcessMessage[]; // 各処理プロセスの情報
  isMyleProcessDone: boolean; // 詳細画面で結果が表示済かどうか
  currentStep: number; // 処理トレース内でしか使ってないから名前変えた方がいいかも
  //outputUrl: string | null;
  isShowHelpButton: boolean; // いる？
  currentScreen: string | null; // 処理トレース内でしか使ってないから名前変えた方がいいかも
}
const initialState: DetailsState = {
  chatMessages: [],
  onProcessing: false,
  isActiveSendButton: false,
  processMessages: [],
  isMyleProcessDone: false,
  currentStep: 0,
  //outputUrl: null, // ✅ 初期状態で画像のURLを持たない
  isShowHelpButton: true,
  currentScreen: null,
};

// 2. 画面裏の情報
// 【JSONから取得】各テンプレメッセージに対する情報
interface MessagePattern {
  process_messages: string[];
  send_trigger_message: string;
  myle_response: string;
  output_url: string;
}
// 【JSONから取得】各Myleに対する情報
interface Screen {
  [key: string]: MessagePattern; // pattern1, pattern2, pattern3 に対応
}

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    /**
     * 画面のelementId取得アクション
    */
    setCurrentScreen: (state, action: PayloadAction<string | null>) => {
      state.currentScreen = action.payload;
    },
    /**
     * 状態初期化アクション
    */
    resetState: (state) => {
      state.chatMessages = [];
      state.onProcessing = false;
      state.isActiveSendButton = false;
      state.processMessages = [];
      state.isMyleProcessDone = false;
      state.currentStep = 0;
      //state.outputUrl = null;
      state.isShowHelpButton = true;
    },
    /**
     * メッセージ送信時アクション
    */
    sendMessage: (state, action: PayloadAction<ChatMessage>) => {
      // 結果が既に表示されている場合はstateをリセット
      if (state.isMyleProcessDone) {
        detailsSlice.caseReducers.resetState(state);
      }

      // 入力メッセージの追加と状態の更新
      state.chatMessages.push(action.payload);
      state.onProcessing = true;
      state.isActiveSendButton = false;
      state.isMyleProcessDone = false;
      //state.outputUrl = null; // ✅ 送信時に画像URLをリセット

      // ReduxでcurrentScreen設定されているか確認
      if (!state.currentScreen) {
        console.error("currentScreenが設定されていません");
        return;
      }
      // JSONから画面情報（テンプレ、処理中メッセージ）を取得
      const messagesTyped: Record<string, MessagePattern> | undefined =
        messagesData.screens[state.currentScreen as keyof typeof messagesData.screens];
      // 存在しない場合
      if (!messagesTyped) {
        console.error(`Screen "${state.currentScreen}" が見つかりません`);
        return;
      }

      let selectedPattern: MessagePattern | null = null;

      // 入力メッセージがテンプレパターン群と一致するか確認
      for (const pattern in messagesTyped) {
        if (
          messagesTyped[pattern as keyof typeof messagesTyped]
            .send_trigger_message === action.payload.chatText
        ) {
          // 一致するものがあれば格納
          selectedPattern =
            messagesTyped[pattern as keyof typeof messagesTyped];
          break;
        }
      }

      if (selectedPattern) {
        // 処理パターンがある場合
        // 処理メッセージから各処理に関するオブジェクトを作成
        state.processMessages = selectedPattern.process_messages.map(
          (processText, index) => ({
            id: (index + 1).toString(),
            state: index === 0 ? "processing" : "pending",
            isLoading: index === 0,
            processText: processText,
          })
        );
        state.currentStep = 0;
        //state.outputUrl = selectedPattern.output_url; // ✅ 画像URLを Redux State に保存
      } else {
        // 処理パターンがない場合
        state.chatMessages.push({
          id: new Date().getTime().toString(),
          sender: "other",
          userName: "Bot",
          chatText: "対応する処理が見つかりません。",
        });
        state.onProcessing = false;
        state.isActiveSendButton = true;
      }
    },

    /**
     * 処理を次のステップに進めるアクション
    */
    proceedProcessing: (state) => {
      // 現在のステップが最終ステップの場合、何もしない
      if (state.currentStep >= state.processMessages.length - 1) return;

      // ✅ 現在のステップを `success` にする
      state.processMessages[state.currentStep].state = "success";
      state.processMessages[state.currentStep].isLoading = false;

      const nextStep = state.currentStep + 1;

      // ✅ 次のステップを `processing` に変更
      state.processMessages[nextStep].state = "processing";
      state.processMessages[nextStep].isLoading = true;
      state.currentStep = nextStep;
    },

    /**
     * 全てのステップを完全終了にするアクション
    */
    endProcessing: (state) => {
      state.processMessages.forEach((msg) => {
        msg.state = "success";
        msg.isLoading = false;
      });
      state.onProcessing = false;
      state.isActiveSendButton = true;
      state.isMyleProcessDone = true;
      state.chatMessages.push({
        id: new Date().getTime().toString(),
        sender: "other",
        userName: "Bot",
        chatText: "処理が完了しました。",
      });
    },

    /**
     * テンプレメッセージ選択時アクション
    */
    sendMessageByHelpButton: (state, action: PayloadAction<string>) => {
      const chatText = action.payload;
    },
  },
});

export const {
  setCurrentScreen,
  sendMessage,
  proceedProcessing,
  endProcessing,
  resetState,
  sendMessageByHelpButton,
} = detailsSlice.actions;
export default detailsSlice.reducer;
