import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@src/core/infrastructure/query/query.config'
import { Provider } from 'react-redux'
import { store } from '@src/presentation/redux/store'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { getLanguage, LanguageOptions } from '@src/core/infrastructure/storage/async-storage'
import { changeAppLanguage } from '@src/i18n/i18n.config'
import { useEffect } from 'react'
import '@/global.css'
import AppThemeProvider from '@src/presentation/context/AppThemeContext'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	// TODO: Add fonts
	const [fontsLoaded, error] = useFonts({})

	const loadLanguage = async () => {
		const language = await getLanguage()
		await changeAppLanguage(language || LanguageOptions.en)
	}

	useEffect(() => {
		loadLanguage().then(() => {
			if (error) throw error
			if (fontsLoaded) SplashScreen.hideAsync()
		})
	}, [fontsLoaded, error])

	if (!fontsLoaded && !error) return null

	return (
		<GestureHandlerRootView>
			<SafeAreaProvider>
				<QueryClientProvider client={queryClient}>
					<Provider store={store}>
						<AppThemeProvider>
							<Stack>
								<Stack.Screen name={'index'} options={{ headerShown: false }} />
							</Stack>
						</AppThemeProvider>
					</Provider>
				</QueryClientProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}
