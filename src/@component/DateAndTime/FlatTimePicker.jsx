import { makeStyles } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    // '& .MuiOutlinedInput-notchedOutline': {
    //   display: 'none',
    // },
    '& .MuiOutlinedInput-root:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },
    '& .MuiInputBase-root': {
      borderRadius: '8px',
      backgroundColor: theme.palette.background.default,
    },
  },
  label: {
    marginBottom: theme.spacing(7),
  },
}));

const FlatTimePicker = ({ ...rest }) => {
  const classes = useStyles();

  return <TimePicker className={classes.root} size="small" inputVariant="outlined" {...rest} />;
};

export default FlatTimePicker;
