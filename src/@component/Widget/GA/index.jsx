import React from 'react';
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    position: 'relative',
    overflow: 'hidden',
    padding: 12,
  },
  divider: {
    width: 4,
    borderRadius: 4,
  },
}));

const GABox = ({ title = '', subTitle = '', color = '', value = 0, ViewArchive = undefined }) => {
  const classes = useStyles();

  return (
    <Box display="flex" style={{ height: 120 }} className={classes.appCard}>
      <Divider orientation="vertical" className={classes.divider} style={{ background: color }} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" ml={2}>
        <Typography component="h6">
          <Box fontSize={18}>{title}</Box>
        </Typography>
        <Typography component="h6" variant="h6">
          <Box fontSize={32}>{value}</Box>
        </Typography>
        <Typography component="h6" variant="body2" color="textSecondary">
          <Box fontSize={10}>{subTitle}</Box>
        </Typography>
      </Box>
      {ViewArchive && (
        <Box justifySelf="end" flexGrow={1} style={{ position: 'absolute', bottom: 8, right: 8 }}>
          <ViewArchive />
        </Box>
      )}
    </Box>
  );
};

export default GABox;
