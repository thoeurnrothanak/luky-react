import React from 'react';
import { TableCell, withStyles } from '@material-ui/core';
import moment from 'moment';

// Format
export const BILLING_DATE_FORMAT = 'DD - MMM - YYYY';
export const BILLING_DATETIME_FORMAT = 'DD - MMM - YYYY h:mm A';

export const formula = (val) => {
  return <span style={{ color: '#BFBFBF' }}>{val}</span>;
};

export const formatUploadStatus = (status) => {
  if (status?.toLowerCase() === 'pending') {
    return '#D5001A';
  } else if (status?.toLowerCase() === 'completed') {
    return '#028400';
  } else {
    return '#EB7E30';
  }
};

export const paymentReceiveStatusColor = (status) => {
  if (status === 'pending') {
    return '#D5001A';
  } else {
    return '#028400';
  }
};

export const paymentStatusColor = (status) => {
  if (status?.toLowerCase() === 'due') {
    return '#D5001A';
  } else if (status?.toLowerCase() === 'paid') {
    return '#028400';
  } else {
    return '#EB7E30';
  }
};

export const approvedStatusColor = (status) => {
  if (status === 'rejected') {
    return '#D5001A';
  } else if (status === 'approved') {
    return '#028400';
  } else {
    return '#EB7E30';
  }
};

export const claimStatusColor = (status) => {
  if (status?.toLowerCase() === 'unpaid') {
    return '#D5001A';
  } else if (status?.toLowerCase() === 'paid') {
    return '#028400';
  } else {
    return '#EB7E30';
  }
};

export const paidClaimStatus = (status) => {
  if (status?.toLowerCase() === 'partial_paid') {
    return '#EB7E30';
  } else {
    return '#028400';
  }
};

export const transactionType = (transactionType) => {
  if (transactionType?.toLowerCase() === 'claim request') {
    return '#D5001A';
  } else {
    return '#028400';
  }
};

export const formatCurrencyUSD = (num) => num?.toFixed(2).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$&,');

export const formatCurrencyKHR = (num) => num?.toFixed(0).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$&,');

export const formatCurrency = (currency, val) => {
  if (!!val) {
    if (currency === 'USD') {
      return formatCurrencyUSD(val);
    } else {
      return formatCurrencyKHR(val);
    }
  } else if (val === 'N/A') {
    return 'N/A';
  } else {
    if (currency === 'USD') {
      return formatCurrencyUSD(0);
    } else {
      return formatCurrencyKHR(0);
    }
  }
};

export const fullFormatCurrency = (currency, val) => {
  if (!val) {
    if (currency === 'USD') {
      return `${currency} ${formatCurrencyUSD(0)}`;
    } else {
      return `${currency} ${formatCurrencyKHR(0)}`;
    }
  } else {
    if (currency === 'USD') {
      return `${currency} ${formatCurrencyUSD(val)}`;
    } else {
      return `${currency} ${formatCurrencyKHR(val)}`;
    }
  }
};

// Convert Month 1 -> 01
export const formatMonthToString = (month) => {
  return month.toString().padStart(2, '0');
};

export const formatCapitalize = (val) => {
  if (!!val) {
    const words = val.split('_');
    const CapitalizeWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return CapitalizeWords.join(' ');
  } else {
    return 'N/A';
  }
};

export const formatUpperCase = (val) => {
  if (!val) return;
  const words = val.split('_');
  const UpperWords = words.map((word) => word.toUpperCase());
  return UpperWords.join(' ');
};

export const formatMonthYear = (month, year) => {
  return month ? moment(`${year}-${month}`, 'YYYY-M').format('MMMM - YYYY') : 'N/A';
};

const formatBill = (num) => {
  if (!!num) {
    if (num < 2) {
      return num + ' LG';
    } else {
      return num + ' LGs';
    }
  } else {
    return 'N/A';
  }
};

const formatStatus = (status) => {
  if (!!status) {
    if (status === 'Partially') {
      return 'Partially Completed';
    } else {
      return status;
    }
  } else {
    return 'N/A';
  }
};

const formatStage = (stage) => {
  if (stage === 'create' || stage === 'op_reviewing') {
    return 'FBA Creator';
  } else if (stage === 'pending_reviewer' || stage === 'reviewer_reviewing') {
    return 'FBA Reviewer';
  } else {
    return 'FBA Authorizer';
  }
};

// Assign To Claim

export const showAssignTo = (row) => {
  if (row?.stage === 'approval') {
    return row?.review;
  } else {
    if (Object.keys(row?.review).length > 0) {
      return <span style={{ textTransform: 'capitalize' }}>{row?.review?.name}</span>;
    } else {
      return 'N/A';
    }
  }
};

export const fullNameBorrower = (ind) => {
  let prefix = 'Mr. ';
  if (ind) {
    if (ind.gender === 'F') {
      prefix = 'Ms. ';
    }
    return (
      <span style={{ textTransform: 'capitalize' }}>
        {prefix} {ind.lastName} {ind.firstName}
      </span>
    );
  }
  return 'N/A';
};

export const mainBorrower = (row) => {
  if (row?.typeMainBorrower === 'COMPANY') {
    return row?.business?.companyName;
  } else {
    if (row?.borrowers?.length > 0) {
      let main = row?.borrowers.find((i) => i.borrowerRelationship == 10);
      if (main) {
        return (
          <span style={{ textTransform: 'capitalize' }}>
            {main?.lastName} {main?.firstName}
          </span>
        );
      }
    }
    return 'N/A';
  }
};

