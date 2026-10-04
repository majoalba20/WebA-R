/**
 * Utilidades para trabajar con URLs e identificadores de Google Drive.
 */

/**
 * Extrae el ID de un archivo de Google Drive a partir de una URL o devuelve el ID si ya lo es.
 * @param {string} urlOrId - URL de Drive o ID directo del archivo.
 * @returns {string|null} ID del archivo o null si no es válido.
 */
export function extractDriveId(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return null;

  const trimmed = urlOrId.trim();

  // Si ya es un ID de Google Drive (alfanumérico con guiones y guiones bajos, longitud habitual 25-50)
  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) {
    return trimmed;
  }

  // Patrón: /file/d/ID/
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];

  // Patrón: id=ID o id=ID&...
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  // Patrón: lh3.googleusercontent.com/d/ID
  const lh3Match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (lh3Match && lh3Match[1]) return lh3Match[1];

  return null;
}

/**
 * Convierte un ID o URL compartida de Google Drive en una URL directa de alta velocidad (CDN de Google).
 * Si el recurso no es de Google Drive (por ejemplo, ruta local '/images/...' o data URL), se devuelve intacto.
 * 
 * @param {string} urlOrId - URL compartida o ID de Google Drive, o URL local estándar.
 * @param {number} size - Tamaño máximo sugerido (por defecto 1920px para pantallas Retina / Full HD).
 * @returns {string} URL directa optimizada para etiquetas <img> o background-image.
 */
export function getDriveDirectUrl(urlOrId, size = 1920) {
  if (!urlOrId) return '';

  const driveId = extractDriveId(urlOrId);
  if (driveId) {
    // La CDN de Googleusercontent (lh3) es rápida y no requiere redirección de cookies de sesión
    return `https://lh3.googleusercontent.com/d/${driveId}=w${size}`;
  }

  // Si no es un enlace de Drive, devolver el string original (ej. recurso local o URL externa)
  return urlOrId;
}

/**
 * Helper para verificar si un archivo es video
 */
export function isVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return /\.(mp4|webm|ogg|mov)($|\?)/i.test(url);
}
