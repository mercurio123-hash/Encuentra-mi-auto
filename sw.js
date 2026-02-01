self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data.type === 'PROGRAMAR_ALERTAS') {
        const { msTotales } = event.data;
        const msAviso = msTotales - (5 * 60000); // Cálculo de los 5 minutos previos

        // ALERTA PREVIA (5 minutos antes)
        if (msAviso > 0) {
            setTimeout(() => {
                self.registration.showNotification("⚠️ ¡QUEDAN 5 MINUTOS!", {
                    body: "El tiempo se agota, Julius. ¡Regresa al auto!",
                    vibrate: [500, 200, 500, 200, 500],
                    requireInteraction: true,
                    tag: 'aviso-5-min'
                });
            }, msAviso);
        }

        // ALERTA FINAL (Tiempo agotado)
        setTimeout(() => {
            self.registration.showNotification("🚨 ¡TIEMPO AGOTADO!", {
                body: "El parquímetro ha expirado totalmente.",
                vibrate: [1000, 500, 1000, 500, 1000],
                requireInteraction: true,
                tag: 'alarma-final'
            });
        }, msTotales);
    }
});

// Abrir la app al tocar la notificación
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.matchAll({type: 'window'}).then(clientsArr => {
        if (clientsArr.length > 0) return clientsArr[0].focus();
        return clients.openWindow('./');
    }));
});