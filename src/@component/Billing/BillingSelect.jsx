import React from 'react';
import { FormControl, FormHelperText, makeStyles, Select, Typography } from '@material-ui/core';
import clsx from 'clsx';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { alpha } from '@mui/material/styles';

const useStyles = ({ transparent }) =>
  makeStyles((theme) => ({
    root: {
      position: 'relative',
      width: theme.spacing(1, 3),
      marginRight: 4,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
      [theme.breakpoints.up('md')]: {},
      '& .MuiOutlinedInput-root:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
        display: 'none',
      },
      '& .MuiInputBase-root': {
        height: 39,
        borderRadius: 6,
        backgroundColor: 'white',
      },
      '& .MuiInputBase-input': {
        borderRadius: 6,
        position: 'relative',
        fontSize: 14,
        backgroundColor: transparent ? 'transparent' : theme.palette.background.default,
        boxSizing: 'border-box',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
          boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.primary.main,
        },
      },
      '& .MuiSelect-select:focus': {
        backgroundColor: transparent ? 'transparent' : null,
        '& ~ .MuiOutlinedInput-notchedOutline': {
          borderRadius: 8,
        },
      },
    },
    label: {
      marginBottom: theme.spacing(7),
    },
    icon: {
      fill: theme.palette.primary.main,
      marginRight: 'auto',
    },
  }));

const CustomIconComponent = ({ className, ...props }) => {
  const classes = useStyles({})();
  return <ArrowDropDownIcon className={clsx(className, classes.icon)} {...props} />;
};

const BillingSelect = ({
  children = [],
  label,
  fullWidth,
  required,
  renderValue,
  error,
  transparent,
  helperText = '',
  className,
  ...rest
}) => {
  const classes = useStyles({ transparent })();

  let options = children.map(({ props }) => ({ value: props.value, label: props.children }));

  const customRenderValue = (value) => {
    if (Array.isArray(value)) {
      return renderValue(value.map((selected) => ({ ...options.find((opt) => opt.value === selected) })));
    } else {
      return renderValue({ ...options.find((opt) => opt.value === value) });
    }
  };

  return (
    <FormControl className={clsx(classes.root, className)} fullWidth={fullWidth} error={error || helperText !== ''}>
      {label && <Typography variant="subtitle2">{label}</Typography>}
      <Select
        displayEmpty
        margin="dense"
        variant="outlined"
        color="primary"
        required={required}
        renderValue={renderValue ? customRenderValue : null}
        IconComponent={CustomIconComponent} // Use the custom icon component
        {...rest}>
        {children}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default BillingSelect;
