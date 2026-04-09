# Mundo Equidad - Backend

API REST para la plataforma Mundo Equidad, construida con Node.js, Express y MongoDB.

## Requisitos

- Node.js 16+
- MongoDB 4.4+
- npm o yarn

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mundoequidad
JWT_SECRET=tu_clave_secreta_super_privada_cambiar_en_produccion
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Ejecución

### Desarrollo (con nodemon)
```bash
npm run dev
```

### Producción
```bash
npm start
```

## Rutas API

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Login de usuario
- `GET /api/auth/me` - Obtener datos del usuario autenticado (requiere token)

### Usuarios
- `GET /api/users/:id` - Obtener datos del usuario (requiere token)
- `PUT /api/users/:id` - Actualizar usuario (requiere token)

### Cursos
- `GET /api/courses` - Listar todos los cursos
- `GET /api/courses/:id` - Obtener detalles del curso
- `POST /api/courses` - Crear curso (solo empresa, requiere token)

### Vacantes
- `GET /api/vacancies` - Listar vacantes activas
- `GET /api/vacancies/:id` - Obtener detalles de vacante
- `POST /api/vacancies` - Crear vacante (solo empresa, requiere token)
- `PUT /api/vacancies/:id` - Actualizar vacante (dueño, requiere token)

### Aplicaciones
- `POST /api/applications` - Crear aplicación (solo persona, requiere token)
- `GET /api/applications` - Listar aplicaciones del usuario (solo persona, requiere token)
- `GET /api/applications/vacancy/:vacancyId` - Listar aplicaciones de una vacante (solo empresa, requiere token)

### CV
- `GET /api/cv` - Obtener CV del usuario (solo persona, requiere token)
- `POST /api/cv` - Crear/actualizar CV (solo persona, requiere token)
- `POST /api/cv/upload` - Subir PDF de CV (solo persona, requiere token)

## Autenticación

La autenticación usa JWT. Incluye el token en el header `Authorization`:

```
Authorization: Bearer <token>
```

## Estructura de Carpetas

```
src/
├── config/          # Configuración de MongoDB
├── controllers/     # Lógica de negocio de cada módulo
├── middlewares/     # Middlewares personalizados
├── models/          # Esquemas Mongoose
├── routes/          # Definición de rutas
├── uploads/         # PDFs subidos
├── utils/           # Funciones de utilidad
└── app.js           # Configuración de Express
```

## Modelos

### User
- username (único)
- email (único)
- password (encriptado)
- role (persona o empresa)
- timestamps

### CV
- userId (referencia a User)
- personalData
- laboralProfile
- education
- references
- pdfUrl

### Course
- title
- description
- imageUrl
- externalLink
- timestamps

### Vacancy
- empresaId (referencia a User)
- position
- description
- requirements
- location
- isActive
- timestamps

### Application
- vacancyId (referencia a Vacancy)
- personaId (referencia a User)
- personalData
- cvSource
- cvUrl
- timestamps
