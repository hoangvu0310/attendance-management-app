import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { Appearance } from 'react-native'
import { getTheme, setTheme, ThemeOptions } from '@/src/core/infrastructure/storage/async-storage'

type AppThemeContextProps = {
	isDarkMode: boolean
	themeSetting: ThemeOptions | null
	updateThemeSetting: (theme: ThemeOptions) => Promise<void>
}

export const AppThemeContext = createContext<AppThemeContextProps>({
	isDarkMode: false,
	themeSetting: null,
	updateThemeSetting: async () => {},
})

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const [themeSetting, setThemeSetting] = useState<ThemeOptions | null>(null)

	const updateThemeSetting = useCallback(async (theme: ThemeOptions) => {
		if (theme === ThemeOptions.system) {
			const systemColorScheme = Appearance.getColorScheme()
			setIsDarkMode(systemColorScheme === ThemeOptions.dark)
		} else {
			setIsDarkMode(theme === ThemeOptions.dark)
		}

		setThemeSetting(theme)
		await setTheme(theme)
	}, [])

	const loadTheme = useCallback(async () => {
		const savedTheme = await getTheme()
		await updateThemeSetting(savedTheme || ThemeOptions.light)
	}, [updateThemeSetting])

	useEffect(() => {
		loadTheme()
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			getTheme().then((themeSetting) => {
				if (themeSetting === ThemeOptions.system) {
					setIsDarkMode(colorScheme === ThemeOptions.dark)
				}
			})
		})
		return () => subscription.remove()
	}, [themeSetting, loadTheme])

	const contextValue = useMemo(
		() => ({
			isDarkMode,
			themeSetting,
			updateThemeSetting,
		}),
		[isDarkMode, themeSetting, updateThemeSetting],
	)

	return <AppThemeContext.Provider value={contextValue}>{children}</AppThemeContext.Provider>
}
