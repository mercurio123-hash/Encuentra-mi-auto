// Este es el "Service Worker", el motor que corre de fondo
self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'icon-parking.png',
        badge: 'icon-parking.png',
        vibrate: [500, 250, 500, 250, 500], // Vibración fuerte para el reloj
        data: { url: self.location.origin }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

// Al hacer clic en la notificación del reloj o celular
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
