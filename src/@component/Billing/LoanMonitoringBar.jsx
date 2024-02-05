import React from 'react';
import { Box, Divider, Grid, Link, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
}));

const LoanMonitoringBar = ({
  title = '',
  titleValue = '',
  count = '',
  countColor = 0,
  countValue = '',
  dividerColor = '',
  text = '',
  textColor = '',
  textAlign = '',
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.appCard} style={{ height: 150, padding: 14 }}>
      <Divider orientation="vertical" style={{ width: 6, background: dividerColor, borderRadius: 12 }} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ paddingLeft: 8 }} width="100%">
        <Box display="flex">
          <Typography component="h4">
            <Box fontSize={20} fontWeight="400">
              {title}
            </Box>
          </Typography>
          <Typography component="h4" style={{ color: dividerColor }}>
            <Box fontSize={20} fontWeight="600">
              {titleValue}
            </Box>
          </Typography>
        </Box>
        <Typography component="h4" style={{ color: countColor }}>
          <Box fontSize={24} fontWeight="600">
            {count}
          </Box>
        </Typography>
        <Typography component="h4" style={{ color: countColor }}>
          <Box fontSize={24} fontWeight="600">
            {countValue}
          </Box>
        </Typography>
        <Typography variant="body2" gutterBottom style={{ color: textColor, textAlign: textAlign, marginTop: 'auto' }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoanMonitoringBar;
