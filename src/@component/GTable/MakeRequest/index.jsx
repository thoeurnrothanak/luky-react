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
import { useGetMakeRequestHandlerQuery, useAppMakeRequestMutation } from 'redux/api/Application';

const useStyles = makeStyles((theme) => ({
  titleDivier: {
    background: theme.palette.primary.main,
    height: 2,
  },
}));

const validationSchema = yup.object({
  type: yup.string().required('Please select a request type'),
  handler: yup.string().required('Please select a request handler'),
  comment: yup.string().required('Comment is required'),
});

const MakeRequest = ({ appId, button }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [skip, setSkip] = useState(true);

  const dispatch = useDispatch();

  const {
    data: users = [],
    isLoading,
    isSuccess,
    isError,
  } = useGetMakeRequestHandlerQuery(appId, { skip, refetchOnFocus: true });

  const [submitMakeRequest] = useAppMakeRequestMutation();

  const formik = useFormik({
    initialValues: {
      type: '',
      handler: users?.[0]?.id ?? '',
      comment: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(fetchStart());
      try {
        await submitMakeRequest({ appId, ...values }).unwrap();
        dispatch(fetchSuccess(''));
        onCloseDialog();
      } catch (error) {
        dispatch(fetchError('Make Requst Fail'));
      }
    },
  });

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
                Request to PFI
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
                    <Typography variant="body2">Choose Type of Request</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <FlatSelect
                      name="type"
                      fullWidth
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.type && formik.errors.type}>
                      <MenuItem value="needMoreInfo">Need More Info</MenuItem>
                      <MenuItem value="return">Return</MenuItem>
                    </FlatSelect>
                  </Grid>

                  <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2">Choose Handler of this Request</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <FlatSelect
                      name="handler"
                      fullWidth
                      value={formik.values.handler}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.handler && formik.errors.handler}>
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

export default MakeRequest;
