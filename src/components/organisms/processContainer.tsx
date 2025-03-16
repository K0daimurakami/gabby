import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  proceedProcessing,
  endProcessing,
} from "../../pages/details/detailsSlice";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProcessContainer = () => {
  const dispatch = useDispatch();
  const processMessages = useSelector(
    (state: RootState) => state.details.processMessages
  );
  const onProcessing = useSelector(
    (state: RootState) => state.details.onProcessing
  );
  const currentStep = useSelector(
    (state: RootState) => state.details.currentStep
  );

  // `processing` または `success` のステップのみを表示する
  const visibleSteps = processMessages.filter((msg) => msg.state !== "pending");

  const totalSteps = visibleSteps.length;

  useEffect(() => {
    if (onProcessing && processMessages.length > 0) {
      const timer = setTimeout(() => {
        if (currentStep + 1 < processMessages.length) {
          dispatch(proceedProcessing());
        } else {
          dispatch(endProcessing());
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, processMessages.length, onProcessing, dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ backgroundColor: '#E3823D', color: 'white' }}>
        ◆ 推論内容トレース
      </Typography>
      <Stepper
        activeStep={visibleSteps.findIndex((msg) => msg.state === "processing")}
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
              <Typography variant="body1">{msg.text}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProcessContainer;
