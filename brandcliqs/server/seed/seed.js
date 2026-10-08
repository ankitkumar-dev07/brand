import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Tool from '../models/Tool.js';
import Category from '../models/Category.js';
import { slugify } from '../utils/slug.js';

const groups = {
  AI: [
    'ChatGPT',
    'Claude',
    'Gemini',
    'Perplexity',
    'Microsoft Copilot',
    'Grok',
    'Mistral AI',
    'Cohere',
    'Hugging Face',
    'Jasper',
    'Copy.ai',
    'Writesonic',
    'Grammarly',
    'QuillBot',
    'Otter.ai',
    'Fireflies.ai',
    'Descript',
    'ElevenLabs',
    'Midjourney',
    'DALL·E',
    'Runway',
    'Pika',
    'Synthesia',
    'Gamma',
    'Beautiful.ai',
    'NotebookLM',
    'Character.AI',
    'Replit AI',
    'Cursor',
    'Tabnine',
    'Codeium',
    'Phind',
  ],

  Finance: [
    'Stripe',
    'PayPal',
    'Square',
    'Razorpay',
    'QuickBooks',
    'Xero',
    'FreshBooks',
    'Wave',
    'Zoho Books',
    'Sage',
    'Ramp',
    'Brex',
    'Bill.com',
    'Plaid',
    'Mercury',
    'Wise',
    'Expensify',
    'BILL',
    'Gusto',
    'Deel',
    'Airwallex',
    'Chargebee',
    'Zuora',
    'Mollie',
    'Klarna',
  ],

  Marketing: [
    'HubSpot',
    'Mailchimp',
    'ActiveCampaign',
    'Klaviyo',
    'Marketo',
    'Pipedrive',
    'Salesforce',
    'Zoho CRM',
    'Intercom',
    'Drift',
    'Brevo',
    'Constant Contact',
    'Campaign Monitor',
    'ConvertKit',
    'Omnisend',
    'Hootsuite',
    'Buffer',
    'Sprout Social',
    'Later',
    'Metricool',
    'Semrush',
    'Ahrefs',
    'Moz',
    'Surfer SEO',
    'Hotjar',
    'Mixpanel',
    'Amplitude',
    'Google Analytics',
    'Typeform',
    'Unbounce',
    'Webflow',
    'WordPress',
    'Squarespace',
    'Wix',
  ],

  Ops: [
    'Zapier',
    'Make',
    'IFTTT',
    'Trello',
    'Asana',
    'Monday.com',
    'ClickUp',
    'Jira',
    'Linear',
    'Basecamp',
    'Smartsheet',
    'Airtable',
    'Notion',
    'Coda',
    'Miro',
    'Lucidchart',
    'Confluence',
    'ServiceNow',
    'PagerDuty',
    'Datadog',
    'New Relic',
    'Grafana',
    'Sentry',
    'Postman',
    'Insomnia',
    'GitHub',
    'GitLab',
    'Bitbucket',
    'Docker',
    'Vercel',
    'Netlify',
    'Heroku',
  ],

  HR: [
    'BambooHR',
    'Workday',
    'Greenhouse',
    'Lever',
    'Rippling',
    'Gusto',
    'Personio',
    'Factorial',
    'Lattice',
    'Culture Amp',
    '15Five',
    'HiBob',
    'Namely',
    'TriNet',
    'Paycor',
    'ADP',
    'UKG',
    'Remote',
    'Oyster',
    'Indeed',
    'LinkedIn Recruiter',
  ],

  Design: [
    'Figma',
    'Canva',
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Adobe XD',
    'Sketch',
    'Framer',
    'ProtoPie',
    'InVision',
    'Penpot',
    'Affinity Designer',
    'Affinity Photo',
    'FigJam',
    'Whimsical',
    'Easil',
    'VistaCreate',
    'Spline',
    'Blender',
    'Cinema 4D',
    'Zeplin',
    'Marvel',
    'Balsamiq',
    'MockFlow',
    'Visme',
    'Piktochart',
  ],

  Development: [
    'Visual Studio Code',
    'IntelliJ IDEA',
    'WebStorm',
    'Eclipse',
    'Android Studio',
    'Xcode',
    'Sublime Text',
    'Atom',
    'Stack Overflow',
    'npm',
    'Yarn',
    'pnpm',
    'PostgreSQL',
    'MongoDB Atlas',
    'Supabase',
    'Firebase',
    'PlanetScale',
    'Redis',
    'Algolia',
    'Cloudflare',
    'AWS',
    'Google Cloud',
    'Microsoft Azure',
    'DigitalOcean',
    'Linode',
    'Terraform Cloud',
    'CircleCI',
    'Travis CI',
    'Jenkins',
    'SonarQube',
  ],

  Productivity: [
    'Google Workspace',
    'Microsoft 365',
    'Slack',
    'Microsoft Teams',
    'Zoom',
    'Dropbox',
    'Google Drive',
    'OneDrive',
    'Box',
    'Evernote',
    'Todoist',
    'TickTick',
    'Calendly',
    'DocuSign',
    'Loom',
    '1Password',
    'LastPass',
    'Dashlane',
    'Grammarly Business',
    'Todoist Teams',
    'Readwise',
    'Pocket',
    'Toggl Track',
    'RescueTime',
    'Calendly Routing',
    'Doodle',
  ],
};

