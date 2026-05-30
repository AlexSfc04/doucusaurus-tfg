---
id: github
title: GitHub
sidebar_position: 8
---

# Estrategia de GitHub

## Tipo de repositorio

El proyecto sigue un modelo **monorrepo** — todo el código (frontend, backend y documentación) vive en un único repositorio:

```
AlexSfc04/StudiosWebSites/
├── client/      # Frontend React
├── server/      # Backend Express
└── docs/        # Docusaurus (esta documentación)
```

🔗 [github.com/AlexSfc04/StudiosWebSites](https://github.com/AlexSfc04/StudiosWebSites)

---

## Rama principal

La rama principal es **`main`**, y es la que Vercel despliega automáticamente en producción.

### Estrategia de ramas

| Rama | Propósito |
|------|-----------|
| `main` | Producción — código estable y desplegado |
| `dev` | Desarrollo activo — integración de features |
| `feature/nombre` | Nuevas funcionalidades (ej: `feature/google-auth`) |
| `fix/nombre` | Correcciones de errores (ej: `fix/avatar-upload`) |

### Flujo de integración

```
feature/xxx ──PR──▶ dev ──PR (revisión)──▶ main ──▶ Vercel deploy
```

1. Se trabaja en ramas `feature/` o `fix/`
2. Se abre un **Pull Request** hacia `dev`
3. Se revisa que no hay conflictos
4. Cuando `dev` está estable, se mergea a `main`
5. Vercel detecta el push a `main` y despliega automáticamente

---

## Estructura de commits

Se sigue la convención **Conventional Commits**:

```
<tipo>(<ámbito>): <descripción corta>
```

### Tipos de commit

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Cambios de estilos CSS / formato |
| `refactor` | Refactorización sin cambio de funcionalidad |
| `chore` | Cambios en configuración, deps, etc. |

### Ejemplos

```bash
feat(auth): añadir login con Google OAuth
fix(hero): corregir min-width en typewriter para móvil
docs: añadir documentación de endpoints en Docusaurus
refactor(articles): extraer lógica de filtros a hook personalizado
chore: actualizar dependencias de React a v18.3
style(profile): ajustar espaciado en sección de seguridad
```

---

## .gitignore

Los siguientes ficheros/carpetas están excluidos del repositorio:

```gitignore
# Dependencias
node_modules/

# Variables de entorno
.env
.env.local
.env.production

# Build outputs
dist/
build/
.docusaurus/

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db
```
