import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Box, makeStyles, SvgIcon } from '@material-ui/core';
import ListBox from './ListBox';
import FlatButton from '@component/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '100%',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    backgroundColor: theme.palette.background.default,
    // margin: theme.spacing(0.5, 0),
  },
}));

export default function TransferList({
  left: { title: leftTitle, items: leftItems },
  right: { title: rightTitle, items: rightItems },
  render,
  onChange,
}) {
  const classes = useStyles();

  const [left, setLeft] = useState(
    leftItems.map((item, index) => ({ index: `left${index}`, isChecked: false, value: item })),
  );
  const [right, setRight] = useState(
    rightItems.map((item, index) => ({ index: `right${index}`, isChecked: false, value: item })),
  );

  const onCheckChange = (setItems, index) => () => {
    setItems((prev) => {
      const newItems = [...prev];

      const i = newItems.findIndex((item) => item.index === index);
      const currentItem = newItems[i];
      newItems[i] = { ...currentItem, isChecked: !currentItem.isChecked };
      return newItems;
    });
  };

  const handleOnChange = (items) => {
    onChange(items.map((item) => item.value));
  };

  const unCheck = (items) => {
    return items.map((item) => ({ ...item, isChecked: false }));
  };

  const getChecked = (items) => {
    return items.filter((item) => item.isChecked);
  };

  const getUnChecked = (items) => {
    return items.filter((item) => !item.isChecked);
  };

  const handleAddAll = () => {
    const newRight = right.concat(unCheck(left));
    handleOnChange(newRight);

    setRight(newRight);
    setLeft([]);
  };

  const handleAddChecked = () => {
    const newRight = right.concat(unCheck(getChecked(left)));
    handleOnChange(newRight);
    setRight(newRight);

    setLeft((prev) => getUnChecked(prev));
  };

  const handleRemoveChecked = () => {
    const newRight = getUnChecked(right);
    setLeft(left.concat(unCheck(getChecked(right))));
    handleOnChange(newRight);
    setRight(newRight);
  };

  const handleRemoveAll = () => {
    const newLeft = left.concat(unCheck(right));
    setLeft(newLeft);

    handleOnChange([]);
    setRight([]);
  };

  if (!render) {
    render = (value) => `List item ${value}`;
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" className={classes.root}>
      <Grid item xs={5}>
        <ListBox title={leftTitle} items={left} onCheckChange={(index) => onCheckChange(setLeft, index)} render={render} />
      </Grid>
      <Grid item xs={2}>
        <Grid container direction="column" alignItems="center" spacing={4}>
          <FlatButton minWidth={120} className={classes.button} onClick={handleAddAll} disabled={left.length === 0}>
            Add All
            {/* ≫ */}
            {/* <ArrowRightRoundedIcon color="primary" />
            <ArrowRightRoundedIcon color="primary" /> */}
          </FlatButton>

          <FlatButton
            minWidth={120}
            style={{ marginTop: 8 }}
            className={classes.button}
            onClick={handleAddChecked}
            disabled={getChecked(left).length === 0}>
            Add
            {/* <ArrowRightRoundedIcon color="primary" /> */}
            {/* &gt; */}
          </FlatButton>

          <Box marginTop={10}></Box>

          <FlatButton
            minWidth={120}
            className={classes.button}
            onClick={handleRemoveChecked}
            disabled={getChecked(right).length === 0}>
            {/* &lt; */}
            {/* <ArrowLeftRoundedIcon color="primary" /> */}
            Remove
          </FlatButton>

          <FlatButton
            minWidth={120}
            style={{ marginTop: 8 }}
            className={classes.button}
            onClick={handleRemoveAll}
            disabled={right.length === 0}>
            {/* <ArrowLeftRoundedIcon color="primary" />
            <ArrowLeftRoundedIcon color="primary" /> */}
            Remove All
          </FlatButton>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <ListBox
          title={rightTitle}
          items={right}
          onCheckChange={(index) => onCheckChange(setRight, index)}
          render={render}
        />
      </Grid>
    </Grid>
  );
}
