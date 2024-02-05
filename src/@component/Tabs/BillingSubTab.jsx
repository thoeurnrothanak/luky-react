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
    padding: 15,
    height: 36,
    borderRadius: 6,
    fontSize: 12,
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

const BillingSubTab = ({ label, value, index, onClick, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.flatButton, value === index && classes.primaryTab)}
      // color={value === index ? 'primary' : 'secondary'}
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
  return (
    <Box mr={4} style={{ cursor: 'pointer' }}>
      <Button
        className={classes.buttonTab}
        color={value === index ? 'primary' : 'secondary'}
        size="small"
        onClick={() => {
          onClick(index);
        }}>
        {label}
      </Button>
      {value === index && <Divider className={classes.titleDivier} />}
    </Box>
  );
};

export default BillingSubTab;
