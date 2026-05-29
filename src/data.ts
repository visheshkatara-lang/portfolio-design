import { ExperienceItem, ProjectItem, StoryPhase, EducationItem, StackCategory } from './types';

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    num: '01',
    category: 'IT Consulting & SaaS',
    company: 'ManpraX Software',
    role: 'Executive — Brand & Growth',
    period: 'Jun 2025 – Present',
    location: 'Delhi NCR · Full-time, One-person function',
    points: [
      'Own complete digital presence: LinkedIn, Instagram, Facebook, Twitter',
      'Lead SEO, Google Ads, email marketing and analytics tracking end-to-end',
      'Create blogs, website copy, case studies and pitch decks independently',
      'Built n8n & Make.ai automation workflows — cut execution time by 40%',
      'Executed DIDAC Expo & CSR Box Expo: booth logistics, lead capture, event strategy',
      'Collaborate on GTM strategy, product positioning & partner marketing',
      'AI-based content and creative systems — 3x faster campaign turnaround'
    ],
    theme: 'black'
  },
  {
    id: 'exp-2',
    num: '02',
    category: 'Industrial / Irrigation',
    company: 'Automat Industries',
    role: 'Marketing Executive',
    period: 'Jun 2024 – Apr 2025',
    location: 'India & International · Full-time',
    points: [
      'Managed ₹3Cr+ international exhibition budget across 4 continents',
      'Handled ₹15L/month ad spend - delivered 112% organic traffic growth',
      'Executed trade shows in Russia, Turkey, Iran, Italy, Nigeria, Morocco, Algeria & Senegal',
      'Conducted 5 dealer meets with 500+ attendees each across India',
      'Managed vendors, logistics, booth design & live product demos independently',
      'Built multi-market digital campaigns across international territories',
      'Structured post-event lead capture workflows improving pipeline development'
    ],
    theme: 'coral'
  },
  {
    id: 'exp-3',
    num: '03',
    category: 'Media & Publishing',
    company: 'News 24',
    role: 'Digital Marketing Intern',
    period: 'Jul – Aug 2023',
    location: 'Delhi · Internship',
    points: [
      'Improved content discoverability via on-page SEO and keyword strategy',
      'Managed social media content distribution - grew organic reach across platforms',
      'Analysed content performance; prepared weekly insight reports for editorial team'
    ],
    theme: 'default'
  },
  {
    id: 'exp-4',
    num: '04',
    category: 'E-commerce / Manufacturing',
    company: 'A-One Fibers',
    role: 'Marketing Intern — Paid Ads',
    period: 'Jan – Apr 2023',
    location: 'Delhi · Contract',
    points: [
      'Set up and optimised Google Ads & IndiaMART acquisition campaigns',
      'Improved cost-per-lead through iterative A/B testing of creatives and copy',
      'Supported on-page SEO and lead generation workflows'
    ],
    theme: 'purple'
  },
  {
    id: 'exp-5',
    num: '05',
    category: 'Tech & Branding Agency',
    company: 'Webgross',
    role: 'Business Development Executive',
    period: 'Early career · Delhi',
    location: 'Client Acquisition & Sales',
    points: [
      'Drove client acquisition through targeted cold outreach and sales strategy',
      'Built and maintained relationships across tech and branding verticals'
    ],
    theme: 'dark2'
  },
  {
    id: 'exp-6',
    num: '06',
    category: 'Early Roles',
    company: 'Dainik Pahal · INGLU · Anar',
    role: 'SEO Intern · Product Marketing Intern · Sales Intern',
    period: '2022 – 2023',
    location: 'Various internships',
    points: [
      'Website audits, keyword optimisation, on-page SEO (Dainik Pahal Today)',
      'Social media campaigns and product promotion strategy (INGLU Global)',
      'User support and product improvement coordination (Anar Business App)'
    ],
    theme: 'default'
  }
];

