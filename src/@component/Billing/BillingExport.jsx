import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
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
  exportButton: {
    height: 39,
    fontSize: '14 !important',
    textTransform: 'none !important',
    fontFamily: 'Roboto',
    borderRadius: 6,
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    padding: theme.spacing(1, 3),
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '& svg': {
      marginLeft: 0,
      marginRight: theme.spacing(1),
    },
  },
}));

const ExportButton = ({ children, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Button className={clsx(classes.root, classes.exportButton, className)} variant="contained" {...rest}>
      <svg
        style={{ marginBottom: 1 }}
        height="14"
        viewBox="0 0 14 14"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.33594 3.96797C2.33594 2.98788 2.33594 2.49783 2.52668 2.12349C2.69445 1.7942 2.96217 1.52649 3.29145 1.35871C3.6658 1.16797 4.15585 1.16797 5.13594 1.16797H7.11927C7.28262 1.16797 7.36429 1.16797 7.42669 1.19976C7.48157 1.22772 7.52619 1.27234 7.55415 1.32722C7.58594 1.38961 7.58594 1.47129 7.58594 1.63464V2.91797C7.58594 4.20663 8.63061 5.2513 9.91927 5.2513H11.2026C11.366 5.2513 11.4476 5.2513 11.51 5.28309C11.5649 5.31105 11.6095 5.35567 11.6375 5.41055C11.6693 5.47295 11.6693 5.55462 11.6693 5.71797V10.0346C11.6693 11.0147 11.6693 11.5048 11.4785 11.8791C11.3108 12.2084 11.043 12.4761 10.7138 12.6439C10.3394 12.8346 9.84936 12.8346 8.86927 12.8346H5.13594C4.15585 12.8346 3.6658 12.8346 3.29145 12.6439C2.96217 12.4761 2.69445 12.2084 2.52668 11.8791C2.33594 11.5048 2.33594 11.0147 2.33594 10.0346V3.96797ZM7.0026 5.83464C7.32477 5.83464 7.58594 6.0958 7.58594 6.41797V8.50968L7.75679 8.33882C7.9846 8.11102 8.35394 8.11102 8.58175 8.33882C8.80956 8.56663 8.80956 8.93598 8.58175 9.16378L7.41508 10.3304C7.18728 10.5583 6.81793 10.5583 6.59013 10.3304L5.42346 9.16378C5.19565 8.93598 5.19565 8.56663 5.42346 8.33882C5.65126 8.11102 6.02061 8.11102 6.24842 8.33882L6.41927 8.50968V6.41797C6.41927 6.0958 6.68044 5.83464 7.0026 5.83464Z"
        />
        <path d="M8.75 1.58045C8.75 1.35264 8.93467 1.16797 9.16248 1.16797C9.27188 1.16797 9.37679 1.21143 9.45415 1.28878L11.5459 3.38049C11.6232 3.45784 11.6667 3.56276 11.6667 3.67216C11.6667 3.89996 11.482 4.08464 11.2542 4.08464H9.91667C9.27233 4.08464 8.75 3.5623 8.75 2.91797V1.58045Z" />
      </svg>
      {children}
    </Button>
  );
};

ExportButton.propTypes = {
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

export default ExportButton;
