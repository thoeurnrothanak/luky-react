import { Table } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const CornerTable = withStyles((theme) => ({
  root: {
    borderLeft: `2px solid`,
    borderLeftColor: theme.palette.primary.main,
    borderRight: '2px solid',
    borderRightColor: theme.palette.primary.main,
    borderBottom: '2px solid',
    borderBottomColor: theme.palette.primary.main,
    borderRadius: 6,
    borderCollapse: 'separate',
    borderSpacing: 0,
    '& tr:last-child td': {
      borderBottom: 0,
    },
  },
}))(Table);

export default CornerTable;
