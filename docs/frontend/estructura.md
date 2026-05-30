---
id: estructura
title: Estructura del proyecto
sidebar_position: 1
---

# Estructura del proyecto Frontend

El frontend está construido con **React 18 + Vite** como herramienta de build.

## Árbol de directorios

```
client/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/             # Imágenes y recursos estáticos
│   ├── components/         # Componentes reutilizables
│   │   ├── Hero/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── ArticleCard/
│   │   ├── ArticlesGrid/
│   │   ├── ContactForm/
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.jsx  # Estado global de autenticación
│   ├── pages/              # Páginas (rutas de React Router)
│   │   ├── Home.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Contact.jsx
│   │   └── Admin/
│   │       └── Dashboard.jsx
│   ├── services/           # Llamadas a la API
│   │   └── api.js
│   ├── App.jsx             # Rutas principales
│   ├── main.jsx            # Punto de entrada
│   └── index.css
├── vite.config.js
└── package.json
```

## Configuración de rutas (React Router v6)

```jsx
// App.jsx
<Routes>
  <Route path="/"           element={<Home />} />
  <Route path="/blog"       element={<Blog />} />
  <Route path="/blog/:id"   element={<BlogDetail />} />
  <Route path="/contacto"   element={<Contact />} />
  <Route path="/login"      element={<Login />} />
  <Route path="/register"   element={<Register />} />
  <Route path="/profile"    element={<PrivateRoute><Profile /></PrivateRoute>} />
  <Route path="/admin"      element={<AdminRoute><Dashboard /></AdminRoute>} />
</Routes>
```

## AuthContext — Estado global

```jsx
// context/AuthContext.jsx
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  const login = (userData, jwt) => {
    setUser(userData)
    setToken(jwt)
    localStorage.setItem('token', jwt)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| `react` | ^18.0 | Core |
| `react-dom` | ^18.0 | Renderizado |
| `react-router-dom` | ^6.0 | Navegación SPA |
| `framer-motion` | ^11.0 | Animaciones |
| `@carbon/icons-react` | ^11.0 | Iconos |
| `@react-oauth/google` | ^0.12 | Google Sign-In |
| `vite` | ^5.0 | Build tool |
