import React from 'react';
import { FormControl, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

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
    marginBottom: theme.spacing(4),
  },
  input: {
    '&::placeholder': {
      color: theme.palette.text.secondary,
    },
  },
}));

const FlatTextField = ({ children, label, fullWidth, required, error, helperText = '', className, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControl className={clsx(className, classes.root)} fullWidth={fullWidth} error={error || helperText !== ''}>
      {label && <Typography variant="subtitle2">{label}</Typography>}
      <TextField
        variant="outlined"
        size="small"
        required={required}
        error={error || helperText !== ''}
        helperText={helperText}
        InputProps={{ classes: { input: classes.input } }}
        {...rest}>
        {children}
      </TextField>
    </FormControl>
  );
};

FlatTextField.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  FormHelperTextProps: PropTypes.object,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.node,
  hiddenLabel: PropTypes.bool,
  id: PropTypes.string,
  InputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  label: PropTypes.node,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  multiline: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  select: PropTypes.bool,
  SelectProps: PropTypes.object,
  size: PropTypes.oneOf(['medium', 'small']),
  type: PropTypes.string,
  value: PropTypes.any,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default FlatTextField;
