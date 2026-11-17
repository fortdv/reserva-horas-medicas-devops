# Servicio de reserva de horas médicas

Prototipo académico para una institución ficticia del rubro salud. Presenta un
formulario e información de atención. Nginx sirve los
archivos estáticos dentro de un contenedor Docker.

La simulación no realiza reservas, no utiliza API ni base de datos y no envía
ni almacena los valores del formulario. Utilizar exclusivamente datos ficticios.

## Requisitos

- Git y un editor de código.
- Docker Desktop instalado e iniciado, con contenedores Linux.
- Puerto local 8080 disponible y navegador web.
- Internet para descargar la imagen base en la primera construcción.

## Estructura

```text
reserva-horas-medicas/
├── src/
│   ├── index.html
│   ├── styles.css
│   ├── models/reserva-model.js
│   ├── views/reserva-view.js
│   └── controllers/reserva-controller.js
├── docs/
│   ├── 01-diagnostico.md
│   └── 02-ciclo-devops.md
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Instalación y ejecución

Clonar el repositorio o extraer el archivo comprimido y abrir una terminal
en la carpeta que contiene docker-compose.yml. En PowerShell:

```powershell
Copy-Item .env.example .env
docker version
docker compose version
docker compose config
docker compose build
docker compose up -d
docker compose ps
```

Acceder a http://localhost:8080. El puerto se publica solamente en la interfaz
local 127.0.0.1. La variable WEB_PORT permite cambiarlo si estuviera ocupado;
para la evaluación se utiliza 8080.

## Verificación

```powershell
curl.exe -I http://localhost:8080
curl.exe -I http://localhost:8080/styles.css
docker inspect --format '{{.State.Health.Status}}' reserva-horas-web
docker logs --tail 30 reserva-horas-web
docker stats --no-stream reserva-horas-web
```

Comprobar respuesta HTTP 200 para la página y los estilos. En el navegador,
completar la especialidad, fecha y horario con valores de prueba y seleccionar
«Revisar reserva». Debe aparecer un resumen que indica que no existe una
reserva real. La validación de campos ocurre en el navegador.

## Arquitectura MVC

El modelo define las especialidades, modalidades, horarios y reglas de validación.
La vista agrupa index.html, styles.css y reserva-view.js: presenta los campos,
lee la interacción y actualiza el resultado mediante nodos de texto.
El controlador inicializa ambas clases y coordina la validación y presentación.
Se utilizan módulos JavaScript nativos, sin dependencias externas ni servidor de aplicación.
Las fechas anteriores al día actual y los fines de semana no son válidos.
La información permanece transitoriamente en el formulario y no se persiste.

La vista previa de desarrollo usa http://127.0.0.1:8081 y no acredita una
ejecución con Docker. El despliegue solicitado utiliza el puerto 8080.

El healthcheck verifica la respuesta local de Nginx. Un estado saludable no
demuestra disponibilidad clínica ni capacidad bajo carga. Registrar las
métricas junto a las acciones realizadas; una medición aislada no representa
una tendencia de rendimiento.

## Detención y nueva ejecución

```powershell
docker compose stop
docker compose ps -a
docker compose start
```

Para retirar los contenedores y la red de este proyecto:

```powershell
docker compose down
```

## Seguridad

No incorporar credenciales, tokens, archivos de pacientes ni información real.
.env.example contiene únicamente un puerto de ejemplo. .gitignore excluye
configuración local y claves; .dockerignore también evita enviarlas al contexto
de construcción. Revisar git diff --cached antes de cada commit. Ignorar un
archivo no elimina secretos previamente registrados en Git.

Los recursos del sitio son locales y no se cargan fuentes, analítica ni scripts
externos. El formulario carece de atributos name y su envío se cancela en el
navegador. Los logs de Nginx no deben contener datos personales.

## Control de versiones y recuperación

main conserva los cambios integrados. El desarrollo se realiza en
feature/formulario-reserva, con commits separados por propósito. La revisión
debe comprobar HTML, estilos, configuración, seguridad y resultados antes de
fusionar. La revisión individual se identifica como tal.

Para recuperar una entrega, seleccionar su etiqueta o commit, reconstruir la
imagen y ejecutar Docker Compose. La etiqueta nginx:alpine puede actualizarse
en el registro; para reproducibilidad estricta, una mejora posterior consiste
en fijar el digest de la imagen base validada.

## Mejoras propuestas

1. Automatizar construcción y validaciones mediante GitHub Actions.
2. Incorporar pruebas de disponibilidad y del formulario.
3. Conservar métricas periódicas y definir alertas de indisponibilidad.
4. Revisar vulnerabilidades de la imagen y detectar secretos antes de integrar.
5. Probar y documentar la recuperación de una versión anterior.