export const loanClassificationStatus = (status) => {
  switch (status) {
    case 'N':
      return 'Normal (N)';
    case 'S':
      return 'Special Mention (S)';
    case 'C':
      return 'Closed (C)';
    case 'U':
      return 'Sub Standard (U)';
    case 'D':
      return 'Doubtful (D)';
    case 'L':
      return 'Loss (L)';
    case 'W':
      return 'Write Off (W)';
    case 'R':
      return 'Reject (R)';
    default:
      return 'N/A';
  }
};

export const transformClassificationStatus = (status) => {
  switch (status) {
    case 'N':
      return 'Normal';
    case 'S':
      return 'Special Mention';
    case 'C':
      return 'Closed';
    case 'U':
      return 'Sub Standard';
    case 'D':
      return 'Doubtful';
    case 'L':
      return 'Loss';
    case 'W':
      return 'Write Off';
    case 'R':
      return 'Reject';
    default:
      return 'N/A';
  }
};

export const SecurityType = [
  'CA: Cash',
  'MO: Mortgage',
  'NO: None',
  'OT: Other (Anything else not found in this list)',
  'SH: Shares',
  'PM: Multiple (Having more than one collateral)',
  'FD: Fixed Deposit',
  'LT: Land Title (Referred to "Hard Title")',
  'TO: Ownership Title-Land/Buildings (Referred to "Soft Title")',
  'FB: Floating Debenture',
  'MV: Motor Vehicle',
  'IN: Inventory',
  'LC: Letter of Credit',
  'CG: Corporate Guarantees',
  'GI: Guarantor',
];

export const facilityType = (loans) => {
  if (loans?.length > 0) {
    const loan = loans?.find((loan) => loan.outstandingBalance > 0);
    if (loan.loanType === '0') {
      return 'Term Loan (TL)';
    } else if (loan.loanType === '1') {
      return 'OverDraft (OD)';
    } else {
      return 'Trade Facility (TF)';
    }
  }
  return 'N/A';
};

export const interestRate = (loans) => {
  if (loans?.length > 0) {
    const loan = loans.find((loan) => loan.outstandingBalance > 0);
    return `${loan?.interestRatePerAnnum}%`;
  }
  return 'N/A';
};

export const totalCollateral = (row) => {
  if (row) {
    const collateral = row.securityTypes.map((collateral) => {
      const estimatedValue = collateral.estimatedValueSecurity;
      if (estimatedValue !== undefined) {
        return parseFloat(
          estimatedValue
            .toString()
            .replace(',', '')
            .replace('$', '')
            .replace('៛', '')
            .replace('KHR', '')
            .replace('USD', '')
            .replace(' ', ''),
        );
      } else {
        return 0; // You can choose another default value if needed
      }
    });
    const total = collateral.reduce((acc, value) => acc + value, 0);
    return fullFormatCurrency(row?.currency, total);
  }
  return 'N/A';
};

export const loanPurposes = (loans) => {
  const loan = loans?.find((loan) => loan.outstandingBalance > 0);
  switch (loan?.loanPurpose) {
    case '0':
      return 'Working Capital';
    case '1':
      return 'Investment/Business Expansion';
    case '2':
      return 'Capital Expenditure';
    case '3':
      return 'Working Capital and Capital Expenditure';
    case '4':
      return 'New Investment and/or Business Expansion';
    case '5':
      return 'To support the settlement fund to/from True Money wallet.';
    case '6':
      return 'Working Capital and Investment/Business Expansion';
    default:
      return 'N/A';
  }
};

export const GuaranteeFeePerAnnum = (lg) => {
  let isPriority = false;
  let guaranteeFeePerAnnum = 0;
  if (lg) {
    if (lg.level && lg.level.priority && 'priority' === lg.level.priority.toLowerCase()) {
      isPriority = true;
    }
    if (isPriority) {
      guaranteeFeePerAnnum = lg.sectorFee;
    } else {
      guaranteeFeePerAnnum = lg.sectorFeeNonPriority;
    }
  }
  return guaranteeFeePerAnnum;
};

export const MaturityDate = (lg) => {
  if (lg) {
    let effectiveDate = moment(lg.effectiveDate);
    let guaranteeTenureMonth = lg?.guaranteeRequestInformation?.guaranteeTenureMonths || 0;
    return moment(effectiveDate).add(guaranteeTenureMonth, 'months').add(-1, 'days').format(BILLING_DATE_FORMAT);
  }
  return 'N/A';
};

export const ValidityDate = (lg) => {
  if (lg) {
    let maturityDate = MaturityDate(lg);
    if (moment(maturityDate, BILLING_DATE_FORMAT).isValid()) {
      return moment(maturityDate, BILLING_DATE_FORMAT).add(30, 'days').format(BILLING_DATE_FORMAT);
    }
  }
  return 'N/A';
};

export const CancellationDate = (lg) => {
  if (lg && lg.changeRequest && lg.changeRequest.length > 0) {
    let find = lg.changeRequest.find((item) => item.requestType === 'CANCELLATION');
    if (find && find.cancellationDueDate) {
      if (moment(find.cancellationDueDate).isValid()) {
        return moment(find.cancellationDueDate).format(BILLING_DATE_FORMAT);
      }
    }
  }
  let effectiveDate = lg?.effectiveDate;
  if (moment(effectiveDate).isValid()) {
    return moment(effectiveDate).add(25, 'days').format(BILLING_DATE_FORMAT);
  }
  return 'N/A';
};

// Table
export const HeadTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: '500',
    fontSize: '14px',
    height: '15px',
  },
}))(TableCell);

export const FootTableCell = withStyles(() => ({
  root: {
    backgroundColor: '#0284001A',
    color: '#404040',
    fontWeight: '500',
    fontSize: '14px',
  },
}))(TableCell);

