
# E-commerce | NestJS | Microservicios | Docker | Kafka

**Antes de comenzar asegurese de tener instalado Docker Desktop en la maquina donde se ejecutará el proyecto.**

Este proyecto consiste en una API basada en microservicios para gestionar pedidos de un e-commerce. Está desarrollado con NestJS y utiliza PostgreSQL, Prisma, Docker y Kafka para la comunicación entre microservicios.

Para su ejecución se deben configurar las variables de entorno faltantes en los archivos **`.env.example`** de cada microservicio.

Posterior a esto, se deberá cambiar el nombre de los archivos **`.env.example`** a **`.env.prod`**

Por último se deberá abrir una terminal tipo gitbash en la raíz del proyecto y allí ejecutaremos el comando **`./start-prod.sh`**. Este comando desplegará una arquitectura de microservicios en base a contenedores de Docker con los siguientes componentes: 

- API-Gateway: Punto de entrada de nuestra arquitectura, encargado de la autenticación de usuarios y enrutamiento de peticiones.

- MS-Users: Microservicio encargado de la administración de usuarios del sistema.

- MS-Orders: Microservicio encargado de la gestión de ordenes del sistema.

- MS-Notificatios: Microservicio de tipo consumer encargado de procesar los eventos publicados por el Microservicio de órdenes con el fin de mantener a los usuarios notificados vía Email.

- Kafka: Cola de mensajes encargada de permitir la comunicación asíncrona entre el microservicio de órdenes y el microservicio de notificaciones.

- PostgreSQL: Base de datos relacional que persiste la información del sistema y con la cuál interactuan los microservicios. 

En la raíz del proyecto encontrará un archivo **`e-commerce.postman_collection.json`** que deberá importar en postman para usar la API de manera optima y así garantizar que esté funcionando. Al crear una orden se le enviará un correo al email especificado.

Otra manera de comprobar el funcionamiento es ingresar a la url **`http://localhost:3000/api`**, esta lo redireccionará a la documentación de la API. 

Postdata: Para este proyecto se siguió el patrón Shared-database para fines demostrativos y ligereza del proyecto mismo. Sin embargo, en un ambiente productivo lo ideal es tener una base de datos por microservicio para preservar el principio de responsabilidad única y respetar las barreras de pertenecia de datos entre los dominios representados y manejados por los microservicios.