const categoryMeta = {
  AI: ['AI', 'Technology'],
  Finance: ['Finance', 'Financial Services'],
  Marketing: ['Marketing', 'Advertising'],
  Ops: ['Operations', 'Technology'],
  HR: ['HR', 'People & Culture'],
  Design: ['Design', 'Creative'],
  Development: ['Development', 'Technology'],
  Productivity: ['Productivity', 'Cross-industry'],
};

const topWeb = {
  ChatGPT: 'https://chatgpt.com',
  Claude: 'https://claude.ai',
  Gemini: 'https://gemini.google.com',
  Canva: 'https://www.canva.com',
  Figma: 'https://www.figma.com',
  Notion: 'https://www.notion.so',
  Slack: 'https://slack.com',
  Trello: 'https://trello.com',
  Zapier: 'https://zapier.com',
  HubSpot: 'https://www.hubspot.com',
  Mailchimp: 'https://mailchimp.com',
  Stripe: 'https://stripe.com',
  Jira: 'https://www.atlassian.com/software/jira',
  GitHub: 'https://github.com',
  Dropbox: 'https://www.dropbox.com',
  'Google Workspace': 'https://workspace.google.com',
  'Microsoft Teams': 'https://www.microsoft.com/microsoft-teams',
  WordPress: 'https://wordpress.com',
  Webflow: 'https://webflow.com',
};

function desc(name, cat) {
  const map = {
    AI: 'AI and automation software for creating, researching, coding or working with content.',
    Finance:
      'Financial software for payments, accounting, spend management or business finance.',
    Marketing:
      'A marketing and customer-growth platform for campaigns, sales, analytics or engagement.',
    Ops:
      'Operations and workflow software that helps teams organize work and automate processes.',
    HR:
      'People, hiring and workforce software for modern teams.',
    Design:
      'Creative and design software for interfaces, visuals, prototypes and content.',
    Development:
      'Developer tools and infrastructure for building, testing, shipping and operating software.',
    Productivity:
      'A productivity and collaboration tool for organizing work, communication and knowledge.',
  };

  return `${name} helps teams and individuals ${map[cat]
    .replace('software', 'workflows')
    .toLowerCase()}`;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    Tool.deleteMany({}),
    Category.deleteMany({}),
    User.deleteMany({}),
  ]);

  const cats = Object.keys(groups);

  await Category.insertMany(
    cats.map((x) => ({
      name: x,
      slug: slugify(x),
      description: `${x} software and tools for modern teams.`,
    }))
  );

  const docs = [];

  for (const cat of cats) {
    for (const name of groups[cat]) {
      const [
        sub,
        industry,
      ] = categoryMeta[cat];

      docs.push({
        name,
        slug: slugify(name),
        description: desc(name, cat),
        logo: '',
        category: cat,
        subcategory: sub,
        industry,
        audience: [
          'Business',
          'Individual',
          'Both',
        ][name.length % 3],
        website:
          topWeb[name] ||
          `https://www.google.com/search?q=${encodeURIComponent(name)}`,
        pricingType: [
          'Free',
          'Freemium',
          'Paid',
        ][name.length % 3],
        price:
          name.length % 2
            ? 'Free tier available'
            : 'Contact vendor',
        features: [
          'Core workflow',
          'Team collaboration',
          'Integrations',
          'Analytics',
          'Automation',
        ].slice(0, 3 + (name.length % 3)),
        tags: [
          cat.toLowerCase(),
          sub.toLowerCase(),
          name.split(' ')[0].toLowerCase(),
        ],
        rating: Number(
          (
            4.1 +
            (name.length % 9) / 10
          ).toFixed(1)
        ),
        featured: docs.length < 18,
        isPro: name.length % 4 !== 0,
        freePlan: name.length % 3 !== 0,
        integrations: [
          'Google Workspace',
          'Slack',
          'Zapier',
        ].slice(
          0,
          (name.length % 3) + 1
        ),
        aiCapabilities:
          cat === 'AI'
            ? [
                'Content generation',
                'Natural language',
                'Automation',
              ]
            : [
                'Smart suggestions',
                'Workflow automation',
              ],
      });
    }
  }

  await Tool.insertMany(docs);

  const admin = await User.create({
    name: 'BrandCliqs Admin',
    email: 'admin@brandcliqs.com',
    password: await bcrypt.hash(
      'Admin@12345',
      12
    ),
    role: 'admin',
  });

  await User.create({
    name: 'Demo User',
    email: 'demo@brandcliqs.com',
    password: await bcrypt.hash(
      'Demo@12345',
      12
    ),
    role: 'user',
  });

  console.log(
    `Seeded ${docs.length} tools`
  );

  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});