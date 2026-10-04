/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: API DE RECURSOS VISUALES PARA WEB ARQUITECTURA
 * =========================================================================
 * 
 * Versión mejorada con detección inteligente de nombres de carpetas y archivos,
 * soporte para tildes/espacios/mayúsculas y diagnóstico en tiempo real (_debug).
 * =========================================================================
 */

var CARPETA_PRINCIPAL_ID = "1H377lxdO9xAgdjGaC3ddSBkqTT-zjSNh";

function doGet(e) {
  try {
    var folderId = (e && e.parameter && e.parameter.folderId) ? e.parameter.folderId : CARPETA_PRINCIPAL_ID;
    
    if (!folderId || folderId.indexOf("COLOCA_AQUI") !== -1) {
      return responseJSON({
        error: true,
        message: "Debes configurar CARPETA_PRINCIPAL_ID en el script o pasar ?folderId=ID en la URL"
      });
    }

    var rootFolder = DriveApp.getFolderById(folderId);

    var data = {
      timestamp: new Date().toISOString(),
      banner: null,
      renovations: [],
      showcases: [],
      about: {
        teamImage: null,
        davidImage: null,
        jessicaImage: null
      },
      _debug: {
        carpetaPrincipal: rootFolder.getName(),
        carpetasDetectadas: [],
        archivosEnRaiz: []
      }
    };

    // Archivos directos en la raíz (por si colocaron el banner u otras fotos aquí)
    var rootFiles = rootFolder.getFiles();
    while (rootFiles.hasNext()) {
      var rFile = rootFiles.next();
      var rName = cleanStr(rFile.getName());
      data._debug.archivosEnRaiz.push(rFile.getName());

      if (rName.indexOf("banner") !== -1 && !data.banner) {
        data.banner = getDirectFileUrl(rFile.getId());
      }
    }

    // Subcarpetas principales
    var subFolders = rootFolder.getFolders();
    while (subFolders.hasNext()) {
      var folder = subFolders.next();
      var rawName = folder.getName();
      var folderName = cleanStr(rawName);
      
      data._debug.carpetasDetectadas.push(rawName);

      // 1. CARPETA DE REMODELACIONES (Cocinas, Muebles, Exteriores, etc.)
      if (
        folderName.indexOf("remodel") !== -1 || 
        folderName.indexOf("renovat") !== -1 ||
        folderName.indexOf("proyect") !== -1 ||
        folderName.indexOf("obra") !== -1
      ) {
        data.renovations = processRenovationsFolder(folder);
      }
      
      // 2. CARPETA DE ANTES Y DESPUÉS (Comparativas)
      else if (
        folderName.indexOf("antes") !== -1 || 
        folderName.indexOf("showcase") !== -1 ||
        folderName.indexOf("transform") !== -1 ||
        folderName.indexOf("compar") !== -1 ||
        folderName.indexOf("before") !== -1
      ) {
        data.showcases = processBeforeAfterFolder(folder);
      }

      // 3. CARPETA DEL BANNER PRINCIPAL
      else if (folderName.indexOf("banner") !== -1 || folderName.indexOf("portada") !== -1) {
        var bannerFiles = folder.getFiles();
        while (bannerFiles.hasNext()) {
          var bFile = bannerFiles.next();
          var bMime = bFile.getMimeType();
          if (bMime.indexOf("image/") !== -1) {
            data.banner = getDirectFileUrl(bFile.getId());
            break;
          }
        }
      }

      // 4. CARPETA DE EQUIPO / SOBRE NOSOTROS
      else if (
        folderName.indexOf("equipo") !== -1 || 
        folderName.indexOf("about") !== -1 || 
        folderName.indexOf("team") !== -1 ||
        folderName.indexOf("nosotros") !== -1 ||
        folderName.indexOf("arquitect") !== -1 ||
        folderName.indexOf("personal") !== -1 ||
        folderName.indexOf("quienes") !== -1
      ) {
        data.about = processTeamFolder(folder);
      }
    }

    return responseJSON(data);

  } catch (error) {
    return responseJSON({
      error: true,
      message: error.toString()
    });
  }
}

/**
 * Normaliza strings para comparaciones insensibles a tildes, mayúsculas y espacios
 */
