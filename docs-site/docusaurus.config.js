// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SQL Learning Path',
  tagline: 'Comprehensive SQL documentation with AI-powered search',
  url: 'https://your-domain.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config
  organizationName: 'your-org', 
  projectName: 'sql-docs-ai',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: '../sql-content',
          // Please change this to your repo.
          editUrl: 'https://github.com/your-org/sql-docs-ai/tree/main/docs-site/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'SQL Learning Path',
        logo: {
          alt: 'SQL Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: '0_readme',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: '/ai-assistant',
            label: 'AI Assistant',
            position: 'left',
          },
          {
            href: 'https://github.com/your-org/sql-docs-ai',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/0_readme',
              },
              {
                label: 'Basic SQL Commands',
                to: '/docs/1_basic_sql_commands/README',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/sql',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/sql',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/your-org/sql-docs-ai',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SQL Learning Path. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula'),
        additionalLanguages: ['sql'],
      },
    }),
};

module.exports = config; 