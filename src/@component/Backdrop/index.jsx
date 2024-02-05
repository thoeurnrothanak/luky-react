import { Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = ({ local }) =>
  makeStyles((theme) => ({
    root: {
      zIndex: theme.zIndex.drawer + 1,
      position: local ? 'absolute' : null,
    },
  }));

const MyBackdrop = ({ children, className, local, ...rest }) => {
  const classes = useStyles({ local })();

  return (
    <Backdrop className={clsx(classes.root, className)} {...rest}>
      {children}
    </Backdrop>
  );
};

MyBackdrop.propTypes = {
  local: PropTypes.bool,
  invisible: PropTypes.bool,
  open: PropTypes.bool,
};

export default MyBackdrop;
