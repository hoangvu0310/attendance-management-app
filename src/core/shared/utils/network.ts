import NetInfo from '@react-native-community/netinfo'
import { store } from '@src/presentation/redux/store'
import { setIsConnected } from '@src/presentation/redux/networkSlice'

export default async function checkConnection(): Promise<boolean> {
	const state = await NetInfo.fetch()
	store.dispatch(setIsConnected(state.isConnected ?? false))
	return state.isConnected ?? false
}
