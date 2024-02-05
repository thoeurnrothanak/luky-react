import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
  primaryIcon: {
    background: theme.palette.primary.main,
    borderRadius: '6px',
    color: 'white',
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}));

const SearchFilter = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Tooltip title="Filter list">
      <IconButton onClick={onClick} size="small" className={classes.primaryIcon}>
        <FilterListIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SearchFilter;
