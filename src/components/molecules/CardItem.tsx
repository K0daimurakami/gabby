import React from "react";
import { Card, CardContent } from "@mui/material";
import Typography from "../atoms/Typography";

interface Props {
  title: string;
}

const CardItem: React.FC<Props> = ({ title }) => {
  return (
    <Card sx={{ width: 200 }}>
      <CardContent>
        <Typography text={title} />
      </CardContent>
    </Card>
  );
};

export default CardItem;
