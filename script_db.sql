USE master 
GO  
CREATE DATABASE DBProductosCRUD
GO


USE DBProductosCRUD
GO


CREATE TABLE tb_productos(
	id_producto INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	nombre_producto VARCHAR(100) NOT NULL,
	precio_unitario DECIMAL(18,2) NOT NULL,
	cantidad INT NOT NULL,
	detalle VARCHAR(MAX),
	fecha_registro DATETIME
)
GO


INSERT INTO tb_productos VALUES ('Mascarilla Importada', 4.50, 200 , 'Máscara protectora contra particulas' ,'01-02-2021')
GO
INSERT INTO tb_productos VALUES ('Protector Facial', 6.30, 350 , 'Protector facial con lentes' ,'02-02-2021')
GO
INSERT INTO tb_productos VALUES ('Porta Mascarillas', 9.90, 180 , 'Estuche porta mascarillas antibacteriano' ,GETDATE())
GO














