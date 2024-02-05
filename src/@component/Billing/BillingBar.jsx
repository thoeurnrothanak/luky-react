import React from 'react';
import { Box, Divider, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
}));

const BillingBar = ({ title = '', titleColor = '#DA0063', count = 0, countColor = '', text = '', onHandleViewDetail }) => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.appCard} style={{ height: 150, padding: 14 }}>
      <Divider orientation="vertical" style={{ width: 6, background: titleColor, borderRadius: 12 }} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ paddingLeft: 8 }} width="100%">
        <Typography component="h4">
          <Box fontSize={20} fontWeight="400">
            {title}
          </Box>
        </Typography>
        <Typography component="h4" style={{ color: countColor }}>
          <Box fontSize={36} fontWeight="bold">
            {count}
          </Box>
        </Typography>
        <Box
          fontSize={12}
          fontWeight="400"
          style={{ color: '#B9B9B9', width: '100%' }}
          display="flex"
          justifyContent="space-between"
          alignItems="center">
          <Typography component="h4" style={{ fontSize: 14, color: '#B9B9B9' }}>
            {text}
          </Typography>
          {onHandleViewDetail && (
            <Link style={{ fontSize: 14, color: '#B9B9B9', cursor: 'pointer' }} onClick={onHandleViewDetail}>
              View detail
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BillingBar;
