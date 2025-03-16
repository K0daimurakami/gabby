import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AccordionExpandIcon() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
            オンボーディング支援 : 業務知識・手続き支援エージェント
          </Typography>
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