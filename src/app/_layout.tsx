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
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		'OpenSans-Regular': require('@assets/fonts/OpenSans-Regular.ttf'),
		'OpenSans-Medium': require('@assets/fonts/OpenSans-Medium.ttf'),
		'OpenSans-SemiBold': require('@assets/fonts/OpenSans-SemiBold.ttf'),
		'OpenSans-Bold': require('@assets/fonts/OpenSans-Bold.ttf'),
		'OpenSans-Italic': require('@assets/fonts/OpenSans-Italic.ttf'),
		'OpenSans-MediumItalic': require('@assets/fonts/OpenSans-MediumItalic.ttf'),
		'OpenSans-SemiBoldItalic': require('@assets/fonts/OpenSans-SemiBoldItalic.ttf'),
		'OpenSans-BoldItalic': require('@assets/fonts/OpenSans-BoldItalic.ttf'),
	})

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
							<BottomSheetModalProvider>
								<Stack>
									<Stack.Screen name={'index'} options={{ headerShown: false }} />
									<Stack.Screen name={'(main)'} options={{ headerShown: false }} />
									<Stack.Screen name={'(tasks)'} options={{ headerShown: false }} />
								</Stack>
							</BottomSheetModalProvider>
						</AppThemeProvider>
					</Provider>
				</QueryClientProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}
