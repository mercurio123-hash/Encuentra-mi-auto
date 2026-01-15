self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

// Escucha la orden de "activar alarma" que le envía la App
self.addEventListener('message', (event) => {
    if (event.data.type === 'SET_TIMER') {
        const tiempoMilisegundos = event.data.ms;
        const avisoMilisegundos = tiempoMilisegundos - (5 * 60000); // 5 min antes

        // Aviso previo (5 min)
        if (avisoMilisegundos > 0) {
            setTimeout(() => {
                enviarNotificacion("⚠️ ¡Quedan 5 minutos!", "El parquímetro está por expirar.");
            }, avisoMilisegundos);
        }

        // Alarma final
        setTimeout(() => {
            enviarNotificacion("🚨 ¡TIEMPO AGOTADO!", "El tiempo de parquímetro ha finalizado.");
        }, tiempoMilisegundos);
    }
});

function enviarNotificacion(titulo, mensaje) {
    self.registration.showNotification(titulo, {
        body: mensaje,
        icon: 'icon-parking.png',
        vibrate: [500, 200, 500, 200, 500],
        tag: 'parking-alert',
        renotify: true,
        requireInteraction: true
    });
}
