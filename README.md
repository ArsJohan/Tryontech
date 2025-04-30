# 👕 TryOnTech - Smart Sizing Plugin

TryOnTech es un plug-in de recomendación de tallas que se integra en tiendas de e-commerce, permitiendo a los usuarios ingresar sus medidas corporales y obtener un modelo 3D personalizado con una talla sugerida. Además, el sistema analiza zonas de ajuste y proporciona retroalimentación visual al cliente para reducir devoluciones y mejorar la experiencia de compra.

---

## 📌 Características principales

- ✨ Asignación inteligente de tipo de cuerpos según las tallas ingresadas.
- 🧍 Visualización de imagen modelo 3D según el tipo de cuerpo.
- 👗 Simulación y compatibilidad con prendas seleccionadas.
- 🏗️ Arquitectura limpia con patrones de diseño (Factory Method).

---

## 📐 Arquitectura del Proyecto

### 🔧 Backend (C# .NET 8 + Entity Framework Core)
- Arquitectura en capas (Controllers, Services, Factories, DTOs)
- Patrón **Factory Method** para asignación dinámica de modelos según el sexo.
- Exposición de APIs REST con CORS habilitado
- Persistencia en SQL Server (`DBTryOnTech`)
- Carpeta `wwwroot` para imágenes y modelos 3D estáticos

### 💻 Frontend (React + Vite)
- SPA moderna usando React Hooks y modularización de componentes
- Navegación con React Router DOM
- Axios para consumir API REST
- Validaciones de formularios y control de estado
- Estilizado con CSS modular y responsive
- Imágenes y vistas integradas según tipo de cuerpo

---

## 🛠 Tecnologías utilizadas

| Tecnología | Función |
|-----------|---------|
| **C# .NET 8** | Lógica de negocio y API REST |
| **Entity Framework Core** | ORM para SQL Server |
| **React + Vite** | SPA Frontend |
| **Axios** | Cliente HTTP para consumir API |
| **SQL Server** | Base de datos relacional |
| **Factory Method** | Patrones de diseño |
| **wwwroot** | Hosting de imágenes de modelos 3D |

---

## 📁 Estructura del proyecto

### 📂 Backend
````
TryontechWebAPI/
├── Program.cs
├── appsettings.json
│
├── Controllers/
│   ├── ModeloController.cs
│   ├── ProfileController.cs
│   └── ...
│
├── Models/
│   ├── Usuario.cs
│   ├── Cliente.cs
│   ├── Modelo.cs
│   ├── AsignarModeloRequest.cs
│   ├── AsignarModeloResponse.cs
│   └── ...
│
├── Clases/
│   ├── clsCliente.cs
│   ├── clsModelo.cs
│   └── ...
│
├── Factories/
│   ├── IModeloFactory.cs
│   ├── ModeloFactoryFemale.cs
│   └── ModeloFactoryMale.cs
│
├── wwwroot/
│   └── uploads/
│       └── modelos/
│           ├── hourglass.png
│           ├── triangle.png
│           └── ...

````

### 📂 Frontend
````
/client
│
├── index.html
├── package.json
├── vite.config.js
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── routes/
    |	└── AppRouter.jsx
    │
    ├── components/
    │   ├── Card.jsx
    │   ├── Button.jsx
    │   └── Footer.jsx
    |	└── ...
    │
    ├── pages/
    │   ├── Login.jsx
    │   └── ...
    │
    ├── services/
    │   └── userApi.js
    |	└── ...
    │
    ├── context/
    │   └── AuthContext.jsx
    │
    └── assets/
        ├── styles/
        └── images/
````

## Contribuidores 🫂
<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/ArsJohan">
                    <img src="https://avatars.githubusercontent.com/u/133719384?v=4" width="100;" alt="ArsJohan"/>
                    <br />
                    <sub><b>Johan Esteban Arias Arboleda</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/M4nu0113">
                    <img src="https://avatars.githubusercontent.com/u/138742359?v=4" width="100;" alt="M4nu0113"/>
                    <br />
                    <sub><b>Manuela Estrada</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/Santi-31">
                    <img src="https://avatars.githubusercontent.com/u/169496111?v=4" width="100;" alt="Santi-31"/>
                    <br />
                    <sub><b>Santi-31</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/jcamilo06">
                    <img src="https://avatars.githubusercontent.com/u/168985090?v=4" width="100;" alt="jcamilo06"/>
                    <br />
                    <sub><b>jcamilo06</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->