export const StyledTableCell = withStyles((theme) => ({
  root: {
    fontSize: 14,
    color: '#404040',
    fontFamily: 'Roboto',
    paddingLeft: 3,
    borderBottom: '2px solid',
    borderBottomColor: theme.palette.primary.main,
  },
}))(TableCell);

// Required Sign and Block Invalid Character
export const req = <span style={{ color: '#028400' }}>*</span>;
export const blockInvalidChar = (e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

// Filter Option
export const customerTypes = ['PFI', 'Donor'];

export const currencys = ['USD', 'KHR'];

export const fullWordCurrency = [
  { value: 'USD', label: 'United State Dollar (USD)' },
  { value: 'KHR', label: 'Cambodian Riel (KHR)' },
];

export const lgTypes = ['Issue LG', 'Cancel LG', 'Anniversary Bill', 'Early Loan Settlement'];

export const AllLgTypes = ['Issue LG', 'Cancel LG', 'Anniversary Bill', 'Early Loan Settlement', 'Holding LG'];

export const billingCycles = ['1st Billing', '2nd Billing', '3rd Billing'];

export const billingMonths = [
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

export const accountTypes = ['Asset', 'Liability', 'Income', 'Expense'];

export const subClassifications = [
  { value: 'account_payable', label: 'Account Payable' },
  { value: 'account_receivable', label: 'Account Receivable' },
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
  { value: 'other_payable', label: 'Other Payable' },
  { value: 'other_receivable', label: 'Other Receivable' },
];

const today = new Date();
const getYear = moment(today).year().toString();
const currentYears = Array.from({ length: 10 }, (_, index) => (getYear - index).toString());
export const years = currentYears;

export const billingStatuses = ['Pending Bill', 'Late Bill', 'Sent Bill', 'Available Bill'];

export const transTypes = [
  'Issued LG',
  'Issued Invoice',
  'Accrued Monthly',
  'Payment Invoice',
  'Anniversary Bill',
  'Cancellation',
  'Credit Note',
  'Early Settlement',
];

export const paymentReceivedStatus = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
];

export const paymentStatus = [
  { value: 'due', label: 'Due' },
  { value: 'partial', label: 'Partial Paid' },
  { value: 'paid', label: 'Paid' },
];

export const invoiceTypes = [
  { value: 'invoice', label: 'Tax Invoice' },
  { value: 'credit_note', label: 'Credit Note' },
];

export const billingTypes = [
  { value: 'invoice', label: 'Tax Invoice' },
  { value: 'credit_note', label: 'Credit Note' },
  { value: 'adhoc_invoice', label: 'Adhoc Invoice' },
  { value: 'adhoc_credit_note', label: 'Adhoc Credit Note' },
  { value: 'payment_invoice', label: 'Payment' },
  { value: 'skip_tax_invoice', label: 'Skip Tax Invoice' },
  { value: 'skip_credit_note', label: 'Skip Credit Note' },
];

export const statuses = ['Invoiced', 'Skipped'];

export const monthlyStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'partially', label: 'Partially Completed' },
  { value: 'completed', label: 'Completed' },
];

export const generateStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'partially', label: 'Partially Completed' },
  { value: 'holding', label: 'Holding' },
  { value: 'completed', label: 'Completed' },
];

export const dayNames = [
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
];

export const cronExpression = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export const draftInvoiceStatus = [
  { value: 'pending', label: 'Pending' },
  { value: 'review', label: 'Reviewing' },
];

export const DashboardMonitoringStatuses = [
  { value: 'special_mention', label: 'Special Mention' },
  { value: 'subStandard', label: 'Substandard' },
  { value: 'doubtful', label: 'Doubtful' },
  { value: 'loss', label: 'Loss' },
];

export const monitoringStatus = ['U', 'D', 'L'];

export const reqClaimStage = [
  { value: '1', label: 'First Claim' },
  { value: '2', label: 'Second Claim' },
];

export const statusClaimPayment = [
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'partial', label: 'Partial Paid' },
  { value: 'paid', label: 'Paid' },
];

export const pendingClaimStatus = [
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'partial_paid', label: 'Partial Paid' },
];

export const paidPaymentStatus = [
  { value: 'partial_paid', label: 'Partial Paid' },
  { value: 'paid', label: 'Paid' },
];

export const uploadStatuses = [
  { value: 'partial', label: 'Partial' },
  { value: 'completed', label: 'Completed' },
];

export const claimTransaction = [
  { value: 'claim_request', label: 'Claim Request' },
  { value: 'claim_payment', label: 'Claim Payment' },
];

// Export File
export const billingManagement = (body, type) => {
  const head = [
    [
      'No ',
      'PFI Name',
      type === 'pfi' ? 'PFI Code' : null,
      'Schemes',
      'All Bills',
      'Billing Currency',
      type !== 'credit note' ? 'Billing Of Month' : null,
      type !== 'credit note' ? 'Billing Of Year' : null,
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['pfi']['name'],
        type === 'pfi' ? body[i]['pfi']['code'] : null,
        body[i]['scheme'],
        body[i]['allBill'] < 2 ? `${body[i]['allBill']} LG` : `${body[i]['allBill']} LGs`,
        body[i]['billingCurrency'],
        type !== 'credit note' ? moment(body[i]['month'], 'M').format('MMMM') : null,
        type !== 'credit note' ? body[i]['year'] : null,
      ];
      head.push(record);
    }
  }
  return head.map((row) => row.filter((item) => item !== null));
};

