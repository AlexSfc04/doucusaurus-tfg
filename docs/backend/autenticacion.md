---
id: autenticacion
title: Autenticación y Seguridad
sidebar_position: 2
---

# Autenticación y Seguridad

## Mecanismos de autenticación

StudiosWebSites implementa **dos métodos de autenticación**:

### 1. Autenticación local (JWT)

```
Usuario → POST /auth/login → bcrypt.compare(password, hash) → JWT firmado → localStorage
```

- Las contraseñas se almacenan **hasheadas con bcrypt** (salt rounds: 10)
- Al hacer login exitoso, el servidor devuelve un **JWT** firmado con `JWT_SECRET`
- El token tiene una **caducidad de 24h** (login) o **7 días** (registro y Google)
- El cliente guarda el token en `localStorage` y lo envía en cada petición como:
  ```http
  Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
  ```

### 2. Google OAuth 2.0

```
Cliente → GoogleSignIn → idToken → POST /auth/google-login
→ googleClient.verifyIdToken() → findOrCreateGoogle() → JWT propio
```

- El frontend obtiene un `idToken` de Google mediante la librería oficial
- El backend lo verifica con `google-auth-library` (`OAuth2Client.verifyIdToken`)
- Si el email ya existe en la base de datos → se vincula la cuenta
- Si no existe → se crea un usuario nuevo con `provider = 'google'` y sin contraseña
- Se devuelve un **JWT propio** (no se usa el token de Google en las siguientes peticiones)

## Middleware de autenticación

```js
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' })
    req.user = user   // { id, email, role }
    next()
  })
}
```

Este middleware se aplica a todas las rutas protegidas añadiéndolo como parámetro:
```js
router.get('/profile', authenticateToken, async (req, res) => { ... })
```

## Sistema de roles

| Rol | Acceso |
|-----|--------|
| `user` | Perfil, configuración, lectura de contenidos |
| `admin` | Todo lo anterior + CRUD de artículos + mensajes de contacto |

El rol se incluye en el payload del JWT:
```json
{ "id": 1, "email": "admin@web.com", "role": "admin" }
```

## Seguridad en cambio de contraseña

- Los usuarios con `provider = 'google'` no tienen contraseña inicial
- Si intentan cambiar contraseña sin tener una, la ruta devuelve `400`
- Si sí tienen contraseña, se valida la contraseña actual antes de permitir el cambio
- La nueva contraseña debe tener **mínimo 8 caracteres**
- Se guarda hasheada con `bcrypt.hash(newPassword, 10)`

## Validaciones de entrada

Se usa `express-validator` en todas las rutas públicas:

```js
body('email').isEmail().withMessage('Email inválido'),
body('password').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
body('name').notEmpty().withMessage('El nombre es requerido'),
```

Los errores se devuelven como array en la respuesta `400`:
```json
{
  "errors": [
    { "msg": "Email inválido", "path": "email" }
  ]
}
```
