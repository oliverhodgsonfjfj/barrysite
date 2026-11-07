// Infozone: rebuilt from the old news.focusaccountancy.co.uk Joomla component (Nov 2026).
// Forms link straight to GOV.UK. Calculators are still hosted by Informanagement and embedded in an iframe.
const gov = 'https://www.gov.uk/government/publications/';
const calcBase = 'https://infozone.informanagement.co.uk/calculators/';

export type Calculator = { slug: string; name: string; summary: string; src: string; height: number };
export type FormLink = { code?: string; name: string; href: string };
export type FormGroup = { title: string; forms: FormLink[] };

export const calculators: Calculator[] = [
  { slug: 'payslip-calculator', name: 'Payslip calculator', summary: 'Estimate the deductions on a monthly or weekly payslip.', src: `${calcBase}payslip1617.html`, height: 900 },
  { slug: 'scotland-payslip-calculator', name: 'Scotland payslip calculator', summary: 'The same payslip estimate, using Scottish income tax rates.', src: `${calcBase}payslipscotland2020.html`, height: 900 },
  { slug: 'loan-calculator', name: 'Loan calculator', summary: 'Work out monthly repayments, total interest and the month-by-month balance.', src: `${calcBase}loan_calc.html`, height: 900 },
  { slug: 'pension-calculator', name: 'Pension calculator', summary: 'Work out what you would need to save for the pension income you want.', src: `${calcBase}pension_calc.html`, height: 500 },
  { slug: 'savings-calculator', name: 'Savings calculator', summary: 'Work out what you need to save, allowing for inflation.', src: `${calcBase}savings_calc.html`, height: 300 },
  { slug: 'vat-registration-threshold', name: 'VAT registration threshold', summary: 'Track rolling 12-month turnover against the VAT registration threshold.', src: `${calcBase}vat_registration.html`, height: 700 },
];

export const estateValuation = {
  name: 'Estate valuation tool',
  summary: 'A spreadsheet for estimating the value of an estate. It uses macros, which Microsoft may block when you first open it.',
  href: `${calcBase}Estate_valuation_calculator_revised_3.xltm`,
  macroHelp: 'https://support.microsoft.com/en-gb/topic/a-potentially-dangerous-macro-has-been-blocked-0952faa0-37e7-4316-b61d-5b5ed6024216',
};

export const checkers: FormLink[] = [
  { name: 'Check a UK VAT number', href: 'https://www.tax.service.gov.uk/check-vat-number/enter-vat-details' },
  { name: 'Check an EORI number', href: 'https://www.gov.uk/check-eori-number' },
];