function cleanStr(str) {
  if (!str) return "";
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Procesa la carpeta de Remodelaciones
 */
function processRenovationsFolder(parentFolder) {
  var renovations = [];
  var categoryFolders = parentFolder.getFolders();

  while (categoryFolders.hasNext()) {
    var catFolder = categoryFolders.next();
    var catName = catFolder.getName().trim();
    var catDesc = catFolder.getDescription() || "Diseños contemporáneos y funcionales.";
    var images = [];
    var coverImage = null;

    var files = catFolder.getFiles();
    while (files.hasNext()) {
      var file = files.next();
      var mime = file.getMimeType();
      var fileName = cleanStr(file.getName());
      var fileUrl = getDirectFileUrl(file.getId());

      if (mime.indexOf("image/") !== -1 || mime.indexOf("video/") !== -1) {
        images.push(fileUrl);

        if (!coverImage || fileName.indexOf("portada") !== -1 || fileName.indexOf("cover") !== -1 || fileName.indexOf("principal") !== -1) {
          coverImage = fileUrl;
        }
      }
    }

    if (images.length > 0) {
      renovations.push({
        id: catName.toLowerCase().replace(/\s+/g, '-'),
        title: catName,
        category: catName,
        description: catDesc,
        image: coverImage || images[0],
        images: images
      });
    }
  }

  return renovations;
}

/**
 * Procesa la carpeta de Antes y Después con doble estrategia:
 * Estrategia A: Si hay subcarpetas por proyecto (ej: "Cocina Abierta/antes.jpg, despues.jpg")
 * Estrategia B: Si las fotos están directamente en la carpeta (ej: "antes_cocina.jpg", "despues_cocina.jpg")
 */
function processBeforeAfterFolder(parentFolder) {
  var showcases = [];
  var projectFolders = parentFolder.getFolders();
  var hasSubfolders = false;

  // Estrategia A: Subcarpetas por cada proyecto
  while (projectFolders.hasNext()) {
    hasSubfolders = true;
    var projFolder = projectFolders.next();
    var projName = projFolder.getName().trim();
    var projDesc = projFolder.getDescription() || "Transformación de espacios con intervención integral.";
    
    var beforeImg = null;
    var afterImg = null;
    var allImagesInFolder = [];

    var files = projFolder.getFiles();
    while (files.hasNext()) {
      var file = files.next();
      var mime = file.getMimeType();
      if (mime.indexOf("image/") === -1) continue;

      var name = cleanStr(file.getName());
      var url = getDirectFileUrl(file.getId());
      allImagesInFolder.push({ name: name, url: url });

      if (name.indexOf("antes") !== -1 || name.indexOf("before") !== -1 || name.indexOf("pre") !== -1) {
        beforeImg = url;
      } else if (name.indexOf("despues") !== -1 || name.indexOf("despu") !== -1 || name.indexOf("after") !== -1 || name.indexOf("post") !== -1) {
        afterImg = url;
      }
    }

    // Si no tenían la palabra "antes" o "después", pero hay al menos 2 imágenes, tomamos la primera y segunda
    if ((!beforeImg || !afterImg) && allImagesInFolder.length >= 2) {
      allImagesInFolder.sort(function(a, b) { return a.name.localeCompare(b.name); });
      beforeImg = beforeImg || allImagesInFolder[0].url;
      afterImg = afterImg || allImagesInFolder[1].url;
    }

    if (beforeImg && afterImg) {
      showcases.push({
        id: projName.toLowerCase().replace(/\s+/g, '-'),
        title: projName.replace(/^\d+[-_ ]*/, ''),
        subtitle: "Rehabilitación Integral",
        description: projDesc,
        beforeImg: beforeImg,
        afterImg: afterImg
      });
    }
  }

  // Estrategia B: Fotos sueltas directamente en la carpeta Antes y Después
  if (!hasSubfolders) {
    var directFiles = parentFolder.getFiles();
    var beforeMap = {};
    var afterMap = {};

    while (directFiles.hasNext()) {
      var dFile = directFiles.next();
      if (dFile.getMimeType().indexOf("image/") === -1) continue;

      var dName = cleanStr(dFile.getName());
      var dUrl = getDirectFileUrl(dFile.getId());
      
      // Limpia prefijos como antes_, despues_, before_, after_ para obtener la clave del proyecto
      var key = dName
        .replace(/(antes|despues|despu|before|after|pre|post)[-_ ]*/g, "")
        .replace(/\.[^/.]+$/, ""); // Remueve extensión

      if (dName.indexOf("antes") !== -1 || dName.indexOf("before") !== -1 || dName.indexOf("pre") !== -1) {
        beforeMap[key] = dUrl;
      } else if (dName.indexOf("despues") !== -1 || dName.indexOf("despu") !== -1 || dName.indexOf("after") !== -1 || dName.indexOf("post") !== -1) {
        afterMap[key] = dUrl;
      }
    }

    for (var k in beforeMap) {
      if (afterMap[k]) {
        var cleanTitle = k.replace(/[-_]/g, " ").trim();
        showcases.push({
          id: k,
          title: cleanTitle ? (cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)) : "Transformación",
          subtitle: "Rehabilitación Integral",
          description: "Transformación de espacios con intervención integral.",
          beforeImg: beforeMap[k],
          afterImg: afterMap[k]
        });
      }
    }
  }

  return showcases;
}

