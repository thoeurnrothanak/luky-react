import FlatButton from '@component/Button';
import ErrorBoundary from '@component/ErrorBoundary';
import FlatSelect from '@component/Select';
import FlatTextField from '@component/TextField';
import { Box, Dialog, DialogContent, Divider, Grid, MenuItem, Typography, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import Attachment from 'modules/LG/ChangeRequest/Attachment';
import { useGetLGChangeReviewRequestAuthorizerQuery } from 'redux/api/LG';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  titleDivier: {
    background: theme.palette.primary.main,
    height: 2,
  },
}));

const ChangeAuthorizer = ({ id, requestType, returnInfo, open, onClose, onSubmit }) => {
  const classes = useStyles();

  const { data: approvers = [] } = useGetLGChangeReviewRequestAuthorizerQuery(requestType);

  const validationSchema = yup.object({
    receiver: yup.string().nullable().required('Receiver is required'),
    returnReply: returnInfo
      ? yup.object({ comment: yup.string().required('Comment is required') })
      : yup.object()?.nullable(),
  });

  const formik = useFormik({
    initialValues: { receiver: approvers?.[0]?.id ?? '', returnReply: returnInfo ? { comment: '', attachments: [] } : null },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogContent style={{ padding: 12, minHeight: 80, minWidth: 300 }}>
        <ErrorBoundary>
          <Box>
            <Box mb={4} className={classes.colorPrimary}>
              <Typography variant="h4" component="h4" gutterBottom>
                Submit for Authorier
              </Typography>
              <Divider className={classes.titleDivier} />
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2">Choose Approver</Typography>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                <FlatSelect
                  name="receiver"
                  required
                  fullWidth
                  value={formik.values.receiver}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.receiver && formik.errors.receiver}>
                  {approvers.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </FlatSelect>
              </Grid>

              {returnInfo && (
                <>
                  <Grid item xs={12}>
                    <Box className={classes.colorPrimary}>
                      <Typography variant="h4" component="h4" gutterBottom>
                        Return Message
                      </Typography>
                      <Divider className={classes.titleDivier} />
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2">Request By:</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                      {returnInfo?.requester?.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2">Description:</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                      {returnInfo?.comment}
                    </Typography>
                  </Grid>

                  <Grid item xs={4} sm={4}>
                    <Typography variant="body2">
                      Comment
                      <Box component="span" color="primary.main">
                        *
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8}>
                    <FlatTextField
                      name="returnReply.comment"
                      fullWidth
                      placeholder="Please write down your comment here..."
                      multiline
                      value={formik.values.returnReply.comment}
                      minRows={4}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched?.returnReply?.comment && formik.errors?.returnReply?.comment}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Attachment
                      id={id}
                      files={formik.values.returnReply.attachments}
                      canSubmit={true}
                      onChange={(newFiles) => {
                        formik.setFieldValue('returnReply.attachments', [...newFiles]);
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Box display="flex" justifyContent="end" mt={8}>
              <FlatButton color="primary" onClick={() => formik.submitForm()}>
                Submit
              </FlatButton>
            </Box>
          </Box>
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAuthorizer;
