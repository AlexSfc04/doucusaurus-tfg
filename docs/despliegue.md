---
id: despliegue
title: Despliegue en la nube
sidebar_position: 7
---

# Despliegue en la nube

StudiosWebSites está desplegado usando **Vercel** (frontend + backend) y **Railway** (base de datos).

## Arquitectura de despliegue

```
GitHub (main) ──push──▶ Vercel CI/CD ──▶ Frontend (SPA)
                                   └──▶ Backend API (Serverless Functions)

Railway ──────────────────────────────▶ MySQL 8.0
Cloudinary ───────────────────────────▶ CDN de imágenes
```

---

## Despliegue del Backend en Vercel

1. En la raíz de `server/`, crea `vercel.json`:

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/index.js" }]
}
```

2. Ve a [vercel.com](https://vercel.com) → **Add New Project** → importa el repositorio
3. Selecciona la carpeta `server/` como root
4. Añade todas las variables de entorno (ver tabla abajo)
5. Pulsa **Deploy**

---

## Despliegue del Frontend en Vercel

1. En la raíz de `client/`, crea `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
> Esto es **imprescindible** para que React Router funcione correctamente con rutas directas.

2. Importa el repositorio en Vercel → selecciona `client/` como root
3. Vercel detecta automáticamente Vite como framework
4. Añade las variables de entorno del frontend
5. Pulsa **Deploy**

---

## Base de datos en Railway

1. Ve a [railway.app](https://railway.app) → **New Project → MySQL**
2. En la sección **Variables**, copia las credenciales (`MYSQL_HOST`, `MYSQL_USER`, etc.)
3. Conéctate con un cliente MySQL y ejecuta el script de creación de tablas (ver sección [Lanzamiento en local](/local))
4. Añade las credenciales al `.env` de producción en Vercel

---

## Variables de entorno en producción

### Backend (Vercel — server)

| Variable | Descripción |
|----------|-------------|
| `DB_HOST` | Host de Railway MySQL |
| `DB_PORT` | Puerto MySQL (por defecto 3306) |
| `DB_USER` | Usuario de la base de datos |
| `DB_PASSWORD` | Contraseña de la base de datos |
| `DB_NAME` | Nombre de la base de datos |
| `JWT_SECRET` | Clave secreta para firmar JWT (mín. 32 chars) |
| `GOOGLE_CLIENT_ID` | Client ID de Google OAuth |
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud de Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |

### Frontend (Vercel — client)

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API (ej: `https://api.vercel.app/api`) |
| `VITE_GOOGLE_CLIENT_ID` | Client ID de Google OAuth |

---

## Despliegue continuo (CI/CD)

Vercel conecta directamente con GitHub y activa el pipeline automáticamente:

- **Cada push a `main`** → Vercel hace build y despliega en producción
- **Cada Pull Request** → Vercel genera una **Preview URL** única para revisar los cambios antes de mergear

No se requiere ningún paso manual adicional para desplegar.

:::caution
Nunca subas el fichero `.env` al repositorio. Está incluido en `.gitignore`. Las variables de entorno se gestionan exclusivamente desde el panel de Vercel.
:::
