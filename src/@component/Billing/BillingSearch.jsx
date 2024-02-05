import { Box, InputBase, makeStyles } from '@material-ui/core';
import { alpha } from '@mui/material/styles';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  searchRoot: {
    position: 'relative',
    marginRight: 4,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
    '& .searchBtn': {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    '& .MuiInputBase-root': {
      width: theme.spacing(1, 3),
    },
    '& .MuiInputBase-input': {
      height: 40,
      borderRadius: 6,
      position: 'relative',
      backgroundColor: '#F0F2F5',
      fontSize: 14,
      boxSizing: 'border-box',
      padding: theme.spacing(1, 3),
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const BillingSearch = ({ value, onSearch, onBlur, placeholder, fullWidth }) => {
  const classes = useStyles();

  const intl = useIntl();

  return (
    <Box className={classes.searchRoot}>
      <InputBase
        fullWidth={fullWidth}
        placeholder={placeholder || intl.formatMessage({ id: 'search.search' })}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={onSearch}
        onBlur={onBlur}
      />
    </Box>
  );
};

export default BillingSearch;
