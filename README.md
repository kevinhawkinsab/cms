# Bambito Landing — Nuxt 3 SSR

Migración del proyecto original `bambito-landing` (Vue 3 + Vite SPA) a **Nuxt 3** con **Server-Side Rendering** para mejorar SEO técnico, sin romper la funcionalidad existente del CMS y Page Builder.

## 🎯 Resumen de la migración

| Aspecto | Antes (Vue 3 + Vite) | Ahora (Nuxt 3) |
|---|---|---|
| Renderizado | SPA (CSR puro) | **SSR híbrido** (públicas) + SPA (CMS) |
| Routing | `vue-router` manual (`src/router/index.js`) | **File-based routing** (`pages/`) |
| Data fetching | `axios` + `onMounted` | `useAsyncData` + `$fetch` (SSR) |
| Meta tags | `@vueuse/head` | `useSeoMeta` + `useHead` (Nuxt) |
| Sitemap | ❌ | ✅ `@nuxtjs/sitemap` (dinámico) |
| Robots.txt | ❌ | ✅ `@nuxtjs/robots` |
| Structured Data | Manual en `index.html` | JSON-LD reactivo por página (Article, Organization) |

## 🗂️ Rutas

### SSR (públicas, indexables)
- `/` — Home
- `/origen` — Origen
- `/nosotros` — Nosotros
- `/sostenibilidad` — Sostenibilidad
- `/prensa` — Listado de publicaciones (con Page Builder dinámico)
- `/prensa/:slug` — Detalle de artículo (con bloques dinámicos + JSON-LD `Article`)

### SPA (CMS interno, no indexable)
- `/bambito-cms` — Login
- `/bambito-cms/dashboard` — Dashboard CMS
- `/bambito-cms/page-builder` — Editor de bloques

> Configurado en `nuxt.config.ts > routeRules` con `{ ssr: false, robots: false }`.

## 📁 Estructura del proyecto

```
nuxt-app/
├── nuxt.config.ts          # Configuración Nuxt + SSR + sitemap + robots
├── app.vue                 # Root component
├── .env                    # NUXT_PUBLIC_API_BASE, NUXT_PUBLIC_SITE_URL
├── pages/                  # File-based routing
│   ├── index.vue           # /
│   ├── origen.vue
│   ├── nosotros.vue
│   ├── sostenibilidad.vue
│   ├── prensa/
│   │   ├── index.vue       # /prensa  (useAsyncData)
│   │   └── [slug].vue      # /prensa/:slug  (useAsyncData + JSON-LD)
│   └── bambito-cms/        # SPA (ssr: false)
│       ├── index.vue       # login
│       ├── dashboard.vue
│       └── page-builder.vue
├── layouts/
│   ├── default.vue         # Header + Footer + FloatingButtons
│   └── cms.vue             # Layout limpio para CMS
├── components/
│   ├── common/             # AppHeader, AppFooter, FloatingButtons
│   ├── builder/            # PageBuilder + PageRenderer + BlockProperties
│   │   └── blocks/         # 14 tipos de bloques dinámicos
│   └── cms/                # PostsManager, CategoriesManager, MediaManager
├── stores/                 # Pinia (SSR-safe: localStorage envuelto en isClient())
│   ├── auth.js
│   ├── cms.js
│   └── pageBuilder.js
├── composables/
│   └── useSeo.js           # Wrapper sobre useSeoMeta + useHead (JSON-LD)
├── utils/
│   └── normalizers.js      # normalizePost, normalizeCategory, normalizeLayout
├── services/
│   ├── api.js              # axios singleton (cliente CMS)
│   └── notifications.js    # toast + sweetalert2 (lazy-load en cliente)
├── plugins/
│   ├── api.ts              # Inyecta baseURL a axios desde runtimeConfig (universal)
│   ├── bootstrap.client.ts # Bootstrap JS
│   └── ui.client.ts        # Toast + Quill
├── middleware/
│   └── auth.ts             # Protege /bambito-cms/** (cliente)
├── server/
│   └── api/__sitemap__/
│       └── urls.ts         # Sitemap dinámico (incluye artículos del API)
├── assets/css/             # main.css (variables de marca) + style.css
└── public/
    ├── img/, fonts/        # Assets copiados del proyecto original
    ├── favicon.svg
    └── icons.svg
```

## 🔧 Variables de entorno (`.env`)

```bash
# URL del API vista por el navegador del cliente
# En DEV: usar "/api" para pasar por el dev proxy de Nitro y evitar:
#   - CORS (mismo origen)
#   - Cert self-signed de ASP.NET (https://localhost:6001)
# En PROD: pon la URL pública del backend (ej. https://api.bambitospringwater.com)
NUXT_PUBLIC_API_BASE=/api

# URL del API usada por SSR (Node) — directa al backend
# En DEV: tu API local (https://localhost:6001/api)
NUXT_API_BASE_INTERNAL=https://localhost:6001/api

# URL pública del sitio (canonical, og:url, sitemap)
NUXT_PUBLIC_SITE_URL=https://www.bambitospringwater.com

# Permitir cert self-signed en SSR — SOLO PARA DEV (quitar en prod)
NODE_TLS_REJECT_UNAUTHORIZED=0
```

> **Importante**: En producción cambia `NUXT_PUBLIC_API_BASE` a la URL pública del API (no uses `/api`), o configura un reverse proxy (nginx/Caddy) que mapee `/api/**` al backend para mantener mismo origen.

## 🔌 Cómo se consume el API (sin CORS, sin problemas de HTTPS)

