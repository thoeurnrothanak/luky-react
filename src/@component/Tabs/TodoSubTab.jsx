import { Box, Button, Divider, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  titleDivier: {
    background: theme.palette.primary.main,
    height: 2,
  },
  flatButton: {
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
  primaryTab: {
    color: theme.palette.primary.main,
    backgroundColor: '#0284001a',
  },
}));

const TodoSubTab = ({ label, value, index, onClick, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.flatButton, value === index && classes.primaryTab)}
      size="small"
      onClick={() => {
        if (onClick && typeof onClick === 'function') {
          onClick(index);
        }
      }}
      {...props}>
      {label}
    </Button>
  );
};

export default TodoSubTab;
