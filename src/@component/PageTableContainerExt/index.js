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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { createFilterOptions } from '@material-ui/lab';
import {BLACKLIST_TYPE_CONST, COLOR_BACKGROUND_DISABLED, SX_FILTER} from '../../routes/CreateApp/data';
import { NationalityAppRaw } from 'routes/CreateApp/Commons/NationalityAppRaw';

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
    borderRadius: '12px 12px 0px 0px',
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
    marginRight: 15,
    position: 'relative',
    minWidth: '150px',
    borderRadius: '6px !important',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    '& div:first-child':{
      borderRadius: 6
    }
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
  textField: {
    '& fieldset': {
      borderRadius: 6,
      border: 'none',
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#028400',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
}))(TableCell);

const filter = createFilterOptions();

const PageTableContainerExt = ({
  data,
  setData,
  headCells,
  contentCells,
  selectedRowData,
  isFilterInd = false,
  isFilterCorp = false,
  isSearchable = true,
  isActionable = true,
  isBlacklistFilter = true,
  addButton = null,
  isPagination = true,
  refresh,
  allData,
  isRiskFilter,
}) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = React.useState('index');
  const [order, setOrder] = React.useState('asc');
  const [filterExt, setFilterExt] = useState({});

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

  const doFilter = () => {
    let tmp = [...allData];
    for (const [key, value] of Object.entries(filterExt)) {
      if (key == 'orderBy') {
        if (value === 'ASC') {
          tmp = tmp.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
          tmp = tmp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
      } else {
        if (value) {
          tmp = tmp.filter((item) => {
            if (key === 'nationality') {
              if (item.nationality?.iso2 === value.iso2) {
                return true;
              } else if (!value.iso2) {
                return true;
              }
            }
            let result = item[key] === value;
            return result;
          });
        }
      }
    }
    setData([...tmp]);
  };
  const buildFilterIcon = () => {
    if (isSearchable) {
      let styleFilter = { minWidth: 200, width: '100%' };
      let styleOption = { marginLeft: 10 };
      if (isFilterInd) {
        return (
          <div style={{ display: 'flex' }}>
            <div className={classes.search} style={styleFilter}>
              <Select
                size={'small'}
                fullWidth={true}
                native={true}
                sx={SX_FILTER}
                onChange={(e) => {
                  let val = e.target.value;
                  if(val) {
                    filterExt.gender = val;
                    setFilterExt({...filterExt});
                    doFilter();
                  }else {
                    refresh();
                  }
                }}>
                <option style={styleOption} value={''} label={'All Gender'}></option>
                <option style={styleOption} value={'M'} label={'Male'} />
                <option style={styleOption} value={'F'} label={'Female'}></option>
              </Select>
            </div>

            <div className={classes.search} style={styleFilter}>
              <NationalityAppRaw
                variant={'outlined'}
                filter={true}
                classes={classes}
                value={filterExt?.nationality}
                onChange={(val) => {
                  if(val) {
                    filterExt.nationality = val;
                    setFilterExt({...filterExt});
                    doFilter();
                  }else {
                    refresh();
                  }
                }}
              />
            </div>

            {isRiskFilter ?
                <div className={classes.search} style={styleFilter}>
                  <Select
                      className={classes.selectRoot}
                      size={'small'}
                      native={true}
                      sx={SX_FILTER}
                      fullWidth={true}
                      onChange={(e) => {
                        let val = e.target.value;
                        if(val){
                        filterExt.status = val;
                        setFilterExt({ ...filterExt });
                        doFilter();
                        }else {
                          refresh();
                        }
                      }}>
                    <option value={''} label={'All Risk Level'}></option>
                    <option value={'low'} label={'LOW'}></option>
                    <option value={'medium'} label={'MEDIUM'}></option>
                    <option value={'high'} label={'HIGH'}></option>
                  </Select>
                </div> : ""}
            {isBlacklistFilter ? <div className={classes.search} style={styleFilter}>
              <Select
                size={'small'}
                fullWidth={true}
                native={true}
                sx={SX_FILTER}
                onChange={(e) => {
                  let val = e.target.value;
                  filterExt.blacklistType = val;
                  setFilterExt({ ...filterExt });
                  doFilter();
                }}>
                <option style={styleOption} value={''} label={'All Blacklist Type'}></option>
                {BLACKLIST_TYPE_CONST.map((item) => {
                  return <option value={item.value}>{item.desc}</option>;
                })}
              </Select>
            </div> : ""}
          </div>
        );
      } else if (isFilterCorp) {
        return (
          <div style={{ display: 'flex' }}>
            <div className={classes.search} style={styleFilter}>
              {isBlacklistFilter ? <Select
                size={'small'}
                fullWidth={true}
                native={true}
                sx={{
                  boxShadow: 'none',
                  borderRadius: '6px !important',
                  '.MuiOutlinedInput-notchedOutline': { border: 0, borderColor: 'white' },
                  backgroundColor: COLOR_BACKGROUND_DISABLED,
                }}
                onChange={(e) => {
                  let val = e.target.value;
                  filterExt.blacklistType = val;
                  setFilterExt({ ...filterExt });
                  doFilter();
                }}>
                <option style={styleOption} value={''} label={'All Blacklist Type'}></option>
                {BLACKLIST_TYPE_CONST.map((item) => {
                  return <option value={item.value}>{item.desc}</option>;
                })}
              </Select> : ""}
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
              <Autocomplete
                id="borrowerFilter"
                size={'small'}
                options={data}
                style={SX_FILTER}
                autoHighlight
                fullWidth={true}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  if (params.inputValue !== '') {
                    filtered.push({
                      inputValue: params.inputValue,
                      // cifName: `NEW "${params.inputValue}"`,
                      // cifName: `NEW`,
                    });
                  }

                  return filtered;
                }}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  let result = '';
                  if (option?.indNo) {
                    result = option.lastName + ' ' + option.firstName;
                  } else if (option?.corpNo) {
                    result = option.companyName;
                  }
                  if (typeof option === 'object') {
                    return result;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return result;
                }}
                onChange={(event, obj, reason) => {
                  if (obj) {
                    let borrowersTmp = data.filter((item) => item._id == obj._id);
                    if (borrowersTmp && borrowersTmp.length > 0) {
                      setData([...borrowersTmp]);
                    }
                  } else {
                    refresh();
                  }
                }}
                renderOption={(option) => {
                  // if(typeof option.inputValue !== 'object' ){
                  //   return null;
                  // }
                  let labelDisplay = 'No options';
                  if (option?.indNo) {
                    labelDisplay = `${option.indNo} - ${option.lastName} ${option.firstName}`;
                  } else if (option?.corpNo) {
                    labelDisplay = `${option?.corpNo} - ${option.companyName}`;
                  }
                  return <React.Fragment>{labelDisplay}</React.Fragment>;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth={true}
                    label="Search"
                    className={classes.textField}
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                  />
                )}
              />
            </span>
          )}

          {buildFilterIcon()}
          {addButton}
        </Toolbar>
      )}

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
            {data.length === 0 ? (
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

export default PageTableContainerExt;
