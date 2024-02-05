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

const TodoBar = ({ title = '', titleColor = '#DA0063', count = 0 }) => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.appCard} style={{ height: 120, padding: 14 }}>
      <Divider orientation="vertical" style={{ width: 6, background: titleColor }} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ paddingLeft: 8 }}>
        <Typography component="h4">
          <Box fontSize={24} fontWeight="bold">
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

export default TodoBar;
