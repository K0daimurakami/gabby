import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const steps = ["STEP1: 処理1", "STEP2: 処理2", "STEP3: 処理3", "STEP4: 処理4"];

const initialState: DetailsState = {
  messages: [],
  onProcessing: false,
  isActiveSendButton: false,
  processMessages: [],
  isShowOutput: false,
  currentStep: 0,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      state.onProcessing = true;
      state.isActiveSendButton = false;
      state.isShowOutput = false; // 新しいメッセージ送信時に画像を非表示
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    startProcessing: (state) => {
      state.processMessages = [
        {
          id: "1",
          state: "processing",
          isLoading: true,
          text: steps[0],
        },
      ];
      state.onProcessing = true;
      state.currentStep = 0;
      state.isShowOutput = false;
    },
    proceedProcessing: (state) => {
      const { currentStep, processMessages } = state;

      // 現在のステップを完了状態にする
      processMessages[currentStep].state = "success";
      processMessages[currentStep].isLoading = false;

      const nextStep = currentStep + 1;

      if (nextStep < steps.length) {
        // 次のステップを開始
        state.processMessages.push({
          id: (nextStep + 1).toString(),
          state: "processing",
          isLoading: true,
          text: steps[nextStep],
        });
        state.currentStep = nextStep;
      } else {
        // すべてのステップが完了
        state.onProcessing = false;
        state.isShowOutput = true; // ✅ プロセス完了時に画像を表示
      }
    },
    endProcessing: (state) => {
      state.processMessages.forEach((msg) => {
        msg.state = "success";
        msg.isLoading = false;
      });
      state.onProcessing = false;
      state.isActiveSendButton = true;
      state.isShowOutput = true; // ✅ プロセス完了後に画像を表示
    },
    activeSendButton: (state) => {
      state.isActiveSendButton = true;
    },
    deactiveSendButton: (state) => {
      state.isActiveSendButton = false;
    },
    clearProcessMessages: (state) => {
      state.processMessages = [];
      state.onProcessing = false;
      state.isActiveSendButton = false;
      state.currentStep = 0;
      state.isShowOutput = false;
    },
  },
});

export const {
  sendMessage,
  receiveMessage,
  startProcessing,
  proceedProcessing,
  endProcessing,
  activeSendButton,
  deactiveSendButton,
  clearProcessMessages,
} = detailsSlice.actions;

export default detailsSlice.reducer;
