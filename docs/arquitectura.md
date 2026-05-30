---
id: arquitectura
title: Arquitectura
sidebar_position: 2
---

# Arquitectura de la aplicación

## Modelo cliente/servidor

StudiosWebSites sigue una arquitectura **cliente/servidor con separación completa de frontend y backend**:

```
┌─────────────────────┐        HTTPS / REST API        ┌──────────────────────┐
│                     │ ─────────────────────────────▶ │                      │
│   React SPA         │                                 │   Express.js API     │
│   (Vercel)          │ ◀───────────────────────────── │   (Vercel Serverless)│
│                     │         JSON responses          │                      │
└─────────────────────┘                                 └──────────┬───────────┘
                                                                   │
                                              ┌────────────────────┼───────────────┐
                                              │                    │               │
                                    ┌─────────▼──────┐  ┌─────────▼───────┐  ┌────▼──────────┐
                                    │  MySQL          │  │  Cloudinary CDN │  │  Google OAuth │
                                    │  (Railway)      │  │  (imágenes)     │  │  (autenticación)│
                                    └────────────────┘  └─────────────────┘  └───────────────┘
```

## Separación de responsabilidades

### Frontend (client/)
- **Single Page Application (SPA)** con React 18 y React Router DOM v6
- Gestión de estado global mediante **Context API** (`AuthContext`)
- Llamadas a la API con `fetch` nativo y JWT en cabeceras `Authorization`
- Animaciones con **Framer Motion**
- Iconos con **@carbon/icons-react**

### Backend (server/)
- **API REST** construida con Express.js
- Autenticación stateless con **JWT** (no hay sesiones en servidor)
- Validación de entradas con **express-validator**
- Conexión a MySQL mediante **mysql2/promise** con connection pool
- Subida de archivos a Cloudinary con **multer + cloudinary SDK**

## Servicios externos

| Servicio | Uso | Plan |
|----------|-----|------|
| **Vercel** | Despliegue de frontend y backend | Free |
| **Railway** | Base de datos MySQL | Free tier |
| **Cloudinary** | Almacenamiento y CDN de imágenes | Free tier |
| **Google Cloud** | OAuth 2.0 (inicio de sesión) | Free |

## Flujo de una petición autenticada

```
1. Usuario hace login  →  backend devuelve JWT
2. React guarda JWT en localStorage (AuthContext)
3. Cada petición protegida añade:  Authorization: Bearer <token>
4. Middleware authenticateToken verifica el JWT con JWT_SECRET
5. Si es válido → req.user = payload del token → siguiente middleware
6. Si no es válido → 401 / 403
```

## Lenguajes de programación

| Lenguaje | Uso |
|----------|-----|
| **JavaScript (ES2022+)** | Frontend y backend |
| **JSX** | Componentes React |
| **SQL** | Queries en MySQL |
| **CSS** | Estilos modulares por componente |
| **YAML / JSON** | Configuración y variables de entorno |
