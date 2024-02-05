export const STATUS_ACTION = Object.freeze({
  UNSIGNED: { title: 'SIGN LG', color: '#028400' },
  UPLOADED: { title: 'REQUEST REVIEW', color: '#2E9BF0' },
  APPROVED: { title: 'APPROVED', color: '#44A242' },
  REJECTED: { title: 'REJECTED', color: '#BB0000' },
  CANCELED: { title: 'CANCELED', color: '#BB0000' },
  EARLY_SETTLEMENT: { title: 'EARLY SETTLEMENT', color: '#BB0000' },
  BUSINESS_REGISTRATION: { title: 'BUSINESS REGISTRATION', color: '#2E9BF0' },
});

export const CURRENCY_SIGN = Object.freeze({
  USD: '$',
  KHR: '៛',
  usd: '$',
  khr: '៛',
});

export const LICENSE_PRETTY = Object.freeze([
  'Issued by Ministry of Commerce',
  'Issued by Ministry of Economy & Finance',
  'Issued by General Department of Taxation',
  'Issued by Other Authority',
]);

export const REQUEST_BILLING_STATUS_PRETTY = Object.freeze({
  due: 'Due',
  partial: 'Partial Paid',
  paid: 'Paid',
});

export const AMENDMENT_ITEM_STATE = Object.freeze({
  EXISTING: 'EXISTING',
  EDITED: 'EDITED',
  ADDED: 'ADDED',
  REMOVED: 'REMOVED',
});

export const AMENDMENT_ITEM_STATE_COLOR = Object.freeze({
  EXISTING: '#000000',
  EDITED: '#2E9BF0',
  ADDED: '#44A242',
  REMOVED: '#BB0000',
});

export const CONCESSION_TYPE = Object.freeze({
  InterestRateAndInstallmentAmount: 'InterestRateAndInstallmentAmount',
  ReductionOfInstallmentAmount: 'ReductionOfInstallmentAmount',
  ChangeRepaymentMethod: 'ChangeRepaymentMethod',
  DecreaseOfInterest: 'DecreaseOfInterest',
  ExtensionOfLoanAndGuaranteeTenure: 'ExtensionOfLoanAndGuaranteeTenure',
  // ExtensionOfLoanTenure: 'ExtensionOfLoanTenure',
  // ExtensionOfGuaranteeTenure: 'ExtensionOfGuaranteeTenure',
  ChangeLoanPurpose: 'ChangeLoanPurpose',
  MoratoriumInterest: 'MoratoriumInterest',
  MoratoriumPrincipalAmount: 'MoratoriumPrincipalAmount',
  Others: 'Others',
});

export const CONCESSION_VARIABLE_PRETTY = Object.freeze({
  repaymentAmount: { title: 'Repayment Amount' },
  repaymentMethod: { title: 'Repayment Method' },
  installmentAmount: { title: 'Installment Amount' },
  interestRate: { title: 'Interest Rate' },
  loanTenure: { title: 'Loan Tenure' },
  guaranteeTenure: { title: 'Guarantee Tenure' },
  loanPurpose: { title: 'Loan Purpose' },
  describeLoanPurpose: { title: 'Describe Loan Purpose' },
});

export const CONCESSION_LIST = Object.freeze([
  {
    id: CONCESSION_TYPE.InterestRateAndInstallmentAmount,
    title: 'Interest Rate & Installment Amount',
  },
  // {
  //   id: CONCESSION_TYPE.ReductionOfInstallmentAmount,
  //   title: 'Reduction of Installment amount',
  // },
  // {
  //   id: CONCESSION_TYPE.ChangeRepaymentMethod,
  //   title: 'Change Repayment Method',
  // },
  // {
  //   id: CONCESSION_TYPE.DecreaseOfInterest,
  //   title: 'Decrease of Interest',
  // },
  {
    id: CONCESSION_TYPE.ExtensionOfLoanAndGuaranteeTenure,
    title: 'Extension of Loan & Guarantee Tenure',
  },
  // {
  //   id: CONCESSION_TYPE.ExtensionOfLoanTenure,
  //   title: 'Extension of Loan Tenure',
  // },
  // {
  //   id: CONCESSION_TYPE.ExtensionOfGuaranteeTenure,
  //   title: 'Extension of Guarantee Tenure',
  // },
  {
    id: CONCESSION_TYPE.ChangeLoanPurpose,
    title: 'Change Loan Purpose',
  },
  {
    id: CONCESSION_TYPE.MoratoriumInterest,
    title: 'Moratorium Interest',
  },
  {
    id: CONCESSION_TYPE.MoratoriumPrincipalAmount,
    title: 'Moratorium Principal Amount',
  },
  {
    id: CONCESSION_TYPE.Others,
    title: 'Others',
  },
]);
