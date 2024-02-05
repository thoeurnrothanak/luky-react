import { makeStyles, IconButton, Box } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';
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
  iconClear: {
    position: 'absolute',
    top: '20%',
    right: '5%',
    zIndex: 99,
  },
}));

const FlatDatePicker = ({ value, handleClear, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Box position="relative">
      <DatePicker value={value} className={clsx(classes.root, className)} size="small" inputVariant="outlined" {...rest} />
      {handleClear && !!value && (
        <IconButton className={classes.iconClear} edge="end" size="small" onClick={handleClear}>
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default FlatDatePicker;
