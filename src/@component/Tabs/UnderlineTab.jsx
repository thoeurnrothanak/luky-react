import { Box, Button, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  titleDivier: {
    background: theme.palette.primary.main,
    height: 2,
  },
  buttonTab: {
    boxShadow: 'none',
    textTransform: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
}));

const UnderlineTab = ({ label, value, index, onClick }) => {
  const classes = useStyles();
  return (
    <Box mr={4} style={{ cursor: 'pointer' }}>
      <Button
        className={classes.buttonTab}
        color={value === index ? 'primary' : 'secondary'}
        size="small"
        onClick={() => {
          if (onClick && typeof onClick === 'function') {
            onClick(index);
          }
        }}>
        {label}
      </Button>
      {value === index && <Divider className={classes.titleDivier} />}
    </Box>
  );
};

export default UnderlineTab;