export const creditNoteDetail = (body) => {
  const head = [
    [
      'No ',
      'LG No',
      'Currency',
      'Scheme',
      'LG Type',
      'LG Issued Date',
      'Billing Month',
      'Billing Cycle',
      'Guarantee Fee Period',
      'Principle Loan Outstanding Amount',
      'Guaranteed Coverage',
      'Guaranteed Amount',
      'Guarantee Fee',
      'Additional Fee',
      'Admin Fee',
      'Total Fee',
    ],
  ];

  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['lgNo'] ? body[i]['lgNo'] : '',
        body[i]['billingCurrency'],
        body[i]['schema'] ? body[i]['schema'] : '',
        formatCapitalize(body[i]['lgType']),
        body[i]['lgIssuedDate'] ? body[i]['lgIssuedDate'] : 'N/A',
        body[i]['month'] ? `${body[i]['month']} - ${body[i]['year']}` : 'N/A',
        body[i]['cycle'] ? body[i]['cycle'] : 'N/A',
        body[i]['guaranteeFeePeriod'] ? body[i]['guaranteeFeePeriod'] : 'N/A',
        formatCurrency(body[i]['billingCurrency'], body[i]['principleOutstandingBalance']),
        body[i]['guaranteeCoverage'] ? `${body[i]['guaranteeCoverage']}%` : '0%',
        formatCurrency(body[i]['billingCurrency'], body[i]['guaranteeAmount']),
        body[i]['guaranteeFee'] ? `${body[i]['guaranteeFee']}%` : '0%',
        body[i]['AdditionalFee'] ? `${body[i]['AdditionalFee']}%` : '0%',
        body[i]['adminFee'] ? `${body[i]['adminFee']}%` : '0%',
        body[i]['totalFee'] ? body[i]['totalFee'] : 0,
      ];
      head.push(record);
    }
  }
  return head;
};

// Accounting Entry
export const accountingEntry = (body) => {
  const head = [
    [
      'No ',
      'Date',
      'Account Name',
      'Dr',
      'Cr',
      'Account Balance',
      'Transaction Type',
      'Customer Type',
      'Customer Name',
      'Scheme',
      'LG No.',
      'Cycle',
      'Currency',
      'Transaction Date',
      'Remark',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['date'] ? body[i]['date'] : 'N/A',
        body[i]['accountName'] ? body[i]['accountName'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['dr']),
        formatCurrency(body[i]['currency'], body[i]['cr']),
        formatCurrency(body[i]['currency'], body[i]['accountBalance']),
        formatCapitalize(body[i]['transactionType']),
        formatCapitalize(body[i]['customerType']),
        formatCapitalize(body[i]['customer']['name']),
        body[i]['scheme'] ? body[i]['scheme'] : 'N/A',
        body[i]['lgNo'] ? body[i]['lgNo'] : 'N/A',
        body[i]['cycle'] ? body[i]['cycle'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        body[i]['transDate'] ? body[i]['transDate'] : 'N/A',
        body[i]['remark'] ? body[i]['remark'] : 'N/A',
      ];
      head.push(record);
    }
  }
  return head;
};

export const InvoiceExport = (body) => {
  const head = [
    [
      'No ',
      'Customer Name',
      'Customer Type',
      'Invoice No.',
      'Issued Date',
      'Due Date',
      'All Bills',
      'Currency',
      'Billing Month',
      'Billing Amount',
      'Paid Amount',
      'Credit Note',
      'Outstanding Balance',
      'Final Payment Status',
      'Invoice Type',
      'Last Update On',
    ],
  ];

  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['customer']['name'] ? body[i]['customer']['name'] : 'N/A',
        formatCapitalize(body[i]['customerType']),
        body[i]['invoiceNo'] ? body[i]['invoiceNo'] : 'N/A',
        body[i]['issuedDate'] ? body[i]['issuedDate'] : 'N/A',
        body[i]['dueDate'] ? body[i]['dueDate'] : 'N/A',
        body[i]['allBill'] ? body[i]['allBill'] : '0 LG',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['billingAmount']),
        formatMonthYear(body[i]['month'], body[i]['year']),
        formatCurrency(body[i]['currency'], body[i]['amount']),
        formatCurrency(body[i]['currency'], body[i]['creditNote']),
        formatCurrency(body[i]['currency'], body[i]['outstandingBalance']),
        body[i]['paymentStatus'] ? body[i]['paymentStatus'] : 'N/A',
        formatCapitalize(body[i]['billingTag']),
        body[i]['lastUpdated'] ? body[i]['lastUpdated'] : 'N/A',
      ];
      head.push(record);
    }
  }
  return head;
};

export const SkipInvoiceExport = (body) => {
  const skipHead = [
    [
      'No ',
      'Invoice Type',
      'Customer Type',
      'Reference',
      'Billing To',
      'VAT Number',
      'Billing Currency',
      'Grand Total in Billing Currency',
      'Exchange Rate',
      'Grand Total Equivalent',
      'Issue Date',
      'Issue Year',
      'Created Date',
      'Remark',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['invoiceType'] === 'invoice' ? 'Tax Invoice' : 'Credit Note',
        formatCapitalize(body[i]['customerType']),
        body[i]['invReference'] ? body[i]['invReference'] : 'N/A',
        body[i]['customer'] ? body[i]['customer']['name'] : 'N/A',
        body[i]['customer'] ? body[i]['customer']['vatTin'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['grandTotal']),
        formatCurrencyKHR(body[i]['exchangeRate']),
        formatCurrency(body[i]['currency'], body[i]['equivalent']),
        body[i]['issuedDate'] ? moment(body[i]['issuedDate']).format('DD - MMM - YYYY') : 'N/A',
        body[i]['year'] ? body[i]['currency'] : 'N/A',
        body[i]['createdAt'] ? moment(body[i]['createdAt']).format('DD - MMM - YYYY') : 'N/A',
        !!body[i]['remark'] ? body[i]['remark'] : 'N/A',
      ];
      skipHead.push(record);
    }
  }
  return skipHead;
};

