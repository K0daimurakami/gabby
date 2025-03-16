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

  useEffect(() => {
    if (onProcessing && processMessages.length > 0) {
      const timer = setTimeout(() => {
        dispatch(proceedProcessing());
      }, 3000);

      return () => clearTimeout(timer);
    } else if (!onProcessing) {
      dispatch(endProcessing());
    }
  }, [processMessages, onProcessing, dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" gutterBottom>
        推論内容トレース
      </Typography>
      <Stepper activeStep={processMessages.length - 1} orientation="vertical">
        {processMessages.map((msg, index) => (
          <Step key={msg.id}>
            <StepLabel
              icon={
                msg.isLoading ? (
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
