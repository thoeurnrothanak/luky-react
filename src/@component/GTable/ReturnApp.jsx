import FlatButton from '@component/Button';
import FlatSelect from '@component/Select';
import FlatTextField from '@component/TextField';
import { Box, Dialog, DialogContent, Divider, Grid, makeStyles, MenuItem, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchError, fetchStart, fetchSuccess } from 'redux/actions';
import { useGetAppReviewQuery, useReturnAppMutation } from 'redux/api/Application';
import { STAGE_PRETTY } from '@component/constants/Application';

const useStyles = makeStyles((theme) => ({
  titleDivier: {
    background: theme.palette.primary.main,
    height: 2,
  },
}));

const validationSchema = (stage) =>
  yup.object({
    comment: yup.string().required('Comment is required'),
    stage: yup.string().when({
      is: () => ['PFI_REVIEW', 'CGCC_COP_REVIEW'].includes(stage),
      then: yup.string(),
      otherwise: yup.string().required('Handler is required'),
    }),
  });

const ReturnApp = ({ app }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const { data: reviews = [] } = useGetAppReviewQuery({ appId: app._id });

  const isCreator = ['PFI_REVIEW', 'CGCC_COP_REVIEW'].includes(app?.stage?.id);

  const getStages = (stage, reviews = []) => {
    const stages = ['CGCC_APPROVAL', 'CGCC_RISK_RECOMMEND', 'CGCC_COP_RECOMMEND', 'CGCC_COP_REVIEW'];

    while (stages.length > 0) {
      const group = stages.shift();
      if (stage === group) {
        break;
      }
    }

    return stages
      ?.map((stage) => {
        const review = [...reviews]?.find((item) => item?.stage === stage);

        if (review) {
          const name = `${STAGE_PRETTY[stage]?.title} (${review?.user?.name})`;

          return { id: stage, name };
        }
        return undefined;
      })
      .filter((item) => !!item);
  };

  const [returnApp] = useReturnAppMutation();

  const formik = useFormik({
    initialValues: {
      comment: '',
      stage: '',
    },
    validationSchema: validationSchema(app?.stage?.id),
    onSubmit: async (values) => {
      dispatch(fetchStart());
      try {
        await returnApp({ appId: app._id, ...values }).unwrap();
        dispatch(fetchSuccess(''));
        onCloseDialog();
      } catch (error) {
        dispatch(fetchError('Fail to Return Request'));
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
    <Box>
      <FlatButton size="large" onClick={handleClick}>
        Return
      </FlatButton>
      <Dialog open={openDialog} onClose={onCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent style={{ padding: 12, minHeight: 80 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box className={classes.colorPrimary}>
              <Typography variant="h4" component="h4" gutterBottom>
                Return
              </Typography>
              <Divider className={classes.titleDivier} />
            </Box>

            <Box mt={4}>
              <Grid container spacing={4}>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2">{isCreator ? 'Send To' : 'Choose receiver of this message'}</Typography>
                </Grid>

                <Grid item xs={6}>
                  {isCreator ? (
                    <Typography variant="subtitle2" fontWeight="bold">
                      {app?.creator?.name}
                    </Typography>
                  ) : (
                    <FlatSelect
                      name="stage"
                      fullWidth
                      value={formik.values.stage}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.stage && formik.errors.stage}>
                      {getStages(app?.stage?.id, reviews).map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </FlatSelect>
                  )}
                </Grid>

                <Grid item xs={12}>
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
