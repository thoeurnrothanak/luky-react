import { makeStyles, IconButton, Box } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: theme.spacing(1, 3),
    marginRight: 8,
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
    right: '10%',
    zIndex: 99,
  },
}));

const BillingFilterDate = ({ value, handleClear, className, disabled, ...rest }) => {
  const classes = useStyles();

  return (
    <Box position="relative">
      <DatePicker
        value={value}
        className={clsx(classes.root, className)}
        size="small"
        disabled={disabled}
        inputVariant="outlined"
        {...rest}
      />
      {!!handleClear && !!value && !disabled && (
        <IconButton className={classes.iconClear} edge="end" size="small" onClick={handleClear}>
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default BillingFilterDate;
