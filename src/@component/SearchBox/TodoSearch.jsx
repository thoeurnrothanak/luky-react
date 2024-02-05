import { Box, InputBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  searchRoot: {
    '& .MuiInputBase-input': {
      height: '100%',
      borderRadius: 6,
      backgroundColor: '#F0F2F5',
      padding: '12px',
      transition: 'all 0.3s ease',
    },
  },
}));

const TodoSearch = ({ value, onSearch, onBlur, placeholder, fullWidth }) => {
  const classes = useStyles();

  return (
    <Box className={classes.searchRoot}>
      <InputBase
        fullWidth={fullWidth}
        placeholder={placeholder || 'Search here...'}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={onSearch}
        onBlur={onBlur}
      />
    </Box>
  );
};

export default TodoSearch;