/**
 * Procesa fotos de equipo con búsqueda profunda (archivos directos y subcarpetas)
 */
function processTeamFolder(folder) {
  var about = {
    teamImage: null,
    davidImage: null,
    jessicaImage: null
  };

  var unassignedImages = [];

  // Función interna para revisar archivos en una carpeta
  function inspectFiles(targetFolder) {
    var files = targetFolder.getFiles();
    while (files.hasNext()) {
      var file = files.next();
      if (file.getMimeType().indexOf("image/") === -1) continue;

      var name = cleanStr(file.getName());
      var url = getDirectFileUrl(file.getId());
      var assigned = false;

      if (name.indexOf("david") !== -1 || name.indexOf("rueda") !== -1) {
        about.davidImage = url;
        assigned = true;
      } else if (name.indexOf("jessica") !== -1 || name.indexOf("alba") !== -1) {
        about.jessicaImage = url;
        assigned = true;
      } else if (
        name.indexOf("team") !== -1 || 
        name.indexOf("equipo") !== -1 || 
        name.indexOf("grupo") !== -1 || 
        name.indexOf("nosotros") !== -1 ||
        name.indexOf("todos") !== -1
      ) {
        about.teamImage = url;
        assigned = true;
      }

      if (!assigned) {
        unassignedImages.push(url);
      }
    }
  }

  // 1. Inspeccionar archivos en la carpeta de Equipo
  inspectFiles(folder);

  // 2. Si hay subcarpetas dentro de Equipo (ej: Equipo/David, Equipo/Jessica)
  var sub = folder.getFolders();
  while (sub.hasNext()) {
    var sFolder = sub.next();
    var sName = cleanStr(sFolder.getName());
    var sFiles = sFolder.getFiles();

    while (sFiles.hasNext()) {
      var sf = sFiles.next();
      if (sf.getMimeType().indexOf("image/") === -1) continue;
      var sUrl = getDirectFileUrl(sf.getId());

      if (sName.indexOf("david") !== -1 && !about.davidImage) {
        about.davidImage = sUrl;
      } else if (sName.indexOf("jessica") !== -1 && !about.jessicaImage) {
        about.jessicaImage = sUrl;
      } else if (!about.teamImage) {
        about.teamImage = sUrl;
      } else {
        unassignedImages.push(sUrl);
      }
    }
  }

  // Fallback inteligente: si alguna imagen no coincidió por nombre pero hay fotos en la carpeta, asignarlas
  if (!about.teamImage && unassignedImages.length > 0) {
    about.teamImage = unassignedImages.shift();
  }
  if (!about.davidImage && unassignedImages.length > 0) {
    about.davidImage = unassignedImages.shift();
  }
  if (!about.jessicaImage && unassignedImages.length > 0) {
    about.jessicaImage = unassignedImages.shift();
  }

  return about;
}

/**
 * Genera la URL de CDN de Google de alta velocidad para renderizar directamente en la web
 */
function getDirectFileUrl(fileId) {
  return "https://lh3.googleusercontent.com/d/" + fileId;
}

/**
 * Devuelve la respuesta en formato JSON con cabeceras CORS
 */
function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
