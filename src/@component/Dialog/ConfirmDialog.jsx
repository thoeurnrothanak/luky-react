import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAlert } from 'redux/actions'
const useStyles = makeStyles({
    dialog: {
        "& .MuiDialog-container": {
            alignItems: "flex-start"
        }
    }
});
export const ConfirmDialog = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { dialogMessage } = useSelector((state) => state.common)
    const handleCancel = () => {
        dispatch(closeAlert())
    }
    return <Dialog open={!!dialogMessage} className={classes.dialog}>
        <DialogContent>
            <DialogContentText style={{color: "black"}}>
                {dialogMessage}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
}