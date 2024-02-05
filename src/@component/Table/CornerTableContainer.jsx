import { TableContainer } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const CornerTableContainer = withStyles((theme) => ({
  root: {
    borderRadius: 6,
    marginTop: 6,
  },
}))(TableContainer);

export default CornerTableContainer;
