# Diagnóstico del servicio de reserva de horas médicas

## Situación inicial
La empresa entrega cambios cada dos semanas, pero operaciones copia archivos,
configura variables y reinicia servicios manualmente. Las diferencias entre
desarrollo y pruebas generan fallas de dependencias, rutas y puertos.

## Limitaciones y respuesta propuesta
1. Trabajo aislado: definir criterios compartidos de desarrollo y operación.
2. Instalación manual: construir con Dockerfile y ejecutar con Docker Compose.
3. Entornos diferentes: usar una imagen de Nginx y puertos documentados.
4. Trazabilidad insuficiente: registrar commits, ramas, revisiones y versiones.
5. Detección tardía: verificar el sitio, revisar logs y medir CPU y memoria.

## Alcance acordado
Página estática con formulario demostrativo, información de atención y estado
informativo. Ejecución local en http://localhost:8080. Sin API, base de datos,
credenciales ni datos personales reales. El formulario no envía información.

## Criterios de aceptación
- La página y los estilos se visualizan correctamente.
- La configuración permite construir y ejecutar el contenedor de Nginx.
- El historial permite identificar el propósito y alcance de cada cambio.
- Las evidencias distinguen resultados comprobados de propuestas de mejora.
