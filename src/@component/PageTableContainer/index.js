import React, { useState } from 'react';
import { alpha, Box, makeStyles, TableBody, TableContainer, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Select } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // marginTop: 20,
  },
  rootContainer: {
    padding: 0,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  TableContainer: {
    borderRadius: '12px ',
    border: '1px solid #028400',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  cellItem: {
    display: 'flex',
  },
  search: {
    position: 'relative',
    borderRadius: '12px',
    border: '2px solid #028400',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 30,
    width: 430,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    background: '#028400',
    borderRadius: '6px',
    color: 'white',
    width: '30px',
    height: '30px',
    '&:hover': {
      background: '#028400',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  tableBody: {
    backgroundColor: 'white',
  },
  rowActive: {
    backgroundColor: '#e8fff7',
  },
  control: {
    padding: theme.spacing(5),
  },
  tabs: {
    backgroundColor: 'white',
    color: '#028400',
  },
  checked: {
    color: '#23bf58 !important',
    transform: 'translateX(26px) !important',
  },
  tableHead: {
    backgroundColor: '#028400',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#028400',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}))(TableCell);

const Component = ({
  data,
  headCells,
  contentCells,
  selectedRowData,
  isFilterInd = false,
  isFilterCorp = false,
  isRiskFilter = false,
  isSearchable = true,
  isActionable = true,
  addButton = null,
  isPagination = true,
  filterChild,
}) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = React.useState('index');
  const [order, setOrder] = React.useState('asc');

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function stableSort(array, comparator) {
    if (!array) array = [{}];
    if (array && Array.isArray(array)) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }
    return [];
  }

  function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const buildFilterIcon = () => {
    if (isSearchable) {
      let styleFilter = { minWidth: 150, width: 'auto' };
      let styleOption = { marginLeft: 10 };
      if (isFilterInd) {
        return (
          <div style={{ display: 'flex' }}>
            <div className={classes.search} style={styleFilter}>
              <Select
                size={'small'}
                fullWidth={true}
                native={true}
                onChange={(e) => {
                  let val = e.target.value;
                  // filterExt.gender = val;
                  // setFilterExt({...filterExt});
                  // doFilter();
                }}>
                <option style={styleOption} value={''} label={'All Gender'}></option>
                <option style={styleOption} value={'M'} label={'Male'}></option>
                <option style={styleOption} value={'F'} label={'Female'}></option>
              </Select>
            </div>

            <div className={classes.search} style={styleFilter}>
              <Select
                size={'small'}
                fullWidth={true}
                native={true}
                onChange={(e) => {
                  let val = e.target.value;
                  // filterExt.nationality = val;
                  // setFilterExt({...filterExt});
                  // doFilter();
                }}>
                <option style={styleOption} value={''} label={'All Nationality'}></option>
                <option style={styleOption} value={'CAM'} label={'Cambodian'}></option>
                <option style={styleOption} value={'NONCAM'} label={'Non-Cambodian'}></option>
              </Select>
            </div>

            <div className={classes.search} style={styleFilter}>
              <Select
                size={'small'}
                fullWidth={true}
                native={true}
                onChange={(e) => {
                  let val = e.target.value;
                  // filterExt.orderBy = val;
                  // setFilterExt({...filterExt});
                  // doFilter();
                }}>
                <option style={styleOption} value={'DESC'} label={'Newest'}></option>
                <option style={styleOption} value={'ASC'} label={'Oldest'}></option>
              </Select>
            </div>
          </div>
        );
      } else if (isFilterCorp) {
        return (
          <div style={{ display: 'flex' }}>
            <div className={classes.search} style={styleFilter}>
              <Select
                size={'small'}
                fullWidth={true}
                native={true}
                onChange={(e) => {
                  let val = e.target.value;
                  // filterExt.gender = val;
                  // setFilterExt({...filterExt});
                  // doFilter();
                }}>
                <option style={styleOption} value={''} label={'All Sector'}></option>
                <option style={styleOption} value={'0'} label={'Agriculture'}></option>
                <option style={styleOption} value={'1'} label={'Industry'}></option>
                <option style={styleOption} value={'2'} label={'Service and Trade'}></option>
              </Select>
            </div>

            <div className={classes.search} style={styleFilter}>
              <Select
                size={'small'}
                fullWidth={true}
                native={true}
                onChange={(e) => {
                  let val = e.target.value;
                  // filterExt.nationality = val;
                  // setFilterExt({...filterExt});
                  // doFilter();
                }}>
                <option style={styleOption} value={''} label={'All Business Type'}></option>
                {/*<option style={styleOption} value={'CAM'} label={'Cambodian'}></option>*/}
                {/*<option style={styleOption} value={'NONCAM'} label={'Non-Cambodian'}></option>*/}
              </Select>
            </div>
            <div className={classes.search} style={styleFilter}>
              <Select
                size={'small'}
                fullWidth={true}
                native={true}
                onChange={(e) => {
                  let val = e.target.value;
                  // filterExt.nationality = val;
                  // setFilterExt({...filterExt});
                  // doFilter();
                }}>
                <option style={styleOption} value={''} label={'All Blacklist Type'}></option>
                {/*<option style={styleOption} value={'CAM'} label={'Cambodian'}></option>*/}
                {/*<option style={styleOption} value={'NONCAM'} label={'Non-Cambodian'}></option>*/}
              </Select>
            </div>
          </div>
        );
      }
      return (
        <IconButton aria-label="filter list" className={classes.filterIcon}>
          <FilterListIcon />
        </IconButton>
      );
    }
    return null;
  };
  let styleFilter = null;
  let styleFilterToolbar = null;
  if (isFilterInd || isFilterCorp) {
    styleFilter = { minWidth: 250 };
    styleFilterToolbar = { paddingLeft: 0, paddingRight: 0 };
  }
  return (
    <Container maxWidth={false} className={classes.rootContainer}>
      {(isSearchable || addButton) && (
        <Toolbar
          style={styleFilterToolbar}
          className={clsx(classes.root, {
            [classes.highlight]: selectedRowData,
          })}>
          {isSearchable && (
            <span className={classes.search} style={styleFilter}>
              <span className={classes.searchIcon}>
                <SearchIcon />
              </span>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </span>
          )}

          {buildFilterIcon()}
          {addButton}
        </Toolbar>
      )}
      {filterChild && filterChild()}
      <TableContainer className={classes.TableContainer}>
        <Table
          className={classes.table}
          stickyHeader
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <StyledTableCell
                  key={headCell.id}
                  // align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}>
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              {isActionable && <StyledTableCell align="center">Actions</StyledTableCell>}
            </TableRow>
          </TableHead>

          <TableBody className={classes.tableBody}>
            {data && data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10}>
                  <Container maxWidth={'lg'} style={{ borderRadius: 20 }}>
                    <Box
                      sx={{ width: '100%' }}
                      style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <div>
                        <Typography variant={'subtitle2'}> There is no data</Typography>
                      </div>
                    </Box>
                  </Container>
                </TableCell>
              </TableRow>
            ) : (
              stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(contentCells)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Container>
  );
};

export default Component;