export const AnniversaryExport = (body) => {
  const head = [
    [
      'No ',
      'Customer Name',
      'Customer Code',
      'Schemes',
      'All Bills',
      'Bill of Month',
      'Bill of Year',
      'Monthly Balance Status',
      'Generate Status',
    ],
  ];
  for (let i = 0; i < body.length; i++) {
    const record = [
      i + 1,
      body[i]['customer'] ? body[i]['customer']['name'] : 'N/A',
      body[i]['customer'] ? body[i]['customer']['code'] : 'N/A',
      formatBill(body[i]['allBill']),
      body[i]['month'] ? moment(body[i]['month'], 'M').format('MMMM') : 'N/A',
      body[i]['year'] ? body[i]['year'] : 'N/A',
      formatStatus(body[i]['monthlyStatus']),
      formatStatus(body[i]['generateStatus']),
      formatStatus(body[i]['invoiceStatus']),
    ];
    head.push(record);
  }
  return head;
};

export const AnniversaryDetailExport = (body) => {
  const head = [
    [
      'No',
      'LG No',
      'Currency',
      'Schemes',
      'LG Issued Date',
      'LG Effective Date',
      'Billing Cycle',
      'Loan Facility',
      'Billing Month',
      'Billing Year',
      'Guarantee Fee Period',
      'Principle Loan Outstanding Amount',
      'Guaranteed Coverage',
      'Guaranteed Amount',
      'Guarantee Fee',
      'Additional Fee',
      'Admin Fee',
      'Total Fee',
      'Monthly Balance Status',
      'Balance Uploaded Date',
      'Generate Status',
      'Invoice Status',
    ],
  ];
  if (body.length > 0) {
    const formatStatus = (status) => {
      if (!!status) {
        if (status === 'Partially') {
          return 'Partially Completed';
        } else {
          return status;
        }
      } else {
        return 'N/A';
      }
    };
    const formatCurrency = (currency, val) => {
      if (!!val) {
        if (currency === 'USD') {
          return formatCurrencyUSD(val);
        } else {
          return formatCurrencyKHR(val);
        }
      } else {
        return 'N/A';
      }
    };
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['lgNo'] ? body[i]['lgNo'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        body[i]['scheme'] ? body[i]['scheme'] : 'N/A',
        body[i]['lgIssuedDate'] ? body[i]['lgIssuedDate'] : 'N/A',
        body[i]['effectiveDate'] ? body[i]['effectiveDate'] : 'N/A',
        body[i]['cycle'] ? body[i]['cycle'] : 'N/A',
        body[i]['loanFacility'] ? body[i]['loanFacility'] : 'N/A',
        body[i]['month'] ? body[i]['month'] : 'N/A',
        body[i]['year'] ? body[i]['year'] : 'N/A',
        body[i]['guaranteeFeePeriod'] ? body[i]['guaranteeFeePeriod'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['principleOutstandingBalance']),
        body[i]['guaranteeCoverage'] > 0 ? `${body[i]['guaranteeCoverage']}%` : '0%',
        formatCurrency(body[i]['currency'], body[i]['guaranteeAmount']),
        body[i]['guaranteeFee'] > 0 ? `${body[i]['guaranteeFee']}%` : '0%',
        body[i]['additionalFee'] > 0 ? `${body[i]['additionalFee']}%` : '0%',
        body[i]['adminFee'] > 0 ? `${body[i]['adminFee']}%` : '0%',
        formatCurrency(body[i]['currency'], body[i]['totalFee']),
        formatStatus(body[i]['monthlyStatus']),
        body[i]['uploadingDate'] ? body[i]['uploadingDate'] : 'N/A',
        formatStatus(body[i]['generateStatus']),
        formatStatus(body[i]['invoiceStatus']),
      ];
      head.push(record);
    }
  }
  return head;
};

export const InvoiceAndCreditNoteExport = (body) => {
  const head = [
    [
      'No ',
      'Customer Name',
      'Customer Code',
      'Customer Type',
      'Outstanding Invoices',
      'Currency',
      'Invoice Month',
      'Invoice Amount',
      'Paid Amount',
      'Credit Note',
      'Outstanding Balance',
    ],
  ];
  for (let i = 0; i < body.length; i++) {
    const record = [
      i + 1,
      body[i]['customer'] ? body[i]['customer']['name'] : 'N/A',
      body[i]['customer'] ? body[i]['customer']['code'] : 'N/A',
      formatCapitalize(body[i]['billingType']),
      body[i]['invoiceCount'] ? body[i]['invoiceCount'] : 'N/A',
      body[i]['currency'] ? body[i]['currency'] : 'N/A',
      body[i]['month'] ? moment(body[i]['month'], 'M').format('MMMM') : 'N/A',
      formatCurrency(body[i]['currency'], body[i]['billAmount']),
      formatCurrency(body[i]['currency'], body[i]['paidAmount']),
      formatCurrency(body[i]['currency'], body[i]['creditNoted']),
      formatCurrency(body[i]['currency'], body[i]['outstanding']),
    ];
    head.push(record);
  }
  return head;
};

