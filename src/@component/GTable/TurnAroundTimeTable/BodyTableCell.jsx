import { TableCell, withStyles } from '@material-ui/core';

const BodyTableCell = withStyles((theme) => ({
  root: {
    borderBottomColor: theme.palette.primary.main,
  },
}))(TableCell);

export default BodyTableCell;
