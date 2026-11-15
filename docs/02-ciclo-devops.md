# Ciclo DevOps del proyecto

| Fase | Acción | Evidencia prevista |
| --- | --- | --- |
| Plan | Definir alcance y criterios | Diagnóstico y plan versionados |
| Code | Crear HTML, CSS y configuración | Rama y commits descriptivos |
| Build | Construir la imagen Nginx | Dockerfile y salida de construcción |
| Test | Comprobar carga y simulación | Navegador y resultados de pruebas |
| Release | Revisar e identificar versión | Pull request y etiqueta v1.0.0 |
| Deploy | Ejecutar Docker Compose | Contenedor y puerto 8080 |
| Operate | Verificar inicio y detención | Estado en Docker Desktop |
| Monitor | Consultar logs y recursos | Registros y medición de CPU/memoria |

## Organización del trabajo
Kanban: Pendiente → En desarrollo → En revisión → Terminado.
Una tarea de desarrollo activa. Una tarea termina al ser probada y documentada.

## Control de versiones
main conserva la versión integrada. Cada cambio se desarrolla en una rama breve.
Los commits describen cambios concretos. El pull request reúne el objetivo,
la revisión y las pruebas antes de fusionar hacia main.

## Secuencia prevista
1. Registrar diagnóstico y planificación.
2. Crear el formulario y su presentación visual.
3. Incorporar configuración Docker y medidas de seguridad.
4. Revisar los cambios y comprobar la ejecución local.
5. Integrar la versión y conservar evidencias por actividad.
6. Analizar resultados y proponer mejoras.
