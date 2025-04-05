import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

/**
 * TODO 現状テキストがベタガキだが、ここをHome画面のJSONから撮ってきたデータを入れるようにする
 * ただcategoriesを入れるだけだと、どのmyleの名前を取って来ればいいかわからない
 * homeStateのselectMyleから取ってくるようにする（selectMyleに名前と文章を入れる必要がある）
*/

const AccordionExpandIcon: React.FC = () => {
  const selectedMyle = useSelector((state: RootState) => state.home.selectedMyle);

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
      >{selectedMyle.categoryName}</Box>
          <Typography variant='h5' component="span" sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>  {selectedMyle.myleName}</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {selectedMyle.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionExpandIcon;