const CACHE_NAME = 'parquimetro-v2';
const ASSETS = [
  './',
  './index.html',
  './icon-parking.png',
  './manifest.json'
];

// --- INSTALACIÓN ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// --- ACTIVACIÓN ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// --- FETCH (Offline) ---
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// --- LÓGICA DE ALARMA EN SEGUNDO PLANO ---
let alarmTimestamp = null;
let checkInterval = null;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_ALARM') {
    console.log("Alarma configurada para:", new Date(event.data.timestamp));
    alarmTimestamp = event.data.timestamp;
    startAlarmChecker();
  } 
  else if (event.data && event.data.type === 'CANCEL_ALARM') {
    console.log("Alarma cancelada");
    alarmTimestamp = null;
    if (checkInterval) clearInterval(checkInterval);
  }
});

function startAlarmChecker() {
  if (checkInterval) clearInterval(checkInterval);

  // Verificamos cada 30 segundos (El mínimo fiable que permite Android para SW)
  checkInterval = setInterval(() => {
    if (!alarmTimestamp) return;

    const now = Date.now();

    // Si la hora actual es mayor o igual a la hora de la alarma
    if (now >= alarmTimestamp) {
      console.log("¡ALARMA! Disparando notificación");
      
      // 1. Vibración y Notificación (Esto funciona con pantalla apagada)
      self.registration.showNotification("¡ALERTA PARQUÍMETRO!", {
        body: "¡Te quedan menos de 5 minutos! Corre al auto.",
        icon: "icon-parking.png",
        vibrate: [500, 200, 500, 200, 500], // Patrón de vibración fuerte
        requireInteraction: true // Obliga al usuario a tocarla para quitarla
      });

      // 2. Avisar a la página web (si está abierta) para que suene el audio
      // Si la web está cerrada, esto no hace nada, pero la notificación de arriba sí sirvió
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'ALARM_TRIGGERED' });
        });
      });

      // Limpiar para que no se repita
      alarmTimestamp = null;
      clearInterval(checkInterval);
    }
  }, 30000); // 30 segundos
}

// Cuando el usuario toca la notificación, abrir la app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});