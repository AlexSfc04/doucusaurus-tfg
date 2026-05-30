import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e04'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '0ef'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '3c6'),
            routes: [
              {
                path: '/arquitectura',
                component: ComponentCreator('/arquitectura', 'a01'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/backend/api-endpoints',
                component: ComponentCreator('/backend/api-endpoints', '50c'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/backend/autenticacion',
                component: ComponentCreator('/backend/autenticacion', '7f3'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/decisiones',
                component: ComponentCreator('/decisiones', '6c8'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/despliegue',
                component: ComponentCreator('/despliegue', '63e'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/frontend/componentes',
                component: ComponentCreator('/frontend/componentes', '4d9'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/frontend/estructura',
                component: ComponentCreator('/frontend/estructura', '66c'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/github',
                component: ComponentCreator('/github', '047'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/local',
                component: ComponentCreator('/local', '968'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/uso',
                component: ComponentCreator('/uso', '7d8'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'c02'),
                exact: true,
                sidebar: "mainSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
