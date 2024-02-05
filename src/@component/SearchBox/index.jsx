import { Box, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  searchRoot: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      left: 18,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    '& .MuiInputBase-root': {
      height: '100%',
    },
    '& .MuiInputBase-input': {
      height: '100%',
      borderRadius: 12,
      backgroundColor: theme.palette.background.paper,
      border: `2px solid ${theme.palette.primary.main}`,
      boxSizing: 'border-box',
      padding: '5px 15px 5px 50px',
      transition: 'all 0.3s ease',
    },
  },
}));

const SearchBox = ({ value, onSearch, onBlur, placeholder }) => {
  const classes = useStyles();

  return (
    <Box pr={3} className={classes.searchRoot}>
      <SearchIcon />
      <InputBase
        placeholder={placeholder || 'Search here...'}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={onSearch}
        onBlur={onBlur}
      />
    </Box>
  );
};

export default SearchBox;
