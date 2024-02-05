import React from 'react';
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
}));

const DashBar = ({ title = '', titleColor = '#DA0063', count = 0, text = '', onHandleViewDetail }) => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.appCard} style={{ height: 150, padding: 15 }}>
      <Divider orientation="vertical" style={{ width: 6, background: titleColor, borderRadius: 12 }} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ paddingLeft: 15 }} width="100%">
        <Typography component="h4">
          <Box fontSize={24} fontWeight="500">
            {title}
          </Box>
        </Typography>
        <Typography component="h4">
          <Box fontSize={40} fontWeight="bold">
            {count}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default DashBar;
