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
  role: "user" | "bot";
  userName: string;
  text: string;
}

interface ProcessMessage {
  id: string;
  state: "processing" | "success";
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
}

const initialState: DetailsState = {
  messages: [],
  onProcessing: false,
  isActiveSendButton: false,
  processMessages: [],
  isShowOutput: false,
  currentStep: 0,
  outputUrl: null,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    resetState: (state) => {
      // Redux の状態を初期化
      state.messages = [];
      state.onProcessing = false;
      state.isActiveSendButton = false;
      state.processMessages = [];
      state.isShowOutput = false;
      state.currentStep = 0;
      state.outputUrl = null;
    },

    sendMessage: (state, action: PayloadAction<Message>) => {
      // ✅ もし `isShowOutput` が `true` なら、一度初期化してから動作するようにする
      if (state.isShowOutput) {
        detailsSlice.caseReducers.resetState(state);
      }

      state.messages.push(action.payload);
      state.onProcessing = true;
      state.isActiveSendButton = false;
      state.isShowOutput = false;
      state.outputUrl = null;

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
        state.processMessages = [
          {
            id: "1",
            state: "processing",
            isLoading: true,
            text: selectedPattern.process_messages[0],
          },
        ];
        state.currentStep = 0;
      } else {
        state.messages.push({
          id: new Date().getTime().toString(),
          role: "bot",
          userName: "Bot",
          text: "対応する処理が見つかりません。",
        });
        state.onProcessing = false;
        state.isActiveSendButton = true;
      }
    },

    proceedProcessing: (state) => {
      let selectedPattern: MessagePattern | null = null;
      for (const pattern in messagesTyped) {
        if (
          messagesTyped[pattern as keyof typeof messagesTyped]
            .send_trigger_message ===
          state.messages.find((msg) => msg.role === "user")?.text
        ) {
          selectedPattern =
            messagesTyped[pattern as keyof typeof messagesTyped];
          break;
        }
      }

      if (!selectedPattern) return;

      state.processMessages[state.currentStep].state = "success";
      state.processMessages[state.currentStep].isLoading = false;

      const nextStep = state.currentStep + 1;

      if (nextStep < selectedPattern.process_messages.length) {
        state.processMessages.push({
          id: (nextStep + 1).toString(),
          state: "processing",
          isLoading: true,
          text: selectedPattern.process_messages[nextStep],
        });
        state.currentStep = nextStep;
      } else {
        state.onProcessing = false;
        state.isShowOutput = true;
        state.outputUrl = selectedPattern.output_url;

        state.messages.push({
          id: new Date().getTime().toString(),
          role: "bot",
          userName: "Bot",
          text: selectedPattern.myle_response,
        });
      }
    },

    endProcessing: (state) => {
      state.processMessages.forEach((msg) => {
        msg.state = "success";
        msg.isLoading = false;
      });
      state.onProcessing = false;
      state.isActiveSendButton = true;
    },
  },
});

export const { sendMessage, proceedProcessing, endProcessing, resetState } =
  detailsSlice.actions;
export default detailsSlice.reducer;