### En desarrollo (dev proxy)
```
Browser ──fetch /api/CMS/login──> Nuxt (3000) ──proxy──> https://localhost:6001/api/CMS/login
                                              (secure: false, ignora cert self-signed)
```
Configurado en `nuxt.config.ts > nitro.devProxy['/api']`. Todas las peticiones del cliente
viajan por el mismo origen (`localhost:3000`) → no hay CORS, no hay errores de cert.

### En SSR (server-side fetch)
Las páginas SSR usan `useApiBase()` que devuelve `apiBaseInternal` (URL absoluta) cuando
están corriendo en el server Node, evitando el devProxy (que es solo para clientes HTTP).

### En producción
Reemplaza `NUXT_PUBLIC_API_BASE` con la URL pública del API (con HTTPS válido), o
configura un reverse proxy delante de Nuxt para mapear `/api/**` → backend.

## 🚀 Comandos

```bash
yarn install --ignore-engines   # Instalar dependencias
yarn dev                        # Servidor de desarrollo (puerto 3000)
yarn build                      # Build de producción (SSR Node)
yarn start                      # Servir build de producción
yarn generate                   # Generar SSG (no recomendado por contenido dinámico)
```

## 🧠 Decisiones técnicas

### 1. SSR para SEO
- Las rutas públicas usan `useAsyncData` + `$fetch` con `baseURL` desde `runtimeConfig`.
- El HTML inicial incluye contenido renderizado en servidor → mejor LCP, indexación inmediata.
- El estado se hidrata al cliente sin re-fetch (gracias a la deduplicación de `useAsyncData`).

### 2. SPA para CMS
- `routeRules` desactiva SSR para `/bambito-cms/**`.
- Las stores Pinia siguen usando `localStorage` (envuelto en `isClient()` para evitar errores de SSR).
- El middleware `auth` redirige a login si no hay sesión.

### 3. Page Builder SSR-friendly
- `PageRenderer.vue` usa `<component :is="..." />` con un mapa estático de bloques.
- Todos los blocks renderizan correctamente en servidor (no usan `window`/`document` en el render path).
- `PostTags.vue` y otros que usan `window.location.origin` están guardados con `typeof window === 'undefined'`.

### 4. SEO completo
- **Title + meta description**: dinámicos por página vía `useSeoMeta`.
- **Open Graph + Twitter Cards**: en cada `useSeo()` call.
- **Canonical**: automático por ruta.
- **JSON-LD**:
  - `Organization` en `/`
  - `Article` en `/prensa/:slug` con `headline`, `image`, `datePublished`, `author`, `publisher`.
- **Sitemap**: `/sitemap.xml` se genera dinámicamente con las rutas estáticas + artículos visibles del API.
- **Robots.txt**: `/robots.txt` con `Disallow: /bambito-cms`.

### 5. Performance
- `loading="lazy"` + `decoding="async"` en imágenes de listados.
- `compressPublicAssets: true` en Nitro.
- CSS unificado por Vite/Nuxt.
- Plugins de UI (Toast, Quill, Bootstrap JS) cargados sólo en cliente.

## 🔌 Consumo del API

- **Públicas (SSR)**: `$fetch('/Endpoint', { baseURL: useApiBase() })` — usa `apiBaseInternal` en server (URL directa al backend, ignora cert self-signed con `NODE_TLS_REJECT_UNAUTHORIZED=0`).
- **CMS (SPA)**: axios singleton con `baseURL` = `/api`, todas las requests pasan por el **dev proxy de Nitro** que reenvía a `https://localhost:6001/api` (`secure: false` para cert self-signed). Resultado: **sin CORS, sin problemas de cert**.
- **Endpoints respetados sin modificar**: `/CMS/login`, `/GetPosts_CMS/posts`, `/GetPostBySlug_CMS/slug/:slug`, `/GetCategories_CMS/categories`, `/GetPageLayout_CMS/:routeKey`, etc. (ver `services/api.js`).

## ⚠️ Notas de SSR

- **localStorage / window**: sólo se acceden tras `import.meta.client` o en lifecycle hooks (`onMounted`).
- **JWT**: se lee de `localStorage` solo en cliente; las requests SSR a endpoints públicos (`/GetPosts_CMS/...`) no requieren auth.
- **Hidratación**: el SSR y el cliente usan el mismo `useAsyncData` key → no hay mismatch.
- **API local (`localhost:6001`)**: en SSR el server (Node) hace fetch al API; si el API y el server Nuxt corren en la misma máquina funcionará. En producción, configura `NUXT_PUBLIC_API_BASE` con la URL pública.

## ✅ Checklist de la migración (todo cubierto)

- [x] SSR sólo en rutas públicas
- [x] CMS sigue como SPA (incluyendo Pinia + JWT + cookies)
- [x] Routing basado en archivos (`pages/`)
- [x] `useFetch`/`useAsyncData` para data en SSR
- [x] Consumo del API existente sin modificar endpoints
- [x] Meta tags dinámicos (title, description) por página
- [x] Open Graph + Twitter Cards
- [x] JSON-LD `Organization` (home) y `Article` (artículos)
- [x] Sitemap dinámico (incluye artículos)
- [x] robots.txt con `Disallow: /bambito-cms`
- [x] URLs limpias con slug (`/prensa/:slug`)
- [x] Page Builder funcional en SSR (`<component :is>`)
- [x] Sin uso de `window`/`document`/`localStorage` en el render path SSR
- [x] Diseño y estilos preservados (Bootstrap + CSS original)
- [x] Lazy loading de imágenes
- [x] Sin hydration mismatches