export const NewDraftInvoiceExport = (body) => {
  const head = [['No ', 'Status', 'Customer Name', 'Invoice Type', 'Draft Invoice Type', 'Created Date', 'Assigned To']];
  for (let i = 0; i < body.length; i++) {
    const record = [
      i + 1,
      formatCapitalize(body[i]['status']),
      body[i]['customer'] ? body[i]['customer']['name'] : 'N/A',
      body[i]['invoiceType'] === 'invoice' ? 'Tax Invoice' : 'Credit Note',
      body[i]['draftInvoiceType'] ? body[i]['draftInvoiceType'] : 'N/A',
      body[i]['createdAt'] ? moment(body[i]['createdAt']).format('DD - MMM - YYYY') : 'N/A',
      body[i]['assignTo'] ? body[i]['assignTo']['name'] : 'N/A',
    ];
    head.push(record);
  }
  return head;
};

export const ApprovedDraftInvoiceExport = (body) => {
  const head = [['No ', 'Customer Name', 'Invoice Type', 'Draft Invoice Type', 'Created Date', 'Approved Date']];
  for (let i = 0; i < body.length; i++) {
    const record = [
      i + 1,
      body[i]['customer'] ? body[i]['customer']['name'] : 'N/A',
      body[i]['invoiceType'] === 'invoice' ? 'Tax Invoice' : 'Credit Note',
      body[i]['draftInvoiceType'] ? body[i]['draftInvoiceType'] : 'N/A',
      body[i]['createdAt'] ? moment(body[i]['createdAt']).format('DD - MMM - YYYY') : 'N/A',
      body[i]['approvedDate'] ? moment(body[i]['approvedDate']).format('DD - MMM - YYYY') : 'N/A',
    ];
    head.push(record);
  }
  return head;
};

export const RejectedDraftInvoiceExport = (body) => {
  const head = [['No ', 'Customer Name', 'Invoice Type', 'Draft Invoice Type', 'Created Date', 'Rejected Date']];
  for (let i = 0; i < body.length; i++) {
    const record = [
      i + 1,
      body[i]['customer'] ? body[i]['customer']['name'] : 'N/A',
      body[i]['invoiceType'] === 'invoice' ? 'Tax Invoice' : 'Credit Note',
      body[i]['draftInvoiceType'] ? body[i]['draftInvoiceType'] : 'N/A',
      body[i]['createdAt'] ? moment(body[i]['createdAt']).format('DD - MMM - YYYY') : 'N/A',
      body[i]['rejectedDate'] ? moment(body[i]['rejectedDate']).format('DD - MMM - YYYY') : 'N/A',
    ];
    head.push(record);
  }
  return head;
};

export const BillingInvoiceExport = (body) => {
  const head = [
    [
      'No.',
      'Subject',
      'Billing Type',
      'Request Status',
      'Request By',
      'Currency',
      'Issued Date',
      'Created Date',
      'Draft Type',
      'Stage',
    ],
  ];

  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['subject'] ? body[i]['subject'] : 'N/A',
        body[i]['invoiceType'] === 'invoice' ? 'Tax Invoice' : 'Credit Note',
        formatCapitalize(body[i]['requestStatus']),
        body[i]['requestBy'] ? body[i]['requestBy']['name'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        body[i]['issuedDate'] ? moment(body[i]['issuedDate']).format('DD - MMM - YYYY') : 'N/A',
        body[i]['date'] ? moment(body[i]['date']).format('DD - MMM - YYYY') : 'N/A',
        body[i]['draftType'] ? body[i]['draftType'].toUpperCase() : 'N/A',
        formatStage(body[i]['stage']),
      ];
      head.push(record);
    }
  }
  return head;
};

export const ClaimPaymentExport = (body) => {
  const head = [
    [
      'No.',
      'Subject',
      'Billing Type',
      'Request Status',
      'Request By',
      'Currency',
      'Issued Date',
      'Created Date',
      'Draft Type',
      'Stage',
    ],
  ];

  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['subject'] ? body[i]['subject'] : 'N/A',
        body[i]['invoiceType'] === 'invoice' ? 'Tax Invoice' : 'Credit Note',
        formatCapitalize(body[i]['requestStatus']),
        body[i]['requestBy'] ? body[i]['requestBy']['name'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        body[i]['issuedDate'] ? moment(body[i]['issuedDate']).format('DD - MMM - YYYY') : 'N/A',
        body[i]['date'] ? moment(body[i]['date']).format('DD - MMM - YYYY') : 'N/A',
        body[i]['draftType'] ? body[i]['draftType'].toUpperCase() : 'N/A',
        formatStage(body[i]['stage']),
      ];
      head.push(record);
    }
  }
  return head;
};

// Claim Pending Summary Tab
export const summaryPending = (body) => {
  const head = [['No ', 'PFI Name', 'PFI Code', 'Scheme', 'LGs', 'Currency', 'Total Claim Amount']];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['pfi'] ? body[i]['pfi']['name'] : 'N/A',
        body[i]['pfi'] ? body[i]['pfi']['code'] : 'N/A',
        body[i]['scheme'] ? body[i]['scheme'] : 'N/A',
        body[i]['lgCount'] ? body[i]['lgCount'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['sumAmount']),
      ];
      head.push(record);
    }
  }
  return head;
};

