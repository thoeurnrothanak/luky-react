import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const HeadTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}))(TableCell);

export default HeadTableCell;
