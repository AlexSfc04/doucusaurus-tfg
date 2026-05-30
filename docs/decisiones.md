---
id: decisiones
title: Decisiones de diseño
sidebar_position: 9
---

# Decisiones de diseño

Detalles sobre decisiones técnicas relevantes tomadas durante el desarrollo.

---

## 1. Typewriter personalizado sin librería

**Problema:** Las librerías de typewriter existentes fijan un `min-width` al elemento para evitar el colapso del layout, pero esto generaba un hueco visible en pantallas móviles.

**Solución:** Se implementó un hook personalizado con `useState` + `useEffect` que gestiona los estados de escritura, espera y borrado carácter a carácter, sin ningún width fijo. El cursor parpadeante es un simple `|` con animación CSS.

**Resultado:** Comportamiento idéntico a las librerías populares, sin dependencias externas y sin problemas de layout en móvil.

---

## 2. Autenticación Google sin contraseña falsa

**Problema inicial:** Al crear usuarios de Google, se generaba una contraseña aleatoria con `crypto.randomBytes(20)`. Esto causaba que los usuarios de Google aparecieran como "usuarios locales" y podían intentar cambiar contraseña sin tenerla realmente.

**Solución:** Se añadieron los campos `provider` y `google_id` a la tabla `users`, y la columna `password` se hizo nullable. Se creó el método `User.findOrCreateGoogle()` que:
- Busca al usuario por `google_id` primero (no por email) para evitar colisiones
- Si no existe, crea el usuario con `password = NULL` y `provider = 'google'`
- La ruta `/auth/password` verifica `provider` antes de cualquier operación

---

## 3. Imágenes optimizadas con Cloudinary transformaciones

**Problema:** Las imágenes subidas por usuarios o del blog pueden tener tamaños arbitrarios, lo que impacta en el rendimiento.

**Solución:** Se añade el parámetro de transformación `/upload/f_auto,q_auto,w_600/` dinámicamente en el componente `ArticleCard`:
```js
const optimizedUrl = url.replace('/upload/', '/upload/f_auto,q_auto,w_600/')
```

Cloudinary convierte automáticamente a **WebP/AVIF** según el navegador (`f_auto`), reduce la calidad de forma inteligente (`q_auto`) y redimensiona a 600px de ancho máximo.

---

## 4. JWT en lugar de sesiones

Se eligió **JWT stateless** sobre sesiones en servidor porque:
- El backend está desplegado en **Vercel Serverless Functions** (sin estado persistente entre invocaciones)
- Permite escalar sin necesidad de sticky sessions ni almacén de sesiones compartido (Redis, etc.)
- El token contiene `{ id, email, role }` — suficiente para todas las validaciones de acceso

**Trade-off:** No es posible invalidar tokens individuales (logout forzado) sin una blacklist. Se asume que la caducidad de 24h / 7d es suficiente para este proyecto.

---

## 5. Queries directas con mysql2 en lugar de ORM

Se optó por **queries SQL directas** con `mysql2/promise` en lugar de usar un ORM como Prisma o Sequelize porque:
- El esquema de la base de datos es simple y estable
- Permite control total sobre las queries y sus índices
- Reduce dependencias y tiempo de arranque (relevante en Serverless)
- El **connection pool** de mysql2 gestiona eficientemente las conexiones simultáneas

---

## 6. Separación frontend/backend en Vercel

Aunque Vercel permite desplegar Next.js como full-stack, se mantuvo la separación en **dos proyectos distintos en Vercel**:
- Facilita el desarrollo independiente de cada capa
- Permite cambiar el proveedor de backend sin afectar al frontend
- Refleja mejor la arquitectura real cliente/servidor aprendida en el ciclo
