---
id: local
title: Lanzamiento en local
sidebar_position: 6
---

# Lanzamiento en local

Instrucciones para ejecutar StudiosWebSites en tu máquina de desarrollo.

## Requisitos previos

| Herramienta | Versión mínima | Descarga |
|-------------|---------------|----------|
| **Node.js** | 18.0 LTS | [nodejs.org](https://nodejs.org) |
| **npm** | 9.0 | Incluido con Node |
| **MySQL** | 8.0 | [mysql.com](https://dev.mysql.com/downloads/) |
| **Git** | Cualquiera | [git-scm.com](https://git-scm.com) |

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/AlexSfc04/StudiosWebSites.git
cd StudiosWebSites
```

---

## 2. Configurar la base de datos MySQL

```sql
CREATE DATABASE studioswebsites;
USE studioswebsites;

CREATE TABLE users (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  email               VARCHAR(255) UNIQUE NOT NULL,
  password            VARCHAR(255) NULL,
  name                VARCHAR(255) NOT NULL,
  role                ENUM('user','admin') DEFAULT 'user',
  avatar              TEXT NULL,
  provider            VARCHAR(50) DEFAULT 'local',
  google_id           VARCHAR(255) NULL,
  country             VARCHAR(10) NULL,
  language            VARCHAR(10) DEFAULT 'es',
  timezone            VARCHAR(100) DEFAULT 'Europe/Madrid',
  email_notifications BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE articles (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  content     TEXT NOT NULL,
  excerpt     VARCHAR(500) NULL,
  category    VARCHAR(100) DEFAULT 'General',
  image_url   TEXT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  subject    VARCHAR(255) NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Obtener API Keys necesarias

### Cloudinary
1. Crea una cuenta gratuita en [cloudinary.com](https://cloudinary.com)
2. Ve a **Dashboard** → copia `Cloud Name`, `API Key` y `API Secret`

### Google OAuth
1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Crea un proyecto nuevo
3. Ve a **APIs y servicios → Credenciales → Crear credenciales → ID de cliente OAuth**
4. Tipo: **Aplicación web**
5. Añade en orígenes autorizados: `http://localhost:5173`
6. Copia el **Client ID**

---

## 4. Variables de entorno del Backend

Crea el fichero `server/.env`:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=studioswebsites

# JWT
JWT_SECRET=una_cadena_secreta_muy_larga_y_aleatoria

# Google OAuth
GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Servidor
PORT=3000
```

## 5. Variables de entorno del Frontend

Crea el fichero `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=tu_google_client_id.apps.googleusercontent.com
```

---

## 6. Instalar dependencias y arrancar

```bash
# Backend
cd server
npm install
npm run dev    # Arranca en http://localhost:3000

# Frontend (en otra terminal)
cd client
npm install
npm run dev    # Arranca en http://localhost:5173
```

La aplicación estará disponible en **http://localhost:5173**

---

:::tip
Puedes crear el primer usuario admin directamente en la base de datos:
```sql
UPDATE users SET role = 'admin' WHERE email = 'tu@email.com';
```
:::
