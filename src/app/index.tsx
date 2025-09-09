import useNetworkStatusTracking from '@src/presentation/hook/useNetworkStatusTracking'
import { Redirect } from 'expo-router'

export default function App() {
	useNetworkStatusTracking()

	return <Redirect href={'/(main)/home'} />
}
