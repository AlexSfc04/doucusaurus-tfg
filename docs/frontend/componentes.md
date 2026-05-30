---
id: componentes
title: Componentes principales
sidebar_position: 2
---

# Componentes principales

## Hero

Componente de portada de la página principal con efecto **typewriter personalizado** (sin librería externa).

```jsx
// components/Hero/Hero.jsx
const words = ["Tu negocio", "Tu marca", "Tu empresa", "Tu proyecto"]

const Hero = () => {
  const [index, setIndex]     = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const current = words[index]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <section className="hero">
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <span className="typewriter">{displayed}</span>
        <span className="cursor">|</span>
        <br /> merece una web excepcional
      </motion.h1>
      <a href="/contacto" className="btn-cta">Empieza ahora</a>
    </section>
  )
}
```

**Decisión clave:** Se implementó el typewriter de forma nativa para evitar dependencias externas y controlar exactamente el comportamiento sin `min-width` fijo (que causaba saltos en móvil).

---

## ArticlesGrid

Rejilla de artículos del blog con **filtrado por categoría**.

```jsx
// components/ArticlesGrid/ArticlesGrid.jsx
const CATEGORIES = ['Todos', 'General', 'Noticias', 'Consejos', 'Otros']

const ArticlesGrid = () => {
  const [articles, setArticles]   = useState([])
  const [category, setCategory]   = useState('Todos')

  const filtered = category === 'Todos'
    ? articles
    : articles.filter(a => a.category === category)

  return (
    <>
      <div className="filters">
        {CATEGORIES.map(cat => (
          <button key={cat} className={category === cat ? 'active' : ''} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid">
        {filtered.map(article => <ArticleCard key={article.id} article={article} />)}
      </div>
    </>
  )
}
```

---

## ArticleCard

Tarjeta de artículo con **imagen optimizada por Cloudinary** y excerpt truncado.

```jsx
// components/ArticleCard/ArticleCard.jsx
const ArticleCard = ({ article }) => {
  const optimizedUrl = article.image_url?.replace('/upload/', '/upload/f_auto,q_auto,w_600/')

  return (
    <Link to={`/blog/${article.id}`} className="article-card">
      <img
        src={optimizedUrl}
        alt={article.title}
        loading="lazy"
        decoding="async"
      />
      <span className="badge">{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.excerpt?.slice(0, 120)}...</p>
    </Link>
  )
}
```

---

## Navbar

Barra de navegación con **estado de sesión reactivo** usando `AuthContext`.

- Si no hay usuario autenticado: muestra botones Login / Registrarse
- Si hay usuario autenticado: muestra nombre + avatar + enlace a Perfil
- Si el usuario es `admin`: muestra enlace al Panel de Administración

---

## ProfilePage

Página de perfil dividida en dos secciones:

| Sección | Campos |
|---------|--------|
| **Información** | Nombre, email, país, idioma, zona horaria, notificaciones |
| **Seguridad** | Cambio de contraseña (usuario local) / Establecer contraseña (usuario Google) |

- El badge **"Cuenta de Google"** aparece si `user.provider === 'google'`
- La subida de avatar hace `PUT /auth/avatar` con `multipart/form-data` y actualiza el contexto global en tiempo real
