import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

let echoInstance = null

export const initEcho = (pusherConfig) => {
  if (!echoInstance && pusherConfig) {
    echoInstance = new Echo({
      broadcaster: 'pusher',
      key: pusherConfig.key,
      cluster: pusherConfig.cluster,
      forceTLS: true,
      wsHost: `ws-${pusherConfig.cluster}.pusher.com`,
      wsPort: 443,
      wssPort: 443,
      enabledTransports: ['ws', 'wss'],
    })
  }
  return echoInstance
}

export default echoInstance