export const hmrcForms: FormGroup[] = [
  { title: 'General', forms: [
    { name: 'Paying HMRC', href: 'https://www.gov.uk/topic/dealing-with-hmrc/paying-hmrc' },
    { code: 'CA5601', name: 'Pay self-employed National Insurance by Direct Debit', href: 'https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/420133/CA5601.pdf' },
    { code: '64-8', name: 'Authorising your agent', href: `${gov}tax-agents-and-advisers-authorising-your-agent-64-8` },
    { name: 'Gift Aid declaration', href: `${gov}charities-gift-aid-declaration-form-for-a-single-donation` },
  ] },
  { title: 'Self Assessment returns', forms: [
    { code: 'SA100', name: 'Main tax return for individuals', href: `${gov}self-assessment-tax-return-sa100` },
    { code: 'SA101', name: 'Supplementary pages', href: `${gov}self-assessment-additional-information-sa101` },
    { code: 'SA102', name: 'Employment', href: `${gov}self-assessment-employment-sa102` },
    { code: 'SA103S', name: 'Self-employment (short)', href: `${gov}self-assessment-self-employment-short-sa103s` },
    { code: 'SA103F', name: 'Self-employment (full)', href: `${gov}self-assessment-self-employment-full-sa103f` },
    { code: 'SA104S', name: 'Partnership (short)', href: `${gov}self-assessment-partnership-short-sa104s` },
    { code: 'SA104F', name: 'Partnership (full)', href: `${gov}self-assessment-partnership-full-sa104f` },
    { code: 'SA105', name: 'UK property', href: `${gov}self-assessment-uk-property-sa105` },
    { code: 'SA106', name: 'Foreign', href: `${gov}self-assessment-foreign-sa106` },
    { code: 'SA107', name: 'Trusts etc', href: `${gov}self-assessment-trusts-etc-sa107` },
    { code: 'SA108', name: 'Capital gains summary', href: `${gov}self-assessment-capital-gains-summary-sa108` },
    { code: 'SA109', name: 'Non-residence etc', href: `${gov}self-assessment-residence-remittance-basis-etc-sa109` },
    { code: 'SA110', name: 'Tax calculation summary', href: `${gov}self-assessment-tax-calculation-summary-sa110` },
    { code: 'SA150', name: 'How to fill in your tax return', href: `${gov}self-assessment-tax-return-sa100` },
    { name: 'Pay your Self Assessment tax bill', href: 'https://www.gov.uk/pay-self-assessment-tax-bill' },
  ] },
  { title: 'Registering for Self Assessment', forms: [
    { code: 'CWF1', name: 'Register for Self Assessment and National Insurance', href: 'https://www.gov.uk/register-for-self-assessment/self-employed' },
    { code: 'SA1', name: 'Register for Self Assessment and get a tax return', href: `${gov}self-assessment-register-for-self-assessment-and-get-a-tax-return-sa1` },
    { code: 'SA400', name: 'Register a partnership', href: `${gov}self-assessment-register-a-partnership-for-self-assessment-sa400` },
    { code: 'SA401', name: 'Register a partner, including Class 2 NICs', href: `${gov}self-assessment-register-a-partner-for-self-assessment-and-class-2-nics-sa401` },
    { code: 'SA402', name: "Register a partner if they're not an individual", href: `${gov}self-assessment-register-a-partner-for-self-assessment-if-theyre-not-an-individual-sa402` },
  ] },
  { title: 'Employers', forms: [
    { code: 'P11D', name: 'Expenses payments and benefits', href: `${gov}paye-end-of-year-expenses-and-benefits-p11d` },
    { code: 'P11D(b)', name: 'Return of Class 1A NICs and employer declaration', href: `${gov}paye-end-of-year-expenses-and-benefits-p11db` },
    { code: 'FBI 2', name: 'Authorise your agent to use PAYE Online', href: `${gov}tax-agents-and-advisers-authorising-an-agent-to-use-payecis-online-services-internet-fbi-2` },
    { code: 'P46(Car)', name: 'Car provided for private use', href: `${gov}paye-car-provided-to-employee-for-private-use-p46car` },
    { code: 'P60', name: 'End of year certificate notes', href: 'https://www.gov.uk/payroll-annual-reporting/give-employees-p60-form' },
    { code: 'SSP1', name: 'Statutory Sick Pay: employee not entitled', href: `${gov}statutory-sick-pay-employee-not-entitled-form-for-employers` },
    { code: 'SSP2', name: 'Statutory Sick Pay record sheet', href: `${gov}statutory-sick-pay-record-sheet-ssp2` },
    { code: 'SC2', name: "Employee's statement of sickness", href: `${gov}statutory-sick-pay-employees-statement-of-sickness-sc2` },
    { name: 'Starter checklist', href: `${gov}paye-starter-checklist` },
  ] },
  { title: 'Limited companies', forms: [
    { code: 'CT41G', name: 'Clubs, societies and voluntary associations', href: `${gov}corporation-tax-details-of-clubs-societies-voluntary-associations-and-other-similar-bodies-ct41g-clubs` },
    { code: 'CT600', name: 'Company tax return guide', href: 'https://www.gov.uk/guidance/the-company-tax-return-guide' },
    { code: 'CT600', name: 'Company tax return', href: `${gov}corporation-tax-company-tax-return-ct600-2015-version-3` },
  ] },
  { title: 'VAT', forms: [
    { code: 'VAT1', name: 'Application for registration', href: `${gov}vat-application-for-registration-vat1` },
    { code: 'VAT484', name: 'Change of details', href: `${gov}vat-changes-to-registration-details-vat484` },
    { code: 'VAT1614A', name: 'Option to tax land or buildings', href: `${gov}vat-notification-of-an-option-to-tax-land-andor-buildings-vat1614a` },
    { code: 'VAT600FRS', name: 'Join the Flat Rate Scheme', href: `${gov}vat-application-to-join-the-flat-rate-scheme-vat600frs` },
    { code: 'VAT7', name: 'Cancel your VAT registration', href: `${gov}vat-application-to-cancel-your-vat-registration-vat7` },
    { code: 'VAT68', name: 'Transfer a registration number', href: `${gov}vat-request-for-transfer-of-a-registration-number-vat68` },
    { code: 'VAT426', name: 'Insolvent traders: input tax after deregistration', href: `${gov}vat-insolvent-traders-claim-for-input-tax-after-deregistration-vat426` },
    { code: 'VAT427', name: 'Input tax relief on cancelling registration', href: `${gov}vat-reclaim-or-claim-vat-relief-on-cancelling-vat-registration-vat427` },
    { code: 'VAT652', name: 'Notify errors in VAT returns', href: `${gov}vat-notification-of-errors-in-vat-returns-vat-652` },
    { code: 'VAT769', name: 'Notify insolvency details', href: `${gov}vat-notification-of-insolvency-details-vat769` },
  ] },
];

