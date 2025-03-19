import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  forceTLS: true,
  wsHost: `ws-${import.meta.env.VITE_PUSHER_CLUSTER}.pusher.com`,
  wsPort: 443, // Puerto para WebSockets seguros
  wssPort: 443, // Puerto para WebSockets seguros (TLS)
  enabledTransports: ['ws', 'wss'], // Solo permitir WebSockets
})

export default echo
