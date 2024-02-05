import React from 'react';
import { FormControl, FormHelperText, makeStyles, Select, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from 'clsx';

const useStyles = ({ transparent }) =>
  makeStyles((theme) => ({
    root: {
      // '& .MuiOutlinedInput-notchedOutline': {
      //   display: 'none',
      // },
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
      // marginRight: 9,
    },
  }));

const CustomIconComponent = ({ className, ...props }) => {
  const classes = useStyles({})();
  return <ArrowDropDownIcon className={clsx(className, classes.icon)} {...props} />;
};

const FlatSelect = ({
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

export default FlatSelect;