export const companiesHouseForms: FormGroup[] = [
  { title: 'Accounts and company records', forms: [
    { code: 'AA01', name: 'Change of accounting reference date', href: `${gov}change-your-company-accounting-reference-date-aa01` },
    { code: 'AA02', name: 'Dormant company accounts', href: `${gov}file-your-dormant-accounts-aa02` },
    { code: 'AA06', name: 'Statement of guarantee by subsidiary company', href: `${gov}give-notice-of-statement-of-guarantee-by-subsidiary-company-aa06` },
    { code: 'AD01', name: 'Change of registered office address', href: `${gov}change-a-registered-office-address-ad01` },
    { code: 'AD02', name: 'Single alternative inspection location (SAIL)', href: `${gov}file-a-single-alternative-inspection-location-ad02` },
    { code: 'AD03', name: 'Move company records to the SAIL', href: `${gov}change-location-of-records-to-single-alternative-inspection-location-ad03` },
    { code: 'AD04', name: 'Move company records to the registered office', href: `${gov}change-location-of-company-records-to-registered-office-ad04` },
  ] },
  { title: 'Directors and secretaries', forms: [
    { code: 'AP01', name: 'Appoint a director', href: `${gov}appoint-a-director-ap01` },
    { code: 'AP02', name: 'Appoint a corporate director', href: `${gov}appoint-a-corporate-director-ap02` },
    { code: 'AP03', name: 'Appoint a secretary', href: `${gov}appoint-a-secretary-ap03` },
    { code: 'AP04', name: 'Appoint a corporate secretary', href: `${gov}appoint-a-corporate-secretary-ap04` },
    { code: 'TM01', name: 'Terminate a director', href: `${gov}terminate-an-appointment-of-a-director-tm01` },
    { code: 'TM02', name: 'Terminate a secretary', href: `${gov}terminate-an-appointment-of-a-secretary-tm02` },
    { code: 'CH01', name: "Change a director's details", href: `${gov}change-the-details-of-a-director-ch01` },
    { code: 'CH02', name: "Change a corporate director's details", href: `${gov}change-the-details-of-a-corporate-director-ch02` },
    { code: 'CH03', name: "Change a secretary's details", href: `${gov}change-the-details-of-a-secretary-ch03` },
    { code: 'CH04', name: "Change a corporate secretary's details", href: `${gov}change-the-details-of-a-corporate-secretary-ch04` },
    { code: 'SR01', name: 'Remove your home address from the public register', href: `${gov}apply-to-remove-your-home-address-from-the-public-register-sr01` },
  ] },
  { title: 'Forming, changing and closing a company', forms: [
    { code: 'IN01', name: 'Register a company', href: `${gov}register-a-private-or-public-company-in01` },
    { code: 'CS01', name: 'Confirmation statement', href: `${gov}confirmation-statement-form-cs01-new-version` },
    { code: 'SH01', name: 'Return of allotment of shares', href: `${gov}return-of-allotment-of-shares-sh01` },
    { code: 'NM01', name: 'Change of name by resolution', href: `${gov}change-a-company-name-nm01` },
    { code: 'Res CA2006', name: 'Special resolution on change of name', href: `${gov}give-notice-of-a-special-resolution-on-change-of-name` },
    { code: 'Written Res CA2006', name: 'Written special resolution on change of name', href: `${gov}give-notice-of-a-written-special-resolution-on-change-of-name` },
    { code: 'DS01', name: 'Striking off application', href: `${gov}strike-off-a-company-from-the-register-ds01` },
    { code: 'DS02', name: 'Withdraw a striking off application', href: `${gov}withdraw-a-striking-off-application-by-company-ds02` },
  ] },
  { title: 'People with significant control', forms: [
    { code: 'PSC01', name: 'Individual person with significant control', href: `${gov}give-notice-of-individual-person-with-significant-control-psc01` },
    { code: 'PSC02', name: 'Relevant legal entity with significant control', href: `${gov}give-notice-of-relevant-legal-entity-with-significant-control-psc02` },
    { code: 'PSC03', name: 'Other registrable person with significant control', href: `${gov}give-notice-of-other-registrable-person-with-significant-control-psc03` },
    { code: 'PSC04', name: 'Change of details: person with significant control', href: `${gov}give-notice-to-change-details-of-a-person-with-significant-control-of-a-limited-liability-partnership-ll-psc04` },
    { code: 'PSC05', name: 'Change of details: relevant legal entity', href: `${gov}give-notice-of-change-of-details-for-relevant-legal-entity-with-significant-control-psc05` },
    { code: 'PSC06', name: 'Change of details: other registrable person', href: `${gov}give-notice-of-change-of-details-of-other-registrable-person-with-significant-control-psc06` },
    { code: 'PSC07', name: 'Ceasing to be a person with significant control', href: `${gov}give-notice-ceasing-to-be-an-individual-person-with-significant-control-psc07` },
    { code: 'PSC08', name: 'PSC statements', href: `${gov}give-notice-of-psc-statements-psc08` },
    { code: 'PSC09', name: 'Update to PSC statements', href: `${gov}give-notice-of-update-to-psc-statements-psc09` },
  ] },
  { title: 'Charges and mortgages', forms: [
    { code: 'MR01', name: 'Particulars of a charge', href: `${gov}register-particulars-of-a-charge-mr01` },
    { code: 'MR02', name: 'Charge on property or undertaking acquired', href: `${gov}register-a-charge-property-or-undertaking-acquired-mr02` },
    { code: 'MR03', name: 'Charge to secure a series of debentures', href: `${gov}register-a-charge-to-secure-a-series-of-debentures-mr03` },
    { code: 'MR04', name: 'Statement of satisfaction of a charge', href: `${gov}register-a-statement-of-satisfaction-mr04` },
    { code: 'MR05', name: 'Property released from a charge', href: `${gov}register-a-statement-property-released-in-part-or-whole-mr05` },
    { code: 'MR06', name: 'Statement of company acting as a trustee', href: `${gov}register-a-statement-of-a-company-acting-as-a-trustee-mr06` },
    { code: 'MR07', name: 'Alteration of a charge', href: `${gov}register-particulars-of-alteration-of-a-charge-mr07` },
    { code: 'MR08', name: 'Charge where there is no instrument', href: `${gov}register-a-charge-where-there-is-no-instrument-mr08` },
    { code: 'MR09', name: 'Charge on property acquired, no instrument', href: `${gov}register-a-charge-property-acquired-no-instrument-mr09` },
    { code: 'MR10', name: 'Charge to secure debentures, no instrument', href: `${gov}register-a-charge-to-secure-debentures-no-instrument-mr10` },
    { code: 'MG01', name: 'Overseas: particulars of a mortgage or charge', href: `${gov}register-particulars-of-mortgage-or-charge-by-overseas-company-os-mg01` },
    { code: 'MG02', name: 'Overseas: satisfaction of a mortgage or charge', href: `${gov}register-satisfaction-of-mortgage-or-charge-by-overseas-company-os-mg02` },
    { code: 'MG04', name: 'Overseas: property released from a charge', href: `${gov}register-particulars-of-a-charge-to-secure-a-series-of-debentures-os-mg04` },
  ] },
];

export const disclaimer =
  "In preparing and maintaining this section of our website every effort has been made to ensure the content is up to date and accurate. However, the law and regulations change continually, and unintentional errors can occur, and the information may be neither up to date nor accurate. We make no representation or warranty (including liability towards third parties), express or implied, as to the accuracy, reliability or completeness of the information on the website. Please don't act directly on anything you read: contact us first for advice on how it may affect your individual circumstances.";
