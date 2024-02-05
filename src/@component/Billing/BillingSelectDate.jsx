import React from 'react';
import { makeStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import { IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const useStyles = makeStyles((theme) => ({
  root: {
    // '& .MuiOutlinedInput-notchedOutline': {
    //   display: 'none',
    // },
    '& .MuiOutlinedInput-root:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },
    '& .MuiInputBase-root': {
      borderRadius: 8,
      backgroundColor: theme.palette.background.default,
    },
  },
  // label: {
  //   marginBottom: theme.spacing(7),
  // },
}));

const BillingDatePicker = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <DatePicker
      className={clsx(classes.root, className)}
      size="small"
      inputVariant="outlined"
      {...rest}
      InputProps={{
        endAdornment: (
          <IconButton position="end" style={{ color: '#028400' }} size="small">
            <CalendarMonthIcon style={{ fontSize: 20 }} />
          </IconButton>
        ),
      }}
    />
  );
};

export default BillingDatePicker;
