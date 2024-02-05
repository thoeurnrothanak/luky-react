import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, IconButton, Paper } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RowComment from './RowComment';
import ErrorBoundary from '@component/ErrorBoundary';

const HeadTableCell = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderRadius: 8,
  },
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
  },
  noBottom: {
    '& th': {
      borderBottom: 0,
    },
  },
  primaryBottom: {
    '& th': {
      borderBottomColor: theme.palette.primary.main,
    },
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  headCell: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    borderBottomColor: theme.palette.primary.main,
  },
}));

const CommentTable = ({ day, comments, isChange = false }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(comments.length > 0);

  return (
    <Box pt={4}>
      <TableContainer
        className={classes.tableContainer}
        style={{ paddingLeft: 16, paddingRight: 16 }}
        component={Paper}
        elevation={3}>
        <Table>
          <TableHead>
            <TableRow className={open ? classes.primaryBottom : classes.noBottom}>
              <HeadTableCell>
                <Box display="flex" whiteSpace="nowrap">
                  <Box>Date & Time:</Box>
                  <Box style={{ color: 'black', paddingLeft: 4 }}>{day}</Box>
                </Box>
              </HeadTableCell>
              <HeadTableCell>Activites & Comments</HeadTableCell>
              <HeadTableCell>From</HeadTableCell>
              <HeadTableCell>
                <Box display="flex" justifyContent="space-between">
                  To
                  {comments.length > 0 && (
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                      {open ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />}
                    </IconButton>
                  )}
                </Box>
              </HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments &&
              open &&
              comments.map((row, index) => (
                <TableRow key={index} className={classes.tableRow}>
                  <ErrorBoundary>
                    <RowComment comment={row} isChange={isChange} />
                  </ErrorBoundary>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommentTable;
