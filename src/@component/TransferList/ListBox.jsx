import TodoSearch from '@component/SearchBox/TodoSearch';
import { Box, Checkbox, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: 6,
  },
  list: {
    height: 320,
    overflow: 'auto',
  },
}));

const ListBox = ({ title, items, onCheckChange, render }) => {
  const classes = useStyles();

  const [search, setSearch] = useState('');

  return (
    <Box>
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>
      <Box className={classes.box} mt={2}>
        <Box margin={2}>
          <TodoSearch
            fullWidth
            value={search}
            onSearch={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Box>
        <List dense role="list" className={classes.list}>
          {items
            .filter((item) => render(item.value).includes(search))
            .map((item) => {
              return (
                <ListItem dense disableGutters key={item.index} role="listitem" onClick={onCheckChange(item.index)}>
                  <ListItemIcon>
                    <Checkbox checked={item.isChecked} tabIndex={-1} disableRipple />
                  </ListItemIcon>
                  <ListItemText primary={render(item.value)} />
                </ListItem>
              );
            })}
          <ListItem />
        </List>
      </Box>
    </Box>
  );
};

export default ListBox;
