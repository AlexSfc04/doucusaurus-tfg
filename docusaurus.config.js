// @ts-check
import { themes as prismThemes } from 'prism-react-renderer'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'StudiosWebSites',
  tagline: 'Documentación oficial del TFG',
  favicon: 'img/favicon.ico',
  url: 'https://studioswebsites-docs.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'es', locales: ['es'] },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/AlexSfc04/StudiosWebSites/edit/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'SWS',
        logo: {
          alt: 'StudiosWebSites Logo',
          src: 'https://res.cloudinary.com/deydlxlap/image/upload/v1780147779/logo-studios_lqb1gk.png',
        },
        items: [
          { type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left', label: 'Documentación' },
          { href: 'https://github.com/AlexSfc04/StudiosWebSites', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentación',
            items: [
              { label: 'Introducción', to: '/' },
              { label: 'Arquitectura', to: '/arquitectura' },
              { label: 'Backend', to: '/backend/api-endpoints' },
              { label: 'Frontend', to: '/frontend/estructura' },
            ],
          },
          {
            title: 'Proyecto',
            items: [
              { label: 'GitHub', href: 'https://github.com/AlexSfc04/StudiosWebSites' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} StudiosWebSites — TFG DAW`,
      },
      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: ['bash', 'json', 'yaml'],
      },
    }),
}

export default config
