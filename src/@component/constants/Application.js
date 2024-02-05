export const STAGE_PRETTY = Object.freeze({
  PFI_REVIEW: { title: 'PFI REVIEW' },
  CGCC_COP_REVIEW: { title: 'COP REVIEW' },
  CGCC_COP_RECOMMEND: { title: 'COP RECOMMEND' },
  CGCC_RISK_RECOMMEND: { title: 'Risk RECOMMEND' },
  CGCC_APPROVAL: { title: 'APPROVAL' },
  CGCC_COP_APPROVAL: { title: 'APPROVAL' },
});

export const STATUS_PRETTY = Object.freeze({
  WAITING: { title: 'WAITING', color: '#DA0063' },
  PENDING: { title: 'PENDING', color: '#F27405' },
  REPLIED: { title: 'REPLIED', color: '#44A242' },
  REVIEWING: { title: 'REVIEWING', color: '#2E9BF0' },
  APPROVED: { title: 'APPROVED', color: '#44A242' },
  REJECTED: { title: 'REJECTED', color: '#BB0000' },
  RETURNED: { title: 'RETURNED', color: '#F27405' },
});

export const PRIORITY_PRETTY = Object.freeze({
  low: {
    title: 'LOW',
    // color: '#F27405'
  },
  normal: {
    title: 'NORMAL',
    // color: '#2E9BF0',
  },
  0: {
    title: 'NORMAL',
    // color: '#2E9BF0',
  },
  high: {
    title: 'HIGH',
    // color: '#44A242'
  },
  urgent: { title: 'URGENT', color: '#BB0000' },
  1: { title: 'URGENT', color: '#BB0000' },
});

export const COMMENT_ACTION_PRETTY = Object.freeze({
  NEED_MORE_INFO: { title: 'Need More Info' },
  REPLY_NEED_MORE_INFO: { title: 'Response' },
  REPLY_MAKE_REQUEST: { title: 'Response (Request)' },
  REQUEST_NEED_MORE_INFO: { title: 'Need More Info (Request)' },
  REQUEST_RETURN: { title: 'Return' },
  REPLY_RETURN: { title: 'Reply Return' },
  REJECT_MAKE_REQUEST: { title: 'Reject (Request)' },
  APPROVED: { title: 'APPROVED' },
  REJECTED: { title: 'REJECTED' },
  //Change Request
  RETURN_REQUEST: { title: 'Return' },
  REJECT_RETURN_REQUEST: { title: 'Reject Return Request' },
});

export const RISK_COLOR = Object.freeze({
  low: '#2E9BF0',
  medium: '#F27405',
  high: '#BB0000',
});
