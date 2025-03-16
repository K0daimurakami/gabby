import React, { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = [
  'STEP1: 処理1',
  'STEP2: 処理2',
  'STEP2: 処理3',
  'STEP2: 処理4'
];

const ProcessContainer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 現在のステップの非同期処理をシミュレーション
    const timer = setTimeout(() => {
      setLoading(false); // 非同期処理終了でスピナーをチェックマークに切替え

      // 次のステップがあれば、1秒後に次の処理を開始
      const nextStep = activeStep + 1;
      if (nextStep < steps.length) {
        setTimeout(() => {
          setActiveStep(nextStep);
          setLoading(true);
        }, 1000);
      }
    }, 3000); // 各ステップでの処理時間を3秒と仮定
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        推論内容トレース
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              icon={
                activeStep === index 
                  ? (loading ? <CircularProgress size={24} /> : <CheckCircleIcon color="success" />)
                  : (activeStep > index ? <CheckCircleIcon color="success" /> : null)
              }
            >
              <Typography variant="body1">{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProcessContainer;
