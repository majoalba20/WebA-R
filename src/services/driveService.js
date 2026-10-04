import { RENOVATIONS_DATA } from '../data/renovations.js';
import { SHOWCASES } from '../data/showCases.js';
import { PROJECTS } from '../data/models3D.js';
import { getDriveDirectUrl } from '../utils/driveUtils.js';

// Claves de almacenamiento local y tiempo de expiración (5 minutos)
const CACHE_KEY = 'webarq_drive_data_cache';
const CACHE_TTL_MS = 5 * 60 * 1000;

// URL del Web App de Google Apps Script configurada en variables de entorno
const DRIVE_API_URL = import.meta.env.VITE_DRIVE_API_URL || '';

/**
 * Normaliza los datos de remodelaciones recibidos desde Google Drive
 */
function normalizeRenovations(data) { 
  if (!Array.isArray(data) || data.length === 0) return null;

  return data.map((item, index) => {
    const images = Array.isArray(item.images) 
      ? item.images.map((img) => getDriveDirectUrl(img)) 
      : [];
    const mainImage = getDriveDirectUrl(item.image || images[0] || '');

    return {
      id: item.id || `renovation-${index}`,
      title: item.title || `Proyecto ${index + 1}`,
      category: item.category || item.title || 'Remodelación',
      image: mainImage,
      description: item.description || 'Transformación de espacios con diseño, funcionalidad y calidad.',
      images: images.length > 0 ? images : [mainImage],
    };
  });
}

/**
 * Normaliza los datos de Antes y Después recibidos desde Google Drive
 */
function normalizeShowcases(data) {
  if (!Array.isArray(data) || data.length === 0) return null;
  return data.map((item, index) => {
    return {
      id: item.id || `showcase-${index}`,
      title: item.title || `Transformación ${index + 1}`,
      subtitle: item.subtitle || 'Rehabilitación Integral',
      description: item.description || 'Diseño y optimización del espacio existente.',
      beforeImg: getDriveDirectUrl(item.beforeImg || item.beforeImage || ''),
      afterImg: getDriveDirectUrl(item.afterImg || item.afterImage || ''),
    };
  });
}

/**
 * Normaliza los proyectos 3D recibidos desde Google Drive o API
 */
function normalizeProjects3D(data) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return data.map((item, index) => ({
    id: item.id || index + 1,
    title: item.title || `Modelo ${index + 1}`,
    category: item.category || 'Residencial',
    location: item.location || 'Colombia',
    image: getDriveDirectUrl(item.image || ''),
    glbUrl: item.glbUrl || item.modelUrl || '',
  }));
}

/**
 * Obtiene la caché local si aún no ha expirado y no contiene errores
 */
function getCachedData() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { timestamp, data } = JSON.parse(raw);
    
    // Si la información está incompleta (faltan showcases o equipo), no usar caché para permitir actualización inmediata
    if (data && (!data.showcases || data.showcases.length === 0 || !data.about || !data.about.teamImage)) {
      return null;
    }

    if (data && !data.error && Date.now() - timestamp < CACHE_TTL_MS) {
      return data;
    }
  } catch (err) {
    console.warn('[DriveService] Error leyendo caché local:', err);
  }
  return null;
}

/**
 * Guarda en caché local únicamente respuestas válidas sin error
 */
function setCachedData(data) {
  if (!data || data.error) return;
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );
  } catch (err) {
    console.warn('[DriveService] Error guardando caché local:', err);
  }
}

/**
 * Consulta el endpoint de Google Apps Script o API de Google Drive
 */
