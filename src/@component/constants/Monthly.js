import moment from 'moment/moment';

export const loanStatus = [
  { value: 'N', label: '(N) Normal' },
  { value: 'S', label: '(S) Special Mention' },
  { value: 'C', label: '(C) Closed' },
  { value: 'U', label: '(U) Substandard' },
  { value: 'D', label: '(D) Doubtful' },
  { value: 'L', label: '(L) Loss' },
  { value: 'W', label: '(W) Write Off ' },
  { value: 'R', label: '(R) Reject' },
];

export const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const today = new Date();
const getYear = moment(today).year().toString();
const currentYears = Array.from({ length: 10 }, (_, index) => (getYear - index).toString());
export const years = currentYears;

export const statuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'late', label: 'Late' },
];

export const monthlyUploading = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export const currencys = ['USD', 'KHR'];

export const formatCapitalize = (val) => {
  if (!!val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }
};

export const formatCurrencyUSD = (num) => {
  if (typeof num !== 'number') {
    return '';
  }
  return num.toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$&,');
};

export const formatCurrencyKHR = (num) => {
  if (typeof num !== 'number') {
    return '';
  }
  return num.toFixed(0).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$&,');
};
