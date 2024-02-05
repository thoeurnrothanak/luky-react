import { Box, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '2px solid',
    borderRadius: 6,
    display: 'flex',
    padding: 6,
  },
  selected: {
    borderColor: theme.palette.primary.main,
  },
}));

const MFAType = ({ icon, isSelected, title, subTitle, className, ...props }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, isSelected && classes.selected, className)} {...props}>
      <Box>{React.cloneElement(icon, { color: isSelected ? 'primary' : 'inherit' })}</Box>
      <Box ml={4}>
        <Typography variant="subtitle2" color={isSelected ? 'primary' : 'inherit'}>
          {title}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default MFAType;
