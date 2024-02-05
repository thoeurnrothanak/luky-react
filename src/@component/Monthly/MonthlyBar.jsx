import React from 'react';
import { Box, Divider, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  divider: {
    position: 'absolute',
    height: 50,
    width: 3,
    borderRadius: 12,
    background: '#BFBFBF',
    left: '50%',
    transform: 'translateX(-50%)',
    marginLeft: 45,
    [theme.breakpoints.up('sm')]: {
      left: 'auto',
      right: '50%',
      transform: 'translateX(50%)',
    },
  },
  count: {
    position: 'relative',
    marginRight: 45,
  },
}));

const MonthlyBar = ({ title = '', titleColor = '#DA0063', count1 = 0, count2 = 0, text = '', onHandleViewDetail }) => {
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
        <Typography component="h4">
          <Box fontSize={36} fontWeight="bold">
            <Box display="flex" justifyContent="space-between" alignItems="center" position="relative">
              <Box>{count1}</Box>
              <Box className={classes.divider}>
                <Divider orientation="vertical" />
              </Box>
              <Box className={classes.count}>{count2}</Box>
            </Box>
          </Box>
        </Typography>
        <Box
          fontSize={12}
          fontWeight="400"
          style={{ color: '#B9B9B9', width: '100%' }}
          display="flex"
          justifyContent="space-between"
          alignItems="center">
          <Typography
            component="h4"
            style={{ fontSize: 14, color: title === 'Total Letter Of Guarantee' ? '#D5001A' : '#B9B9B9' }}>
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

export default MonthlyBar;
