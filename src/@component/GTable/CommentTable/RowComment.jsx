import { COMMENT_ACTION_PRETTY } from '@component/constants/Application';
import { Box, Link } from '@material-ui/core';
import moment from 'moment';
import BodyTableCell from './BodyTableCell';

const RowComment = ({ comment, isChange = false }) => {
  return (
    <>
      <BodyTableCell width={'20%'}>{moment(comment?.createdAt).format('h:mm A - [GMT]Z')}</BodyTableCell>
      <BodyTableCell width={'50%'}>
        <Box style={{ fontWeight: 'bold' }}>{COMMENT_ACTION_PRETTY[comment?.activity]?.title}</Box>
        <Box pt={2} style={{ whiteSpace: 'pre-line' }}>
          {comment?.comment}
        </Box>
        <Box pt={2}>
          {comment?.attachments?.map((file, index) => (
            <Box key={index}>
              <Link
                href={
                  isChange
                    ? `${process.env.REACT_APP_LG_SERVICE}/lg/change/${comment?.requestId}/attachment/${file?.id}`
                    : `${process.env.REACT_APP_GUARANTEE_SERVICE}/guarantee/application/${comment?.appId}/attachment/${file?.id}`
                }
                underline="always"
                color="secondary"
                target="_blank"
                rel="noopener">
                {file?.filename}
              </Link>
            </Box>
          ))}
        </Box>
      </BodyTableCell>
      <BodyTableCell width={'10%'}>{comment?.from?.name}</BodyTableCell>
      <BodyTableCell width={'10%'}>{comment?.to?.name}</BodyTableCell>
    </>
  );
};

export default RowComment;
