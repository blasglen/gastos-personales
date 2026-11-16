# Mis Cuentas

App personal de ingresos y gastos, instalable en el celular (PWA). Cada ítem tiene su nombre propio y cada gasto muestra qué porcentaje del ingreso del mes representa.

- **100% local:** los datos se guardan en el celular (`localStorage`). En este repo no hay ningún importe.
- **Backup:** ⚙️ → Exportar / Importar backup (archivo JSON). Conviene exportarlo cada tanto y guardarlo en Drive o iCloud.
- **Funciona sin internet** gracias al service worker (`sw.js`).

## Instalar en el celu

- **iPhone (Safari):** abrir la página → Compartir → *Agregar a inicio*.
- **Android (Chrome):** abrir la página → menú ⋮ → *Instalar app*.

> En iPhone, si borrás el ícono de la app se pueden perder los datos: exportá el backup antes.

## Publicar cambios

1. Subir el número de versión en los tres lugares: `APP_VERSION` en `index.html`, `VERSION` en `sw.js` y `version.json`. La app avisa "Hay una versión nueva" al abrirse.
2. Hacer push a `main`: GitHub Pages publica solo.
