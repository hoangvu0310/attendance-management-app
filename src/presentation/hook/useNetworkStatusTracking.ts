import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { onlineManager } from '@tanstack/react-query'
import NetInfo from '@react-native-community/netinfo'
import { setIsConnected } from '@src/presentation/redux/networkSlice'

export default function useNetworkStatusTracking() {
	const dispatch = useDispatch()

	useEffect(() => {
		onlineManager.setEventListener((setOnline) => {
			return NetInfo.addEventListener((state) => {
				setOnline(state.isConnected ?? false)
				dispatch(setIsConnected(state.isConnected ?? false))
			})
		})
	}, [dispatch])
}
