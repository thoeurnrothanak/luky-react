import FlatButton from '@component/Button';
import FlatTextField from '@component/TextField';
import { Box, Dialog, DialogContent, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import { useReturnAppMutation } from 'redux/api/Application';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  titleDivier: {
    background: theme.palette.primary.main,
    height: 2,
  },
}));

const validationSchema = yup.object({
  comment: yup.string().required('Comment is required'),
});

const ReturnApp = ({ appId, creator, button }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const [returnApp] = useReturnAppMutation();

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(fetchStart());
      try {
        await returnApp({ appId, ...values }).unwrap();
        dispatch(fetchSuccess(''));
        onCloseDialog();
        history.goBack();
      } catch (error) {
        dispatch(fetchError('Fail to Return Application'));
      }
    },
  });

  const onCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  const handleClick = (event) => {
    setOpenDialog(true);
  };

  return (
    <Box style={{ width: '100%' }}>
      {button ? React.cloneElement(button, { onClick: handleClick }) : <div onClick={handleClick}>Need More Info</div>}
      <Dialog open={openDialog} onClose={onCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent style={{ padding: 12, minHeight: 80 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Typography variant="h4" component="h4" gutterBottom>
                Return Application
              </Typography>
              <Divider className={classes.titleDivier} />
            </Box>

            <Box mt={4}>
              <Grid container spacing={6}>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2">Application Creator</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Box component="span" fontWeight="bold">
                    {creator?.name}
                  </Box>
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
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReturnApp;
