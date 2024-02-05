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
        minWidth: minWidth ?? 180,
      },
    },
    approveButton: {
      height: 39,
      width: 160,
      marginLeft: 8,
      fontSize: '14 !important',
      textTransform: 'none !important',
      fontFamily: 'Roboto',
      borderRadius: 6,
      fontWeight: 500,
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF',
      padding: theme.spacing(1, 3), // responsive padding
      '&:hover': {
        boxShadow: 'none',
      },
      '& svg': {
        marginLeft: 0, // reset the default margin
        marginRight: theme.spacing(1), // add some space between the icon and text
      },
    },
  }));

const MonthlyApprovalButton = ({ children, className, minWidth, ...rest }) => {
  const classes = useStyles({ minWidth })();

  return (
    <Button className={clsx(classes.root, classes.minWidth, classes.approveButton, className)} variant="contained" {...rest}>
      {children}
    </Button>
  );
};

MonthlyApprovalButton.propTypes = {
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

export default MonthlyApprovalButton;
