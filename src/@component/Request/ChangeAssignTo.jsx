import { Box, Menu, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import { useGetLGChangeRequestAssignableUserQuery, useLgChangeRequestAssignToMutation } from 'redux/api/LG';

const ChangeAssignTo = ({ requestId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [skip, setSkip] = useState(true);
  const dispatch = useDispatch();

  const { data: users = [], isLoading, isError } = useGetLGChangeRequestAssignableUserQuery(requestId, { skip });

  const [requestAssignTo] = useLgChangeRequestAssignToMutation();

  const handleMouseOver = () => {
    if (skip) {
      setSkip(false);
    }
  };

  useEffect(() => {
    if (anchorEl !== null && isError) {
      dispatch(fetchError('Fail to fetch Assignable Person'));
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onItemClick = async (user) => {
    dispatch(fetchStart());
    try {
      await requestAssignTo({ requestId, userId: user.id }).unwrap();
      dispatch(fetchSuccess('Request Assign Successfully'));
      handleClose();
    } catch (error) {
      if (error && error.status === 400) {
        dispatch(fetchError(error.data.msg || error.data.message));
      } else {
        dispatch(fetchError('Fail to Assign Request'));
      }
    }
  };

  return (
    <Box style={{ width: '100%' }} onMouseOver={handleMouseOver}>
      <div onClick={handleClick}>Assign To...</div>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {isLoading && <MenuItem key="isLoading">Loading...</MenuItem>}
        {!isLoading &&
          (users.length === 0 ? (
            <MenuItem key="noOptions">No User Available</MenuItem>
          ) : (
            users.map((user, index) => (
              <MenuItem key={index} onClick={() => onItemClick(user)}>
                {user.name}
              </MenuItem>
            ))
          ))}
      </Menu>
    </Box>
  );
};

export default ChangeAssignTo;
