import { useContext } from 'react'
import { AppThemeContext } from '@src/presentation/context/AppThemeContext'

export const useAppTheme = () => {
	return useContext(AppThemeContext)
}
