/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    { type: 'doc', id: 'index', label: '🏠 Introducción' },
    { type: 'doc', id: 'arquitectura', label: '🏗️ Arquitectura' },
    {
      type: 'category',
      label: '⚙️ Backend',
      collapsed: false,
      items: [
        'backend/api-endpoints',
        'backend/autenticacion',
      ],
    },
    {
      type: 'category',
      label: '🎨 Frontend',
      collapsed: false,
      items: [
        'frontend/estructura',
        'frontend/componentes',
      ],
    },
    { type: 'doc', id: 'uso', label: '📖 Uso de la aplicación' },
    { type: 'doc', id: 'local', label: '💻 Lanzamiento en local' },
    { type: 'doc', id: 'despliegue', label: '☁️ Despliegue en la nube' },
    { type: 'doc', id: 'github', label: '🐙 GitHub' },
    { type: 'doc', id: 'decisiones', label: '🧩 Decisiones de diseño' },
  ],
}
export default sidebars
