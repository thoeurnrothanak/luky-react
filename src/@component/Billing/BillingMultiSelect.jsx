import React from 'react';
import { FormControl, FormHelperText, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Autocomplete } from '@material-ui/lab';
import FlatTextField from '@component/TextField';

const useStyles = ({ transparent }) =>
  makeStyles((theme) => ({
    root: {
      '& .MuiOutlinedInput-root:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
        display: 'none',
      },
      '& .MuiInputBase-root': {
        borderRadius: '8px',
        backgroundColor: transparent ? 'transparent' : theme.palette.background.default,
      },
      '& .MuiSelect-select:focus': {
        backgroundColor: transparent ? 'transparent' : null,
      },
    },
    label: {
      marginBottom: theme.spacing(7),
    },
    icon: {
      fill: theme.palette.primary.main,
    },
  }));

const customRenderInput = (params) => <FlatTextField {...params} />;

const BillingMultiSelect = ({
  label,
  fullWidth,
  error,
  transparent,
  helperText = '',
  renderInput,
  className,
  placeholder,
  ...rest
}) => {
  const classes = useStyles({ transparent })();

  return (
    <FormControl className={clsx(classes.root, className)} fullWidth={fullWidth} error={error || helperText !== ''}>
      <Autocomplete renderInput={renderInput ?? customRenderInput} placeholder={placeholder} {...rest} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default BillingMultiSelect;
