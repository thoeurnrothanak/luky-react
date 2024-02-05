import React, { useEffect, useState } from 'react';
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
import RowTAT from './RowTAT';
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

const TurnAroundTimeTable = ({ stage, totalTime, tats }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (tats.length > 0) {
      setOpen(true);
    }
  }, [tats]);

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
              <HeadTableCell size="small">
                <Box color="primary">{stage}</Box>
              </HeadTableCell>
              <TableCell size="small" align="right">
                <Box fontWeight="bold">{totalTime}</Box>
              </TableCell>
              <HeadTableCell size="small" width="80">
                <IconButton style={{ marginLeft: 8 }} size="small" onClick={() => setOpen(tats.length > 0 && !open)}>
                  {open ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />}
                </IconButton>
              </HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tats &&
              open &&
              tats.map((row, index) => (
                <TableRow key={index} className={classes.tableRow}>
                  <ErrorBoundary>
                    <RowTAT tat={row} />
                  </ErrorBoundary>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TurnAroundTimeTable;
