self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data.type === 'PROGRAMAR_ALERTAS') {
        const { msTotales } = event.data;
        const msAviso = msTotales - (5 * 60000);

        // Aviso 5 minutos antes
        if (msAviso > 0) {
            setTimeout(() => {
                self.registration.showNotification("⚠️ ¡QUEDAN 5 MINUTOS!", {
                    body: "El parquímetro va a expirar. ¡Regresa ya!",
                    vibrate: [500, 200, 500],
                    requireInteraction: true,
                    tag: 'aviso-5-min'
                });
            }, msAviso);
        }

        // Alarma Final
        setTimeout(() => {
            self.registration.showNotification("🚨 ¡TIEMPO AGOTADO!", {
                body: "El tiempo ha llegado a su fin.",
                vibrate: [1000, 500, 1000, 500, 1000],
                requireInteraction: true,
                tag: 'alarma-final'
            });
        }, msTotales);
    }
});

// Para que el botón de la notificación pueda abrir la app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('./'));
});