self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'PROGRAMAR_ALARMA') {
        const msParaAlarma = event.data.delay;
        
        // El Service Worker espera el tiempo exacto y lanza la notificación
        setTimeout(() => {
            const options = {
                body: '⚠️ ¡ATENCIÓN! Quedan 5 minutos de parquímetro.',
                icon: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
                vibrate: [1000, 500, 1000, 500, 1000],
                tag: 'parking-alarm',
                renotify: true,
                requireInteraction: true, // Se queda en pantalla hasta que la quites
                data: { url: event.data.url }
            };
            self.registration.showNotification('ALERTA DE ESTACIONAMIENTO', options);
        }, msParaAlarma);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});