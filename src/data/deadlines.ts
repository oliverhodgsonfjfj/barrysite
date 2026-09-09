// Standard recurring HMRC dates for individuals, sole traders and landlords.
// Company deadlines (accounts, corporation tax, VAT) depend on the year end, so are not listed.
export interface Deadline {
  month: number; // 1-12
  day: number;
  label: string;
  title: string;
}

export const deadlines: Deadline[] = [
  { month: 1, day: 31, label: '31 January', title: 'Self Assessment tax return, balancing payment and first payment on account due' },
  { month: 2, day: 7, label: '7 February', title: 'MTD for Income Tax quarterly update due (quarter to 5 January)' },
  { month: 4, day: 5, label: '5 April', title: 'End of the tax year' },
  { month: 4, day: 6, label: '6 April', title: 'New tax year begins' },
  { month: 5, day: 7, label: '7 May', title: 'MTD for Income Tax quarterly update due (quarter to 5 April)' },
  { month: 7, day: 31, label: '31 July', title: 'Second payment on account due' },
  { month: 8, day: 7, label: '7 August', title: 'MTD for Income Tax quarterly update due (quarter to 5 July)' },
  { month: 10, day: 5, label: '5 October', title: 'Register for Self Assessment if you started trading in the last tax year' },
  { month: 11, day: 7, label: '7 November', title: 'MTD for Income Tax quarterly update due (quarter to 5 October)' },
];
