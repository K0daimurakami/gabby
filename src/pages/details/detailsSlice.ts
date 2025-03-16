import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  role: "user" | "bot";
  userName: string;
  text: string;
}

interface ProcessMessage {
  id: string;
  state: "processing" | "success" | "error";
  isloading: boolean;
  text: string;
}

interface DetailsState {
  messages: Message[];
  onProcessing: boolean;
  isActiveSendButton: boolean;
  processMessages: ProcessMessage[];
  isShowOutput: boolean;
}

const initialState: DetailsState = {
  messages: [],
  onProcessing: false,
  isActiveSendButton: false,
  processMessages: [],
  isShowOutput: false,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push({
        ...action.payload,
      });
      state.onProcessing = true;
    },
    endProcess: (state) => {
      state.onProcessing = false;
    },
    activeSendButton: (state) => {
      state.isActiveSendButton = true;
    },
    deactiveSendButton: (state) => {
      state.isActiveSendButton = false;
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearProcessMessages: (state) => {
      state.processMessages = [];
      state.onProcessing = false;
      state.isActiveSendButton = false;
    },
  },
});

export const {
  sendMessage,
  endProcess,
  activeSendButton,
  deactiveSendButton,
  receiveMessage,
  clearProcessMessages,
} = detailsSlice.actions;

export default detailsSlice.reducer;
