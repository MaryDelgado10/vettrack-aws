Sistema VetTrack - Registro de Mascotas -- ACCESO AL SISTEMA: http://18.119.255.9:3000/
Sistema web para el registro y listado de mascotas, implementado con arquitectura de 3 capas y desplegado en AWS EC2.

El sistema está implementado con una arquitectura de 3 capas:
Capa de Presentación: Interfaz web HTML/CSS/JavaScript y API REST con Express.
Capa de Aplicación: Lógica de negocio implementada en Node.js.
Capa de Datos: Acceso a datos mediante PostgreSQL.

La infraestructura está desplegada en AWS:
EC2 #1: Servidor de aplicaciones (Node.js + Express)
EC2 #2: Servidor de base de datos (PostgreSQL)
Tecnologías Utilizadas
Backend: Node.js con Express
Base de datos: PostgreSQL
Frontend: HTML, CSS, JavaScript
Infraestructura: AWS EC2, Ubuntu Server 22.04 LTS

El código sigue una arquitectura de 3 capas claramente separadas:
Capa de Presentación
public/index.html: Interfaz de usuario con formulario de registro y tabla de mascotas
Rutas API en app.js: Endpoints REST para interactuar con el sistema

Capa de Aplicación (Lógica de Negocio)
petService en app.js: Contiene la lógica de negocio para registrar y listar mascotas
Validaciones de datos y reglas de negocio

Capa de Datos
petDAO en app.js: Objeto de acceso a datos que interactúa con la base de datos
Consultas SQL para crear, leer, actualizar y eliminar registros
