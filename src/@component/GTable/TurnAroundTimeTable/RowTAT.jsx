import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import BodyTableCell from './BodyTableCell';

const RowTAT = ({ tat }) => {
  return (
    <>
      <BodyTableCell size="small">
        <Box pb={2} style={{ fontWeight: 'bold' }}>
          {moment(tat?.createdAt).format('DD - MMM - YYYY | h:mmA [GMT]Z')}
        </Box>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {tat?.activity}
        </Typography>
      </BodyTableCell>
      <BodyTableCell size="small" align="right" style={{ verticalAlign: 'bottom' }}>
        <Typography variant="body2" gutterBottom>
          {tat?.duration}
        </Typography>
      </BodyTableCell>
      <BodyTableCell size="small"></BodyTableCell>
    </>
  );
};

export default RowTAT;
