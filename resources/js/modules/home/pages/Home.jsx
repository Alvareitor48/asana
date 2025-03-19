import { PusherProvider } from '@/shared/contexts/PusherContext'
import HomeComponent from '../components/HomeComponent'

export default function Home({ auth }) {
  return (
    <PusherProvider>
      <HomeComponent />
    </PusherProvider>
  )
}
