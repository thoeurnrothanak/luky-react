import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles({
  dialog: {
    '& .MuiDialog-container': {
      alignItems: 'flex-start',
    },
  },
});
export const CommonDialog = ({ useOpen, title, children, action, ...rest }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useOpen;

  return (
    <Dialog open={isOpen} className={classes.dialog} {...rest}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }}>{children}</DialogContent>
      <DialogActions>{action}</DialogActions>
    </Dialog>
  );
};
