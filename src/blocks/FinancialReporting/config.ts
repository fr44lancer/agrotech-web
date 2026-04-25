import type { Block } from 'payload'

export const FinancialReportingBlock: Block = {
  slug: 'financialReportingBlock',
  interfaceName: 'FinancialReportingBlock',
  labels: {
    singular: 'Financial Reporting Section',
    plural: 'Financial Reporting Sections',
  },
  admin: { group: 'Special' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Heading',
      defaultValue: 'Financial Reporting',
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      label: 'Subheading',
      defaultValue: 'Transparency and accountability in our financial operations',
    },
    {
      name: 'annualReports',
      type: 'array',
      localized: true,
      label: 'Annual Reports',
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
          label: 'Year (e.g. 2025)',
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'File',
        },
      ],
    },
    {
      name: 'quarterlyResults',
      type: 'array',
      localized: true,
      label: 'Quarterly Results',
      fields: [
        {
          name: 'quarter',
          type: 'text',
          required: true,
          label: 'Quarter (e.g. Q4 2025)',
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'File (optional)',
        },
        {
          name: 'url',
          type: 'text',
          label: 'View URL (optional, used if no file)',
        },
      ],
    },
    {
      name: 'investorRelations',
      type: 'group',
      localized: true,
      label: 'Investor Relations',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          defaultValue: 'Investor Relations',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
  ],
}