export const detailPending = (body, type) => {
  const head = [
    [
      'No ',
      'CRF No.',
      type === 'tab' ? 'PFI Name' : null,
      'LLC NO.',
      'LLC Date',
      'LLC Age',
      'Payment Due Date',
      'Claim Step',
      'Currency',
      'Claim Amount',
      'Paid Amount',
      'Outstanding Balance',
      'Payment Status',
      'Last Update On',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['crfNo'] ? body[i]['crfNo'] : 'N/A',
        type === 'tab' ? body[i]['pfi']['name'] : null,
        body[i]['llcNo'] ? body[i]['llcNo'] : 'N/A',
        body[i]['llcDate'] ? moment(body[i]['llcDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['llcAge'] ? body[i]['llcAge'] : 'N/A',
        body[i]['paymentDueDate'] ? moment(body[i]['paymentDueDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['claimStep'] === 1 ? 'FIRST CLAIM' : 'SECOND CLAIM',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['claimAmount']),
        formatCurrency(body[i]['currency'], body[i]['paidAmount']),
        formatCurrency(body[i]['currency'], body[i]['claimAmount'] - body[i]['paidAmount']),
        body[i]['status'] ? formatUpperCase(body[i]['status']) : 'N/A',
        body[i]['lastUpdate'] ? moment(body[i]['lastUpdate']).format(BILLING_DATE_FORMAT) : 'N/A',
      ];
      head.push(record);
    }
  }
  return head.map((row) => row.filter((item) => item !== null));
};

//Export Summary Paid Claim Payment
export const summaryPaidClaimPayment = (body) => {
  const head = [
    [
      'No ',
      'PFI Name',
      'PFI Code',
      'Payment Reference',
      'Payment Reference Date',
      'Accounting Reference',
      'Accounting Reference Date',
      'Total Scheme',
      'Total LG',
      'Currency',
      'Paid Amount',
      'Status',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['pfi'] ? body[i]['pfi']['name'] : 'N/A',
        body[i]['pfi'] ? body[i]['pfi']['code'] : 'N/A',
        body[i]['paymentReference'] ? body[i]['paymentReference'] : 'N/A',
        body[i]['paymentReferenceDate'] ? moment(body[i]['paymentReferenceDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['accountingReference'] ? body[i]['accountingReference'] : 'N/A',
        body[i]['accountingReferenceDate'] ? moment(body[i]['accountingReferenceDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['countScheme'] ? body[i]['countScheme'] : 'N/A',
        body[i]['countLg'] ? body[i]['countLg'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['sumAmount']),
        body[i]['status'] ? formatUpperCase(body[i]['status']) : 'N/A',
      ];
      head.push(record);
    }
  }
  return head;
};

//Export Detail Paid Claim Payment
export const detailPaidClaimPayment = (body) => {
  const head = [
    [
      'No.',
      'CRF No.',
      'LLC No.',
      'PFI Name',
      'LLC Date',
      'TAT',
      'Accounting Ref',
      'Accounting Ref Date',
      'Payment Ref',
      'Payment Ref Date',
      'Payment Due Date',
      'Claim Step',
      'Currency',
      'Claim Amount',
      'Paid Amount',
      'Outstanding Balance',
      'Payment Status	',
      'Last Update On',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['crfNo'] ? body[i]['crfNo'] : 'N/A',
        body[i]['llcNo'] ? body[i]['llcNo'] : 'N/A',
        body[i]['pfi'] ? body[i]['pfi']['name'] : 'N/A',
        body[i]['dateOfCrf'] ? moment(body[i]['dateOfCrf']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['tat'] ? body[i]['tat'] : 'N/A',
        body[i]['paymentReference'] ? body[i]['paymentReference'] : 'N/A',
        body[i]['paymentReferenceDate'] ? moment(body[i]['paymentReferenceDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['accountingReference'] ? body[i]['accountingReference'] : 'N/A',
        body[i]['accountingReferenceDate'] ? moment(body[i]['accountingReferenceDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['paymentDueDate'] ? moment(body[i]['paymentDueDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['claimStep'] ? body[i]['claimStep'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['claimAmount']),
        formatCurrency(body[i]['currency'], body[i]['paidAmount']),
        formatCurrency(body[i]['currency'], body[i]['claimAmount'] - body[i]['paidAmount']),
        body[i]['status'] ? formatUpperCase(body[i]['status']) : 'N/A',
        body[i]['lastUpdate'] ? moment(body[i]['lastUpdate']).format(BILLING_DATE_FORMAT) : 'N/A',
      ];
      head.push(record);
    }
  }
  return head;
};

//Export All Claim Payment
export const allClaimPayment = (body) => {
  const head = [
    [
      'No.',
      'CRF No.',
      'LLC No.',
      'PFI Name',
      'LLC Date',
      'LLC Age',
      'TAT',
      'Accounting Ref',
      'Accounting Ref Date',
      'Payment Ref',
      'Payment Ref Date',
      'Payment Due Date',
      'Claim Step',
      'Currency',
      'Claim Amount',
      'Paid Amount',
      'Outstanding Balance',
      'Transaction Type	',
      'Payment Status	',
      'Last Update On',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['crfNo'] ? body[i]['crfNo'] : 'N/A',
        body[i]['llcNo'] ? body[i]['llcNo'] : 'N/A',
        body[i]['pfi'] ? body[i]['pfi']['name'] : 'N/A',
        body[i]['dateOfCrf'] ? moment(body[i]['dateOfCrf']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['llcAge'] ? body[i]['llcAge'] : 'N/A',
        body[i]['tat'] ? body[i]['tat'] : 'N/A',
        body[i]['paymentReference'] ? body[i]['paymentReference'] : 'N/A',
        body[i]['paymentReferenceDate'] ? moment(body[i]['paymentReferenceDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['accountingReference'] ? body[i]['accountingReference'] : 'N/A',
        body[i]['accountingReferenceDate'] ? moment(body[i]['accountingReferenceDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['paymentDueDate'] ? moment(body[i]['paymentDueDate']).format(BILLING_DATE_FORMAT) : 'N/A',
        body[i]['claimStep'] ? body[i]['claimStep'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['claimAmount']),
        formatCurrency(body[i]['currency'], body[i]['paidAmount']),
        formatCurrency(body[i]['currency'], body[i]['claimAmount'] - body[i]['paidAmount']),
        body[i]['transactionType'] ? formatUpperCase(body[i]['transactionType']) : 'N/A',
        body[i]['status'] ? formatUpperCase(body[i]['status']) : 'N/A',
        body[i]['lastUpdate'] ? moment(body[i]['lastUpdate']).format(BILLING_DATE_FORMAT) : 'N/A',
      ];
      head.push(record);
    }
  }
  return head;
};

// Loan Monitoring CGCC

export const MonthlyReviewExport = (body, exchangeRate, type) => {
  const head = [
    [
      'No ',
      'PFI Name',
      type === 'npl' ? 'NPL LG' : 'Special Mention LG',
      'Total Principal Outstanding in USD',
      'Total Principal Outstanding in KHR',
      'Total Principal Outstanding in Equi.',
      'PFI Upload State',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['pfiName'] ? body[i]['pfiName'] : 'N/A',
        body[i]['countLg'] ? body[i]['countLg'] : 'N/A',
        formatCurrencyUSD(body[i]['countUSD']),
        formatCurrencyKHR(body[i]['countKHR']),
        formatCurrencyUSD(exchangeRate !== 0 ? body[i]['countKHR'] / exchangeRate + body[i]['countKHR'] : 0),
        formatCapitalize(body[i]['pfiUploadStatus']),
      ];
      head.push(record);
    }
  }
  return head;
};

export const MonthlyReviewDetailExport = (body, type, stage) => {
  const head = [
    [
      'No ',
      'LG No.',
      type === 'npl' ? 'NPL Date' : 'Special Mention Date',
      'Currency',
      'Total Principal Outstanding',
      'Previous Classification Status',
      'Loan Classification Status',
      stage === 'cgcc' ? 'PFI Uploaded State' : null,
      stage === 'cgcc' ? 'CGCC Uploaded State' : null,
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['lgNo'] ? body[i]['lgNo'] : 'N/A',
        body[i]['nplDate'] ? body[i]['nplDate'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['outstandingBalance']),
        body[i]['previousLoanClassificationStatus'] ? body[i]['previousLoanClassificationStatus'] : '',
        body[i]['loanClassificationStatus'] ? body[i]['loanClassificationStatus'] : '',
        stage === 'cgcc' ? formatCapitalize(body[i]['pfiUploadStatus']) : null,
        stage === 'cgcc' ? formatCapitalize(body[i]['cgccUploadStatus']) : null,
      ];
      head.push(record);
    }
  }
  return head.map((row) => row.filter((item) => item !== null));
};

export const SummaryExport = (body) => {
  const head = [['No ', 'PFI Name', 'Month Report', 'Total LGs in KHR', 'Total LGs in USD', 'Total LGs']];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        !!body[i]['pfiName'] ? body[i]['pfiName'] : 'N/A',
        !!body[i]['previousMonth'] ? body[i]['previousMonth'] : 'N/A',
        body[i]['countLgKHR'] < 2 ? `${body[i]['countLgKHR']} LG` : `${body[i]['countLgKHR']} LGs`,
        body[i]['countLgUSD'] < 2 ? `${body[i]['countLgUSD']} LG` : `${body[i]['countLgUSD']} LGs`,
        body[i]['countLg'] < 2 ? `${body[i]['countLg']} LG` : `${body[i]['countLg']} LGs`,
      ];
      head.push(record);
    }
  }
  return head;
};

export const SummaryDetailExport = (body, type, stage) => {
  const head = [
    [
      'No ',
      stage === 'main' ? 'PFI Name' : null,
      'LG Number',
      stage !== 'main' ? (type === 'npl' ? 'NPL Date' : 'Special Mention Date') : null,
      'Currency',
      'Principal Outstanding',
      'Previous Loan Classification Status',
      'Loan Classification Status',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        stage === 'main' ? body[i]['pfi']['name'] : null,
        body[i]['lgNo'] ? body[i]['lgNo'] : 'N/A',
        stage !== 'main' ? body[i]['nplDate'] : null,
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['outstandingBalance']),
        body[i]['previousLoanClassificationStatus'] ? body[i]['previousLoanClassificationStatus'] : '',
        body[i]['loanClassificationStatus'] ? body[i]['loanClassificationStatus'] : '',
      ];
      head.push(record);
    }
  }
  return head.map((row) => row.filter((item) => item !== null));
};

// Loan Monitoring PFI

export const PendingReportExport = (body, type) => {
  const head = [
    [
      'No ',
      'LG No.',
      type === 'npl' ? 'NPL Date' : 'Special Mention Date',
      'Currency',
      'Month',
      'Year',
      'Total Principal Outstanding',
      'Previous Classification Status',
      'Loan Classification Status',
    ],
  ];
  if (body.length > 0) {
    for (let i = 0; i < body.length; i++) {
      const record = [
        i + 1,
        body[i]['lgNo'] ? body[i]['lgNo'] : 'N/A',
        body[i]['nplDate'] ? body[i]['nplDate'] : 'N/A',
        body[i]['currency'] ? body[i]['currency'] : 'N/A',
        body[i]['month'] ? moment(body[i]['month']).format('MMMM') : 'N/A',
        body[i]['year'] ? body[i]['year'] : 'N/A',
        formatCurrency(body[i]['currency'], body[i]['outstandingBalance']),
        body[i]['previousLoanClassificationStatus'] ? body[i]['previousLoanClassificationStatus'] : '',
        body[i]['loanClassificationStatus'] ? body[i]['loanClassificationStatus'] : '',
      ];
      head.push(record);
    }
  }
  return head.map((row) => row.filter((item) => item !== null));
};