export const PROJECT_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    category: 'Automation & AI',
    title: 'Lead Nurture Engine',
    description: 'Built a fully automated post-event lead nurturing pipeline using n8n. CRM intake triggers personalised email sequences, Slack alerts fire for hot leads in real time, and a live Google Sheets dashboard tracks pipeline velocity — zero manual input after the event ends.',
    result: '↓ 80% manual follow-up effort',
    tags: ['n8n', 'CRM', 'Email automation', 'Slack']
  },
  {
    id: 'proj-2',
    category: 'Event & Field Marketing',
    title: 'EIMA International, Bologna',
    description: "Led complete ground execution and strategic brand operations at Italy's most prominent agritech exhibition. Managed vendor relations, booth setup, and lead capture workflows at a global event featuring 2,000+ exhibitors and 300,000+ visitors.",
    result: '300,000+ attendee footprint',
    tags: ['EIMA Italy', 'Event ops', 'Agritech', 'Lead capture']
  },
  {
    id: 'proj-3',
    category: 'Brand & Campaign',
    title: 'LinkedIn Growth System',
    description: 'Built a LinkedIn content and ads strategy from scratch for ManpraX Software. Designed an editorial calendar, AI-assisted content production workflow via Make.ai, and a performance dashboard tracking impressions, CTR and pipeline-attributed leads. Tripled content output without adding headcount.',
    result: '3x content output, same team size',
    tags: ['LinkedIn Ads', 'Make.ai', 'GA4']
  },
  {
    id: 'proj-4',
    category: 'Performance Marketing',
    title: 'Multi-Market SEO Push',
    description: 'Executed a structured SEO overhaul at Automat Industries targeting domestic and international buyer segments — keyword mapping, on-page optimisation, Search Console monitoring, and content calendar aligned to product categories over 10 months.',
    result: '↑ 112% organic traffic',
    tags: ['SEO', 'Search Console', 'Content strategy']
  },
  {
    id: 'proj-5',
    category: 'Analytics & Dashboards',
    title: 'Marketing Intelligence Dashboard',
    description: 'Built a live marketing dashboard for ManpraX leadership pulling data from GA4, Google Ads and LinkedIn Ads into a single view. Enabled weekly decision-making on channel spend and conversion attribution — replaced manual spreadsheet reporting entirely.',
    result: 'Weekly reporting, fully automated',
    tags: ['GA4', 'Google Ads', 'LinkedIn Ads']
  },
  {
    id: 'proj-6',
    category: 'Field Marketing',
    title: 'Dealer Meet Series — India',
    description: 'Planned and executed 5 large-scale dealer meets across Indian cities for Automat Industries — 500+ attendees each. End-to-end: venue coordination, branded environment, product demo stations, speaker management, post-event lead capture and follow-up workflows.',
    result: '2500+ total attendees across series',
    tags: ['Event mgmt', 'Brand', 'Logistics']
  }
];

export const STORY_PHASES: StoryPhase[] = [
  {
    id: 'story-1',
    num: '01',
    phase: 'Phase 1 — Foundation',
    title: 'SEO, Ads & The Basics',
    body: 'Started with hands-on learning across SEO, paid ads, content and social. Multiple internships across media, e-commerce and SaaS gave a fast-tracked education in what makes digital marketing actually work — and what doesn\'t.',
    active: false
  },
  {
    id: 'story-2',
    num: '02',
    phase: 'Phase 2 — Scale',
    title: 'Events & International Markets',
    body: 'Took marketing beyond the screen. Executed exhibitions across Russia, Turkey, Iran, Italy, Nigeria, Morocco, Algeria and Senegal. Managed ₹3Cr+ budgets. Ran dealer meets with 500+ attendees. Built the rare mix of global field execution and digital campaign management in one role.',
    active: true
  },
  {
    id: 'story-3',
    num: '03',
    phase: 'Phase 3 — Now',
    title: 'Systems, AI & Full Ownership',
    body: 'Running complete marketing independently — strategy, execution, automation, analytics. Building AI-powered content systems, CRM workflows and performance dashboards. Moving toward Brand Strategy, B2B Growth, and consulting roles where scale meets systems thinking.',
    active: false
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'MICA — Upgrad',
    degree: 'PG Diploma in Digital Marketing & Communication',
    items: ['Generative AI for Marketing', 'Marketing Leadership', 'Marketing Analytics'],
    year: '2025 – 2026',
    theme: 'black'
  },
  {
    id: 'edu-2',
    institution: 'Bharatiya Vidyapeeth University',
    degree: 'Bachelor of Journalism & Mass Communication',
    items: [
      'CGPA: 8.4 / 10',
      'Sports Club President',
      'Class Representative — 4 semesters',
      'Brand communications & media strategy'
    ],
    year: '2021 – 2024',
    theme: 'default'
  },
  {
    id: 'edu-3',
    institution: 'Certifications',
    degree: 'Google, HubSpot & AI Platforms',
    items: [
      'Google Analytics Certified (GA4)',
      'HubSpot SEO & SMO Certification',
      'AI-Powered Marketing Mastery (Co-Pilot)',
      'Claude Code in Action',
      'AI Fluency Framework & Foundations'
    ],
    year: '2023 – 2026',
    theme: 'coral'
  },
  {
    id: 'edu-4',
    institution: 'Always Learning',
    degree: 'Current focus areas',
    items: [
      'Advanced marketing automation (n8n / Make)',
      'AI content systems & video workflows',
      'B2B demand generation at scale',
      'Brand & GTM strategy consulting'
    ],
    year: 'Ongoing',
    theme: 'default'
  }
];

export const STACK_DATA: StackCategory[] = [
  {
    id: 'stack-1',
    label: 'Social Media Management',
    pills: ['Buffer', 'Hootsuite', 'Sprout Social']
  },
  {
    id: 'stack-2',
    label: 'AI Content / Copywriting',
    pills: ['ChatGPT', 'Claude', 'Jasper', 'Writesonic', 'Perplexity']
  },
  {
    id: 'stack-3',
    label: 'Design & Creative',
    pills: ['Figma', 'Canva', 'Adobe Express']
  },
  {
    id: 'stack-4',
    label: 'SEO & CRM Systems',
    pills: ['Ahrefs', 'SEMrush', 'Surfer', 'Google Search Console', 'Google Analytics', 'HubSpot', 'Mailchimp', 'Apollo']
  },
  {
    id: 'stack-5',
    label: 'No-Code & Automation',
    pills: ['n8n', 'Make', 'Zapier']
  }
];
