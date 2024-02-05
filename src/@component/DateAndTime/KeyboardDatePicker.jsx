import { makeStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
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

const FlatKeyboardDatePicker = ({ className, ...rest }) => {
  const classes = useStyles();

  return <KeyboardDatePicker className={clsx(classes.root, className)} size="small" inputVariant="outlined" {...rest} />;
};

export default FlatKeyboardDatePicker;
