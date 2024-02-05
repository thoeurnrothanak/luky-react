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

const HeadTableCell = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}))(TableCell);

const BodyTableCell = withStyles((theme) => ({
  root: {
    borderBottomColor: theme.palette.primary.main,
    verticalAlign: 'top',
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

const ActivityLogTable = ({ day, logs }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

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
              <HeadTableCell>Activites</HeadTableCell>
              <HeadTableCell>Performed By</HeadTableCell>
              <HeadTableCell>
                <Box display="flex" justifyContent="space-between">
                  Role
                  <IconButton size="small" onClick={() => setOpen(!open)}>
                    {open ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />}
                  </IconButton>
                </Box>
              </HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs &&
              open &&
              Object.entries(logs).map(([key, row], index) => (
                <TableRow key={index} className={classes.tableRow}>
                  <BodyTableCell>{key}</BodyTableCell>
                  <BodyTableCell>
                    {row.map(({ description }, index) => (
                      <Box key={index} display="flex" mt={index > 0 ? 2 : 0}>
                        <Box>{index + 1}. ActionLog:</Box>
                        <Box color="primary.main" pl={4}>
                          {description}
                        </Box>
                      </Box>
                    ))}
                  </BodyTableCell>
                  <BodyTableCell>
                    {row.map(({ user }, index) => (
                      <Box key={index}>{user?.name}</Box>
                    ))}
                  </BodyTableCell>
                  <BodyTableCell>
                    {row.map(({ user }, index) => (
                      <Box key={index}>{user?.roles?.join(', ')}</Box>
                    ))}
                  </BodyTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActivityLogTable;
