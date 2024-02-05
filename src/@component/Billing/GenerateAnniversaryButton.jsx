import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = ({ minWidth }) =>
  makeStyles((theme) => ({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
      },
    },
    minWidth: {
      [theme.breakpoints.up('sm')]: {
        minWidth: minWidth || theme.spacing(1, 3),
      },
    },
    tabButton: {
      height: 39,
      fontSize: '14px', // Fix the syntax error here (removed !important)
      textTransform: 'none', // Fix the syntax error here (removed !important)
      fontFamily: 'Roboto',
      borderRadius: 6,
      marginLeft: 8,
      // You can customize padding and width based on screen size using breakpoints
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1, 3),
        width: theme.spacing(1, 3),
      },
    },
  }));

const AnniversaryButton = ({ children, className, minWidth, ...rest }) => {
  const classes = useStyles({ minWidth })();

  return (
    <Button className={clsx(classes.root, classes.minWidth, classes.tabButton, className)} variant="contained" {...rest}>
      {children}
    </Button>
  );
};

AnniversaryButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  component: PropTypes.elementType,
  disabled: PropTypes.bool,
  disableElevation: PropTypes.bool,
  disableFocusRipple: PropTypes.bool,
  disableRipple: PropTypes.bool,
  endIcon: PropTypes.node,
  focusVisibleClassName: PropTypes.string,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  startIcon: PropTypes.node,
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};

export default AnniversaryButton;
