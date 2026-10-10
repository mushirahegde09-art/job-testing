export interface SalaryBenchmark {
  role: string;
  levels: {
    levelName: string;
    yearsExp: string;
    baseMedian: number;
    equityMedian: number;
    bonusMedian: number;
    totalComp: number;
  }[];
}

export const SALARY_BENCHMARKS: SalaryBenchmark[] = [
  {
    role: 'Software Engineer (Frontend / React)',
    levels: [
      { levelName: 'Entry (L3 / Associate)', yearsExp: '0-2 yrs', baseMedian: 125000, equityMedian: 30000, bonusMedian: 15000, totalComp: 170000 },
      { levelName: 'Mid-Level (L4)', yearsExp: '2-5 yrs', baseMedian: 165000, equityMedian: 60000, bonusMedian: 25000, totalComp: 250000 },
      { levelName: 'Senior (L5)', yearsExp: '5-8 yrs', baseMedian: 205000, equityMedian: 110000, bonusMedian: 35000, totalComp: 350000 },
      { levelName: 'Staff / Architect (L6)', yearsExp: '8+ yrs', baseMedian: 245000, equityMedian: 210000, bonusMedian: 50000, totalComp: 505000 },
    ],
  },
  {
    role: 'Distributed Systems & Backend Engineer',
    levels: [
      { levelName: 'Entry (L3 / Associate)', yearsExp: '0-2 yrs', baseMedian: 130000, equityMedian: 35000, bonusMedian: 15000, totalComp: 180000 },
      { levelName: 'Mid-Level (L4)', yearsExp: '2-5 yrs', baseMedian: 170000, equityMedian: 70000, bonusMedian: 25000, totalComp: 265000 },
      { levelName: 'Senior (L5)', yearsExp: '5-8 yrs', baseMedian: 215000, equityMedian: 125000, bonusMedian: 40000, totalComp: 380000 },
      { levelName: 'Staff / Principal (L6)', yearsExp: '8+ yrs', baseMedian: 260000, equityMedian: 240000, bonusMedian: 60000, totalComp: 560000 },
    ],
  },
  {
    role: 'AI / Machine Learning Engineer',
    levels: [
      { levelName: 'Entry (L3 / Associate)', yearsExp: '0-2 yrs', baseMedian: 145000, equityMedian: 50000, bonusMedian: 20000, totalComp: 215000 },
      { levelName: 'Mid-Level (L4)', yearsExp: '2-5 yrs', baseMedian: 190000, equityMedian: 95000, bonusMedian: 30000, totalComp: 315000 },
      { levelName: 'Senior (L5)', yearsExp: '5-8 yrs', baseMedian: 240000, equityMedian: 175000, bonusMedian: 45000, totalComp: 460000 },
      { levelName: 'Staff / Principal (L6)', yearsExp: '8+ yrs', baseMedian: 290000, equityMedian: 320000, bonusMedian: 75000, totalComp: 685000 },
    ],
  },
  {
    role: 'Product Designer / Design Systems',
    levels: [
      { levelName: 'Entry (L3 / Associate)', yearsExp: '0-2 yrs', baseMedian: 110000, equityMedian: 25000, bonusMedian: 10000, totalComp: 145000 },
      { levelName: 'Mid-Level (L4)', yearsExp: '2-5 yrs', baseMedian: 150000, equityMedian: 50000, bonusMedian: 20000, totalComp: 220000 },
      { levelName: 'Senior (L5)', yearsExp: '5-8 yrs', baseMedian: 190000, equityMedian: 90000, bonusMedian: 30000, totalComp: 310000 },
      { levelName: 'Lead / Principal (L6)', yearsExp: '8+ yrs', baseMedian: 225000, equityMedian: 160000, bonusMedian: 45000, totalComp: 430000 },
    ],
  },
];

export const NEGOTIATION_SCRIPTS = [
  {
    title: 'Negotiating When You Have Multiple Competing Offers',
    scenario: 'Leveraging an alternative offer politely to maximize base & equity.',
    template: `Hi [Recruiter Name],

Thank you so much for extending this offer! I am genuinely thrilled about the team's mission and the impact of the [Job Title] role.

I am currently finalizing conversations with another company that has extended an offer with a total compensation package of $[Total Amount] (including $[Base Amount] base and $[Equity Amount] equity).

Because [Target Company] remains my absolute first choice due to [Team Culture / Technical Vision / Specific Project], if you are able to adjust the compensation package closer to $[Target Total Amount] — specifically through an equity increase or signing bonus — I would be delighted to sign immediately today.

Could we schedule a brief 10-minute call to discuss this?

Warm regards,
[Your Name]`,
  },
  {
    title: 'Countering an Initial Lowball Offer (No Competing Offer)',
    scenario: 'Using objective market data & high interview ratings to negotiate.',
    template: `Hi [Recruiter Name],

Thank you for sending over the formal offer details. I really enjoyed meeting the team during the onsite loop and am excited about the opportunity to contribute to [Specific Team Milestone].

Based on my [X years] of specialized experience with [Key Tech Stack / System Scale], along with verified industry compensation data for [Level Title] roles in this tier, I was anticipating a base salary in the range of $[Target Base] with a signing incentive or additional equity grant of $[Target Equity].

Given the high impact we discussed in the first 90 days, is there flexibility to adjust the numbers closer to this benchmark? I am eager to find a package that works for both of us so we can lock this in.

Best regards,
[Your Name]`,
  },
];
