import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';

export default function AccordionExpandIcon() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ display: "flex", alignItems: "center" }} // 高さを揃える
        >
          <Box
          sx={{
          backgroundColor: "#E3823D",
          color: "#fff",
          borderRadius: "12px",
          padding: "6px 12px", // 少し余白を調整
          display: "flex", // 高さを統一
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginRight: "8px",
        }}
      >オンボーディング支援</Box>
          <Typography variant='h5' component="span" sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>  業務知識・手続き支援エージェント</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            新入社員への業務知識の提供と必要な手続きをガイドします。
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}