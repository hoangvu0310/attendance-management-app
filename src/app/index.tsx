import { Button, Text, View } from 'react-native'
import { useAppTheme } from '@src/presentation/hook/useAppTheme'
import { ThemeOptions } from '@src/core/infrastructure/storage/async-storage'
import { useAppSelector } from '@src/presentation/hook/useAppSelector'
import { AppRootState } from '@src/presentation/redux/store'
import checkConnection from '@src/core/shared/utils/network'
import useNetworkStatusTracking from '@src/presentation/hook/useNetworkStatusTracking'

export default function App() {
	useNetworkStatusTracking()

	const { isDarkMode, updateThemeSetting } = useAppTheme()
	const { isConnected } = useAppSelector((state: AppRootState) => state.network)

	return (
		<View
			className={`flex-1 items-center justify-center`}
			style={{ backgroundColor: isDarkMode ? 'black' : 'white' }}
		>
			<Button title={'To Light'} onPress={() => updateThemeSetting(ThemeOptions.light)} />
			<Button title={'To Dark'} onPress={() => updateThemeSetting(ThemeOptions.dark)} />
			<Button title={'To System'} onPress={() => updateThemeSetting(ThemeOptions.system)} />
			<Button title={'Check connection'} onPress={() => checkConnection()} />
			<Text className={'text-lg'} style={{ color: 'black' }}>
				{isConnected.toString()}
			</Text>
		</View>
	)
}
