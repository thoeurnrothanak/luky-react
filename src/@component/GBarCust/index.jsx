import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link, Box, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
}));

const GBarCust = ({
  counter1Title = '',
  counter1Value = 0,
  counter2Color = '',
  counter2Title = '',
  counter2Value = 0,
  counter1Color = '',
  dividerColor = '',
  bottomColor = '',
  bottomText = '',
  bottomAlign = '',
  bottomLink = '',
  title = '',
  titleValue = '',
}) => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.appCard} style={{ height: 150, padding: 14 }}>
      <Divider orientation="vertical" style={{ width: 6, background: dividerColor, borderRadius: 12 }} />
      <Box display="flex" flexDirection="column" justifyContent="space-between" style={{ paddingLeft: 8 }} width="100%">
        <Box display="flex">
          <Typography component="h4">
            <Box fontSize={20} fontWeight="400">
              {title}
            </Box>
          </Typography>
          <Typography component="h4" style={{ color: dividerColor }}>
            <Box fontSize={20} fontWeight="400">
              {titleValue ? titleValue : '\u00A0'}
            </Box>
          </Typography>
        </Box>
        <Box display="flex">
          <Typography component="h4" style={{ color: counter1Color }}>
            <Box fontSize={24} fontWeight="600">
              {counter1Title ? counter1Title + '\u00A0' : '\u00A0'}
            </Box>
          </Typography>
          <Typography component="h4" style={{ color: counter1Color }}>
            <Box fontSize={24} fontWeight="600">
              {counter1Value ? counter1Value : '\u00A0'}
            </Box>
          </Typography>
        </Box>
        <Box display="flex">
          <Typography component="h4" style={{ color: counter2Color }}>
            <Box fontSize={24} fontWeight="600">
              {counter2Title ? counter2Title + '\u00A0' : '\u00A0'}
            </Box>
          </Typography>
          <Typography component="h4" style={{ color: counter2Color }}>
            <Box fontSize={24} fontWeight="600" display="flex" alignItems="center">
              {counter2Value ? counter2Value : '\u00A0'}
            </Box>
          </Typography>
        </Box>
        <Box display="flex">
          <Grid item xs style={{ color: bottomColor, textAlign: bottomAlign }}>
            {bottomLink ? (
              <Link href={bottomLink} component="button" variant="body2" onClick={() => bottomLink(true)}>
                {bottomColor ? bottomText : '\u00A0'}
              </Link>
            ) : (
              <Typography variant="body2" gutterBottom>
                {bottomColor ? bottomText : '\u00A0'}
              </Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
export default GBarCust;
