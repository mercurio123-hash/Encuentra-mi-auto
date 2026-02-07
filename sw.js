// Este código maneja la notificación cuando la app está en segundo plano
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Al tocar la notificación, abre la app para ver el mapa
    event.waitUntil(
        clients.openWindow('/')
    );
});

// Escucha mensajes del archivo principal para lanzar la alarma
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'LANZAR_ALARMA') {
        const options = {
            body: `¡Faltan ${event.data.minutos} minutos! Regresa al auto.`,
            icon: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
            vibrate: [500, 200, 500, 200, 500, 200, 500],
            tag: 'alarma-parking', // Evita notificaciones duplicadas
            renotify: true,
            requireInteraction: true // La notificación no se quita hasta que la toques
        };

        self.registration.showNotification('⚠️ ALERTA DE PARQUÍMETRO', options);
    }
});