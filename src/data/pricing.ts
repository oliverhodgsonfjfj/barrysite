// Fees and inclusions exactly as on the old Services page (all per month, plus VAT).
export type PlanGroup = 'ltd' | 'sole' | 'landlord';

export interface Plan {
  id: string;
  group: PlanGroup;
  name: string;
  scope: string;
  fee: number;
  unit?: string;
  includes: string[];
  note?: string;
}

export const plans: Plan[] = [
  {
    id: 'ltd-basic',
    group: 'ltd',
    name: 'Limited Company',
    scope: 'Up to £90K turnover',
    fee: 99,
    includes: [
      'Registration for taxes',
      'Confirmation Statement',
      'Company accounts',
      'Corporation tax return',
      'Payroll for 1',
      'FreeAgent subscription',
      'Annual review meeting',
      'Phone & email support',
    ],
  },
  {
    id: 'ltd-premium',
    group: 'ltd',
    name: 'Ltd Premium',
    scope: 'Up to £250K turnover',
    fee: 145,
    includes: [
      'Registration for taxes',
      'Confirmation Statement',
      'Company accounts',
      'Corporation tax return',
      'Payroll for 2',
      'Up to 2 tax returns',
      'FreeAgent subscription',
      'VAT returns',
      'Auto enrolment administration',
      'Quarterly FreeAgent review',
      'Salary and dividends planning',
      'Help to minimise income taxed at 40%',
      'Annual review meeting',
      'Phone & email support',
    ],
  },
  {
    id: 'ltd-boost',
    group: 'ltd',
    name: 'Ltd Tax Boost',
    scope: 'Up to £250K turnover',
    fee: 185,
    includes: [
      'Registration for taxes',
      'Confirmation Statement',
      'Company accounts',
      'Corporation tax return',
      'Payroll for 2',
      'Up to 2 tax returns',
      'FreeAgent subscription',
      'VAT returns',
      'Auto-enrolment administration',
      'Quarterly FreeAgent review',
      'Salary and dividend planning',
      'Annual review meeting',
      'Rental income',
      'Foreign income',
      'Help to minimise tax on income over £100K',
      'High income pension tax charge',
      'Review and amendments to shareholdings',
      'Help to minimise corporation tax at higher rates',
      'Projections of tax due for up to 2 years',
      'Capital Gains Tax',
      'Phone & email support',
    ],
  },
  {
    id: 'st-basic',
    group: 'sole',
    name: 'Sole Trader',
    scope: 'Up to £50K turnover, not on MTD',
    fee: 50,
    includes: [
      'Registration for taxes',
      'Tax return',
      'FreeAgent subscription',
      'Annual review meeting (on Zoom)',
      'Phone & email support',
    ],
  },
  {
    id: 'st-mtd',
    group: 'sole',
    name: 'Sole Trader MTD',
    scope: 'Up to £90K turnover',
    fee: 75,
    includes: [
      'Registration for taxes',
      'Tax return',
      'FreeAgent subscription',
      'Quarterly FreeAgent review',
      'Annual review meeting (on Zoom)',
      'Phone & email support',
      'Making Tax Digital submissions',
    ],
  },
  {
    id: 'st-book',
    group: 'sole',
    name: 'Sole Trader MTD with Bookkeeping',
    scope: 'Up to £90K turnover',
    fee: 125,
    includes: [
      'Registration for taxes',
      'Tax return',
      'FreeAgent subscription',
      'FreeAgent Smart Capture',
      'Quarterly FreeAgent review',
      'Annual review meeting (on Zoom)',
      'Phone & email support',
      'Making Tax Digital submissions',
      'Bookkeeping service',
    ],
  },
  {
    id: 'rental',
    group: 'landlord',
    name: 'Rental Accounts',
    scope: 'Per property',
    fee: 25,
    unit: 'per property',
    includes: [
      'FreeAgent Rental subscription',
      'Tax return',
      'Advice on tax and rental income',
      'Making Tax Digital submissions',
      'Phone & email support',
    ],
  },
];

export const planSummary = plans.map((p) => ({ group: p.group, name: p.name, scope: p.scope, fee: p.fee, unit: p.unit }));

export const additionalServices = [
  'Financial forecasts',
  'Share restructuring',
  'Monthly management meetings',
  'Bookkeeping',
  'Extra tax returns or employees',
  'Capital Gains Tax',
  'Rental accounts',
  'Mortgage references',
  'Change of accounting date',
  'Adding new people to the payroll',
];

export const pricingNotes = {
  vat: 'All fees are per month and exclude VAT.',
  poa: 'Turnover over £250K: price on application.',
  extra:
    'Where there is extra work, complications, records are provided late or our advice is not taken, additional fees may apply (this will be advised where applicable).',
  paperless: 'We are completely paperless. All documents must be transferred electronically.',
};
