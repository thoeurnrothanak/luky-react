import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, TablePagination, Typography } from '@material-ui/core';
import GRow from './GRow';

const HeadTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
  },
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
  },
  noBottom: {
    '& td': {
      borderBottom: 0,
    },
  },
}));

const GTable = ({ title, titleColor = '#DA0063', data = [], actions = [], onSubmit }) => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {title && (
        <Box style={{ color: titleColor, marginTop: 8 }}>
          <Typography component="h4" gutterBottom>
            <Box fontSize={18}>{`${title} | ${data.length}`}</Box>
          </Typography>
        </Box>
      )}
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <HeadTableCell align="center">No.</HeadTableCell>
              <HeadTableCell align="center">CIF No.</HeadTableCell>
              <HeadTableCell align="center">GA No.</HeadTableCell>
              <HeadTableCell align="center">Guarantee Type</HeadTableCell>
              <HeadTableCell align="center">Status</HeadTableCell>
              <HeadTableCell align="center">Created Date</HeadTableCell>
              <HeadTableCell align="center">Expiry Date</HeadTableCell>
              <HeadTableCell align="center">Actions</HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => <GRow key={index + 1} row={row} index={index} actions={actions} onSubmit={onSubmit} />)}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </Box>
  );
};

export default GTable;
