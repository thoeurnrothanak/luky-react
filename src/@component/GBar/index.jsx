import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';

const GBar = ({ title = '', titleColor = '#DA0063', count = 0 }) => {
  return (
    <Box display="flex" style={{ height: 60 }}>
      <Divider orientation="vertical" style={{ width: 14, background: titleColor }} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ color: titleColor, padding: 4 }}>
        <Typography component="h4">
          <Box fontSize={18}>{title}</Box>
        </Typography>
        <Typography component="h4">
          <Box fontSize={18}>{count}</Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default GBar;
