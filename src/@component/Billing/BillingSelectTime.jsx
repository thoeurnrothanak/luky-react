import { makeStyles } from '@material-ui/core';
import { TimePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import React from 'react';
import { IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

const BillingTimePicker = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <TimePicker
      className={clsx(classes.root, className)}
      size="small"
      inputVariant="outlined"
      {...rest}
      InputProps={{
        endAdornment: (
          <IconButton position="end" style={{ color: '#028400' }} size="small">
            <AccessTimeIcon style={{ fontSize: 20 }} />
          </IconButton>
        ),
      }}
    />
  );
};

export default BillingTimePicker;
