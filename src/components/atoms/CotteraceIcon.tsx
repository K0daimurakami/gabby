import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CoterraceIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <image href="/images/coterraceLogo.png" width="24" height="24" />
    </SvgIcon>
  );
};

export default CoterraceIcon;
