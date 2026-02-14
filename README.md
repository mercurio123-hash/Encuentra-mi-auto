# 🚗 Parking Julius Pro 2.0

**Parking Julius** es una aplicación web progresiva (PWA) diseñada para resolver el problema de las multas de parquímetro y la desorientación al buscar el auto estacionado.

## 🛠️ Cómo funciona
A diferencia de otras apps que fallan cuando el teléfono entra en modo ahorro de energía, esta herramienta utiliza un **sistema híbrido**:
1. **GPS Local:** Guarda las coordenadas exactas de tu vehículo.
2. **Cronómetro Visual:** Muestra en tiempo real cuánto te queda de plazo.
3. **Asistente de Alarma:** Calcula automáticamente la hora ideal para tu alarma (5 minutos antes del vencimiento) y te redirige al reloj del sistema para asegurar que la alerta suene pase lo que pase.

## ✨ Características principales
- 📍 **Marcador de Mapa:** Visualización instantánea de tu auto mediante Leaflet.js.
- ⏰ **Filosofía de Prevención:** Cálculo inteligente para llegar 5 minutos antes de la infracción.
- 🧭 **Navegación Inteligente:** Enlace directo a Google Maps (modo peatón) para el regreso.
- 📱 **Modo PWA:** Se puede "Instalar" en el celular para acceso rápido e icono personalizado.

## 🚀 Instrucciones de Instalación
1. Sube los archivos `index.html`, `sw.js` e `icon-parking.png` a tu servidor o GitHub Pages.
2. Abre la URL en tu navegador móvil.
3. Selecciona **"Añadir a la pantalla de inicio"** para usarla como una aplicación nativa.

## ⚠️ Nota Importante
Para garantizar la fiabilidad total, esta aplicación solicita al usuario programar la alarma en el reloj nativo del sistema operativo, evitando así que los protocolos de ahorro de batería de Android/iOS silencien el aviso.

---
*Desarrollado con la intención de que ningún parquímetro nos gane la partida.*
