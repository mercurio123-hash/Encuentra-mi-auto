self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data.type === 'PROGRAMAR_ALERTAS') {
        const { msTotales } = event.data;
        const msAviso = msTotales - (5 * 60000); 

        // 1. Programar Aviso de 5 minutos
        if (msAviso > 0) {
            setTimeout(() => {
                self.registration.showNotification("⚠️ QUEDAN 5 MINUTOS", {
                    body: "Julius, el tiempo casi termina. ¡Regresa!",
                    icon: 'icon-parking.png', // <--- Tu icono aquí
                    vibrate: [500, 200, 500],
                    requireInteraction: true,
                    tag: 'aviso-urgente'
                });
            }, msAviso);
        }

        // 2. Programar Alarma Final
        setTimeout(() => {
            self.registration.showNotification("🚨 ¡TIEMPO AGOTADO!", {
                body: "El parquímetro ha finalizado.",
                icon: 'icon-parking.png', // <--- Tu icono aquí
                vibrate: [1000, 500, 1000, 500, 1000],
                requireInteraction: true,
                tag: 'alarma-final'
            });
        }, msTotales);
    }
});