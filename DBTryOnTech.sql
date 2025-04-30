CREATE DATABASE DBTryOnTech
GO

USE DBTryOnTech
GO

CREATE TABLE [TipoPrenda]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[nombre] VARCHAR(100) NOT NULL,
	[activo] BIT NOT NULL
)
GO

CREATE TABLE [ColorPrenda]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[nombre] VARCHAR(100) NOT NULL,
	[activo] BIT NOT NULL
)
GO

CREATE TABLE [Prenda]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[nombre] VARCHAR(100) NOT NULL,
	[imagen] VARCHAR(MAX) NOT NULL,
	[referencia] VARCHAR(100) NOT NULL,
	[activo] BIT NOT NULL,
	[id_tipo] INT NOT NULL,
	[id_color] INT NOT NULL,
	FOREIGN KEY ([id_tipo]) REFERENCES [TipoPrenda]([id]),
	FOREIGN KEY ([id_color]) REFERENCES [ColorPrenda]([id])
)
GO

CREATE TABLE [Talla]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[nombre] VARCHAR(100) NOT NULL
)
GO

CREATE TABLE [Tallaje]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[hombros_max] FLOAT(24),
	[hombros_min] FLOAT(24),
	[pecho_max] FLOAT(24),
	[pecho_min] FLOAT(24),
	[cintura_max] FLOAT(24),
	[cintura_min] FLOAT(24),
	[cadera_max] FLOAT(24),
	[cadera_min] FLOAT(24),
	[largo_pierna_max] FLOAT(24),
	[largo_pierna_min] FLOAT(24),
	[largo_brazo_max] FLOAT(24),
	[largo_brazo_min] FLOAT(24),
	[cuello] FLOAT(24),
	[id_talla] INT NOT NULL,
	FOREIGN KEY ([id_talla]) REFERENCES [Talla]([id])
)
GO

CREATE TABLE [TallajePrenda]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[sexo] VARCHAR(10) NOT NULL,
	[id_prenda] INT NOT NULL,
	[id_tallaje] INT NOT NULL,
	FOREIGN KEY ([id_prenda]) REFERENCES [Prenda]([id]),
	FOREIGN KEY ([id_tallaje]) REFERENCES [Tallaje]([id])
)
GO

CREATE TABLE [Usuario]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[username] VARCHAR(50) NOT NULL,
	[correo] VARCHAR(50) NOT NULL UNIQUE,
	[password] VARCHAR(50) NOT NULL,
	[telefono] VARCHAR(11) NOT NULL,
	[rol] VARCHAR(50) NOT NULL,
	[estado] BIT NOT NULL,
	[salt] VARCHAR(MAX) NOT NULL
)
GO

CREATE TABLE [Modelo]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[imagen] VARCHAR(MAX) NOT NULL,
	[archivo] VARCHAR(MAX) NOT NULL,
	[tipo_cuerpo] VARCHAR(30) NOT NULL,
	[sexo] VARCHAR(10) NOT NULL
)
GO

INSERT INTO [Modelo] (imagen, archivo, tipo_cuerpo, sexo) VALUES
('Hourglass.png', 'hourglass_model.glb', 'Hourglass', 'Female'),
('RectangleFemale.png', 'rectangle_model_F.glb', 'Rectangle', 'Female'),
('RectangleMale.png', 'modelo_triangle_M.glb', 'Rectangle', 'Male'),
('TriangleMale.png', 'modelo_triangle_M.glb', 'Triangle', 'Male'),
('TriangleFemale.png', 'modelo_triangle_f.glb', 'Triangle', 'Female'),
('InvertedTriangleMale.png', 'modelo_inverted_triangle.glb', 'InvertedTriangle', 'Male'),
('InvertedTriangleFemale.png', 'modelo_inverted_triangle_f.glb', 'InvertedTriangle', 'Female'),
('OvalMale.png', 'modelo_Oval_M.glb', 'Oval', 'Male'),
('OvalFemale.png', 'modelo_Oval_F.glb', 'Oval', 'Female'),
('Trapezoid.png', 'modelo_Trapezoid_.glb', 'Trapezoid', 'Male');


CREATE TABLE [Cliente]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[fecha_nacimiento] DATE NOT NULL,
	[sexo] VARCHAR(10) NOT NULL,
	[id_modelo] INT,
	[id_usuario] INT NOT NULL,
	FOREIGN KEY ([id_usuario]) REFERENCES [Usuario]([id]),
	FOREIGN KEY ([id_modelo]) REFERENCES [Modelo]([id])
)
GO

CREATE TABLE [Review]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[fecha_venta] DATE NOT NULL,
	[fecha_envio] DATE NOT NULL,
	[encuesta_enviada] BIT NOT NULL,
	[id_cliente] INT NOT NULL,
	FOREIGN KEY ([id_cliente]) REFERENCES [Cliente]([id])
)
GO

CREATE TABLE [TallajeCliente]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[hombros] FLOAT(24),
	[pecho] FLOAT(24),
	[cintura] FLOAT(24),
	[cadera] FLOAT(24),
	[largo_pierna] FLOAT(24),
	[cuello] FLOAT(24),
	[largo_brazo] FLOAT(24),
	[peso] FLOAT(24),
	[altura] FLOAT(24),
	[id_cliente] INT NOT NULL,
	FOREIGN KEY ([id_cliente]) REFERENCES [Cliente]([id])
)
GO

CREATE TABLE [Bolsa_Prenda]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[numero_prendas] INT,
	[id_prenda] INT NOT NULL,
	[id_cliente] INT NOT NULL,
	FOREIGN KEY ([id_cliente]) REFERENCES [Cliente]([id]),
	FOREIGN KEY ([id_prenda]) REFERENCES [Prenda]([id])
)
GO

CREATE TABLE [ProbadorPrendas]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[ajuste_pecho] FLOAT(24),
	[ajuste_cintura] FLOAT(24),
	[ajuste_cadera] FLOAT(24),
	[ajuste_largo_pierna] FLOAT(24),
	[ajuste_cuello] FLOAT(24),
	[ajuste_largo_brazo] FLOAT(24),
	[compatibilidad] FLOAT(24),
	[porcentaje_ajuste] FLOAT(24)
)
GO

CREATE TABLE [Recomendacion]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[descripcion] VARCHAR(10) NOT NULL,
	[fecha] DATE NOT NULL,
	[id_talla] INT NOT NULL,
	[id_cliente] INT NOT NULL,
	FOREIGN KEY ([id_talla]) REFERENCES [Talla]([id]),
	FOREIGN KEY ([id_cliente]) REFERENCES [Cliente]([id])
)
GO

CREATE TABLE [Informe]
(
	[id] INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[fecha_reporte] DATE,
	[clientes_mes] INT,
	[total_clientes] INT,
	[porcentaje_talla] VARCHAR(5),
	[total_ventas] INT,
	[numero_devoluciones] INT,
	[calificacion_prom] FLOAT(24)
)
GO