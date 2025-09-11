import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '@src/core/shared/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

export default function LinearBackground({ children }: React.PropsWithChildren<{}>) {
	return (
		<SafeAreaView className={'flex-1 items-center bg-white'} edges={['bottom']}>
			<LinearGradient
				className={'h-full w-full'}
				colors={[COLORS.blue['400'], COLORS.blue['600'], COLORS.blue['800']]}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
			>
				{children}
			</LinearGradient>
		</SafeAreaView>
	)
}
