# Guía de Conexión de Recursos Visuales con Google Drive

Esta guía explica cómo sincronizar automáticamente las imágenes y recursos de tu sitio web desde una carpeta de Google Drive, para que **cualquier cambio o nueva foto que subas a Drive se refleje inmediatamente en el sitio web sin tener que modificar código ni volver a compilar**.

---

## 1. Estructura de Carpetas en Google Drive

Crea una carpeta principal en tu Google Drive (por ejemplo, llamada `WebA-R_Assets`) y organízala de la siguiente manera:

```text
📁 WebA-R_Assets/                      <-- (Carpeta principal, compartir con "Cualquier persona con el enlace")
│
├── 📁 Remodelaciones/                 <-- Galería de Bento Grid y Modales
│   ├── 📁 Cocinas/                    <-- Subcarpeta por categoría
│   │   ├── portada.jpg                <-- Foto principal de la tarjeta
│   │   ├── cocina_1.jpg
│   │   └── cocina_2.jpg
│   ├── 📁 Muebles/
│   │   ├── mueble_1.jpg
│   │   └── mueble_2.jpg
│   └── 📁 Exteriores/
│       ├── terraza.jpg
│       └── jardin.mp4
│
├── 📁 Antes_y_Despues/                <-- Comparador interactivo (slider)
│   ├── 📁 01_Cocina_Abierta/          <-- Carpeta por proyecto
│   │   ├── antes.jpg                  <-- Foto antes (debe contener la palabra "antes")
│   │   └── despues.jpg                <-- Foto después (debe contener la palabra "despues")
│   └── 📁 02_Mobiliario/
│       ├── antes.jpg
│       └── despues.jpg
│
├── 📁 Banner/                         <-- Imagen principal de la cabecera
│   └── banner.jpg
│
└── 📁 Equipo/                         <-- Fotos de la sección Sobre Nosotros
    ├── team.jpg                       <-- Debe contener "team" o "equipo"
    ├── david.jpg                      <-- Debe contener "david"
    └── jessica.jpg                    <-- Debe contener "jessica"
```

> **Consejo sobre descripciones**: En Google Drive, puedes hacer clic derecho en cualquier subcarpeta (ej. `Cocinas` o `01_Cocina_Abierta`) > **Información del archivo** > **Detalles** > y agregar una descripción. ¡El sitio web la usará automáticamente como el texto descriptivo!

---

## 2. Permisos en Google Drive (¡Paso Fundamental!)

1. Haz clic derecho en la carpeta principal `WebA-R_Assets`.
2. Selecciona **Compartir** > **Compartir**.
3. En *Acceso general*, cambia a **Cualquier persona con el enlace** (Lector).
4. Copia el **ID de la carpeta** desde la URL de tu navegador:
   - Si la URL es: `https://drive.google.com/drive/folders/1A2B3C4D5E6F7G8H9I0`
   - Tu ID es: `1A2B3C4D5E6F7G8H9I0`

---

## 3. Desplegar el Web App en Google Apps Script (2 minutos, Gratis)

Google Apps Script actúa como una API gratuita y sin límites de cuotas problemáticas, convirtiendo los archivos de tu Drive en un endpoint JSON con URLs directas de Google CDN:

1. Ve a [script.google.com](https://script.google.com) e inicia sesión con tu cuenta de Google.
2. Haz clic en **Nuevo proyecto**.
3. Nómbralo arriba a la izquierda como: `WebAR-Drive-API`.
4. Borra el código por defecto y copia y pega todo el contenido de [`google-drive/GoogleAppsScript.js`](./GoogleAppsScript.js).
5. En la línea 27, reemplaza `"COLOCA_AQUI_EL_ID_DE_TU_CARPETA_DE_DRIVE"` por el ID de tu carpeta copiado en el paso 2.
6. Haz clic en **Implementar** (Deploy, botón azul arriba a la derecha) > **Nueva implementación**.
7. En la rueda de engranaje (⚙️) selecciona **Aplicación web**.
8. Configura los siguientes campos:
   - **Descripción**: `API WebAR`
   - **Ejecutar como**: `Yo (tu correo)`
   - **Quién tiene acceso**: `Cualquiera` (Anyone) *(Muy importante para que el sitio web pueda consultar las fotos sin iniciar sesión)*.
9. Haz clic en **Implementar**.
10. Te pedirá autorizar permisos la primera vez:
    - Haz clic en *Revisar permisos* > Elige tu cuenta > *Configuración avanzada* (Advanced) > *Ir a WebAR-Drive-API (no seguro)* > *Permitir*.
11. Al finalizar, copia la **URL de la aplicación web** generada:
    - Ejemplo: `https://script.google.com/macros/s/AKfycby.../exec`

---

## 4. Configurar tu Proyecto React en Local y en Producción

1. En la raíz de tu proyecto `WebA-R`, crea o edita tu archivo `.env`:
   ```bash
   VITE_DRIVE_API_URL=https://script.google.com/macros/s/AKfycby.../exec
   ```
2. Si tienes el sitio desplegado en **Vercel**, **Netlify** o **Render**:
   - Ve a los ajustes del proyecto > **Environment Variables** (Variables de entorno).
   - Agrega la variable con la misma clave:
     - Nombre: `VITE_DRIVE_API_URL`
     - Valor: Tu URL de Google Apps Script.

---

## 5. ¿Cómo funciona en el código?

- **Carga instantánea y Resiliencia**: El componente React carga inicialmente con los recursos locales por defecto. En segundo plano, consulta la API de Drive y actualiza las galerías al instante.
- **Caché Inteligente**: Para que tu sitio vuele y no espere a Google Apps Script en cada recarga de página, guarda los datos en `localStorage` durante 5 minutos.
- **CDNs de Google**: Las URLs se convierten automáticamente a formato `https://lh3.googleusercontent.com/d/{ID}`, que es la CDN global de Google para entrega rápida de imágenes.

---

## 6. Recomendación sobre Modelos 3D (.glb) y Videos Pesados

- **Imágenes (JPG, PNG, WEBP)**: Funcionan perfecto desde Google Drive.
- **Videos largos o Modelos 3D (.glb > 25MB)**: Google Drive aplica escaneo de antivirus y no soporta *HTTP range requests* eficientes para streaming. Para modelos `.glb` y videos de fondo, se recomienda mantenerlos en la carpeta `public/` de la web o utilizar servicios como Cloudinary o Supabase Storage.
