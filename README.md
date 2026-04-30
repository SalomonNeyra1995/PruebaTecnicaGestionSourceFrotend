# Frontend - Gestión de Casas (React + Vite)

Aplicación frontend para la gestión de casas (CRUD) desarrollada con React, Vite, Axios, React-Bootstrap y SweetAlert2. Consume la API REST de backend proporcionada en el repositorio separado.

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (incluido con Node.js)
- Backend de la API ejecutándose localmente en `https://localhost:7137` (ver repositorio backend)

## 🚀 Instalación y ejecución local

Sigue estos pasos:

1. **Clonar el repositorio**
   bash
   git clone https://github.com/SalomonNeyra1995/PruebaTecnicaGestionSourceFrotend.git
  
2. ** Instalar dependencias
npm install


3. ** Configurar la URL de la API
El frontend está configurado para consumir la API en https://localhost:7137/api.
Si tu backend corre en otro puerto, edita el archivo src/services/api.js y cambia la variable baseURL.
const api = axios.create({
  baseURL: 'https://localhost:7137/api',   // <-- ajusta puerto
  headers: { 'Content-Type': 'application/json' }
});

4. ** Ejecutar la aplicación
npm run dev

5. ** Abrir en el navegador
El servidor de desarrollo estará disponible en http://localhost:5173.

 Consumo de la API
La aplicación consume los siguientes endpoints del backend:

Método	Endpoint	Uso en la app
GET	/api/casas	Mostrar listado de casas
GET	/api/casas/{id}	Obtener detalles (edición)
POST	/api/casas	Crear nueva casa
PUT	/api/casas/{id}	Actualizar casa existente
DELETE	/api/casas/{id}	Eliminar casa (borrado lógico)

⚠️ Nota importante: El backend debe estar corriendo localmente y debe tener CORS habilitado para http://localhost:5173. La API está desarrollada en .NET 7 con SQL Server. Asegúrate de ejecutar el script SQL incluido en el repositorio backend para crear la base de datos.

🛠️ Tecnologías utilizadas
React 18 + Vite
Axios (consumo de API)
React-Bootstrap (componentes UI)
SweetAlert2 (alertas y confirmaciones)
React Icons (iconos)
Bootstrap 5 (estilos)

📁 Estructura del proyecto
src/
  ├── components/       # Componentes reutilizables (tabla, modal, filtros)
  ├── hooks/            # Hook personalizado useCasas
  ├── services/         # Configuración de Axios y endpoints
  ├── App.jsx           # Componente principal
  └── main.jsx          # Punto de entrada

  👨‍💻 Autor
Salomón Neyra – Prueba Técnica PruebaTecnicaGestionSourceFrotend
 
