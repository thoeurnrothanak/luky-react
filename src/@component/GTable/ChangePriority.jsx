import { Box, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchError } from 'redux/actions';
import { useAppChangePriorityMutation } from 'redux/api/Application';

const PRIORITY = [
  { value: 'normal', label: 'NORMAL' },
  { value: 'urgent', label: 'URGENT' },
];

const ChangePriority = ({ app, onSubmit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const [setPriority] = useAppChangePriorityMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onItemClick = async (priority) => {
    if (priority === app?.priority) {
      return;
    }
    try {
      await setPriority({ appId: app.id, priority }).unwrap();
      handleClose();
    } catch (error) {
      dispatch(fetchError('Fail to Set Priority'));
    }
  };

  return (
    <Box>
      <div onClick={handleClick}>Change Priority</div>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {PRIORITY.filter((item) => item.value !== app?.priority).map((priority, index) => (
          <MenuItem key={index} onClick={() => onItemClick(priority.value)}>
            {priority.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ChangePriority;