export async function fetchDriveData(forceRefresh = false) {
  console.log('%c[DriveService] 🚀 Evaluando conexión con Google Drive...', 'color: #0284c7; font-weight: bold;');

  if (!DRIVE_API_URL) {
    console.warn('%c[DriveService] ⚠️ VITE_DRIVE_API_URL no está configurada en tu archivo .env', 'color: #eab308; font-weight: bold;');
    return null;
  }

  if (!forceRefresh) {
    const cached = getCachedData();
    if (cached) {
      console.log('%c[DriveService] 📦 Datos obtenidos desde caché local:', 'color: #10b981; font-weight: bold;', cached);
      return cached;
    }
  } else {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (_) {}
  }

  console.log('%c[DriveService] 📡 Ejecutando llamada al API:', 'color: #6366f1; font-weight: bold;', DRIVE_API_URL);

  try {
    const response = await fetch(DRIVE_API_URL, {
      method: 'GET',
      mode: 'cors',
    });

    console.log(`%c[DriveService] 📥 HTTP Status: ${response.status} ${response.statusText}`, response.ok ? 'color: #10b981;' : 'color: #ef4444;');

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[DriveService] Error en respuesta HTTP:', response.status, errorText);
      throw new Error(`Respuesta no satisfactoria del servicio de Drive: ${response.status}`);
    }

    const json = await response.json();
    console.log('%c[DriveService] 📄 Datos recibidos de Google Apps Script:', 'color: #8b5cf6; font-weight: bold;', json);

    if (json.error) {
      console.error(
        '%c[DriveService] ❌ El script de Google Apps Script retornó un error:',
        'color: #ef4444; font-weight: bold;',
        json.message
      );
      console.warn(
        '%c[DriveService] 👉 Posible solución: Verifica que en Google Apps Script la variable CARPETA_PRINCIPAL_ID tenga el ID real de tu carpeta de Google Drive, o añade ?folderId=TU_ID en tu archivo .env',
        'color: #f59e0b;'
      );
      return null;
    }

    setCachedData(json);
    return json;
  } catch (error) {
    console.error('%c[DriveService] ❌ Falló la llamada a Google Apps Script:', 'color: #ef4444; font-weight: bold;', error);
    // Si falla la red, intentar devolver la caché aunque haya expirado
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw).data;
        if (cached && !cached.error) {
          console.log('[DriveService] Utilizando caché expirada como contingencia:', cached);
          return cached;
        }
      }
    } catch (_) {}
    return null;
  }
}

// Helper global accesible desde la consola del navegador para depuración: window.refreshDrive()
if (typeof window !== 'undefined') {
  window.refreshDrive = () => {
    console.log('[DriveService] Forzando recarga de datos desde Google Drive...');
    return fetchDriveData(true);
  };
}

/**
 * Obtiene los proyectos de remodelaciones (Cocinas, Muebles, etc.)
 */
export async function getRenovationsData() {
  const driveData = await fetchDriveData();
  if (driveData && driveData.renovations) {
    const normalized = normalizeRenovations(driveData.renovations);
    if (normalized && normalized.length > 0) return normalized;
  }
  return RENOVATIONS_DATA;
}

/**
 * Obtiene los proyectos para la sección Antes y Después
 */
export async function getShowcasesData() {
  const driveData = await fetchDriveData();
  if (driveData && driveData.showcases) {
    const normalized = normalizeShowcases(driveData.showcases);
    if (normalized && normalized.length > 0) return normalized;
  }
  return SHOWCASES;
}

/**
 * Obtiene los modelos 3D
 */
export async function getProjects3DData() {
  const driveData = await fetchDriveData();
  if (driveData && driveData.models) {
    const normalized = normalizeProjects3D(driveData.models);
    if (normalized && normalized.length > 0) return normalized;
  }
  return PROJECTS;
}

/**
 * Obtiene la imagen del Banner principal
 */
export async function getBannerImage(defaultImage) {
  const driveData = await fetchDriveData();
  if (driveData && driveData.banner) {
    const url = typeof driveData.banner === 'string' ? driveData.banner : driveData.banner.image;
    if (url) return getDriveDirectUrl(url);
  }
  return defaultImage;
}

/**
 * Obtiene las imágenes de equipo para la sección Sobre Nosotros
 */
export async function getAboutImages(defaultImages) {
  const driveData = await fetchDriveData();
  if (driveData && driveData.about) {
    return {
      teamImage: driveData.about.teamImage ? getDriveDirectUrl(driveData.about.teamImage) : defaultImages.teamImage,
      davidImage: driveData.about.davidImage ? getDriveDirectUrl(driveData.about.davidImage) : defaultImages.davidImage,
      jessicaImage: driveData.about.jessicaImage ? getDriveDirectUrl(driveData.about.jessicaImage) : defaultImages.jessicaImage,
    };
  }
  return defaultImages;
}
