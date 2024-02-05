import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Checkbox, TablePagination, Typography } from '@material-ui/core';
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
import { MoreHoriz } from '@material-ui/icons';
import moment from 'moment';
import GADropdownMenu from './GADropdownMenu';
import { DATE_FORMAT_APP } from '../../routes/CreateApp/data';
import { useHistory } from 'react-router';
import { SubmitForReviewButton } from 'modules/MyTask/Application/DraftApplication';
import Container from '@material-ui/core/Container';

const HeadTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 'max-content',
    borderLeft: `3px solid`,
    borderLeftColor: theme.palette.primary.main,
    borderRight: '3px solid',
    borderRightColor: theme.palette.primary.main,
    borderBottom: '3px solid',
    borderBottomColor: theme.palette.primary.main,
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

const GADraftTable = ({ data = [], actions = [], removeApp }) => {
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const itemActions = actions.map(({ action, label, icon }) => ({ action, label, icon }));

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <TableContainer className={classes.container}>
        <Table className={classes.tableContainer}>
          <TableHead>
            <TableRow>
              <HeadTableCell>No</HeadTableCell>
              <HeadTableCell align="center">App ID</HeadTableCell>
              <HeadTableCell align="center">Draft Name</HeadTableCell>
              <HeadTableCell align="center">Scheme</HeadTableCell>
              <HeadTableCell align="center">Draft Type</HeadTableCell>
              <HeadTableCell align="center">Created Date</HeadTableCell>
              <HeadTableCell align="center">Last Update On</HeadTableCell>
              <HeadTableCell align="center">Status</HeadTableCell>
              <HeadTableCell align="center">Actions</HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10}>
                  <Container maxWidth={'lg'} style={{ borderRadius: 20 }}>
                    <Box
                      sx={{ width: '100%' }}
                      style={{
                        minWidth: 'max-content',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Box>
                        <Typography variant={'subtitle2'}>No Data Available.</Typography>
                      </Box>
                    </Box>
                  </Container>
                </TableCell>
              </TableRow>
            ) : (
              data &&
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                let actionsTmp = actions;
                const isReturnApp = row?.history?.some((his) => his.action === 'return') || row?.returnApp?.length > 0;
                if (row.application.status == 'SUBMITTED') {
                  actionsTmp = actionsTmp.filter((item) => item.label != 'Edit');
                  actionsTmp = [
                    {
                      render: (app) => {
                        return (
                          <SubmitForReviewButton
                            app={app}
                            onSubmit={(app) => {
                              removeApp(app.id);
                            }}
                          />
                        );
                      },
                    },
                    ...actionsTmp,
                  ];
                } else if (
                  row.application.status == 'DRAFT' ||
                  row.application.status == 'RETURNED' ||
                  row.application.status == 'REVOKED'
                ) {
                  actionsTmp = actionsTmp.filter((item) => item.label != 'Return');
                }
                if (row.application.status === 'RETURNED') {
                  actionsTmp = [
                    {
                      label: 'Detail',
                      onClick: () => {
                        history.push(`/guarantee/application/detail/${row.id}`);
                      },
                    },
                    ...actionsTmp,
                  ];
                }
                if (isReturnApp) {
                  actionsTmp = actionsTmp.filter((item) => item.label !== 'Delete');
                }
                return (
                  <TableRow key={index + 1}>
                    <TableCell width={20}>{index + 1}</TableCell>
                    <TableCell align="center">{row.application.appNo}</TableCell>
                    <TableCell align="center">
                      {row.application.status == 'SUBMITTED' ? '-' : row.application?.draftName}
                    </TableCell>
                    <TableCell align="center">{row.application.acronym}</TableCell>
                    <TableCell align="center">
                      {row.application.status == 'SUBMITTED' ? '-' : row.application?.draftStep}
                    </TableCell>
                    <TableCell align="center">{moment(row.createdAt).format(DATE_FORMAT_APP)}</TableCell>
                    <TableCell align="center">{moment(row.updatedAt).format(DATE_FORMAT_APP)}</TableCell>
                    <TableCell align="center">{row.application.status}</TableCell>
                    <TableCell align="center" onClick={(event) => event.stopPropagation()}>
                      <GADropdownMenu items={actionsTmp} TriggerComponent={<MoreHoriz />} app={row} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        // rowsPerPageOptions={[5, 10, 20, 50]}
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default GADraftTable;
