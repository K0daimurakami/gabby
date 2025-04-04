import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import messagesData from "../../constants/detail_messages.json";

interface MessagePattern {
  process_messages: string[];
  send_trigger_message: string;
  myle_response: string;
  output_url: string;
}

const messagesTyped: Record<string, MessagePattern> = messagesData.messages;

interface Message {
  id: string;
  sender: "me" | "other";
  userName: string;
  text: string;
}

interface ProcessMessage {
  id: string;
  state: "pending" | "processing" | "success";
  isLoading: boolean;
  text: string;
}

interface DetailsState {
  messages: Message[];
  onProcessing: boolean;
  isActiveSendButton: boolean;
  processMessages: ProcessMessage[];
  isShowOutput: boolean;
  currentStep: number;
  outputUrl: string | null;
  isShowHelpButton: boolean;
}

const initialState: DetailsState = {
  messages: [],
  onProcessing: false,
  isActiveSendButton: false,
  processMessages: [],
  isShowOutput: false,
  currentStep: 0,
  outputUrl: null, // ✅ 初期状態で画像のURLを持たない
  isShowHelpButton: true,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    resetState: (state) => {
      state.messages = [];
      state.onProcessing = false;
      state.isActiveSendButton = false;
      state.processMessages = [];
      state.isShowOutput = false;
      state.currentStep = 0;
      state.outputUrl = null;
      state.isShowHelpButton = true;
    },

    sendMessage: (state, action: PayloadAction<Message>) => {
      if (state.isShowOutput) {
        detailsSlice.caseReducers.resetState(state);
      }

      state.messages.push(action.payload);
      state.onProcessing = true;
      state.isActiveSendButton = false;
      state.isShowOutput = false;
      state.outputUrl = null; // ✅ 送信時に画像URLをリセット

      let selectedPattern: MessagePattern | null = null;
      for (const pattern in messagesTyped) {
        if (
          messagesTyped[pattern as keyof typeof messagesTyped]
            .send_trigger_message === action.payload.text
        ) {
          selectedPattern =
            messagesTyped[pattern as keyof typeof messagesTyped];
          break;
        }
      }

      if (selectedPattern) {
        state.processMessages = selectedPattern.process_messages.map(
          (text, index) => ({
            id: (index + 1).toString(),
            state: index === 0 ? "processing" : "pending",
            isLoading: index === 0,
            text,
          })
        );
        state.currentStep = 0;
        state.outputUrl = selectedPattern.output_url; // ✅ 画像URLを Redux State に保存
      } else {
        state.messages.push({
          id: new Date().getTime().toString(),
          sender: "other",
          userName: "Bot",
          text: "対応する処理が見つかりません。",
        });
        state.onProcessing = false;
        state.isActiveSendButton = true;
      }
    },

    proceedProcessing: (state) => {
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

    endProcessing: (state) => {
      state.processMessages.forEach((msg) => {
        msg.state = "success";
        msg.isLoading = false;
      });
      state.onProcessing = false;
      state.isActiveSendButton = true;
      state.isShowOutput = true;
      state.messages.push({
        id: new Date().getTime().toString(),
        sender: "other",
        userName: "Bot",
        text: "処理が完了しました。",
      });
    },

    sendMessageByHelpButton: (state, action: PayloadAction<string>) => {
      detailsSlice.caseReducers.sendMessage(state, {
        payload: {
          id: new Date().getTime().toString(),
          sender: "me",
          userName: "User",
          text: action.payload,
        },
      } as PayloadAction<Message>);
    },
  },
});

export const {
  sendMessage,
  proceedProcessing,
  endProcessing,
  resetState,
  sendMessageByHelpButton,
} = detailsSlice.actions;
export default detailsSlice.reducer;
