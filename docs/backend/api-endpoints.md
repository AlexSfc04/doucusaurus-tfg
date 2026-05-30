---
id: api-endpoints
title: Endpoints de la API
sidebar_position: 1
---

# Endpoints de la API REST

La API base se encuentra en `https://studioswebsites-api.vercel.app/api`.

## Autenticación (`/api/auth`)

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Registro con email y contraseña |
| `POST` | `/auth/login` | ❌ | Login con email y contraseña |
| `POST` | `/auth/google-login` | ❌ | Login con Google OAuth |
| `GET` | `/auth/profile` | ✅ JWT | Obtener perfil del usuario autenticado |
| `PUT` | `/auth/profile` | ✅ JWT | Actualizar datos del perfil |
| `PUT` | `/auth/password` | ✅ JWT | Cambiar contraseña |
| `PUT` | `/auth/avatar` | ✅ JWT | Subir avatar a Cloudinary |
| `GET` | `/auth/verify` | ✅ JWT | Verificar validez del token |

### `POST /auth/register`
```json
// Request body
{
  "email": "usuario@ejemplo.com",
  "password": "mipassword123",
  "name": "Nombre Usuario"
}

// Response 201
{
  "message": "Usuario registrado correctamente",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "name": "Nombre Usuario",
    "role": "user",
    "avatar": null
  }
}
```

### `POST /auth/login`
```json
// Request body
{
  "email": "usuario@ejemplo.com",
  "password": "mipassword123"
}

// Response 200
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "name": "Nombre Usuario",
    "role": "user",
    "avatar": "https://res.cloudinary.com/..."
  }
}
```

### `POST /auth/google-login`
```json
// Request body
{ "idToken": "token_de_google_oauth" }

// Response 200
{
  "message": "Inicio de sesión con Google exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 2,
    "email": "usuario@gmail.com",
    "name": "Usuario Google",
    "role": "user",
    "avatar": "https://lh3.googleusercontent.com/...",
    "provider": "google"
  }
}
```

### `GET /auth/profile`
```http
Authorization: Bearer <token>
```
```json
// Response 200
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "name": "Nombre",
  "role": "user",
  "country": "ES",
  "language": "es",
  "timezone": "Europe/Madrid",
  "emailNotifications": true,
  "avatar": null,
  "provider": "local"
}
```

## Artículos / Blog (`/api/articles`)

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `GET` | `/articles` | ❌ | Listar todos los artículos |
| `GET` | `/articles/:id` | ❌ | Obtener artículo por ID |
| `POST` | `/articles` | ✅ Admin | Crear artículo |
| `PUT` | `/articles/:id` | ✅ Admin | Editar artículo |
| `DELETE` | `/articles/:id` | ✅ Admin | Eliminar artículo |

### `GET /articles`
```json
// Response 200
[
  {
    "id": 1,
    "title": "Cómo crear una API REST con Express",
    "excerpt": "Aprende a construir una API REST...",
    "category": "Tutoriales",
    "image_url": "https://res.cloudinary.com/...",
    "created_at": "2026-03-15T10:30:00.000Z"
  }
]
```

## Contacto (`/api/contact`)

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `POST` | `/contact` | ❌ | Enviar mensaje de contacto |
| `GET` | `/contact` | ✅ Admin | Listar mensajes (admin) |

### Códigos de error comunes

| Código | Significado |
|--------|-------------|
| `400` | Datos de entrada inválidos |
| `401` | Token no proporcionado |
| `403` | Token inválido o permisos insuficientes |
| `404` | Recurso no encontrado |
| `500` | Error interno del servidor |
