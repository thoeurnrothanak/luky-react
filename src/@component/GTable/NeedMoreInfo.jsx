import FlatButton from '@component/Button';
import FlatSelect from '@component/Select';
import FlatTextField from '@component/TextField';
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  makeStyles,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import { useAppAskMoreInfoMutation, useGetAskableUserQuery } from 'redux/api/Application';

const useStyles = makeStyles((theme) => ({
  titleDivier: {
    background: theme.palette.primary.main,
    height: 2,
  },
}));

const validationSchema = yup.object({
  receiver: yup.string().required('Please select a receiver'),
  comment: yup.string().required('Comment is required'),
});

const NeedMoreInfo = ({ appId, button }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [skip, setSkip] = useState(true);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      receiver: '',
      comment: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(fetchStart());
      try {
        await askMoreInfo({ appId, ...values }).unwrap();
        dispatch(fetchSuccess(''));
        onCloseDialog();
      } catch (error) {
        dispatch(fetchError('Fail to Request for More Info'));
      }
    },
  });

  const { data: users = [], isLoading, isSuccess, isError } = useGetAskableUserQuery(appId, { skip, refetchOnFocus: true });

  const [askMoreInfo] = useAppAskMoreInfoMutation();

  const handleMouseOver = () => {
    if (skip) {
      setSkip(false);
    }
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  const handleClick = (event) => {
    setOpenDialog(true);
  };

  return (
    <Box style={{ width: '100%' }} onMouseOver={handleMouseOver}>
      {button ? React.cloneElement(button, { onClick: handleClick }) : <div onClick={handleClick}>Need More Info</div>}
      <Dialog open={openDialog} onClose={onCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent style={{ padding: 12, minHeight: 80 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Typography variant="h4" component="h4" gutterBottom>
                Need More Info
              </Typography>
              <Divider className={classes.titleDivier} />
            </Box>

            {isError && (
              <Box mt={4} style={{ color: '#f44336' }}>
                <Typography variant="h6" component="h6" gutterBottom>
                  Fail to fetch Person to ask for more info.
                </Typography>
              </Box>
            )}

            {isLoading && (
              <Box display="flex" justifyContent="center" minWidth={50} minHeight={50}>
                <CircularProgress />
              </Box>
            )}

            {isSuccess && (
              <Box mt={4}>
                <Grid container spacing={6}>
                  <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">Choose receiver of this message</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <FlatSelect
                      name="receiver"
                      fullWidth
                      value={formik.values.receiver}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.receiver && formik.errors.receiver}>
                      {users.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </FlatSelect>
                  </Grid>

                  <Grid item xs={12}>
                    <Box mt={4}>
                      <Typography variant="body2" gutterBottom>
                        Your Comment
                      </Typography>
                      <FlatTextField
                        name="comment"
                        fullWidth
                        placeholder="Please write down your comment here..."
                        value={formik.values.comment}
                        multiline
                        minRows={10}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.comment && formik.errors.comment}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box display="flex" justifyContent="flex-start">
                      <FlatButton onClick={onCloseDialog}>Cancel</FlatButton>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                      <FlatButton color="primary" type="submit">
                        Submit
                      </FlatButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NeedMoreInfo;
