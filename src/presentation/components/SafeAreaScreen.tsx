import React from 'react'
import { ImageSourcePropType, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '@src/presentation/components/buttons/BackButton'
import IconButton from '@src/presentation/components/buttons/IconButton'

type SafeAreaScreenProps = React.PropsWithChildren<{
	title: string
	trailingIcon?: ImageSourcePropType
	onPressTrailingIcon?: () => void
}>

export default function SafeAreaScreen({
	title,
	trailingIcon,
	onPressTrailingIcon,
	children,
}: SafeAreaScreenProps) {
	return (
		<SafeAreaView className={'flex-1 bg-white'}>
			<View className={'flex-1'}>
				<View className={'w-full flex-row items-center justify-between p-[20px]'}>
					<View className={'flex-row items-center gap-[20px]'}>
						<BackButton />
						<Text className={'font-opensans-semibold text-[20px]'}>{title}</Text>
					</View>
					{trailingIcon && onPressTrailingIcon && (
						<IconButton iconSource={trailingIcon} onPressIcon={onPressTrailingIcon} />
					)}
				</View>

				{children}
			</View>
		</SafeAreaView>
	)
}
