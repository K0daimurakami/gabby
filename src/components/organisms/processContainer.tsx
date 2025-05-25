import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  proceedProcessing,
  endProcessing,
} from "../../pages/details/detailsSlice";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProcessContainer = () => {
  const dispatch = useDispatch();
  const detailsSliceState = useSelector(
    (state: RootState) => state.details
  );

  // `processing` または `success` のステップのみを表示する
  const visibleSteps = detailsSliceState.processMessages.filter((msg) => msg.state !== "pending");
  const totalSteps = visibleSteps.length;

  useEffect(() => {
    // 処理中かつ残処理がある場合
    if (detailsSliceState.onProcessing && detailsSliceState.processMessages.length > 0) {
      const timer = setTimeout(() => {
        // 現在のステップの次のステップがまだ存在するかどうか判定
        if (detailsSliceState.currentStep + 1 < detailsSliceState.processMessages.length) {
          dispatch(proceedProcessing());
        } else {
          dispatch(endProcessing());
        }
      }, 1500); // 3秒後に上記の処理が走る

      return () => clearTimeout(timer);
    }
  }, // 以下変数が変更された際に、useEffectを実行 
  [detailsSliceState.currentStep, detailsSliceState.processMessages.length, detailsSliceState.onProcessing, dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3}>
        <Typography
          variant="h5"
          sx={{ backgroundColor: "#E3823D", color: "white" }}
        >
          ◆ 推論内容トレース
        </Typography>
        <Stepper
          activeStep={visibleSteps.findIndex(
            (msg) => msg.state === "processing"
          )}
          orientation="vertical"
        >
          {visibleSteps.map((msg, index) => (
            <Step key={msg.id}>
              <StepLabel
                icon={
                  msg.state === "processing" ? (
                    <CircularProgress size={24} />
                  ) : (
                    <CheckCircleIcon color="success" />
                  )
                }
              >
                <Typography variant="body1">{msg.processText}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Box>
  );
};

export default ProcessContainer;
