import { usePage } from '@inertiajs/react'
import { createContext, useContext } from 'react'

const PusherContext = createContext(null)

export const PusherProvider = ({ children }) => {
  const { pusher } = usePage().props // Obtenemos los datos desde Laravel

  return <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
}

export const usePusher = () => {
  return useContext(PusherContext)
}
